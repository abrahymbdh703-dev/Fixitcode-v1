import React, { useState, useEffect, useRef } from 'react';

// بيانات الترجمة، اللغات، قاعدة الأخطاء، وغيرها...
// (قم بإضافة البيانات هنا أو استوردها من ملف آخر إذا رغبت)

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleLangSelect = (selectedLang) => {
    setLang(selectedLang);
    setIsLangDropdownOpen(false);
    setSearchQuery('');
    setDiagnosis(null);
  };

  const handleDiagnose = () => {
    if (!errorMessage.trim()) {
      alert(text.alertEmptyError);
      return;
    }

    const lowerError = errorMessage.toLowerCase();
    let found = null;

    for (const key in ERROR_DATABASE) {
      if (lowerError.includes(key)) {
        found = ERROR_DATABASE[key][lang] || ERROR_DATABASE[key]['en'];
        break;
      }
    }

    if (found) {
      setDiagnosis(found);
    } else {
      setDiagnosis({
        title: text.unknownTitle,
        explanation: text.unknownExplanation,
        badCode: '// Not available',
        goodCode: text.unknownGood,
        tip: text.unknownTip
      });
    }
  };

  const handleOptimize = () => {
    if (!code.trim()) {
      alert(text.alertEmptyCode);
      return;
    }

    let optimizationFound = false;
    let title = '';
    let explanation = '';
    let bad = code;
    let good = '';
    let tip = '';

    if (code.includes('var ')) {
      optimizationFound = true;
      title = lang === 'ar' ? 'تحديث المتغيرات القديمة (var) 🧹' : 'Modernize Variables (var to const/let) 🧹';
      explanation = lang === 'ar' 
        ? 'أنت تستخدم الكلمة المفتاحية القديمة (var). في المعايير الحديثة للغة (ES6+)، يفضل استخدام const للمتغيرات الثابتة.'
        : 'You are using "var" which is deprecated. In modern ES6+, you should use "const" or "let".';
      bad = code;
      good = code.replace(/var /g, 'const ');
      tip = lang === 'ar' ? 'تجنب استخدام var لضمان استقرار الكود.' : 'Avoid "var" in modern development.';
    }

    if (optimizationFound) {
      setDiagnosis({ title, explanation, badCode: bad, goodCode: good, tip });
    } else {
      setDiagnosis({
        title: text.optNoIssues,
        explanation: lang === 'ar' ? 'لم نكتشف أي كود قديم يحتاج لتحسين!' : 'No outdated patterns detected in your code!',
        badCode: '// All set!',
        goodCode: code,
        tip: lang === 'ar' ? 'استمر في كتابة كود منظم ونظيف دائماً!' : 'Keep writing clean code!'
      });
    }
  };

  const handleFormat = () => {
    if (!code.trim()) {
      alert(text.alertEmptyCode);
      return;
    }
    let formatted = code
      .trim()
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/\s*;\s*/g, ';\n')
      .replace(/\s*}\s*/g, '\n}\n')
      .replace(/\n\s*\n/g, '\n');
    setCode(formatted);
  };

  const handleReset = () => {
    setCode('');
    setErrorMessage('');
    setDiagnosis(null);
  };

  const copyToClipboard = () => {
    if (diagnosis && diagnosis.goodCode) {
      navigator.clipboard.writeText(diagnosis.goodCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // تصفية اللغات
  const filteredLanguages = SUPPORTED_LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentLangData = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className={`app-wrapper ${theme}-theme ${lang === 'ar' ? 'rtl-dir' : 'ltr-dir'}`}>
      {/* هنا تضع الـ CSS الخاص بك في ملف خارجي أو داخل الـ style في ملف منفصل */}
      
      {/* الواجهة */}
      {/* ... (نفس JSX السابق من الجزء الأخير، من رأس الصفحة إلى النهاية) ... */}
    </div>
  );
}
