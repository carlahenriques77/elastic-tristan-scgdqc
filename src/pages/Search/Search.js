import React from 'react';
import { useFetchCollection } from '../../hooks/useFetchCollection';
import { useSearchQuery } from '../../hooks/useSearchQuery';

const Search = () => {
  const searchQuery = useSearchQuery()
  const searchSearch = searchQuery.get("q")

  return (
    <div>
      <h2>Search</h2>
      <p>{searchSearch}</p>
    </div>
  );
};

export default Search;