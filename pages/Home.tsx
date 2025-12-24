import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Clock, ShieldCheck, Package } from 'lucide-react';
import Button from '../components/Button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://picsum.photos/1920/1080?grayscale&blur=2" 
            alt="Logistics warehouse" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Global Shipping, <br/>
              <span className="text-brand-500">Simplified.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl">
              Reliable logistics solutions for businesses and individuals. 
              Track your shipments in real-time and get instant quotes for worldwide delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/track">
                <Button variant="accent" size="lg" className="w-full sm:w-auto gap-2">
                  <Package size={20} />
                  Track Shipment
                </Button>
              </Link>
              <Link to="/quote">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-900">
                  Shipping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose FastDrop?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We leverage cutting-edge technology and a vast global network to ensure your goods arrive safely and on time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-xl hover:shadow-lg transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Global Network</h3>
              <p className="text-slate-600">
                Seamless shipping to over 200 countries and territories worldwide with customs expertise.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl hover:shadow-lg transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Express Delivery</h3>
              <p className="text-slate-600">
                Time-critical solutions including next-day and same-day delivery options for urgent shipments.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl hover:shadow-lg transition-shadow border border-slate-100">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Secure & Insured</h3>
              <p className="text-slate-600">
                Full insurance coverage and real-time security monitoring for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Ready to ship?</h2>
            <p className="text-brand-100 text-lg">Get a competitive quote in seconds or speak to our experts.</p>
          </div>
          <div className="flex gap-4">
             <Link to="/quote">
                <Button variant="accent" size="lg" className="shadow-lg">
                  Shipping <ArrowRight size={18} className="ml-2" />
                </Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;