import { ApolloClient, InMemoryCache, ApolloLink, NormalizedCacheObject, from, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from '../auth';
import { inIframe, postMessageToHostingSite } from '../../utils';

interface IAppContextVar {
  loading: boolean;
  isAuthenticate?: boolean;
  isNewUser?: boolean;
  teamObjectId?: string;
  openExternal?: boolean;
  user?: { [key: string]: any };
}

export const appContextVar = makeVar<IAppContextVar>({
  loading: true,
});
export const customHeadersVar = makeVar<{ [key: string]: any }>({});
export class ApolloClientProvider {
  client: ApolloClient<NormalizedCacheObject>;
  _authProvider: AuthProvider;
  _appConfig: { [key: string]: any };
  _uri: string;
  _link: ApolloLink;
  _refreshToken: boolean;
  _teamObjectId?: string | undefined;
  _initialState: IAppContextVar = { loading: false };
  constructor(appConfig: { [key: string]: any }, needToRefresh: boolean) {
    this._setOpenState();
    this._setInitialState();
    this._refreshToken = needToRefresh;
    this._appConfig = appConfig;
    this._authProvider = new AuthProvider(this._appConfig);
    this._initializeApolloClient();
  }
  _setInitialState() {
    this._initialState = {
      loading: false,
      isAuthenticate: false,
      isNewUser: false,
      teamObjectId: this._teamObjectId,
      openExternal: !!this._teamObjectId,
      user: {},
    };
  }

  _setOpenState() {
    const params = new URLSearchParams(window.location.search);
    this._teamObjectId = params.get('teamObjectId') || undefined;
  }
  _initializeApolloClient() {
    this._getUserFromLocalStorage();
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: this._createApolloLink(),
    });
  }
  _getUserFromLocalStorage() {
    const stringUser = localStorage.getItem('user');
    if (!!stringUser) {
      const newValue = {
        ...this._initialState,
        user: JSON.parse(stringUser),
        isAuthenticate: !!localStorage.getItem('user'),
      };
      appContextVar(newValue);
    } else if (this._refreshToken) {
      this._tryRefresh();
    } else {
      appContextVar({ isAuthenticate: false, loading: false });
    }
  }
  _tryRefresh() {
    const requestUrl = `${this._appConfig.serverBaseUrl}/api/refresh`;
    return fetch(requestUrl, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })
      .then((data: any) => {
        return data.json();
      })
      .then(payload => this._setUserData(payload));
  }

  _setUserData(payload: { [key: string]: any }) {
    let res: any;
    let newValue: any = {
      ...this._initialState,
    };
    if (payload.userDetailsToken) {
      res = this._authProvider.onAuthenticationSuccess({
        userDetailsToken: payload.userDetailsToken,
        isAuthenticate: true,
        isNewUser: false,
      });
      newValue = {
        ...newValue,
        user: res?.user,
        isAuthenticate: res?.isAuthenticate,
        loading: false,
      };
    }
    appContextVar(newValue);
    return res;
  }
  _resetUnauthenticatedUserData() {
    localStorage.setItem('user', '');
    appContextVar(this._initialState);
    if (inIframe()) {
      postMessageToHostingSite({ code: 'UNAUTHENTICATED' }, this._appConfig?.hostingSiteDomain);
    }
  }
  _createApolloLink() {
    const httpLink = this._createHttpLink();
    const authMiddleware = this._createAuthMiddleware();
    const errorMiddleware = this._createErrorMiddleware();
    return from([errorMiddleware, authMiddleware, httpLink]);
  }

  _createHttpLink() {
    return createHttpLink({
      uri: `${this._appConfig.serverBaseUrl}/api/graphql`,
      credentials: 'include',
    });
  }

  _createAuthMiddleware() {
    const authLink = setContext((_, { headers }) => {
      const res = {
        headers: {
          ...headers,
          ...customHeadersVar(),
        },
      };
      return res;
    });

    return authLink;
  }
  _createErrorMiddleware() {
    return onError(({ networkError, graphQLErrors, forward, operation }) => {
      if (
        graphQLErrors?.find(({ extensions }: { extensions: any }) => {
          if (extensions?.code === 'UNAUTHENTICATED') {
            return true;
          }
        })
      ) {
        this._resetUnauthenticatedUserData();
      }

      forward(operation);
    });
  }
}
