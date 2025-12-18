
import React, { useState, useMemo } from 'react';
import { useConfig } from '../context/ConfigContext';
import { CityData, Testimonial, BookingRecord } from '../types';

type Tab = 'dashboard' | 'pages' | 'global' | 'backups' | 'logs';

const AdminPage: React.FC = () => {
  const { 
    allCityData, globalConfig, backups, logs,
    updateCityData, updateGlobalConfig, createBackup, restoreBackup, deleteBackup, resetToDefault 
  } = useConfig();

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedCityId, setSelectedCityId] = useState<string>('home');
  const [saveIndicator, setSaveIndicator] = useState<boolean>(false);
  const [backupLabel, setBackupLabel] = useState("");

  // Simplified Password Check against process.env.ADMIN_PASSWORD (fallback to admin123)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPass = process.env.ADMIN_PASSWORD || "admin123";
    if (password === correctPass) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const city = allCityData[selectedCityId];

  const triggerSaveIndicator = () => {
    setSaveIndicator(true);
    setTimeout(() => setSaveIndicator(false), 1500);
  };

  // --- Dashboard Data Processing ---
  const stats = useMemo(() => {
    const cityCounts: Record<string, number> = {};
    let totalRevenue = 0;
    
    globalConfig.bookings.forEach(b => {
      cityCounts[b.city] = (cityCounts[b.city] || 0) + 1;
      totalRevenue += b.revenue;
    });

    return { cityCounts, totalRevenue };
  }, [globalConfig.bookings]);

  const maxBookings = Math.max(...Object.values(stats.cityCounts), 1);

  // --- Handlers for Page Sections ---
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newLayout = [...city.layout];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newLayout.length) return;
    [newLayout[index], newLayout[targetIndex]] = [newLayout[targetIndex], newLayout[index]];
    updateCityData(selectedCityId, { ...city, layout: newLayout }, `Reordered sections for ${city.name}`);
    triggerSaveIndicator();
  };

  const toggleSection = (sectionId: string) => {
    let newLayout = [...city.layout];
    if (newLayout.includes(sectionId)) {
      newLayout = newLayout.filter(id => id !== sectionId);
    } else {
      newLayout.push(sectionId);
    }
    updateCityData(selectedCityId, { ...city, layout: newLayout }, `Toggled visibility of ${sectionId} on ${city.name}`);
    triggerSaveIndicator();
  };

  const updateHero = (field: keyof typeof city.hero, value: string) => {
    updateCityData(selectedCityId, { ...city, hero: { ...city.hero, [field]: value } });
    triggerSaveIndicator();
  };

  const addTestimonial = () => {
    const newT: Testimonial = { text: "New Testimonial", author: "Anonymous", rating: 5, location: city.name };
    updateCityData(selectedCityId, { ...city, testimonials: [newT, ...city.testimonials] });
    triggerSaveIndicator();
  };

  const removeTestimonial = (idx: number) => {
    const updated = city.testimonials.filter((_, i) => i !== idx);
    updateCityData(selectedCityId, { ...city, testimonials: updated });
    triggerSaveIndicator();
  };

  const updateTestimonial = (idx: number, field: keyof Testimonial, value: any) => {
    const updated = [...city.testimonials];
    updated[idx] = { ...updated[idx], [field]: value };
    updateCityData(selectedCityId, { ...city, testimonials: updated });
    triggerSaveIndicator();
  };

  // --- Handlers for Global Config ---
  const handleGlobalChange = (field: keyof typeof globalConfig, value: string) => {
    updateGlobalConfig({ ...globalConfig, [field]: value });
    triggerSaveIndicator();
  };

  // --- Auth Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl w-full max-w-md animate-fadeIn">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-rose-gemini rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <i className="fas fa-lock text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Authentication</h1>
            <p className="text-slate-400 text-sm mt-1">Please enter your management password</p>
          </div>
          <div className="space-y-4">
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-center text-lg tracking-widest"
              autoFocus
            />
            <button type="submit" className="w-full bg-rose-gemini text-white font-bold p-4 rounded-xl hover:bg-rose-600 transition shadow-lg">
              Unlock Console
            </button>
          </div>
          <p className="text-slate-500 text-[10px] text-center mt-6 uppercase tracking-widest">Master Control Environment</p>
        </form>
      </div>
    );
  }

  // --- Render Functions ---
  const renderSidebar = () => (
    <div className="w-72 bg-navy-gemini text-white p-6 shadow-2xl fixed h-full flex flex-col z-20">
      <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/10">
        <div className="w-10 h-10 bg-rose-gemini rounded-xl flex items-center justify-center shadow-lg">
          <i className="fas fa-crown text-white"></i>
        </div>
        <div>
          <h1 className="text-lg font-bold leading-none">Admin Console</h1>
          <span className="text-[10px] text-rose-300 font-mono tracking-widest uppercase">Management Portal</span>
        </div>
      </div>

      <nav className="flex-grow space-y-1 overflow-y-auto">
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-3 ml-2">Navigation</p>
        {[
          { id: 'dashboard', icon: 'fa-chart-pie', label: 'Metrics & Calendar' },
          { id: 'pages', icon: 'fa-file-alt', label: 'Page Editor' },
          { id: 'global', icon: 'fa-globe', label: 'Global & SEO' },
          { id: 'backups', icon: 'fa-database', label: 'Backups' },
          { id: 'logs', icon: 'fa-history', label: 'Change Logs' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as Tab)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${activeTab === t.id ? 'bg-rose-gemini text-white shadow-md' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <i className={`fas ${t.icon} w-5`}></i>
            <span className="font-medium">{t.label}</span>
          </button>
        ))}

        {activeTab === 'pages' && (
          <>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-8 mb-3 ml-2">Select Page</p>
            {Object.keys(allCityData).map(id => (
              <button
                key={id}
                onClick={() => setSelectedCityId(id)}
                className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-all ${selectedCityId === id ? 'text-rose-400 font-bold bg-rose-400/10 border-r-4 border-rose-400' : 'text-gray-400 hover:bg-white/5'}`}
              >
                {allCityData[id].name} {id === 'home' && '(Main)'}
              </button>
            ))}
          </>
        )}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10 space-y-3">
        <button onClick={() => window.location.href = '/'} className="w-full text-xs text-gray-400 hover:text-white flex items-center gap-2">
          <i className="fas fa-external-link-alt"></i> View Site
        </button>
        <button onClick={resetToDefault} className="w-full text-xs text-rose-400/60 hover:text-rose-400 flex items-center gap-2 transition-colors">
          <i className="fas fa-exclamation-triangle"></i> Factory Reset
        </button>
      </div>
    </div>
  );

  const renderDashboardTab = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
             <i className="fas fa-chart-bar text-blue-500"></i> Bookings per City
           </h3>
           <div className="space-y-4">
             {Object.entries(stats.cityCounts).map(([city, count]) => (
               <div key={city} className="space-y-1">
                 <div className="flex justify-between text-xs font-bold uppercase text-gray-500">
                   <span>{city}</span>
                   <span>{count} Bookings</span>
                 </div>
                 <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                   <div 
                    className="bg-rose-gemini h-full transition-all duration-1000" 
                    style={{ width: `${(count / maxBookings) * 100}%` }}
                   ></div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-navy-gemini rounded-3xl p-8 shadow-sm text-white flex flex-col justify-center text-center">
           <div className="text-rose-300 text-xs font-bold uppercase tracking-widest mb-2">Estimated Revenue</div>
           <div className="text-5xl font-extrabold text-white">₹{stats.totalRevenue.toLocaleString()}</div>
           <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-[10px] opacity-60 uppercase mb-1">Active Bookings</div>
              <div className="text-2xl font-bold">{globalConfig.bookings.length}</div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
         <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
           <i className="fas fa-calendar-alt text-rose-500"></i> Confirmed Bookings Calendar
         </h3>
         <div className="grid grid-cols-7 gap-px bg-gray-200 border rounded-xl overflow-hidden shadow-inner">
           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
             <div key={d} className="bg-gray-50 p-2 text-center text-[10px] font-bold text-gray-500 uppercase">{d}</div>
           ))}
           {/* Simple Calendar View Mock (current month) */}
           {Array.from({ length: 35 }).map((_, i) => {
             const day = i - 2; // Offset for starting weekday
             const dateStr = `2025-05-${day < 10 ? '0' + day : day}`;
             const activeBookings = globalConfig.bookings.filter(b => b.date === dateStr);
             
             return (
               <div key={i} className="bg-white min-h-[100px] p-2 border-t">
                 <span className={`text-xs font-bold ${day < 1 || day > 31 ? 'text-gray-200' : 'text-gray-400'}`}>
                   {day > 0 && day <= 31 ? day : ''}
                 </span>
                 <div className="space-y-1 mt-1">
                   {activeBookings.map(b => (
                     <div key={b.id} className="text-[10px] p-1 bg-rose-50 text-rose-700 rounded border border-rose-100 truncate font-medium">
                       {b.clientName} ({b.city})
                     </div>
                   ))}
                 </div>
               </div>
             );
           })}
         </div>
      </div>
    </div>
  );

  const renderPagesTab = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-navy-gemini">Editing: {city.name}</h2>
          <p className="text-gray-500 text-sm">Update content and reorder sections for this page.</p>
        </div>
        {saveIndicator && <div className="text-green-600 text-xs font-bold bg-green-50 px-3 py-1 rounded-full border border-green-200 animate-pulse">✓ Changes Persistent</div>}
      </div>

      {/* Layout Manager */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <i className="fas fa-layer-group text-blue-500"></i> Section Order & Visibility
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
             <p className="text-xs font-bold text-gray-400 uppercase mb-2">Active Order</p>
             {city.layout.map((sid, idx) => (
               <div key={sid} className="flex items-center justify-between p-3 bg-gray-50 border rounded-xl hover:border-rose-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-gray-400">{idx + 1}</span>
                    <span className="font-semibold text-sm text-navy-gemini capitalize">{sid.replace(/-/g, ' ')}</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => moveSection(idx, 'up')} disabled={idx === 0} className="p-1.5 hover:bg-white border rounded shadow-sm disabled:opacity-20"><i className="fas fa-chevron-up text-[10px]"></i></button>
                    <button onClick={() => moveSection(idx, 'down')} disabled={idx === city.layout.length - 1} className="p-1.5 hover:bg-white border rounded shadow-sm disabled:opacity-20"><i className="fas fa-chevron-down text-[10px]"></i></button>
                    <button onClick={() => toggleSection(sid)} className="p-1.5 hover:bg-red-50 text-red-400 border rounded shadow-sm"><i className="fas fa-eye-slash text-[10px]"></i></button>
                  </div>
               </div>
             ))}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Add/Restore Sections</p>
            <div className="flex flex-wrap gap-2">
              {['hero', 'trust', 'reality', 'services', 'how-it-works', 'pricing', 'packages', 'comparison', 'testimonials', 'faq', 'contact', 'about', 'partners', 'local-insights'].map(sid => (
                <button
                  key={sid}
                  onClick={() => toggleSection(sid)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${city.layout.includes(sid) ? 'bg-green-100 text-green-700 opacity-40 grayscale pointer-events-none' : 'bg-gray-100 text-gray-600 hover:bg-rose-gemini hover:text-white'}`}
                >
                  + {sid}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Editor */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <i className="fas fa-rocket text-rose-500"></i> Hero Content
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
            <input value={city.hero.title} onChange={e => updateHero('title', e.target.value)} className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-rose-200 outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Subtitle</label>
            <textarea value={city.hero.subtitle} onChange={e => updateHero('subtitle', e.target.value)} rows={3} className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-rose-200 outline-none" />
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Badge / Pill Text</label>
              <input value={city.hero.pillText || ''} onChange={e => updateHero('pillText', e.target.value)} className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-rose-200 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Image Alt Text (Accessibility)</label>
              <input value={city.hero.imageAlt} onChange={e => updateHero('imageAlt', e.target.value)} className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-rose-200 outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Editor */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-star text-yellow-500"></i> Testimonials
          </h3>
          <button onClick={addTestimonial} className="bg-navy-gemini text-white px-4 py-2 rounded-xl text-sm font-bold shadow hover:bg-navy-700 transition">Add Entry</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {city.testimonials.map((t, i) => (
            <div key={i} className="p-4 border rounded-2xl bg-gray-50 relative group">
              <button onClick={() => removeTestimonial(i)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition"><i className="fas fa-trash-alt"></i></button>
              <div className="space-y-3">
                <input value={t.author} placeholder="Author" onChange={e => updateTestimonial(i, 'author', e.target.value)} className="w-full p-2 border rounded-lg text-sm font-bold bg-white" />
                <textarea value={t.text} placeholder="Feedback" onChange={e => updateTestimonial(i, 'text', e.target.value)} rows={2} className="w-full p-2 border rounded-lg text-sm bg-white italic" />
                <div className="flex gap-2">
                  <input value={t.location || ''} placeholder="Location" onChange={e => updateTestimonial(i, 'location', e.target.value)} className="flex-grow p-2 border rounded-lg text-xs bg-white" />
                  <select value={t.rating} onChange={e => updateTestimonial(i, 'rating', parseInt(e.target.value))} className="p-2 border rounded-lg text-xs bg-white">
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGlobalTab = () => (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-3xl font-bold text-navy-gemini">Global Site Config</h2>
        <p className="text-gray-500 text-sm">Manage SEO, indexing, and external script injections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-search text-gray-400"></i> SEO & Metadata
          </h3>
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Site Name</label>
              <input value={globalConfig.siteName} onChange={e => handleGlobalChange('siteName', e.target.value)} className="w-full p-3 border rounded-xl mt-1 outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Meta Description</label>
              <textarea value={globalConfig.metaDescription} onChange={e => handleGlobalChange('metaDescription', e.target.value)} rows={3} className="w-full p-3 border rounded-xl mt-1 outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Keywords (Comma Separated)</label>
              <input value={globalConfig.keywords} onChange={e => handleGlobalChange('keywords', e.target.value)} className="w-full p-3 border rounded-xl mt-1 outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Open Graph Image URL</label>
              <input value={globalConfig.ogImageUrl} onChange={e => handleGlobalChange('ogImageUrl', e.target.value)} className="w-full p-3 border rounded-xl mt-1 outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Google Tag ID (G-XXXX)</label>
              <input value={globalConfig.googleTagId} onChange={e => handleGlobalChange('googleTagId', e.target.value)} className="w-full p-3 border rounded-xl mt-1 font-mono outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-code text-blue-500"></i> Technical Config
          </h3>
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Sitemap.xml</label>
              <textarea value={globalConfig.sitemapXml} onChange={e => handleGlobalChange('sitemapXml', e.target.value)} rows={4} className="w-full p-4 border rounded-xl mt-1 font-mono text-xs bg-gray-900 text-green-400 outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Custom JS Injection (Head)</label>
              <textarea value={globalConfig.customJs} onChange={e => handleGlobalChange('customJs', e.target.value)} rows={4} className="w-full p-4 border rounded-xl mt-1 font-mono text-xs bg-gray-50 text-blue-700 outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Head Scripts (&lt;head&gt;)</label>
              <textarea value={globalConfig.headScripts} onChange={e => handleGlobalChange('headScripts', e.target.value)} rows={4} className="w-full p-4 border rounded-xl mt-1 font-mono text-xs bg-gray-50 text-blue-700 outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Footer Scripts (End of Body)</label>
              <textarea value={globalConfig.footerScripts} onChange={e => handleGlobalChange('footerScripts', e.target.value)} rows={3} className="w-full p-4 border rounded-xl mt-1 font-mono text-xs bg-gray-50 text-blue-700 outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupsTab = () => (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-3xl font-bold text-navy-gemini">Backups & Data Restore</h2>
        <p className="text-gray-500 text-sm">Snapshot your site state or restore previous versions.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-6">Create New Backup</h3>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="e.g. Before seasonal update" 
            className="flex-grow p-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-200"
            value={backupLabel}
            onChange={e => setBackupLabel(e.target.value)}
          />
          <button 
            onClick={() => { if(backupLabel) { createBackup(backupLabel); setBackupLabel(""); } }}
            className="bg-rose-gemini text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-rose-600 transition"
          >
            Create Snapshot
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backups.map(bk => (
          <div key={bk.id} className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-rose-500">
                <i className="fas fa-archive text-xl"></i>
              </div>
              <button onClick={() => deleteBackup(bk.id)} className="text-gray-300 hover:text-red-500"><i className="fas fa-trash"></i></button>
            </div>
            <h4 className="font-bold text-lg text-navy-gemini">{bk.label}</h4>
            <p className="text-xs text-gray-400 mt-1">{new Date(bk.timestamp).toLocaleString()}</p>
            <button 
              onClick={() => restoreBackup(bk.id)}
              className="w-full mt-6 py-2 bg-gray-100 text-navy-gemini font-bold rounded-xl text-sm hover:bg-rose-gemini hover:text-white transition"
            >
              Restore This Version
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLogsTab = () => (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-3xl font-bold text-navy-gemini">System Logs</h2>
        <p className="text-gray-500 text-sm">History of recent management activities.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Timestamp</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">User</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map(log => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-xs text-gray-400 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</td>
                <td className="px-6 py-4 text-sm text-navy-gemini font-medium">{log.description}</td>
                <td className="px-6 py-4 text-[10px] text-gray-500 uppercase tracking-widest text-right">{log.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      {renderSidebar()}
      <main className="ml-72 p-10 pt-8 pb-32">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && renderDashboardTab()}
          {activeTab === 'pages' && renderPagesTab()}
          {activeTab === 'global' && renderGlobalTab()}
          {activeTab === 'backups' && renderBackupsTab()}
          {activeTab === 'logs' && renderLogsTab()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
