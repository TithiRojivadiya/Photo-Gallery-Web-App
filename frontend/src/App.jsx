import "./App.css";
import { useEffect, useState, useReducer } from "react";
import Card from "./Components/Card";
import useFetchPhotos from "./hooks/useFetchPhotos";

function favouriteReducer(favourites, action) {
  switch (action.type) {
    case "TOGGLE":
      return favourites.some((photo) => photo.id === action.photo.id)
        ? favourites.filter((photo) => photo.id !== action.photo.id)
        : [...favourites, action.photo];

    default:
      return favourites;
  }
}

function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(
    favouriteReducer,
    [],
    () => {
      try {
        return JSON.parse(localStorage.getItem("favourites")) || [];
      } catch {
        return [];
      }
    }
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="p-6 text-red-600">Error: {error}</p>;
  }

  const filteredData = photos?.filter((photo) =>
    photo.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Photo Gallery
      </h1>

      <input
        type="text"
        placeholder="Search by author name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-lg border border-gray-300 bg-white p-3"
      />

      <p className="mb-4 text-gray-700">
        Favourites: {favourites.length}
      </p>

      {filteredData && filteredData.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredData.map((photo) => (
            <Card
              key={photo.id}
              {...photo}
              isFavourite={favourites.some(
                (fav) => fav.id === photo.id
              )}
              onToggleFavourite={() =>
                dispatch({ type: "TOGGLE", photo })
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          {photos ? "No photos found!" : "No data available!"}
        </p>
      )}
    </div>
  );
}

export default App;
