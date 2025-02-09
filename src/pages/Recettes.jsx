import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import RecipeModal from '../components/recipes/RecipeModal';
import useFavorites from '../hooks/useFavorites';

const Recettes = () => {
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
          setError('Erreur d\'authentification - Vérifiez votre clé API dans le fichier .env');
        } else if (error.response?.status === 429) {
          setError('Trop de requêtes - Veuillez réessayer dans quelques minutes');
        } else {
          setError('Une erreur est survenue lors du chargement des recettes');
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
            <p className="font-bold">Erreur de Configuration</p>
            <p>La clé API RapidAPI n'est pas configurée. Veuillez ajouter votre clé dans le fichier .env :</p>
            <pre className="mt-2 bg-red-50 p-2 rounded">VITE_RAPIDAPI_KEY=votre_clé_api_ici</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Recettes</h1>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Erreur</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher par nom ou ingrédient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-recipe-500 focus:border-transparent"
                />
              </div>
              <div className="sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-recipe-500 focus:border-transparent"
                >
                  <option value="name">Trier par nom</option>
                  <option value="ingredients">Trier par nombre d'ingrédients</option>
                </select>
              </div>
            </div>

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
                      {recipe.description ? recipe.description.slice(0, 100) + '...' : 'Pas de description disponible'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {recipe.total_time_minutes || '30'} minutes
                      </span>
                      <button 
                        onClick={() => setSelectedRecipe(recipe)}
                        className="px-4 py-2 bg-recipe-500 text-white rounded-lg hover:bg-recipe-600 transition-colors"
                      >
                        Voir la recette
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
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isFavorite={isFavorite(selectedRecipe.id)}
          onToggleFavorite={() => 
            isFavorite(selectedRecipe.id) 
              ? removeFavorite(selectedRecipe.id) 
              : addFavorite(selectedRecipe)
          }
        />
      )}
    </div>
  );
};

export default Recettes;
