import React, { useState, useEffect, useRef } from 'react';

// الترجمة والبيانات كما في الكود الأصلي...

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

  const text = TRANSLATIONS[lang] || TRANSLATIONS['en'];

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

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentLangData = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className={`app-wrapper ${theme}-theme ${lang === 'ar' ? 'rtl-dir' : 'ltr-dir'}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Fira+Code:wght@400;500&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .app-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 20px 10px;
          font-family: 'Cairo', sans-serif;
          background-size: 400% 400%;
          animation: dynamicGradient 15s ease infinite;
        }

        /* الخلفية حسب الوضع */
        .dark-theme {
          background: linear-gradient(-45deg, #0f172a, #1e1b4b, #311042, #0f172a);
          color: #e2e8f0;
        }
        .light-theme {
          background: linear-gradient(-45deg, #f8fafc, #e0f2fe, #f3e8ff, #f8fafc);
          color: #1e293b;
        }

        /* التوجيه حسب اللغة */
        .rtl-dir { direction: rtl; }
        .ltr-dir { direction: ltr; }

        /* تأثيرات الحركة */
        @keyframes breathe {
          0% { transform: scale(1); }
          50% { transform: scale(1.018); box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25); }
          100% { transform: scale(1); }
        }

        /* عناصر التفاعل */
        .card:hover,
        .btn:hover,
        .toggle-btn:hover,
        .dropdown-trigger:hover,
        .tab-button:hover,
        textarea:focus,
        .dropdown-item:hover {
          animation: breathe 1.5s ease-in-out infinite;
        }

        /* أنماط الألوان حسب الوضع */
        .dark-theme .card { background: rgba(30, 41, 59, 0.7); border-color: rgba(51, 65, 85, 0.5); backdrop-filter: blur(10px); }
        .dark-theme textarea { background: rgba(15, 23, 42, 0.6); border-color: #475569; color: #f1f5f9; }
        .dark-theme pre { background: rgba(15, 23, 42, 0.8); }

        .light-theme .card { background: rgba(255, 255, 255, 0.8); border-color: rgba(226, 232, 240, 0.8); box-shadow: 0 10px 25px rgba(0,0,0,0.03); backdrop-filter: blur(10px); }
        .light-theme textarea { background: rgba(241, 245, 249, 0.8); border-color: #cbd5e1; color: #0f172a; }
        .light-theme pre { background: rgba(241, 245, 249, 0.9); }

        /* رأس الصفحة */
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.2);
          padding-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }
        header h1 {
          font-size: 2rem;
          color: #38bdf8;
          font-weight: 800;
        }
        .controls {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }
        .toggle-btn {
          background: #38bdf8;
          color: #0f172a;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          font-size: 0.9rem;
          height: 38px;
        }

        /* قائمة الاختيارات */
        .custom-dropdown-container {
          position: relative;
          display: inline-block;
        }
        .dropdown-trigger {
          background: #38bdf8;
          color: #0f172a;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          height: 38px;
        }
        .dropdown-menu {
          position: absolute;
          top: 45px;
          right: 0;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          width: 220px;
          max-width: calc(100vw-20px);
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .dropdown-search {
          width: 100%;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #475569;
          background: #0f172a;
          color: #e2e8f0;
          font-size: 0.85rem;
        }

        /* عناصر التصفح */
        .dropdown-items-list {
          max-height: 200px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .dropdown-item {
          padding: 12px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #e2e8f0;
          min-height: 44px;
          transition: background 0.2s;
        }

        .dropdown-item:hover,
        .dropdown-item:active{
        background: #334155;
        }
        .dropdown-item.selected {
          background: #38bdf8;
          color: #0f172a;
        }

        /* التبويبات */
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
          background: rgba(148, 163, 184, 0.1);
          padding: 6px;
          border-radius: 12px;
          flex-wrap: wrap;
        }
        .tab-button {
          background: none;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          color: #94a3b8;
          cursor: pointer;
          flex: 1;
          min-width: 120px;
          max-width: 100%;
          text-align: center;
        }

        .light-theme.tabs{
        background: rgba(0,0,0,0.05);
        }
        .tab-button.active {
          background: #38bdf8;
          color: #0f172a;
        }

        /* مساحة العمل */
        .workspace {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 30px;
        }
        @media(max-width: 768px){
          .workspace {
            grid-template-columns: 1fr;
          }
        }

        /* بطاقات المحتوى */
        .card {
          border: 1px solid;
          border-radius: 16px;
          padding: 24px;
          width: 100%;
          box-sizing: border-box;
          overflow-wrap:break-word;
        }
        @media(max-width: 768px){
          .card { 
          padding: 18px; 
          border-redius: 12px;
          }
        }

        /* عناصر النموذج */
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          opacity: 0.8;
        }
        textarea {
          width: 100%;
          border: 1px solid;
          border-radius: 8px;
          padding: 12px;
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          resize: vertical;
        }
        @media(max-width: 768px){
          textarea {
            font-size: 16px;
          }
        }

        /* أزرار */
        .btn-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .btn {
          flex: 1;
          padding: 12px;
          border: none;
          font-weight: bold;
          border-radius: 8px;
          font-size: 1rem;
          min-height:44px;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn-primary { background: #38bdf8; color: #0f172a; }
        .btn-secondary { background: #475569; color: #f1f5f9; }
        .btn-accent { background: #10b981; color: white; }

        /* رأس التشخيص */
        .diagnosis-header {
          border-bottom: 2px solid rgba(148, 163, 184, 0.2);
          padding-bottom: 15px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .diagnosis-title {
          font-size: 1.4rem;
          color: #38bdf8;
          font-weight: 700;
        }
        /* النص */
        .explanation-text {
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        /* عناوين الكود */
        .code-block-title {
          font-size: 0.9rem;
          opacity: 0.7;
          margin-bottom: 6px;
        }
        pre {
          padding: 15px;
          border-radius: 8px;
          overflow-x: auto;
          max-width: 100%;
          font-family: 'Fira Code', monospace; 
          font-size: 14px;
          margin-bottom: 20px;
          box-sizing: border-box;
          white-space: pre-wrap;
          word-wra*p: break-word;
        }

        /* لون الإشارة */
        .rtl-dir pre.good { border-right: 4px solid #10b981; }
        .ltr-dir pre.good { border-left: 4px solid #10b981; }

        /* صندوق النصائح */
        .tip-box {
          background: rgba(56, 189, 248, 0.1);
          padding: 15px;
          border-radius: 8px;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #38bdf8;
        }
        /* لون الخط حسب الاتجاه */
        .rtl-dir .tip-box { border-right: 4px solid #38bdf8; }
        .ltr-dir .tip-box { border-left: 4px solid #38bdf8; }

        /* زر النسخ */
        .copy-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          font-weight: bold;
          min-height:36px;
          min-width: 70px;
        }

        /* استجابة للموبايل */
        @media(max-width: 480px){
          /* رأس الصفحة */
          header {
            flex-direction: column;
            align-items: flex-start;
          }
          header h1 {
            font-size: 1.5rem;
          }
          /* قائمة الاختيارات */
          .dropdown-trigger {
            padding: 12px 16px;
            font-size: 1rem;
            min-height: 44px;
          }
          .dropdown-search {
            padding: 10px 12px;
            font-size: 16px;
            width:100%;
            box-sizing: border-box;
          }
          /* عناصر التصفح */
          .dropdown-items-list {
            max-height: 150px;
            overflow-y: auto;
          }
          /* التبويبات */
          .tabs {
            width: 100%;
            flex-direction: column;
          }
          .tab-button {
            padding: 12px 10px;
            font-size: 1rem;
            min-height:44px;
            width:100%;
          }
          /* مساحة العمل */
          .workspace {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          /* بطاقات المحتوى */
          .card {
            padding: 12px;
          }
          /* عناصر النموذج */
          textarea {
            font-size: 16px;
            width:100%;
            box-sizing: border-box;
            padding: 12px;
            min-height:120px;
          }
          /* أزرار */
          .btn-group {
            flex-direction: column;
          }
          .btn {
            width: 100%;
            padding:14px 10px;
            font-size: 1rem;
            min-height:44px;
            box-sizing:border-box;
          }
          /* عناصر قائمة الاختيارات */
          .dropdown-menu {
            width: 100%;
            max-width: 100%;
          }
          /* نتائج التشخيص */
          .diagnosis-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .diagnosis-title {
            font-size: 1.2rem;
          }
          /* الخطوط والكود */
          pre {
            font-size: 14px;
            padding: 12px;
            overflow-x:auto;
            white-space:pre-wrap;
            word-wrap: break-word;
            max-width:100%;
            box-sizing:border-box;
          }
          @media(max-width:768){
          body{font-size:16px;}
          .container,work-space{width:100%; padding:15px;}
          .btn, .dropdown-trigger, .tab-button{
               width: 100%;
               min-height:44px;
               font-size: 16px;
               padding:12px;
          }
          input,textarea,select{
          width:100%;
          font-size:16px;
          box-sizing: border-box;
          }
          pre{
          font-size:14px;
          white-space:pre-wrap;
          word-wrap:break-word;
          overflow-x:auto;
          max-width:100%;
          }
          }
          @media(max-width:480px){
          header{flex-direction:column; gap:10px;}
          .tabs{flex-direction:column;}
          }
        }
      `}</style>

      {/* باقي الواجهة كما في الكود السابق... (نفس الهيكل) */}
      <div className="doctor-container">
        <header>
          {/* رأس الصفحة مع اختيار اللغة وتغيير الوضع */}
          <div>
            <h1>{text.title}</h1>
            <p style={{ color: '#94a3b8', marginTop: '5px' }}>{text.subtitle}</p>
          </div>
          <div className="controls">
            {/* قائمة اللغات */}
            <div className="custom-dropdown-container" ref={dropdownRef}>
              <button 
                className="dropdown-trigger" 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              >
                <span>🌐 {currentLangData.flag} {currentLangData.nativeName}</span>
              </button>
              {isLangDropdownOpen && (
                <div className="dropdown-menu">
                  <input 
                    type="text" 
                    className="dropdown-search" 
                    placeholder={text.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <div className="dropdown-items-list">
                    {filteredLanguages.map((item) => (
                      <div 
                        key={item.code} 
                        className={`dropdown-item ${item.code === lang ? 'selected' : ''}`}
                        onClick={() => handleLangSelect(item.code)}
                      >
                        <span>{item.flag}</span>
                        <span>{item.nativeName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* زر الوضع الليلي / النهاري */}
            <button className="toggle-btn" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </header>

        {/* التبويبات */}
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'doctor' ? 'active' : ''}`}
            onClick={() => { setActiveTab('doctor'); setDiagnosis(null); }}
          >
            {text.tabDoctor}
          </button>
          <button 
            className={`tab-button ${activeTab === 'optimizer' ? 'active' : ''}`}
            onClick={() => { setActiveTab('optimizer'); setDiagnosis(null); }}
          >
            {text.tabOptimizer}
          </button>
        </div>

        {/* مساحة العمل */}
        <div className="workspace">
          {/* القسم الأيسر */}
          <div className="card">
            {activeTab === 'doctor' && (
              <div className="form-group">
                <label>{text.errorLabel}</label>
                <textarea 
                  rows="3" 
                  placeholder={text.errorPlaceholder}
                  value={errorMessage}
                  onChange={(e) => setErrorMessage(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label>{text.codeLabel}</label>
              <textarea 
                rows="8" 
                placeholder={text.codePlaceholder}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            {/* الأزرار */}
            <div className="btn-group">
              {activeTab === 'doctor' ? (
                <button className="btn btn-primary" onClick={handleDiagnose}>{text.diagnoseBtn}</button>
              ) : (
                <>
                  <button className="btn btn-primary" onClick={handleOptimize}>{text.optimizeBtn}</button>
                  <button className="btn btn-accent" onClick={handleFormat}>{text.formatBtn}</button>
                </>
              )}
              <button className="btn btn-secondary" onClick={handleReset}>{text.resetBtn}</button>
            </div>
          </div>

          {/* القسم الأيمن للنتائج */}
          <div className="card" style={{ display: diagnosis ? 'block' : 'flex', alignItems: 'center', justifyContent: 'center', textAlign: diagnosis ? (lang === 'ar' ? 'right' : 'left') : 'center' }}>
            {diagnosis ? (
              <div>
                <div className="diagnosis-header">
                  <div className="diagnosis-title">{diagnosis.title}</div>
                  <button className="copy-btn" onClick={copyToClipboard}>
                    {copied ? text.copiedText : text.copyBtn}
                  </button>
                </div>
                <p className="explanation-text">{diagnosis.explanation}</p>
                <div className="code-block-title">{text.badCodeTitle}</div>
                <pre><code>{diagnosis.badCode}</code></pre>
                <div className="code-block-title" style={{ color: '#10b981' }}>{text.goodCodeTitle}</div>
                <pre className="good"><code>{diagnosis.goodCode}</code></pre>
                <div className="tip-box">
                  <strong>{text.tipTitle}</strong>
                  <p style={{ marginTop: '5px', color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>{diagnosis.tip}</p>
                </div>
              </div>
            ) : (
              <div style={{ color: '#64748b' }}>
                <span style={{ fontSize: '3.5rem' }}>{activeTab === 'doctor' ? '🔬' : '⚡'}</span>
                <p style={{ marginTop: '15px', fontSize: '1.1rem' }}>
                  {activeTab === 'doctor' ? text.placeholderDoctor : text.placeholderOptimizer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
