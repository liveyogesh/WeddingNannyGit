import React, { useState, FormEvent, useEffect } from 'react';
import { useModal } from '../context/ModalContext';

interface ContactProps {
  defaultCity?: string;
}

interface FormData {
  full_name: string;
  email: string;
  phone_number: string;
  event_date: string;
  city_venue: string;
  preferred_package: string;
  details: string;
  privacy_consent: boolean;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone_number?: string;
  event_date?: string;
  city_venue?: string;
  preferred_package?: string;
  details?: string;
  privacy_consent?: string;
}

const Contact: React.FC<ContactProps> = ({ defaultCity = 'Delhi-NCR' }) => {
  const { openConsentModal, selectedPackage, setSelectedPackage } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const initialFormState: FormData = {
    full_name: '',
    email: '',
    phone_number: '',
    event_date: '',
    city_venue: defaultCity,
    preferred_package: selectedPackage || '',
    details: '',
    privacy_consent: false,
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (selectedPackage && selectedPackage !== 'Auto Recommend') {
      setFormData(prev => ({ ...prev, preferred_package: selectedPackage }));
    }
  }, [selectedPackage]);

  const validateField = (name: string, value: string | boolean) => {
    let error = '';
    switch (name) {
      case 'full_name':
        if (!value) error = 'Full name is required';
        else if ((value as string).length < 2) error = 'Name is too short';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = 'Email is required';
        else if (!emailRegex.test(value as string)) error = 'Invalid email format';
        break;
      case 'phone_number':
        // Updated feedback for specific format
        const phoneRegex = /^(\+?\d{1,4}[\s-]?)?[\d\s-]{10,15}$/;
        if (!value) error = 'Phone number is required';
        else if (!phoneRegex.test(value as string)) error = 'Please use format like +91 98765-43210';
        break;
      case 'event_date':
        if (!value) error = 'Event date is required';
        else {
          const selected = new Date(value as string);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selected < today) error = 'Event date cannot be in the past';
        }
        break;
      case 'city_venue':
        if (!value) error = 'City and venue are required';
        break;
      case 'preferred_package':
        if (!value) error = 'Please select a package';
        break;
      case 'details':
        if (!value) error = 'Details are required';
        else if ((value as string).length < 10) error = 'Please provide more details (min 10 chars)';
        break;
      case 'privacy_consent':
        if (!value) error = 'You must agree to the terms';
        break;
      default:
        break;
    }
    return error;
  };

  useEffect(() => {
    const newErrors: FormErrors = {};
    let valid = true;
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        valid = false;
      }
    });
    setErrors(newErrors);
    setIsFormValid(valid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    
    if (name === 'preferred_package') {
      setSelectedPackage(value);
    }
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      const allTouched: Record<string, boolean> = {};
      Object.keys(formData).forEach(k => allTouched[k] = true);
      setTouched(allTouched);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ ...initialFormState, preferred_package: '' });
      setTouched({});
    }, 1500);
  };

  const renderError = (name: keyof FormErrors) => {
    if (touched[name] && errors[name]) {
      return <p className="text-rose-600 text-xs mt-1 ml-1 font-medium">{errors[name]}</p>;
    }
    return null;
  };

  const inputClasses = (name: keyof FormErrors) => 
    `w-full p-3 border rounded-lg outline-none transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 ${
      touched[name] && errors[name] 
        ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/10 focus:ring-rose-200' 
        : 'border-gray-300 focus:ring-rose-gemini focus:border-rose-gemini'
    }`;

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:flex lg:space-x-12">
        <div className="lg:w-7/12 p-8 bg-cream-gemini dark:bg-slate-800/50 rounded-2xl shadow-2xl border-b-4 border-rose-gemini transition-colors">
          <h2 className="text-3xl playfair md:text-4xl font-extrabold text-navy-gemini dark:text-white mb-4">Let's Plan the Kids' Party! 🥳</h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 mb-8">Fill out this form for a detailed quote tailored to your event.</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text" 
                    name="full_name" 
                    placeholder="Your Full Name*" 
                    value={formData.full_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses('full_name')} 
                  />
                  {renderError('full_name')}
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email Address*" 
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses('email')} 
                  />
                  {renderError('email')}
                </div>
              </div>

              <div>
                <input 
                  type="tel" 
                  name="phone_number" 
                  placeholder="Contact Phone Number (e.g. +91 98765-43210)*" 
                  value={formData.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClasses('phone_number')} 
                />
                {renderError('phone_number')}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="date" 
                    name="event_date" 
                    value={formData.event_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses('event_date')} 
                  />
                  {renderError('event_date')}
                </div>
                <div>
                  <input 
                    type="text" 
                    name="city_venue" 
                    placeholder="City & Venue Name*" 
                    value={formData.city_venue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClasses('city_venue')} 
                  />
                  {renderError('city_venue')}
                </div>
              </div>

              <div>
                <select 
                  name="preferred_package" 
                  value={formData.preferred_package}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClasses('preferred_package')}
                >
                  <option value="" disabled>Select Preferred Package*</option>
                  <option value="Auto Recommend">Auto Recommend ✨</option>
                  <option value="Elopement Care">Elopement Care</option>
                  <option value="Basic Care">Basic Care</option>
                  <option value="Celebration Premium">Celebration Premium</option>
                  <option value="Multi-Day Event">Multi-Day Event</option>
                </select>
                {renderError('preferred_package')}
              </div>

              <div>
                <textarea 
                  name="details" 
                  placeholder="Tell us about your event..." 
                  rows={4} 
                  value={formData.details}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClasses('details')}
                ></textarea>
                {renderError('details')}
              </div>

              <div className="flex flex-col pt-2">
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="privacy_consent" 
                    id="privacyConsent" 
                    checked={formData.privacy_consent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 mr-2 rounded text-rose-gemini focus:ring-rose-gemini h-4 w-4 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600" 
                  />
                  <label htmlFor="privacyConsent" className="text-sm text-gray-600 dark:text-slate-400 leading-tight">
                    I agree to the <button type="button" onClick={openConsentModal} className="text-rose-gemini dark:text-rose-400 hover:underline font-medium">Terms of Service</button>.
                  </label>
                </div>
                {renderError('privacy_consent')}
              </div>

              <button 
                type="submit" 
                disabled={loading || (!isFormValid && Object.keys(touched).length > 0)} 
                className={`cta-button w-full text-white font-bold py-3 mt-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition ${
                  (!isFormValid && Object.keys(touched).length > 0) ? 'opacity-50 cursor-not-allowed grayscale' : ''
                }`}
              >
                {loading ? 'Processing...' : <>Submit Request <i className="fas fa-paper-plane ml-2"></i></>}
              </button>
            </form>
          ) : (
            <div className="mt-6 p-8 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800/40 text-green-800 dark:text-green-300 rounded-2xl text-center space-y-4 animate-fadeIn">
              <div className="text-5xl">✅</div>
              <h3 className="text-2xl font-bold">Request Received!</h3>
              <p className="font-medium italic">"Thank you! Your request has been successfully submitted."</p>
              <button onClick={() => setSubmitted(false)} className="text-sm text-green-700 dark:text-green-400 underline hover:text-green-900">Send another request</button>
            </div>
          )}
        </div>

        <div className="lg:w-5/12 mt-12 lg:mt-0 p-8 bg-navy-gemini dark:bg-slate-950 text-white rounded-2xl shadow-2xl space-y-8 border border-white/5">
          <div>
            <h3 className="text-3xl font-extrabold playfair text-yellow-400 mb-3">Planner & Venue Partners 🤝</h3>
            <p className="text-gray-300 mb-4">Inquire about our dedicated onboarding & commission plans.</p>
            <a href="mailto:partners@weddingnanny.in" className="text-lg font-bold text-white bg-rose-gemini py-2 px-6 rounded-full inline-block hover:bg-rose-600 transition">Inquire Now</a>
          </div>
          <hr className="border-gray-700" />
          <div>
            <h3 className="text-3xl font-extrabold playfair text-yellow-400 mb-3">Quick WhatsApp 📱</h3>
            <p className="text-gray-300 mb-4">Tap to chat with us right now for urgent booking inquiries.</p>
            <a href="https://wa.me/919115117795" target="_blank" rel="noreferrer" className="text-lg font-bold text-white bg-green-500 py-2 px-6 rounded-full inline-flex items-center hover:bg-green-600 transition">
              <i className="fab fa-whatsapp text-2xl mr-2"></i> WhatsApp Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;