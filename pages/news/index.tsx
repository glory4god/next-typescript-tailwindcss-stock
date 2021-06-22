import React from 'react';
import PopularViews from '../../components/news/PopularViews';
import SearchBar from '../../components/news/SearchBar';

export default function News() {
  return (
    <div className="min-h-screen max-w-screen-lg text-center pt-20 text-black mx-auto md:flex md:space-x-4 px-6">
      <SearchBar className="md:w-3/4 mt-6 h-11 relative" />
      <PopularViews className="md:w-60 mt-6 space-y-2" />
    </div>
  );
}
