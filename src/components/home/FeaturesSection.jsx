import { motion } from 'framer-motion';
import { FaUtensils, FaUsers, FaHeart, FaMedal } from 'react-icons/fa';

const features = [
  {
    icon: FaUtensils,
    title: "Exclusive Recipes",
    description: "Discover unique recipes created by passionate chefs"
  },
  {
    icon: FaHeart,
    title: "Custom Collections",
    description: "Save your favorite recipes and create your collections"
  },
  {
    icon: FaMedal,
    title: "Detailed Guides",
    description: "Follow step-by-step tutorials to perfect your dishes"
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose LetsCook?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover a new way of cooking with our intuitive platform and passionate community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-orange-50 rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-block p-3 bg-orange-500 rounded-full text-white mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
