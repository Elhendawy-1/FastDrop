import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, User, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../components/Button';

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    
    try {
      // Using FormSubmit.co for backend-less email sending
      const response = await fetch("https://formsubmit.co/ajax/omarelhendawy732@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            message: formData.message,
            _subject: `New Contact Request from ${formData.fullName}`,
            _template: "table",
            _captcha: "false" // Disables captcha for smoother experience
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ fullName: '', email: '', message: '' });
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus('error');
    }
  };

  const getInputClasses = (hasError: boolean) => `
    w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 
    focus:outline-none focus:bg-white transition-all duration-200
    ${hasError 
      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
      : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'}
  `;
  
  const labelClasses = "block text-sm font-bold text-slate-700 mb-1.5";
  const iconClasses = (hasError: boolean) => `absolute left-4 top-3.5 w-5 h-5 transition-colors duration-200 ${hasError ? 'text-red-400' : 'text-slate-400 group-focus-within:text-brand-500'}`;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Contact Us</h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our services or need a custom quote? <br className="hidden md:block"/>
            Our team is ready to provide the answers you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 h-full transform transition-all hover:shadow-2xl hover:shadow-slate-200/60 duration-300">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Send a Message</h2>
                <p className="text-slate-500 text-base md:text-lg">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>
              
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in bg-green-50/50 rounded-2xl border border-green-100 p-6">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm ring-8 ring-green-50">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">Thank you for reaching out. We have received your message and a team member will contact you shortly.</p>
                  <Button onClick={() => setStatus('idle')} variant="outline" className="min-w-[180px] border-slate-300 hover:border-brand-600">Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group relative">
                      <label className={labelClasses}>Full Name</label>
                      <div className="relative">
                        <User className={iconClasses(!!errors.fullName)} />
                        <input 
                          type="text" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={getInputClasses(!!errors.fullName)} 
                          placeholder="John Doe" 
                          disabled={status === 'submitting'}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in font-medium">
                          <AlertCircle size={12} /> {errors.fullName}
                        </p>
                      )}
                    </div>
                    
                    <div className="group relative">
                      <label className={labelClasses}>Email Address</label>
                      <div className="relative">
                        <Mail className={iconClasses(!!errors.email)} />
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={getInputClasses(!!errors.email)} 
                          placeholder="john@company.com" 
                          disabled={status === 'submitting'}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in font-medium">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="group relative">
                    <label className={labelClasses}>Message</label>
                    <div className="relative">
                      <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-200 ${errors.message ? 'text-red-400' : 'text-slate-400 group-focus-within:text-brand-500'}`} />
                      <textarea 
                        rows={5} 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`${getInputClasses(!!errors.message)} resize-none`} 
                        placeholder="How can we help you regarding your shipment?"
                        disabled={status === 'submitting'}
                      ></textarea>
                    </div>
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in font-medium">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 text-sm border border-red-100 animate-shake">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      Something went wrong. Please check your connection and try again.
                    </div>
                  )}

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      size="lg" 
                      fullWidth 
                      className="bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-500/20 py-3.5 text-lg font-semibold tracking-wide transition-all hover:scale-[1.01] active:scale-[0.99]"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? (
                        <span className="flex items-center gap-2.5">
                          <Loader2 className="animate-spin" size={22} /> Sending Message...
                        </span>
                      ) : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-6">
            
            {/* Info Cards */}
            <div className="grid grid-cols-1 gap-4">
              <a 
                href="mailto:omarelhendawy732@gmail.com" 
                className="flex items-start gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-200 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Mail size={24} />
                </div>
                <div className="py-1">
                  <h3 className="font-bold text-slate-900 mb-0.5 text-lg group-hover:text-brand-600 transition-colors">Email Us</h3>
                  <p className="text-slate-500 text-sm mb-1 font-medium">For general inquiries</p>
                  <span className="text-brand-600 font-semibold text-base break-all">omarelhendawy732@gmail.com</span>
                </div>
              </a>

              <a 
                href="tel:01026019544" 
                className="flex items-start gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-200 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Phone size={24} />
                </div>
                <div className="py-1">
                  <h3 className="font-bold text-slate-900 mb-0.5 text-lg group-hover:text-brand-600 transition-colors">Call Us</h3>
                  <p className="text-slate-500 text-sm mb-1 font-medium">Mon-Fri from 9am to 6pm</p>
                  <span className="text-brand-600 font-semibold text-base">01026019544</span>
                </div>
              </a>

              <div className="flex items-start gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Clock size={24} />
                </div>
                <div className="py-1">
                  <h3 className="font-bold text-slate-900 mb-0.5 text-lg">Office Hours</h3>
                  <div className="space-y-1">
                    <p className="text-slate-600 text-sm font-medium flex justify-between w-full gap-8"><span>Monday - Friday:</span> <span>09:00 - 18:00</span></p>
                    <p className="text-slate-400 text-sm font-medium flex justify-between w-full gap-8"><span>Saturday - Sunday:</span> <span>Closed</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <a 
              href="https://www.google.com/maps/search/?api=1&query=123+Logistics+Way+San+Francisco+CA+94105" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block h-[300px] bg-slate-200 rounded-3xl overflow-hidden relative border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
            >
               <img 
                 src="https://picsum.photos/800/600?blur=1" 
                 alt="Map Location" 
                 className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
               <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-md px-5 py-4 rounded-xl shadow-lg text-sm font-bold text-slate-800 flex items-center gap-3 transform group-hover:translate-y-[-4px] transition-transform duration-300 border border-white/50">
                    <div className="bg-brand-600 p-1.5 rounded-full text-white shadow-sm">
                        <MapPin size={16} />
                    </div>
                    <span className="line-clamp-1">123 Logistics Way, San Francisco</span>
                  </div>
               </div>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;