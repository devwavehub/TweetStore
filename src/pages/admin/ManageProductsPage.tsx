import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, Product, formatPrice } from '../../lib/supabase';
import { 
  ShoppingBag, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Loader,
  X,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data as Product[]);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct.id) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            name: editingProduct.name,
            description: editingProduct.description,
            price: editingProduct.price,
            category: editingProduct.category,
            images: editingProduct.images
          })
          .eq('id', editingProduct.id);

        if (error) throw error;
        
        setProducts(products.map(p => 
          p.id === editingProduct.id ? { ...p, ...editingProduct } : p
        ));
        toast.success('Product updated successfully');
      } else {
        // Create new product
        const { data, error } = await supabase
          .from('products')
          .insert([editingProduct])
          .select()
          .single();

        if (error) throw error;
        
        setProducts([data as Product, ...products]);
        toast.success('Product created successfully');
      }

      setIsEditing(false);
      setEditingProduct({});
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => {
            setEditingProduct({});
            setIsEditing(true);
          }}
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 w-full md:w-64"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-input"
          >
            <option value="all">All Categories</option>
            <option value="Phones">Phones</option>
            <option value="Laptops">Laptops</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* Product Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {editingProduct.id ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  required
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="form-input"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Price (₦)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Category</label>
                  <select
                    required
                    value={editingProduct.category || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="form-input"
                  >
                    <option value="">Select Category</option>
                    <option value="Phones">Phones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Image URLs (One per line)</label>
                <textarea
                  required
                  value={editingProduct.images?.join('\n') || ''}
                  onChange={(e) => setEditingProduct({ 
                    ...editingProduct, 
                    images: e.target.value.split('\n').filter(url => url.trim())
                  })}
                  className="form-input"
                  rows={3}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct.id ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="aspect-w-4 aspect-h-3 bg-gray-200 relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="font-bold">{formatPrice(product.price)}</p>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageProductsPage;