import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Laptop, 
  Settings, 
  ShoppingBag,
  CheckCircle,
  Headphones,
  Clock,
  ChevronRight
} from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Shop Smarter. Repair Faster. Live Better.
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Premium phones, laptops, accessories, and expert repair services - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/products" 
                className="btn btn-primary text-lg px-8 py-3 flex items-center justify-center"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
              <Link 
                to="/booking" 
                className="btn btn-outline border-white text-gray hover:bg-white hover:text-gray-10000 text-lg px-8 py-3 flex items-center justify-center"
              >
                <Settings className="mr-2 h-5 w-5" />
                Book Repairs/Setup
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of products from top brands at competitive prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phones Category */}
            <motion.div 
              className="card group relative overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary-600/80 to-primary-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg" 
                  alt="Smartphones" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 relative z-10">
                <Smartphone className="h-10 w-10 text-primary-600 mb-3 group-hover:text-white transition-colors" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">Smartphones</h3>
                <p className="text-gray-600 mb-4 group-hover:text-white/90 transition-colors">
                  Latest models with amazing features at affordable prices.
                </p>
                <Link 
                  to="/products?category=Phones" 
                  className="inline-flex items-center font-medium text-primary-600 group-hover:text-white transition-colors"
                >
                  Explore Products
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Laptops Category */}
            <motion.div 
              className="card group relative overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-secondary-600/80 to-secondary-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/18105/pexels-photo.jpg" 
                  alt="Laptops" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 relative z-10">
                <Laptop className="h-10 w-10 text-secondary-600 mb-3 group-hover:text-white transition-colors" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">Laptops</h3>
                <p className="text-gray-600 mb-4 group-hover:text-white/90 transition-colors">
                  Powerful laptops for work, gaming, and everyday use.
                </p>
                <Link 
                  to="/products?category=Laptops" 
                  className="inline-flex items-center font-medium text-secondary-600 group-hover:text-white transition-colors"
                >
                  Explore Products
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Accessories Category */}
            <motion.div 
              className="card group relative overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent-600/80 to-accent-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                <img 
                  src="https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg" 
                  alt="Accessories" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 relative z-10">
                <Headphones className="h-10 w-10 text-accent-600 mb-3 group-hover:text-white transition-colors" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">Accessories</h3>
                <p className="text-gray-600 mb-4 group-hover:text-white/90 transition-colors">
                  Quality accessories to enhance your tech experience.
                </p>
                <Link 
                  to="/products?category=Accessories" 
                  className="inline-flex items-center font-medium text-accent-600 group-hover:text-white transition-colors"
                >
                  Explore Products
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional repair services and tech solutions by certified experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phone Repairs */}
            <motion.div 
              className="card p-6 border border-gray-200"
              whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Smartphone className="h-8 w-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone Repairs</h3>
                  <p className="text-gray-600 mb-4">
                    Screen replacements, battery swaps, software issues, and more - we fix all mobile phone problems.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
                      <span>Screen replacements</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
                      <span>Battery replacements</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />
                      <span>Software troubleshooting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Laptop Repairs */}
            <motion.div 
              className="card p-6 border border-gray-200"
              whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-secondary-100 p-3 rounded-lg">
                  <Laptop className="h-8 w-8 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Laptop Repairs</h3>
                  <p className="text-gray-600 mb-4">
                    Expert laptop repair services for all brands, including hardware and software solutions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary-600 mr-2" />
                      <span>Hardware repairs</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary-600 mr-2" />
                      <span>Software installations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-secondary-600 mr-2" />
                      <span>Performance optimization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Office Setup */}
            <motion.div 
              className="card p-6 border border-gray-200"
              whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-accent-100 p-3 rounded-lg">
                  <Settings className="h-8 w-8 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Office Setup</h3>
                  <p className="text-gray-600 mb-4">
                    Complete office technology setup and management services for businesses.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-accent-600 mr-2" />
                      <span>Computer networking</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-accent-600 mr-2" />
                      <span>Printer configurations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-accent-600 mr-2" />
                      <span>Software setup</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Technical Support */}
            <motion.div 
              className="card p-6 border border-gray-200"
              whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Headphones className="h-8 w-8 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
                  <p className="text-gray-600 mb-4">
                    Remote and on-site technical support for all your technology needs.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-gray-700 mr-2" />
                      <span>Troubleshooting</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-gray-700 mr-2" />
                      <span>System updates</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-gray-700 mr-2" />
                      <span>Security solutions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/booking" 
              className="btn btn-primary text-lg px-8 py-3 inline-flex items-center"
            >
              Book a Service
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose NextGadgets</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We stand out with our commitment to quality, expertise, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality Products */}
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">
                We offer only genuine, high-quality products from trusted brands and manufacturers.
              </p>
            </motion.div>

            {/* Expert Technicians */}
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-secondary-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Settings className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Technicians</h3>
              <p className="text-gray-600">
                Our certified technicians have years of experience in repairing various devices.
              </p>
            </motion.div>

            {/* Fast Service */}
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-accent-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
              <p className="text-gray-600">
                Quick turnaround times for repairs and prompt delivery for your orders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero relative">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Explore our products or book a repair service today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/products" 
              className="btn btn-primary text-lg px-8 py-3 flex items-center justify-center"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
            </Link>
            <Link 
              to="/booking" 
              className="btn btn-outline border-white text-black hover:bg-white hover:text-gray-900 text-lg px-8 py-3 flex items-center justify-center"
            >
              <Settings className="mr-2 h-5 w-5" />
              Book a Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;