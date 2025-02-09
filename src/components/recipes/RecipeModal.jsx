import React from 'react';

const RecipeModal = ({ recipe, onClose, isFavorite, onToggleFavorite }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={onToggleFavorite}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            >
              <svg
                className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                fill={isFavorite ? 'currentColor' : 'none'}
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
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <img
            src={recipe.thumbnail_url}
            alt={recipe.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{recipe.name}</h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <span className="block text-gray-500 text-sm">Temps</span>
                <span className="font-semibold">{recipe.total_time_minutes || '30'} min</span>
              </div>
              <div className="text-center">
                <span className="block text-gray-500 text-sm">Portions</span>
                <span className="font-semibold">{recipe.num_servings || '4'}</span>
              </div>
              <div className="text-center">
                <span className="block text-gray-500 text-sm">Difficulté</span>
                <span className="font-semibold">{recipe.difficulty || 'Facile'}</span>
              </div>
            </div>

            {recipe.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{recipe.description}</p>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ingrédients</h3>
              <ul className="list-disc list-inside space-y-2">
                {recipe.sections?.[0]?.components?.map((component, index) => (
                  <li key={index} className="text-gray-600">
                    {component.raw_text}
                  </li>
                ))}
              </ul>
            </div>

            {recipe.instructions && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                <ol className="list-decimal list-inside space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-gray-600">
                      {instruction.display_text}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {recipe.nutrition && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Information Nutritionnelle</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(recipe.nutrition).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <span className="block text-gray-500 text-sm">{key}</span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
