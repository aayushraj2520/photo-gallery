import { useState, useReducer, useCallback, useMemo, useEffect } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import Header from "./components/Header";
import PhotoCard from "./components/PhotoCard";

// helper function to lazy intialize the useState for favourites
const loadInitialFavourites = () => {
  const savedData = localStorage.getItem("favourites");
  return savedData ? JSON.parse(savedData) : [];
};


const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const exists = state.some((photo) => photo.id === action.payload.id);
      if (exists) {
        return state.filter((photo) => photo.id !== action.payload.id);
      } else {
        return [...state, action.payload];
      }
    }
    default:
      return state;
  }
};

function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [favourites, dispatch] = useReducer(favouritesReducer, null, loadInitialFavourites);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // saving filtered result and filtering only when photos (state) or search query changes
  const filteredPhotos = useMemo(() => {
    if (!searchQuery) return photos;
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [photos, searchQuery]);

  const toggleFavourite = useCallback((photo) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: photo });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans pb-12 selection:bg-blue-200">

      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {searchQuery && (
          <div className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-700">
              Search results for <span className="font-extrabold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">"{searchQuery}"</span>
            </h2>
          </div>
        )}

        {loading && (
          <div className="flex flex-col justify-center items-center h-[50vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-500 font-medium animate-pulse">Fetching amazing photos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-r-lg shadow-sm mb-8 flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-bold text-lg">Oops! Something went wrong.</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Responsive Grid Layout (1 col Mobile, 2 col Tablet, 4 col Desktop) */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPhotos.length > 0 ? (
              filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favourites.some((fav) => fav.id === photo.id)}
                  onToggleFavourite={toggleFavourite}
                />
              ))
            ) : (
              /* Empty State when search has no results */
              <div className="col-span-full flex flex-col justify-center items-center py-20 text-gray-500 bg-white rounded-3xl border border-dashed border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-xl font-medium text-gray-600">No photos found</p>
                <p className="text-sm mt-2 text-gray-400">Try searching for a different author name.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;