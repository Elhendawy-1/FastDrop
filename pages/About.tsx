import React from 'react';
import { Users, Award, TrendingUp, Target } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Users size={32} />,
      title: 'Customer First',
      description: 'We succeed when our customers succeed. Your timeline is our priority.'
    },
    {
      icon: <Award size={32} />,
      title: 'Excellence',
      description: 'We hold ourselves to the highest standards of operational quality.'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Innovation',
      description: 'Constantly evolving our technology to serve you better and faster.'
    },
    {
      icon: <Target size={32} />,
      title: 'Integrity',
      description: 'Transparent pricing, honest communication, and ethical practices.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-800 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-600 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">About FastDrop</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We are more than just a shipping company. We are your strategic partner in global trade, committed to connecting the world through efficient logistics.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-brand-600 mb-2">15+</div>
              <div className="text-slate-600 text-sm font-semibold uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="p-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-brand-600 mb-2">2M+</div>
              <div className="text-slate-600 text-sm font-semibold uppercase tracking-wider">Parcels Delivered</div>
            </div>
            <div className="p-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-brand-600 mb-2">200+</div>
              <div className="text-slate-600 text-sm font-semibold uppercase tracking-wider">Countries Served</div>
            </div>
            <div className="p-4">
              <div className="text-4xl lg:text-5xl font-extrabold text-brand-600 mb-2">500+</div>
              <div className="text-slate-600 text-sm font-semibold uppercase tracking-wider">Team Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-brand-50 text-brand-700 font-semibold rounded-full text-sm mb-4">Our History</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Building the Future of Logistics</h2>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                Founded in 2008, FastDrop began with a single truck and a vision: to simplify the complex world of shipping for small businesses.
              </p>
              <p>
                Over the past decade, we've grown into a global logistics powerhouse, leveraging technology to provide transparency and reliability that the industry lacked. We believe that distance shouldn't be a barrier to opportunity.
              </p>
              <p>
                Today, we operate in major hubs across Asia, Europe, and the Americas, helping thousands of businesses scale their operations through seamless supply chain management.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
             <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
             <img 
               src="https://picsum.photos/800/1000?grayscale" 
               alt="Team working in warehouse" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-slate-50 py-24 relative">
         {/* Decorative background shape */}
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every package we deliver.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="w-16 h-16 bg-slate-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 shadow-inner group-hover:shadow-lg group-hover:shadow-brand-500/30">
                  {value.icon}
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;