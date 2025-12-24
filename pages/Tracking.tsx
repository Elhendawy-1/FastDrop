import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Truck, CheckCircle, AlertCircle, Package } from 'lucide-react';
import Button from '../components/Button';
import { ShipmentData, TrackingStatus } from '../types';
import { useSearchParams } from 'react-router-dom';

const CITIES = [
  "New York, USA", "Shanghai, CN", "London, UK", "Tokyo, JP", "Dubai, UAE",
  "Los Angeles, USA", "Singapore, SG", "Hamburg, DE", "Rotterdam, NL", "Mumbai, IN",
  "Sydney, AU", "Toronto, CA", "Paris, FR", "Hong Kong, HK", "Sao Paulo, BR",
  "Berlin, DE", "Madrid, ES", "Rome, IT", "Beijing, CN", "Seoul, KR",
  "Cairo, EG", "Cape Town, ZA", "Mexico City, MX", "Buenos Aires, AR", "Istanbul, TR"
];

const LOCATIONS = [
  "International Logistics Hub", "Central Distribution Center", "Port Authority Terminal", 
  "Cargo Facility A", "Regional Sortation Center", "Customs Clearance Zone", "Pacific Ocean", "Atlantic Ocean"
];

const Tracking: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [searchParams] = useSearchParams();

  const mockTrackShipment = (id: string) => {
    setLoading(true);
    setError('');
    setShipment(null);

    // Simulate API delay
    setTimeout(() => {
      const cleanId = id.trim();

      if (!cleanId) {
        setError('Please enter a tracking number.');
        setLoading(false);
        return;
      }

      if (cleanId.length < 5) {
        setError('Invalid tracking number. Please check and try again.');
        setLoading(false);
        return;
      }

      // 1. Try to fetch from LocalStorage (for user-created shipments)
      const storedDataStr = localStorage.getItem(`shipment_${cleanId}`);
      let storedData = null;
      if (storedDataStr) {
          try {
              storedData = JSON.parse(storedDataStr);
          } catch(e) {
              console.error("Failed to parse stored shipment", e);
          }
      }

      // 2. Pseudo-random generation (for dates/history/fallback)
      const seed = cleanId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      const seededRandom = (offset: number) => {
        const x = Math.sin(seed + offset) * 10000;
        return x - Math.floor(x);
      };

      const getIndex = (max: number, offset: number) => Math.floor(seededRandom(offset) * max);
      const getInt = (min: number, max: number, offset: number) => Math.floor(seededRandom(offset) * (max - min + 1)) + min;
      
      // Determine Origin & Destination
      let origin: string;
      let destination: string;

      if (storedData) {
          // Use stored data if available (User entered)
          origin = storedData.origin || CITIES[getIndex(CITIES.length, 0)];
          destination = storedData.destination || CITIES[getIndex(CITIES.length, 7)];
      } else {
          // Fallback to random logic
          origin = CITIES[getIndex(CITIES.length, 0)];
          let destIndex = getIndex(CITIES.length, 7); 
          if (CITIES[destIndex] === origin) destIndex = (destIndex + 1) % CITIES.length;
          destination = CITIES[destIndex];
      }

      const transitLocation = LOCATIONS[getIndex(LOCATIONS.length, 3)];
      
      // Extract city name for "Port of [City]" logic safely
      const originCity = origin.includes(',') ? origin.split(',')[0] : origin;

      // Date Generation Logic: Start randomly after April 1, 2026
      const startDateBase = new Date(2026, 3, 1); // April 1, 2026
      
      // Order placed 1-50 days after April 1st
      const orderDate = new Date(startDateBase);
      orderDate.setDate(orderDate.getDate() + getInt(1, 50, 10));
      orderDate.setHours(getInt(8, 17, 11), getInt(0, 59, 12));

      // Picked up 1-2 days later
      const pickupDate = new Date(orderDate);
      pickupDate.setDate(pickupDate.getDate() + getInt(1, 2, 20));
      pickupDate.setHours(getInt(9, 19, 21), getInt(0, 59, 22));

      // In transit 1-5 days later
      const transitDate = new Date(pickupDate);
      transitDate.setDate(transitDate.getDate() + getInt(1, 5, 30));
      transitDate.setHours(getInt(6, 23, 31), getInt(0, 59, 32));

      // Delivery estimated 3-14 days after transit start
      const deliveryDate = new Date(transitDate);
      deliveryDate.setDate(deliveryDate.getDate() + getInt(3, 14, 40));

      // Date Formatter
      const formatDate = (date: Date, includeTime = true) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        
        if (!includeTime) return `${month} ${day}, ${year}`;

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        
        return `${month} ${day}, ${year} - ${hours}:${minutes} ${ampm}`;
      };

      // Mock Data Response
      const mockData: ShipmentData = {
        trackingNumber: cleanId.toUpperCase(),
        estimatedDelivery: formatDate(deliveryDate, false),
        currentStatus: TrackingStatus.IN_TRANSIT,
        origin: origin,
        destination: destination,
        history: [
          {
            status: TrackingStatus.IN_TRANSIT,
            date: formatDate(transitDate),
            location: transitLocation,
            description: 'Vessel en route to destination port.'
          },
          {
            status: TrackingStatus.PICKED_UP,
            date: formatDate(pickupDate),
            location: `${originCity} Port Area`,
            description: 'Cargo loaded onto vessel.'
          },
          {
            status: TrackingStatus.ORDER_PLACED,
            date: formatDate(orderDate),
            location: origin,
            description: 'Shipment info received. Carrier picked up package.'
          }
        ]
      };

      setShipment(mockData);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setTrackingId(idFromUrl);
      mockTrackShipment(idFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mockTrackShipment(trackingId);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Track Your Shipment</h1>
          <p className="text-slate-600">Enter your tracking ID to see the real-time status of your package.</p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-shadow"
                placeholder="Enter Tracking ID (e.g., TRK123456789)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading} size="lg" className="sm:w-auto w-full">
              {loading ? 'Tracking...' : 'Track'}
            </Button>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {shipment && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Tracking Number</p>
                <h2 className="text-2xl font-bold tracking-wide">{shipment.trackingNumber}</h2>
              </div>
              <div className="bg-brand-600 px-4 py-2 rounded-lg flex items-center gap-2">
                <Truck size={20} />
                <span className="font-semibold">{shipment.currentStatus}</span>
              </div>
            </div>

            {/* Overview */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-100">
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-500 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Origin</p>
                  <p className="font-semibold text-slate-900">{shipment.origin}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-500 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Destination</p>
                  <p className="font-semibold text-slate-900">{shipment.destination}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="text-brand-500 mt-1" />
                <div>
                  <p className="text-sm text-slate-500">Estimated Delivery</p>
                  <p className="font-semibold text-slate-900">{shipment.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6 md:p-8 bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900 mb-6">Shipment History</h3>
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-3 top-2 bottom-4 w-0.5 bg-slate-300"></div>

                <div className="space-y-8">
                  {shipment.history.map((event, index) => (
                    <div key={index} className="relative flex items-start gap-6 group">
                      {/* Dot */}
                      <div className={`absolute left-0 mt-1.5 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center z-10 ${index === 0 ? 'bg-brand-600 shadow-md ring-2 ring-brand-100' : 'bg-slate-400'}`}>
                        {index === 0 && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>

                      {/* Content */}
                      <div className="pl-10 flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                          <h4 className={`font-bold ${index === 0 ? 'text-brand-700' : 'text-slate-700'}`}>
                            {event.status}
                          </h4>
                          <span className="text-sm text-slate-500 font-medium">{event.date}</span>
                        </div>
                        <p className="text-slate-600 text-sm mb-1">{event.location}</p>
                        <p className="text-slate-500 text-sm italic">{event.description}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Start Point */}
                  <div className="relative flex items-start gap-6">
                    <div className="absolute left-0 mt-1.5 w-6 h-6 rounded-full bg-slate-300 border-4 border-white z-10"></div>
                    <div className="pl-10 pt-1">
                      <span className="text-sm text-slate-400 uppercase tracking-wide font-semibold">Start of Shipment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;