import { useReactiveVar } from '@apollo/client';
import React, { FunctionComponent, useEffect } from 'react';
import { Spinner } from '../../atoms';
import { AppProvider } from '../../molecules';
import { appContextVar, GraphAuthentication } from '../../../services';

interface AppProps {
  setGraphAuthentication: React.Dispatch<React.SetStateAction<GraphAuthentication | undefined>>;
  appConfig: { [key: string]: any };
  needToRefresh: boolean;
}

const AppContainer: FunctionComponent<AppProps> = ({ setGraphAuthentication, appConfig, needToRefresh, children }) => {
  const appContext = useReactiveVar(appContextVar);
  useEffect(() => {
    setGraphAuthentication(new GraphAuthentication(appConfig));
  }, []);
  return (
    <AppProvider appConfig={appConfig} needToRefresh={needToRefresh}>
      {appContext?.loading ? <Spinner label="Loading..." /> : children}
    </AppProvider>
  );
};

export default AppContainer;
