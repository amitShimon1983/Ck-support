import React, { useState, useCallback, useEffect } from 'react';
import { SearchBox, KeyCodes, ISearchBox } from '@fluentui/react';
import { SearchWithSuggestionsStyles, SearchBoxStyle } from './styles';
import { PeopleItem, SavedSearchItem, SuggestionsContainer, SuggestionsList, utils } from './components';
import { SearchInfo, Terms, AsyncSearch } from './types';
import { useLocalStorage } from '@harmon.ie/collabria-frontend-shared/src/hooks/useLocalStorage';
import { appContextVar, useReactiveVar } from '@harmon.ie/collabria-frontend-shared';

const { stringToTerms, termsToString, encodeString } = utils;
const containerRef = React.createRef<HTMLDivElement>();
let searchBoxComponentRef = React.createRef<ISearchBox | null>();

export interface SearchWithSuggestions {
  onSearch: (searchInfo: SearchInfo) => void;
  asyncSearch: AsyncSearch;
  onPeopleSearch: (value: string) => void;
  onClear: () => void;
  onChange: (searchInfo: SearchInfo) => void;
  placeholder?: string;
  disabled?: boolean;
  setShowPeopleSearch: (value: boolean) => void;
  showPeopleSearch: boolean;
  selectedFolder: {
    displayName: string;
    path: string;
    id: string;
  };
}

const SearchWithSuggestions = ({
  placeholder = 'Search',
  disabled,
  onSearch,
  onClear,
  onChange,
  onPeopleSearch,
  showPeopleSearch,
  setShowPeopleSearch,
  asyncSearch,
  selectedFolder,
}: SearchWithSuggestions) => {
  const { data, loading } = asyncSearch;
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [terms, setTerms] = useState<Terms>({});
  const [searchString, setSearchString] = useState('');
  const [valueToSearch, setValueToSearch] = useState({
    value: '',
    term: '',
  });
  useEffect(() => handleClear(), [selectedFolder.id]);
  const { user } = useReactiveVar(appContextVar);
  const [savedSearches, setSavedSearches] = useLocalStorage<any[]>(`${user.data._id}:saved-pool-searches`, []);
  const handleClear = useCallback(() => {
    onClear && onClear();
    setSearchString('');
    setTerms({});
    setValueToSearch({ value: '', term: '' });
  }, [onClear]);

  const addSavedSearch = useCallback(
    (searchItem: any) => {
      if (!searchItem) {
        return;
      }
      const newItems = (savedSearches.length >= 8 ? savedSearches.slice(0, -1) : savedSearches) as any;
      const newItem = encodeString(searchItem);

      if (!newItems.includes(newItem)) {
        setSavedSearches([newItem, ...newItems]);
      }
    },
    [savedSearches, setSavedSearches]
  );

  const onSearchClick = useCallback(
    (searchString: any) => {
      setSearchString(searchString);
      const newTerms = stringToTerms(searchString);
      const from = newTerms.from !== undefined && newTerms.from !== terms.from ? newTerms.from : '';
      const to = newTerms.to !== undefined && newTerms.to !== terms.to ? newTerms.to : '';
      const value = from || to;
      const term = from ? 'from' : to ? 'to' : '';
      setValueToSearch({
        value: value,
        term,
      });
      setTerms(newTerms);
      addSavedSearch(searchString);
      onSearch &&
        onSearch({
          searchString,
          terms: newTerms,
        });
    },
    [terms, searchString]
  );

  const onKeyDown = (ev: any) => {
    if (ev.which === KeyCodes.down) {
      const el = window.document.querySelector('#SearchList') as any;
      if (el) {
        el.focus();
      }
    }
  };

  const onSearchChange = useCallback(
    (event: any, searchString: any) => {
      const parsedTerms: Terms = stringToTerms(searchString);
      const from = parsedTerms.from !== undefined && parsedTerms.from !== terms.from ? parsedTerms.from : '';
      const to = parsedTerms.to !== undefined && parsedTerms.to !== terms.to ? parsedTerms.to : '';
      const value = from || to;
      const term = from ? 'from' : to ? 'to' : '';
      setValueToSearch({
        value,
        term,
      });
      setTerms(parsedTerms);
      setSearchString(searchString);

      if (searchString?.trim() && term) {
        setShowPeopleSearch(true);
      } else {
        setShowPeopleSearch(false);
      }

      onChange &&
        onChange({
          searchString,
          terms: parsedTerms,
        });
      if (valueToSearch.value) {
        onPeopleSearch && onPeopleSearch(valueToSearch.value);
      }
      setShowSavedSearches(false);
    },
    [terms]
  );

  const selectEnd = useCallback(() => {
    searchBoxComponentRef?.current?.focus();
  }, [searchBoxComponentRef]);

  const onSuggestionsListClick = useCallback(
    (item: any) => {
      const newTerms = {
        ...terms,
        [valueToSearch.term]: item.address,
      };
      onSearchClick(termsToString(newTerms));
      setShowPeopleSearch(false);
      selectEnd();
    },
    [terms]
  );
  const onSavedSearchListClick = useCallback((savedSearch: any) => {
    selectEnd();
    onSearchClick(savedSearch);
    setShowSavedSearches(false);
  }, []);

  const onSearchBoxFocus = () => {
    if (!searchString) {
      setShowSavedSearches(true);
    }
  };
  const onSearchBoxBlur = () => {
    setShowSavedSearches(false);
  };
  const onShowPeopleSearchBlur = () => {
    setShowPeopleSearch(false);
  };
  const autoCompleteWidth = containerRef ? containerRef?.current?.offsetWidth : 523;
  return (
    <div ref={containerRef} onKeyDown={onKeyDown} style={SearchWithSuggestionsStyles()}>
      <SearchBox
        componentRef={ref => (searchBoxComponentRef = ref as any)}
        styles={SearchBoxStyle}
        autoComplete="off"
        role="search"
        placeholder={placeholder}
        disabled={disabled}
        onSearch={onSearchClick}
        onClear={handleClear}
        onChange={onSearchChange}
        onFocus={onSearchBoxFocus}
        value={searchString}
      />
      <SuggestionsContainer
        onDismiss={onShowPeopleSearchBlur}
        hidden={!showPeopleSearch}
        width={autoCompleteWidth}
        ref={containerRef}
      >
        <SuggestionsList loading={loading} items={(!loading && data) || []}>
          {(item: any) => {
            return (
              <PeopleItem
                item={item}
                onClick={onSuggestionsListClick}
                searchTerm={valueToSearch.term}
                search={valueToSearch.value}
              />
            );
          }}
        </SuggestionsList>
      </SuggestionsContainer>
      <SuggestionsContainer
        hidden={!(showSavedSearches && !showPeopleSearch)}
        width={autoCompleteWidth}
        ref={containerRef}
        onDismiss={onSearchBoxBlur}
      >
        <SuggestionsList items={savedSearches || []}>
          {(item: any, index?: number) => {
            return <SavedSearchItem key={`SavedSearchItem-${index}`} item={item} onClick={onSavedSearchListClick} />;
          }}
        </SuggestionsList>
      </SuggestionsContainer>
    </div>
  );
};

export default SearchWithSuggestions;
