import React, { useState, useEffect, useRef } from 'react';
import './style.css'; // <--- ضيف السطر ده بس

// TRANSLATIONS و ERROR_DATABASE و SUPPORTED_LANGUAGES حطهم هنا زي ما هما

export default function App() {
  const [activeTab, setActiveTab] = useState('doctor');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('ar');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current &&!dropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const text = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  const toggleTheme = () => setTheme(prev => prev === 'dark'? 'light' : 'dark');
  const handleLangSelect = (selectedLang) => { setLang(selectedLang); setIsLangDropdownOpen(false); setSearchQuery(''); setDiagnosis(null); };
  const handleDiagnose = () => { /*... الكود بتاعك زي ما هو...*/ };
  const handleOptimize = () => { /*... الكود بتاعك زي ما هو...*/ };
  const handleFormat = () => { /*... الكود بتاعك زي ما هو...*/ };
  const handleReset = () => { setCode(''); setErrorMessage(''); setDiagnosis(null); };
  const copyToClipboard = () => { if (diagnosis && diagnosis.goodCode) { navigator.clipboard.writeText(diagnosis.goodCode); setCopied(true); setTimeout(() => setCopied(false), 2000); } };
  const filteredLanguages = SUPPORTED_LANGUAGES.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()));
  const currentLangData = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className={`app-wrapper ${theme}-theme ${lang === 'ar'? 'rtl-dir' : 'ltr-dir'}`}>
      {/* امسح <style> كله من هنا */}
      <div className="doctor-container">
        {/*... باقي الكود بتاعك زي ما هو بالظبط... */}
      </div>
    </div>
  );
}
