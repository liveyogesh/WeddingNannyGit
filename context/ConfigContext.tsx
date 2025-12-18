
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CITY_DATA as INITIAL_CITY_DATA } from '../constants';
import { CityData, GlobalConfig, BackupEntry, ChangeLog, BookingRecord } from '../types';

const INITIAL_BOOKINGS: BookingRecord[] = [
  { id: '1', clientName: 'Amit & Ritu', city: 'Delhi-NCR', date: '2025-05-15', revenue: 15000, status: 'confirmed' },
  { id: '2', clientName: 'Suresh Kumar', city: 'Hyderabad', date: '2025-06-10', revenue: 8000, status: 'confirmed' },
  { id: '3', clientName: 'Priya Verma', city: 'Ballia', date: '2025-05-20', revenue: 12000, status: 'confirmed' },
  { id: '4', clientName: 'Vikram Singh', city: 'Mumbai', date: '2025-07-04', revenue: 35000, status: 'confirmed' },
  { id: '5', clientName: 'Neha Gupta', city: 'Delhi-NCR', date: '2025-08-12', revenue: 18000, status: 'confirmed' },
];

const INITIAL_GLOBAL: GlobalConfig = {
  siteName: "The Wedding Nanny",
  robotsTxt: "User-agent: *\nDisallow: /admin",
  sitemapXml: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url><loc>https://weddingnanny.in/</loc></url>\n</urlset>",
  headScripts: "<!-- Google Analytics Placeholder -->",
  footerScripts: "",
  metaDescription: "Premium on-demand childcare and activity corners for Indian weddings. Professional vetting and care.",
  keywords: "wedding childcare, indian wedding nannies, event babysitting",
  googleTagId: "G-XXXXXXXXXX",
  ogImageUrl: "https://weddingnanny.in/og-image.jpg",
  customJs: "",
  bookings: INITIAL_BOOKINGS
};

interface ConfigContextType {
  allCityData: Record<string, CityData>;
  globalConfig: GlobalConfig;
  backups: BackupEntry[];
  logs: ChangeLog[];
  updateCityData: (cityId: string, newData: CityData, logDesc?: string) => void;
  updateGlobalConfig: (newGlobal: GlobalConfig, logDesc?: string) => void;
  createBackup: (label: string) => void;
  restoreBackup: (backupId: string) => void;
  deleteBackup: (backupId: string) => void;
  resetToDefault: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allCityData, setAllCityData] = useState<Record<string, CityData>>(INITIAL_CITY_DATA);
  const [globalConfig, setGlobalConfig] = useState<GlobalConfig>(INITIAL_GLOBAL);
  const [backups, setBackups] = useState<BackupEntry[]>([]);
  const [logs, setLogs] = useState<ChangeLog[]>([]);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('wedding_nanny_master_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.cities) setAllCityData(parsed.cities);
        if (parsed.global) {
          // Merge defaults for missing keys to avoid breaks
          setGlobalConfig({ ...INITIAL_GLOBAL, ...parsed.global });
        }
        if (parsed.backups) setBackups(parsed.backups);
        if (parsed.logs) setLogs(parsed.logs);
      } catch (e) {
        console.error("Failed to parse master config", e);
      }
    }
  }, []);

  const saveToStorage = (cities: any, global: any, bks: any, lgs: any) => {
    localStorage.setItem('wedding_nanny_master_config', JSON.stringify({
      cities, global, backups: bks, logs: lgs
    }));
  };

  const addLog = (description: string) => {
    const newLog: ChangeLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      description,
      author: "Administrator"
    };
    const updatedLogs = [newLog, ...logs].slice(0, 50);
    setLogs(updatedLogs);
    return updatedLogs;
  };

  const updateCityData = (cityId: string, newData: CityData, logDesc?: string) => {
    const updatedCities = { ...allCityData, [cityId]: newData };
    const updatedLogs = addLog(logDesc || `Updated city: ${newData.name}`);
    setAllCityData(updatedCities);
    saveToStorage(updatedCities, globalConfig, backups, updatedLogs);
  };

  const updateGlobalConfig = (newGlobal: GlobalConfig, logDesc?: string) => {
    const updatedLogs = addLog(logDesc || "Updated Global Settings");
    setGlobalConfig(newGlobal);
    saveToStorage(allCityData, newGlobal, backups, updatedLogs);
  };

  const createBackup = (label: string) => {
    const newBackup: BackupEntry = {
      id: `bk-${Date.now()}`,
      timestamp: Date.now(),
      label,
      data: { cities: allCityData, global: globalConfig }
    };
    const updatedBackups = [newBackup, ...backups];
    const updatedLogs = addLog(`Created Backup: ${label}`);
    setBackups(updatedBackups);
    saveToStorage(allCityData, globalConfig, updatedBackups, updatedLogs);
  };

  const restoreBackup = (id: string) => {
    const bk = backups.find(b => b.id === id);
    if (!bk) return;
    if (!window.confirm(`Restore backup "${bk.label}"? Current unsaved changes will be lost.`)) return;
    
    setAllCityData(bk.data.cities);
    setGlobalConfig(bk.data.global);
    const updatedLogs = addLog(`Restored Backup: ${bk.label}`);
    saveToStorage(bk.data.cities, bk.data.global, backups, updatedLogs);
  };

  const deleteBackup = (id: string) => {
    const updatedBackups = backups.filter(b => b.id !== id);
    setBackups(updatedBackups);
    saveToStorage(allCityData, globalConfig, updatedBackups, logs);
  };

  const resetToDefault = () => {
    if (window.confirm("Reset EVERYTHING to defaults? (Cities, Layouts, SEO)")) {
      setAllCityData(INITIAL_CITY_DATA);
      setGlobalConfig(INITIAL_GLOBAL);
      const updatedLogs = addLog("System Reset to Factory Defaults");
      saveToStorage(INITIAL_CITY_DATA, INITIAL_GLOBAL, backups, updatedLogs);
    }
  };

  return (
    <ConfigContext.Provider value={{ 
      allCityData, globalConfig, backups, logs,
      updateCityData, updateGlobalConfig, createBackup, restoreBackup, deleteBackup, resetToDefault 
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error("useConfig must be used within ConfigProvider");
  return context;
};
