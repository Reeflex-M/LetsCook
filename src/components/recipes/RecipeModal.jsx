import React, { useState, useEffect } from 'react';

const RecipeModal = ({ recipe, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  // Load comments from localStorage on mount
  useEffect(() => {
    const storedComments = localStorage.getItem(`recipe-comments-${recipe.id}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [recipe.id]);

  // Save comments to localStorage when they change
  const saveComments = (updatedComments) => {
    localStorage.setItem(`recipe-comments-${recipe.id}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      text: newComment,
      author: 'You',
      date: new Date().toISOString()
    };
    
    const updatedComments = [...comments, comment];
    saveComments(updatedComments);
    setNewComment('');
  };

  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="absolute top-4 right-4 flex gap-2">
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
                <span className="block text-gray-500 text-sm">Time</span>
                <span className="font-semibold">{recipe.total_time_minutes || '30'} min</span>
              </div>
              <div className="text-center">
                <span className="block text-gray-500 text-sm">Servings</span>
                <span className="font-semibold">{recipe.num_servings || '4'}</span>
              </div>
              <div className="text-center">
                <span className="block text-gray-500 text-sm">Difficulty</span>
                <span className="font-semibold">{recipe.difficulty || 'Easy'}</span>
              </div>
            </div>

            {recipe.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{recipe.description}</p>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
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
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Nutritional Information</h3>
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

            {/* User Comments/Tips Section */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">User Tips & Comments</h3>
              
              {/* Comment List */}
              <div className="space-y-4 mb-6">
                {comments.length === 0 ? (
                  <p className="text-gray-500 italic">No tips yet. Be the first to share your experience!</p>
                ) : (
                  comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">{comment.author}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
              
              {/* Comment Form */}
              <form onSubmit={handleAddComment} className="mt-4">
                <div className="mb-3">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Add your tip or comment
                  </label>
                  <textarea
                    id="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Share your experience or tips for this recipe..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
