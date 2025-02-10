import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import RecipeModal from '../components/recipes/RecipeModal';
import useFavorites from '../hooks/useFavorites';

const Favorites = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { favorites, removeFavorite, isFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFavorites = favorites.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.sections?.[0]?.components?.some(
      component => component.ingredient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Favorite Recipes</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No favorite recipes</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start adding recipes to your favorites to see them here.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search in your favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-recipe-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((recipe) => (
                <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={recipe.thumbnail_url} 
                      alt={recipe.name}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => removeFavorite(recipe.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="currentColor"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{recipe.name}</h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {recipe.description ? recipe.description.slice(0, 100) + '...' : 'No description available'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {recipe.total_time_minutes || '30'} minutes
                      </span>
                      <button 
                        onClick={() => setSelectedRecipe(recipe)}
                        className="px-4 py-2 bg-recipe-500 text-white rounded-lg hover:bg-recipe-600 transition-colors"
                      >
                        View recipe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
};

export default Favorites;
