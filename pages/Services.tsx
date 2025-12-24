import React from 'react';
import { Plane, Ship, Truck, Box, Briefcase, Globe } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Plane size={32} />,
      title: 'Air Freight',
      description: 'The fastest way to ship your goods globally. Ideal for urgent, high-value, or perishable cargo.',
      features: ['24-48 hour delivery', 'Airport-to-airport', 'Door-to-door', 'Temperature controlled']
    },
    {
      icon: <Ship size={32} />,
      title: 'Ocean Freight',
      description: 'Cost-effective solution for large shipments. Full Container Load (FCL) and Less than Container Load (LCL).',
      features: ['Global port coverage', 'Bulk cargo', 'Cost efficient', 'Eco-friendly options']
    },
    {
      icon: <Truck size={32} />,
      title: 'Ground Shipping',
      description: 'Reliable domestic and cross-border road transport network for all types of cargo.',
      features: ['FTL & LTL', 'Nationwide coverage', 'GPS tracking', 'Door-to-door']
    },
    {
      icon: <Box size={32} />,
      title: 'Warehousing',
      description: 'Secure storage solutions with advanced inventory management systems.',
      features: ['Climate control', '24/7 Security', 'Pick & Pack', 'Inventory management']
    },
    {
      icon: <Globe size={32} />,
      title: 'Cross-Border E-commerce',
      description: 'End-to-end logistics solutions for online retailers expanding globally.',
      features: ['Customs clearance', 'Last-mile delivery', 'Returns management', 'Platform integration']
    },
    {
      icon: <Briefcase size={32} />,
      title: 'Project Cargo',
      description: 'Specialized handling for oversized, heavy, or complex industrial equipment.',
      features: ['Heavy lift', 'Route planning', 'Permit handling', 'On-site supervision']
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive logistics solutions tailored to meet your unique business needs. 
            From small packages to massive industrial equipment, we handle it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 group">
              <div className="p-8">
                <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-500">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/quote" state={{ serviceType: service.title }}>
                  <Button variant="outline" fullWidth className="group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600">
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-md flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-accent-500">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Need a custom solution?</h3>
            <p className="text-slate-600">Our logistics experts can design a supply chain strategy just for you.</p>
          </div>
          <Link to="/contact">
             <Button size="lg" variant="primary">Contact Sales</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;