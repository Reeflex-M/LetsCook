import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import KebabModel from '../3d/KebabModel';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-[calc(100vh-2rem)] overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Three.js Scene */}
      <div className="absolute inset-0" style={{ height: 'calc(100vh - 2rem)' }}>
        <div className="w-full h-full">
          <KebabModel />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            Discover the Art of Cooking
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Explore unique recipes, share your creations and join a passionate cooking community
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => navigate('/recipes')}
              className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105"
            >
              Explore Recipes
            </button>
            <button 
              onClick={() => navigate('/favorites')}
              className="px-8 py-3 bg-white text-orange-500 rounded-lg border-2 border-orange-500 hover:bg-orange-50 transition-colors duration-300 transform hover:scale-105"
            >
              My Favorites
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-10 left-10"
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="w-16 h-16 bg-orange-200 rounded-full opacity-50" />
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-10"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="w-20 h-20 bg-orange-300 rounded-full opacity-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
