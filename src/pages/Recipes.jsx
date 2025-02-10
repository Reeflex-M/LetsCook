import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import RecipeModal from '../components/recipes/RecipeModal';
import useFavorites from '../hooks/useFavorites';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'ingredients'
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchRecipes = async (retryCount = 0) => {
      const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: {
          from: '0',
          size: '20',
          tags: 'under_30_minutes'
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setRecipes(response.data.results);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('API Error:', error.response?.status, error.message);
        
        if (error.response?.status === 429 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 1000;
          console.log(`Rate limited. Retrying in ${delay}ms...`);
          setTimeout(() => fetchRecipes(retryCount + 1), delay);
          return;
        }

        if (error.response?.status === 401) {
          setError('Authentication error - Please check your API key in the .env file');
        } else if (error.response?.status === 429) {
          setError('Too many requests - Please try again in a few minutes');
        } else {
          setError('An error occurred while loading recipes');
        }
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredAndSortedRecipes = recipes
    .filter(recipe => {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = recipe.name.toLowerCase().includes(searchLower);
      const ingredientsMatch = recipe.sections?.[0]?.components?.some(
        component => component.ingredient?.name?.toLowerCase().includes(searchLower)
      );
      return searchTerm === '' || nameMatch || ingredientsMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'ingredients') {
        const aCount = a.sections?.[0]?.components?.length || 0;
        const bCount = b.sections?.[0]?.components?.length || 0;
        return aCount - bCount;
      }
      return 0;
    });

  if (!import.meta.env.VITE_RAPIDAPI_KEY) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Configuration Error</p>
            <p>The RapidAPI key is not configured. Please add your key to the .env file:</p>
            <pre className="mt-2 bg-red-50 p-2 rounded">VITE_RAPIDAPI_KEY=your_api_key_here</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Recipes</h1>

        {error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-recipe-500 focus:border-transparent"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-recipe-500 focus:border-transparent"
              >
                <option value="name">Sort by name</option>
                <option value="ingredients">Sort by number of ingredients</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-recipe-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedRecipes.map((recipe) => (
                  <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <img 
                        src={recipe.thumbnail_url} 
                        alt={recipe.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => isFavorite(recipe.id) ? removeFavorite(recipe.id) : addFavorite(recipe)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <svg
                          className={`w-6 h-6 ${isFavorite(recipe.id) ? 'text-red-500' : 'text-gray-400'}`}
                          fill={isFavorite(recipe.id) ? 'currentColor' : 'none'}
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
            )}
          </>
        )}
      </div>
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
};

export default Recipes;
