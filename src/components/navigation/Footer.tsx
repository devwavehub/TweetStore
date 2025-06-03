import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Mail, 
  Phone, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Twitter 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-white">
                NextGadgets NG
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Proudly serving Nigeria with quality gadgets, accessories, and trusted repair services.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/booking" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Book Repairs
                </Link>
              </li>
              <li>
                <Link 
                  to="/track-order" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400">
                    <a 
                      href="mailto:dammytechhub@gmail.com" 
                      className="hover:text-white transition-colors"
                    >
                      dammytechhub@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-400">
                    <a 
                      href="mailto:irewoledammyx@gmail.com" 
                      className="hover:text-white transition-colors"
                    >
                      irewoledammyx@gmail.com
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-gray-400" />
                <p className="text-gray-400">
                  <a 
                    href="https://wa.me/2348172452411" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp: 08172452411
                  </a>
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <p className="text-gray-400">
                  <a 
                    href="tel:+2348146314677" 
                    className="hover:text-white transition-colors"
                  >
                    Calls: 08146314677
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Dammy Tweak & Store. All rights reserved.
          </p>
          <div className="text-sm">
            {/* Hidden admin login link */}
            <Link 
              to="/admin-login" 
              className="text-gray-800 hover:text-gray-700 transition-colors"
            >
              ...
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;