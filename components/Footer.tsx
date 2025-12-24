import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Truck size={24} className="text-brand-500" />
              <span className="font-bold text-xl">FastDrop</span>
            </div>
            <p className="text-sm text-slate-400">
              Delivering excellence across the globe. Fast, reliable, and secure shipping solutions for businesses and individuals.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/omar.elhendawy.420817/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              {/* X Logo SVG */}
              <a href="https://x.com/Omar_Elhendawy_" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/omar-elhendawy-6055b038a" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="https://www.instagram.com/_omar_elhendawy_" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-brand-500 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-brand-500 transition-colors">Services</Link></li>
              <li><Link to="/track" className="hover:text-brand-500 transition-colors">Track Shipment</Link></li>
              <li><Link to="/quote" className="hover:text-brand-500 transition-colors">Shipping</Link></li>
              <li><Link to="/about" className="hover:text-brand-500 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:text-brand-500 transition-colors">International Shipping</Link></li>
              <li><Link to="/services" className="hover:text-brand-500 transition-colors">Domestic Freight</Link></li>
              <li><Link to="/services" className="hover:text-brand-500 transition-colors">Express Delivery</Link></li>
              <li><Link to="/services" className="hover:text-brand-500 transition-colors">Warehousing</Link></li>
              <li><Link to="/services" className="hover:text-brand-500 transition-colors">Customs Brokerage</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-500 flex-shrink-0 mt-1" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=123+Logistics+Way+San+Francisco+CA+94105" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-brand-500 transition-colors"
                >
                  <span>123 Logistics Way,<br />San Francisco, CA 94105</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-brand-500 flex-shrink-0" />
                <a href="tel:01026019544" className="hover:text-brand-500 transition-colors">
                  <span>01026019544</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-500 flex-shrink-0" />
                <a href="mailto:omarelhendawy732@gmail.com" className="hover:text-brand-500 transition-colors">
                  <span>omarelhendawy732@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} FastDrop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;