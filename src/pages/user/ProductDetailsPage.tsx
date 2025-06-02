import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase, Product, formatPrice } from '../../lib/supabase';
import { useStore } from '../../store/store';
import { 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus, 
  Loader,
  ArrowLeft 
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore((state) => state.addToCart);
  const openCart = useStore((state) => state.openCart);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data as Product);
    } catch (error: any) {
      toast.error('Failed to load product');
      navigate('/products');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(10, value)));
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    toast.success('Added to cart');
    openCart();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link 
            to="/products" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Image Gallery */}
              <div className="relative">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </motion.div>

                {/* Image Navigation */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
                  <button
                    onClick={handlePreviousImage}
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-600" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex justify-center mt-4 space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex
                          ? 'bg-primary-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                <div className="mb-6">
                  <p className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Including VAT
                  </p>
                </div>

                <p className="text-gray-600 mb-8">
                  {product.description}
                </p>

                <div className="space-y-6">
                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="p-2 border rounded-md hover:bg-gray-50"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-2 border rounded-md hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Product Information
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Category: {product.category}</p>
                    <p>Product ID: {product.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;