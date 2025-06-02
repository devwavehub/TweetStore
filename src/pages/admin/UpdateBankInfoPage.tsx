import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { 
  CreditCard, 
  Loader,
  Save,
  AlertCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';

const UpdateBankInfoPage = () => {
  const [bankInfo, setBankInfo] = useState({
    bank_name: '',
    account_number: '',
    account_holder_name: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchBankInfo();
  }, []);

  const fetchBankInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_details')
        .select('*')
        .single();

      if (error) throw error;
      if (data) {
        setBankInfo({
          bank_name: data.bank_name,
          account_number: data.account_number,
          account_holder_name: data.account_holder_name
        });
      }
    } catch (error) {
      toast.error('Failed to load bank information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('payment_details')
        .update({
          bank_name: bankInfo.bank_name,
          account_number: bankInfo.account_number,
          account_holder_name: bankInfo.account_holder_name
        })
        .eq('id', 1); // Assuming there's only one record

      if (error) throw error;
      toast.success('Bank information updated successfully');
    } catch (error) {
      toast.error('Failed to update bank information');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Update Bank Information</h1>

      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center mb-6">
            <CreditCard className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold">Bank Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="bank_name" className="form-label">
                Bank Name
              </label>
              <input
                type="text"
                id="bank_name"
                value={bankInfo.bank_name}
                onChange={(e) => setBankInfo({ ...bankInfo, bank_name: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="account_number" className="form-label">
                Account Number
              </label>
              <input
                type="text"
                id="account_number"
                value={bankInfo.account_number}
                onChange={(e) => setBankInfo({ ...bankInfo, account_number: e.target.value })}
                className="form-input"
                required
                pattern="[0-9]*"
                maxLength={10}
              />
            </div>

            <div>
              <label htmlFor="account_holder_name" className="form-label">
                Account Holder Name
              </label>
              <input
                type="text"
                id="account_holder_name"
                value={bankInfo.account_holder_name}
                onChange={(e) => setBankInfo({ ...bankInfo, account_holder_name: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <p className="text-sm text-yellow-700">
                Make sure to verify the bank details carefully. This information will be shown to customers during checkout.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-primary flex items-center"
              >
                {isSaving ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateBankInfoPage;