import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';

const Recettes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          // If rate limited, wait and retry
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={recipe.thumbnail_url} 
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{recipe.name}</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {recipe.description ? recipe.description.slice(0, 100) + '...' : 'Pas de description disponible'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {recipe.total_time_minutes || '30'} minutes
                    </span>
                    <button className="px-4 py-2 bg-recipe-500 text-white rounded-lg hover:bg-recipe-600 transition-colors">
                      Voir la recette
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recettes;
