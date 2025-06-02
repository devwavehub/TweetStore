import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase, Product, formatPrice } from '../../lib/supabase';
import { useStore } from '../../store/store';
import { ShoppingCart, Loader, Filter, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const addToCart = useStore((state) => state.addToCart);
  const openCart = useStore((state) => state.openCart);
  const navigate = useNavigate();

  const currentCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    fetchProducts();
  }, [currentCategory]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let query = supabase.from('products').select('*');
      
      if (currentCategory !== 'all') {
        query = query.eq('category', currentCategory);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      setProducts(data as Product[]);
    } catch (error: any) {
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSearchParams({ category });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent navigation when clicking the cart button
    addToCart(product, 1);
    toast.success('Added to cart');
    openCart();
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Our Products</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of quality phones, laptops, and accessories
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            {/* Categories */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex space-x-2">
                {['all', 'Phones', 'Laptops', 'Accessories'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category === 'all' ? 'All Products' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="aspect-w-4 aspect-h-3 bg-gray-200 relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-primary-50 transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5 text-primary-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="font-bold text-lg">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;