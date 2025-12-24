import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Scale, Clock, DollarSign, Truck, Plane, Ship, Package, ArrowRight, Loader2, ChevronDown, CheckCircle, Copy, Check, Info } from 'lucide-react';
import Button from '../components/Button';
import { Link, useLocation } from 'react-router-dom';

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

const Quote: React.FC = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    serviceType: 'Ground Shipping'
  });

  const [estimate, setEstimate] = useState<{ cost: number; days: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [generatedTrackingId, setGeneratedTrackingId] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const serviceOptions = [
    { value: 'Ground Shipping', label: 'Ground Shipping', icon: Truck },
    { value: 'Air Freight', label: 'Air Freight', icon: Plane },
    { value: 'Ocean Freight', label: 'Ocean Freight', icon: Ship },
    { value: 'Express Courier', label: 'Express Courier', icon: Clock },
  ];

  // Handle incoming service type from Services page
  useEffect(() => {
    if (location.state && location.state.serviceType) {
      const incomingType = location.state.serviceType;
      
      // Map incoming service names to available options
      let matchedType = 'Ground Shipping';
      
      if (serviceOptions.some(opt => opt.value === incomingType)) {
        matchedType = incomingType;
      } else if (incomingType === 'Cross-Border E-commerce') {
        matchedType = 'Express Courier';
      } else if (incomingType === 'Project Cargo') {
        matchedType = 'Ocean Freight';
      }
      
      setFormData(prev => ({ ...prev, serviceType: matchedType }));
    }
  }, [location.state]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (estimate) {
      setEstimate(null);
      setBookingStatus('idle');
    }
  };

  const handleServiceSelect = (value: string) => {
    setFormData(prev => ({ ...prev, serviceType: value }));
    setIsDropdownOpen(false);
    if (estimate) {
      setEstimate(null);
      setBookingStatus('idle');
    }
  };

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBookingStatus('idle');

    setTimeout(() => {
      const weight = parseFloat(formData.weight) || 1;
      let baseRate = 25;
      let multiplier = 1;
      let deliveryDays = '5-7 business days';

      switch (formData.serviceType) {
        case 'Air Freight':
          baseRate = 80;
          multiplier = 5;
          deliveryDays = '1-3 business days';
          break;
        case 'Ocean Freight':
          baseRate = 40;
          multiplier = 1.5;
          deliveryDays = '20-30 business days';
          break;
        case 'Express Courier':
          baseRate = 45;
          multiplier = 8;
          deliveryDays = '1-2 business days';
          break;
        case 'Ground Shipping':
        default:
          baseRate = 20;
          multiplier = 2;
          deliveryDays = '5-7 business days';
          break;
      }

      const calculatedCost = Math.round(baseRate + (weight * multiplier));

      setEstimate({
        cost: calculatedCost,
        days: deliveryDays
      });
      setLoading(false);
    }, 800);
  };

  const handleBookShipment = () => {
    setBookingStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      // Generate a random tracking ID (e.g., FD123456789)
      const randomId = 'FD' + Math.floor(100000000 + Math.random() * 900000000).toString();
      
      // Store shipment details in localStorage so Tracking page can find them
      try {
        const shipmentData = {
          id: randomId,
          origin: formData.origin,
          destination: formData.destination,
          serviceType: formData.serviceType,
          weight: formData.weight,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(`shipment_${randomId}`, JSON.stringify(shipmentData));
      } catch (err) {
        console.error("Failed to save shipment to local storage", err);
      }

      setGeneratedTrackingId(randomId);
      setBookingStatus('success');
      setIsCopied(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTrackingId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setEstimate(null);
    setBookingStatus('idle');
    setFormData(prev => ({ ...prev, weight: '' }));
    setGeneratedTrackingId('');
    setIsCopied(false);
  };

  const formatTrackingId = (id: string) => {
    // Splits FD123456789 into FD 123 456 789 for better readability
    if (!id) return '';
    return id.replace(/([A-Z]+)(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  };

  const inputClasses = "w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-sm";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";
  const iconClasses = "absolute left-3 top-3.5 text-slate-400 w-5 h-5";

  const selectedService = serviceOptions.find(opt => opt.value === formData.serviceType) || serviceOptions[0];

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Shipping</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Get an instant estimate for your shipment. Enter your details below and we'll calculate the best rate and timeline for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Calculator Form */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-soft p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Package className="text-brand-600" size={24} />
              Shipment Details
            </h2>
            
            <form onSubmit={calculateEstimate} className="space-y-6">
              
              {/* Datalist for Places */}
              <datalist id="places">
                {countries.map((country) => (
                  <option key={country} value={country} />
                ))}
              </datalist>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>From (Origin)</label>
                  <div className="relative group">
                    <MapPin className={iconClasses} />
                    <input
                      required
                      type="text"
                      name="origin"
                      list="places"
                      value={formData.origin}
                      onChange={handleInputChange}
                      className={`${inputClasses} pr-10`}
                      placeholder="e.g. United States"
                    />
                     <ChevronDown className="absolute right-3 top-3.5 text-slate-400 w-5 h-5 pointer-events-none transition-colors duration-300 group-hover:text-slate-600 peer-focus:text-brand-600" />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>To (Destination)</label>
                  <div className="relative group">
                    <MapPin className={iconClasses} />
                    <input
                      required
                      type="text"
                      name="destination"
                      list="places"
                      value={formData.destination}
                      onChange={handleInputChange}
                      className={`${inputClasses} pr-10`}
                      placeholder="e.g. United Kingdom"
                    />
                    <ChevronDown className="absolute right-3 top-3.5 text-slate-400 w-5 h-5 pointer-events-none transition-colors duration-300 group-hover:text-slate-600 peer-focus:text-brand-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Weight (kg)</label>
                  <div className="relative">
                    <Scale className={iconClasses} />
                    <input
                      required
                      type="number"
                      min="0.1"
                      step="0.1"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="e.g. 5.5"
                    />
                  </div>
                </div>

                {/* Custom Modern Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <label className={labelClasses}>Service Type</label>
                  <div 
                    className={`${inputClasses} cursor-pointer flex items-center justify-between pr-3 group`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="flex items-center gap-2 -ml-1">
                      <selectedService.icon className="text-brand-600 w-5 h-5" />
                      <span className="text-slate-900">{selectedService.label}</span>
                    </div>
                    <ChevronDown 
                        size={20} 
                        className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-brand-600' : 'group-hover:text-slate-600'}`} 
                    />
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden animate-fade-in max-h-60 overflow-y-auto">
                      {serviceOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${formData.serviceType === option.value ? 'bg-brand-50 text-brand-700' : 'text-slate-700'}`}
                          onClick={() => handleServiceSelect(option.value)}
                        >
                          <option.icon size={18} className={formData.serviceType === option.value ? 'text-brand-600' : 'text-slate-400'} />
                          <span className="font-medium">{option.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg" 
                  className="py-4 text-lg bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/20"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={20} /> Calculating...
                    </span>
                  ) : 'Calculate Rate'}
                </Button>
              </div>
            </form>
          </div>

          {/* Results Card */}
          <div className="md:col-span-1">
            <div className={`bg-white rounded-2xl border border-slate-200 shadow-soft p-6 h-fit transition-all duration-500 ${estimate ? 'opacity-100 translate-y-0' : 'opacity-50 grayscale'}`}>
              <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Shipping</h3>
              
              {estimate ? (
                <div className="space-y-8 animate-fade-in">
                  
                  {bookingStatus === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in">
                      <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4 shadow-sm border border-green-100">
                        <CheckCircle size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Shipment Booked!</h3>
                      <p className="text-slate-600 text-sm mb-6">Your order has been placed successfully.</p>
                      
                      {/* Tracking ID Display */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl w-full mb-6 relative overflow-hidden group hover:border-brand-300 transition-colors duration-300">
                          <div className="p-5">
                              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1">
                                Your Tracking Number
                              </p>
                              <div className="flex flex-col gap-3">
                                  <div className="w-full bg-white border-2 border-dashed border-slate-300 rounded-lg p-3 text-center transition-colors group-hover:border-brand-300">
                                      <span className="font-mono text-xl sm:text-2xl font-bold text-slate-800 tracking-wider select-all break-all">
                                          {formatTrackingId(generatedTrackingId)}
                                      </span>
                                  </div>
                                  
                                  <button 
                                      onClick={handleCopy}
                                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1
                                          ${isCopied 
                                              ? 'bg-green-500 text-white ring-green-500 hover:bg-green-600' 
                                              : 'bg-brand-600 text-white hover:bg-brand-700 ring-brand-500 shadow-brand-500/20'
                                          }`}
                                  >
                                      {isCopied ? <Check size={18} strokeWidth={3} /> : <Copy size={18} />}
                                      <span>{isCopied ? 'Copied to Clipboard' : 'Copy Tracking ID'}</span>
                                  </button>
                              </div>
                          </div>

                          <div className="bg-slate-100 px-5 py-2.5 border-t border-slate-200 flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 font-medium">
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                              Active & Ready to Track
                          </div>
                      </div>

                      <div className="space-y-3 w-full">
                          <Link to={`/track?id=${generatedTrackingId}`} className="block w-full">
                            <Button variant="outline" fullWidth className="gap-2 border-slate-200 hover:border-brand-600 hover:text-brand-600 text-slate-700">
                                Track Shipment <ArrowRight size={16} />
                            </Button>
                          </Link>
                          <Button onClick={handleReset} variant="ghost" fullWidth className="text-slate-500 hover:text-slate-800">
                              Book Another
                          </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <DollarSign size={18} />
                          <span className="text-sm font-medium uppercase tracking-wide">Estimated Cost</span>
                        </div>
                        <div className="text-4xl font-extrabold text-brand-600">
                          ${estimate.cost}<span className="text-lg text-slate-400 font-normal">.00</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">*Taxes and fees included</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <Clock size={18} />
                          <span className="text-sm font-medium uppercase tracking-wide">Expected Timeline</span>
                        </div>
                        <div className="text-xl font-bold text-slate-800">
                          {estimate.days}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <Button 
                          fullWidth 
                          variant="accent" 
                          className="gap-2"
                          onClick={handleBookShipment}
                          disabled={bookingStatus === 'loading'}
                        >
                          {bookingStatus === 'loading' ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="animate-spin" size={16} /> Processing...
                            </span>
                          ) : (
                            <>
                              Book Shipment <ArrowRight size={16} />
                            </>
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-slate-400">
                  <Package size={48} className="mb-4 opacity-20" />
                  <p className="text-sm">Enter shipment details to see your estimated rate and timeline.</p>
                </div>
              )}
            </div>
            
            {/* Service Info Helpers */}
            <div className="mt-6 space-y-3">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                <Plane className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm">Air Freight</h4>
                  <p className="text-blue-700 text-xs mt-1">Fastest option for urgent cargo.</p>
                </div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-3">
                <Ship className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                <div>
                  <h4 className="font-bold text-emerald-900 text-sm">Ocean Freight</h4>
                  <p className="text-emerald-700 text-xs mt-1">Best value for large bulk shipments.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Quote;