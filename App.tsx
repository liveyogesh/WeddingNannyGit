import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CityPage from './pages/CityPage';
import AdminPage from './pages/AdminPage';
import ConsentModal from './components/ConsentModal';
import BookingModal from './components/BookingModal';
import { ModalProvider } from './context/ModalContext';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import { ThemeProvider } from './context/ThemeContext';
import { CITIES_OPTIONS } from './constants';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// Haversine formula to calculate distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const LocationDetector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [detectionFinished, setDetectionFinished] = useState(false);

  const handleProximityDetection = (latitude: number, longitude: number) => {
    let nearestCity = null;
    let minDistance = 150; // Threshold: Only redirect if within 150km of a service center

    CITIES_OPTIONS.forEach((city) => {
      if (city.lat && city.lng && city.path) {
        const distance = calculateDistance(latitude, longitude, city.lat, city.lng);
        if (distance < minDistance) {
          minDistance = distance;
          nearestCity = city;
        }
      }
    });

    if (nearestCity && nearestCity.path) {
      navigate(nearestCity.path, { replace: true });
    }
    sessionStorage.setItem('wn_location_checked', 'true');
    setDetectionFinished(true);
  };

  useEffect(() => {
    if (location.pathname !== '/' || sessionStorage.getItem('wn_location_checked')) {
      setDetectionFinished(true);
      return;
    }

    // Try Precision Geolocation first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleProximityDetection(position.coords.latitude, position.coords.longitude);
        },
        async () => {
          // Fallback to IP-based location if Geo fails
          try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            if (data.latitude && data.longitude) {
              handleProximityDetection(data.latitude, data.longitude);
            } else {
              sessionStorage.setItem('wn_location_checked', 'failed');
              setDetectionFinished(true);
            }
          } catch {
            sessionStorage.setItem('wn_location_checked', 'error');
            setDetectionFinished(true);
          }
        },
        { timeout: 8000 }
      );
    } else {
      setDetectionFinished(true);
    }
  }, [location.pathname, navigate]);

  return null;
};

const RouterContent = () => {
  const { allCityData } = useConfig();
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <LocationDetector />
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<CityPage data={allCityData.home} />} />
          <Route path="/ballia" element={<CityPage data={allCityData.ballia} />} />
          <Route path="/delhi-ncr" element={<CityPage data={allCityData['delhi-ncr']} />} />
          <Route path="/hyderabad" element={<CityPage data={allCityData.hyderabad} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
      <ConsentModal />
      <BookingModal />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <ConfigProvider>
          <ModalProvider>
            <RouterContent />
          </ModalProvider>
        </ConfigProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;