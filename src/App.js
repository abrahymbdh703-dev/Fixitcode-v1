import React, { useState, useEffect, useRef } from 'react';

// الترجمة الكاملة للواجهة لجميع اللغات (الشرقية والغربية)
const TRANSLATIONS = {
  ar: {
    title: 'FixitCode 🩺',
    subtitle: 'أداة المطور الشاملة: شخّص أخطاء الكود، حسّنه، ونسّقه بضغطة واحدة!',
    tabDoctor: '🩺 تصليح الكود',
    tabOptimizer: '⚡ مُحسّن الكود',
    errorLabel: '1. رسالة الخطأ التي تظهر لك (أياً كانت لغة البرمجة):',
    errorPlaceholder: "مثال: IndentationError أو Cannot read properties of undefined",
    codeLabel: '2. الكود البرمجي (اختياري لطبيب الأخطاء / إجباري للمُحسّن):',
    codePlaceholder: 'ألصق كود الـ Javascript أو Python هنا...',
    diagnoseBtn: 'تشخيص المشكله ✨',
    optimizeBtn: 'تحليل وتحسين الكود 🚀',
    formatBtn: 'تنسيق الكود 🧹',
    resetBtn: 'مسح الكل',
    badCodeTitle: '❌ الكود قبل التعديل:',
    goodCodeTitle: '✔️ الكود المقترح بعد الإصلاح/التحسين:',
    tipTitle: '💡 نصيحة المساعد الذكي:',
    unknownTitle: 'خطأ غير معروف برمجياً 🧩',
    unknownExplanation: 'يبدو أن هذا الخطأ محدد جداً بمشروعك. جرب مراجعة السطر المذكور في رسالة الخطأ بدقة.',
    unknownGood: '// نصيحة عامة:\n// تأكد من مراجعة تهجئة أسماء المتغيرات والدوال ومطابقة الأقواس.',
    unknownTip: 'انسخ رسالة الخطأ وابحث عنها في ملفات مشروعك لتحديد مكان المشكلة بدقة.',
    alertEmptyError: 'من فضلك أدخل رسالة الخطأ أولاً لتشخيصها!',
    alertEmptyCode: 'من فضلك أدخل كوداً أولاً لتحليله أو تنسيقه!',
    placeholderDoctor: 'أدخل الخطأ على اليمين ودع الطبيب يشخص المشكلة ويعطيك الوصفة العلاجية فوراً!',
    placeholderOptimizer: 'ألصق كودك على اليمين واضغط "تحليل وتحسين" لمعرفة كيف تجعله أسرع وأنظف!',
    optNoIssues: 'الكود الخاص بك يبدو ممتازاً ولم نجد فيه تحسينات برمجية واضحة حالياً! 🌟',
    copyBtn: 'نسخ الكود المقترح 📋',
    copiedText: 'تم النسخ! ➔',
    searchPlaceholder: 'ابحث عن اللغة...',
    selectLang: 'اختر اللغة'
  },
  en: {
    title: 'FixitCode 🩺',
    subtitle: 'Multi-language Developer Tool: Diagnose, optimize, and format in one click!',
    tabDoctor: '🩺 Error Doctor',
    tabOptimizer: '⚡ Code Optimizer',
    errorLabel: '1. The Error Message you received (Any language):',
    errorPlaceholder: "e.g., IndentationError or Cannot read properties of undefined",
    codeLabel: '2. Your Code (Optional for Doctor / Required for Optimizer):',
    codePlaceholder: 'Paste your Javascript or Python code here...',
    diagnoseBtn: 'Diagnose Error ✨',
    optimizeBtn: 'Optimize Code 🚀',
    formatBtn: 'Format Code 🧹',
    resetBtn: 'Clear All',
    badCodeTitle: '❌ Code Before:',
    goodCodeTitle: '✔️ Suggested Fix / Optimized Code:',
    tipTitle: '💡 Smart Assistant\'s Tip:',
    unknownTitle: 'Unknown Error 🧩',
    unknownExplanation: 'This error seems highly specific to your setup. Please verify syntax, file imports, and variables.',
    unknownGood: '// General Advice:\n// Ensure all variables and functions are spelled correctly and scopes are valid.',
    unknownTip: 'Copy the error message and search inside your project files to locate the exact issue.',
    alertEmptyError: 'Please enter an error message first to diagnose!',
    alertEmptyCode: 'Please paste some code first to analyze or format!',
    placeholderDoctor: 'Enter the error message and let the doctor diagnose the issue!',
    placeholderOptimizer: 'Paste your code and click "Optimize" to make it faster and cleaner!',
    optNoIssues: 'Your code looks great! No obvious optimizations found. 🌟',
    copyBtn: 'Copy Code 📋',
    copiedText: 'Copied! ➔',
    searchPlaceholder: 'Search language...',
    selectLang: 'Select Language'
  },
  fr: {
    title: 'FixitCode 🩺',
    subtitle: 'Outil de développement multilingue : diagnostiquez, optimisez et formatez en un clic !',
    tabDoctor: '🩺 Docteur Erreur',
    tabOptimizer: '⚡ Optimiseur de Code',
    errorLabel: '1. Le message d\'erreur reçu (n\'importe quel langage) :',
    errorPlaceholder: "Ex: IndentationError ou Cannot read properties of undefined",
    codeLabel: '2. Votre Code (Optionnel pour le Docteur / Requis pour l\'Optimiseur) :',
    codePlaceholder: 'Collez votre code Javascript ou Python ici...',
    diagnoseBtn: 'Diagnostiquer l\'erreur ✨',
    optimizeBtn: 'Optimiser le Code 🚀',
    formatBtn: 'Formater le Code 🧹',
    resetBtn: 'Tout Effacer',
    badCodeTitle: '❌ Code Avant :',
    goodCodeTitle: '✔️ Correction suggérée / Code Optimisé :',
    tipTitle: '💡 Conseil de l\'Assistant :',
    unknownTitle: 'Erreur Inconnue 🧩',
    unknownExplanation: 'Cette erreur semble très spécifique à votre configuration. Veuillez vérifier la syntaxe.',
    unknownGood: '// Conseil Général :\n// Assurez-vous que les variables et fonctions sont correctement orthographiées.',
    unknownTip: 'Copiez le message d\'erreur et cherchez-le dans vos fichiers de projet.',
    alertEmptyError: 'Veuillez saisir un message d\'erreur d\'abord !',
    alertEmptyCode: 'Veuillez coller du code d\'abord !',
    placeholderDoctor: 'Entrez l\'erreur et laissez le docteur diagnostiquer le problème !',
    placeholderOptimizer: 'Collez votre code et cliquez sur "Optimiser" pour le rendre plus propre !',
    optNoIssues: 'Votre code est excellent ! Aucune optimisation évidente trouvée. 🌟',
    copyBtn: 'Copier le Code 📋',
    copiedText: 'Copié ! ➔',
    searchPlaceholder: 'Rechercher une langue...',
    selectLang: 'Choisir la langue'
  },
  es: {
    title: 'FixitCode 🩺',
    subtitle: 'Herramienta de desarrollo multilenguaje: ¡diagnostica, optimiza y formatea en un clic!',
    tabDoctor: '🩺 Doctor de Errores',
    tabOptimizer: '⚡ Optimizador de Código',
    errorLabel: '1. El mensaje de error que recibiste (cualquier idioma):',
    errorPlaceholder: "Ej: IndentationError o Cannot read properties of undefined",
    codeLabel: '2. Tu Código (Opcional para Doctor / Requerido para Optimizador):',
    codePlaceholder: 'Pega tu código Javascript o Python aquí...',
    diagnoseBtn: 'Diagnosticar Error ✨',
    optimizeBtn: 'Optimizar Código 🚀',
    formatBtn: 'Formatear Código 🧹',
    resetBtn: 'Borrar Todo',
    badCodeTitle: '❌ Código Antes:',
    goodCodeTitle: '✔️ Corrección Sugerida / Código Optimizado:',
    tipTitle: '💡 Consejo del Asistente:',
    unknownTitle: 'Error Desconocido 🧩',
    unknownExplanation: 'Este error parece muy específico de tu entorno. Por favor verifica la sintaxis.',
    unknownGood: '// Consejo General:\n// Asegúrate de que las variables y funciones estén bien escritas.',
    unknownTip: 'Copia el mensaje de error y búscalo en los archivos de tu proyecto.',
    alertEmptyError: '¡Por favor ingresa un mensaje de error primero!',
    alertEmptyCode: '¡Por favor pega algún código primero!',
    placeholderDoctor: '¡Ingresa el error y deja que el doctor lo diagnostique!',
    placeholderOptimizer: '¡Pega tu código y haz clic en "Optimizar" para mejorarlo!',
    optNoIssues: '¡Tu código se ve genial! No se encontraron optimizaciones obvias. 🌟',
    copyBtn: 'Copiar Código 📋',
    copiedText: '¡Copiado! ➔',
    searchPlaceholder: 'Buscar idioma...',
    selectLang: 'Seleccionar idioma'
  },
  de: {
    title: 'FixitCode 🩺',
    subtitle: 'Mehrsprachiges Entwickler-Tool: Diagnose, Optimierung und Formatierung mit einem Klick!',
    tabDoctor: '🩺 Fehler-Doktor',
    tabOptimizer: '⚡ Code-Optimierer',
    errorLabel: '1. Die erhaltene Fehlermeldung (beliebige Sprache):',
    errorPlaceholder: "z.B. IndentationError oder Cannot read properties of undefined",
    codeLabel: '2. Ihr Code (Optional für Doktor / Erforderlich für Optimierer):',
    codePlaceholder: 'Fügen Sie Ihren Javascript- oder Python-Code hier ein...',
    diagnoseBtn: 'Fehler diagnostizieren ✨',
    optimizeBtn: 'Code optimieren 🚀',
    formatBtn: 'Code formatieren 🧹',
    resetBtn: 'Alles löschen',
    badCodeTitle: '❌ Code Vorher:',
    goodCodeTitle: '✔️ Vorschlag / Optimierter Code:',
    tipTitle: '💡 Tipp des Assistenten:',
    unknownTitle: 'Unbekannter Fehler 🧩',
    unknownExplanation: 'Dieser Fehler scheint sehr spezifisch für Ihr Setup zu sein. Bitte Syntax prüfen.',
    unknownGood: '// Allgemeiner Rat:\n// Stellen Sie sicher, dass Variablen und Funktionen richtig geschrieben sind.',
    unknownTip: 'Kopieren Sie die Fehlermeldung und suchen Sie in Ihren Projektdateien.',
    alertEmptyError: 'Bitte geben Sie zuerst eine Fehlermeldung ein!',
    alertEmptyCode: 'Bitte fügen Sie zuerst Code ein!',
    placeholderDoctor: 'Geben Sie den Fehler ein und lassen Sie den Doktor das Problem diagnostizieren!',
    placeholderOptimizer: 'Fügen Sie Ihren Code ein und klicken Sie auf "Optimieren"!',
    optNoIssues: 'Ihr Code sieht hervorragend aus! Keine Optimierungen gefunden. 🌟',
    copyBtn: 'Code kopieren 📋',
    copiedText: 'Kopiert! ➔',
    searchPlaceholder: 'Sprache suchen...',
    selectLang: 'Sprache auswählen'
  },
  it: {
    title: 'FixitCode 🩺',
    subtitle: 'Strumento per sviluppatori multilingue: diagnostica, ottimizza e formatta con un clic!',
    tabDoctor: '🩺 Dottore degli Errori',
    tabOptimizer: '⚡ Ottimizzatore di Codice',
    errorLabel: '1. Il messaggio di errore ricevuto (qualsiasi linguaggio):',
    errorPlaceholder: "Es: IndentationError o Cannot read properties of undefined",
    codeLabel: '2. Il tuo Codice (Opzionale per Dottore / Richiesto per Ottimizzatore):',
    codePlaceholder: 'Incolla qui il tuo codice Javascript o Python...',
    diagnoseBtn: 'Diagnostica Errore ✨',
    optimizeBtn: 'Ottimizza Codice 🚀',
    formatBtn: 'Formatta Codice 🧹',
    resetBtn: 'Cancella Tutto',
    badCodeTitle: '❌ Codice Prima:',
    goodCodeTitle: '✔️ Correzione Suggerita / Codice Ottimizzato:',
    tipTitle: '💡 Suggerimento dell\'Assistente:',
    unknownTitle: 'Errore Sconosciuto 🧩',
    unknownExplanation: 'Questo errore sembra molto specifico per la tua configurazione. Verifica la sintaxi.',
    unknownGood: '// Consiglio Generale:\n// Assicurati che variabili e funzioni siano scritte correttamente.',
    unknownTip: 'Copia il messaggio di errore e cercalo nei file del tuo progetto.',
    alertEmptyError: 'Inserisci prima un messaggio di errore!',
    alertEmptyCode: 'Incolla prima del codice!',
    placeholderDoctor: 'Inserisci l\'errore e lascia che il dottore lo diagnostichi!',
    placeholderOptimizer: 'Incolla il codice e clicca su "Ottimizza" per migliorarlo!',
    optNoIssues: 'Il tuo codice è fantastico! Nessuna ottimizzazione evidente trovata. 🌟',
    copyBtn: 'Copia Codice 📋',
    copiedText: 'Copiato! ➔',
    searchPlaceholder: 'Cerca lingua...',
    selectLang: 'Seleziona lingua'
  },
  pt: {
    title: 'FixitCode 🩺',
    subtitle: 'Ferramenta de desenvolvedor multilíngue: diagnostique, otimize e formate em um clique!',
    tabDoctor: '🩺 Doutor de Erros',
    tabOptimizer: '⚡ Otimizador de Código',
    errorLabel: '1. Mensagem de erro recebida (qualquer linguagem):',
    errorPlaceholder: "Ex: IndentationError ou Cannot read properties of undefined",
    codeLabel: '2. Seu Código (Opcional para o Doutor / Obrigatório para o Otimizador):',
    codePlaceholder: 'Cole seu código Javascript ou Python aqui...',
    diagnoseBtn: 'Diagnosticar Erro ✨',
    optimizeBtn: 'Otimizar Código 🚀',
    formatBtn: 'Formatar Código 🧹',
    resetBtn: 'Limpar Tudo',
    badCodeTitle: '❌ Código Antes:',
    goodCodeTitle: '✔️ Correção Sugerida / Código Otimizado:',
    tipTitle: '💡 Dica do Assistente Inteligente:',
    unknownTitle: 'Erro Desconhecido 🧩',
    unknownExplanation: 'Este erro parece muito específico da sua configuração. Verifique a sintaxe.',
    unknownGood: '// Conselho Geral:\n// Certifique-se de que variáveis e funções estão escritas corretamente.',
    unknownTip: 'Copie a mensagem de erro e procure nos arquivos do seu projeto.',
    alertEmptyError: 'Por favor, insira uma mensagem de erro primeiro!',
    alertEmptyCode: 'Por favor, cole algum código primeiro!',
    placeholderDoctor: 'Insira o erro e deixe o doutor diagnosticar o problema!',
    placeholderOptimizer: 'Cole seu código e clique em "Otimizar" para deixá-lo mais rápido!',
    optNoIssues: 'Seu código está ótimo! Nenhuma otimização óbvia encontrada. 🌟',
    copyBtn: 'Copiar Código 📋',
    copiedText: 'Copiado! ➔',
    searchPlaceholder: 'Buscar idioma...',
    selectLang: 'Selecionar idioma'
  },
  hi: {
    title: 'फ़िक्सิตकोड 🩺',
    subtitle: 'बहुभाषी डेवलपर टूल: त्रुटि निदान, अनुकूलन और स्वरूपण एक क्लिक में!',
    tabDoctor: '🩺 त्रुटि डॉक्टर',
    tabOptimizer: '⚡ कोड अनुकूलक',
    errorLabel: '1. आपको प्राप्त त्रुटि संदेश (कोई भी भाषा):',
    errorPlaceholder: "उदा., IndentationError या Cannot read properties of undefined",
    codeLabel: '2. आपका कोड (डॉक्टर के लिए वैकल्पिक / अनुकूलक के लिए आवश्यक):',
    codePlaceholder: 'अपना जावास्क्रिप्ट या पायथन कोड यहाँ पेस्ट करें...',
    diagnoseBtn: 'त्रुटि का निदान करें ✨',
    optimizeBtn: 'कोड अनुकूलित करें 🚀',
    formatBtn: 'कोड प्रारूपित करें 🧹',
    resetBtn: 'सभी साफ करें',
    badCodeTitle: '❌ पहले का कोड:',
    goodCodeTitle: '✔️ सुझाया गया सुधार / अनुकूलित कोड:',
    tipTitle: '💡 स्मार्ट सहायक की सलाह:',
    unknownTitle: 'अज्ञानता त्रुटि 🧩',
    unknownExplanation: 'यह त्रुटि आपके सेटअप के लिए बहुत विशिष्ट लगती है। कृपया सिंटैक्स सत्यापित करें।',
    unknownGood: '// सामान्य सलाह:\n// सुनिश्चित करें कि सभी वेरिएबल सही लिखे गए हैं।',
    unknownTip: 'त्रुटि संदेश को कॉपी करें और अपने प्रोजेक्ट में खोजें।',
    alertEmptyError: 'कृपया पहले त्रुटि दर्ज करें!',
    alertEmptyCode: 'कृपया पहले कोड दर्ज करें!',
    placeholderDoctor: 'त्रुटि संदेश दर्ज करें और डॉक्टर को निदान करने दें!',
    placeholderOptimizer: 'अपना कोड पेस्ट करें और "अनुकूलित करें" पर क्लिक करें!',
    optNoIssues: 'आपका कोड बहुत बढ़िया है! 🌟',
    copyBtn: 'कोड कॉपी करें 📋',
    copiedText: 'कॉपी किया गया! ➔',
    searchPlaceholder: 'भाषा खोजें...',
    selectLang: 'भाषा चुनें'
  },
  tr: {
    title: 'FixitCode 🩺',
    subtitle: 'Çok Dilli Geliştirici Aracı: Hataları teşhis edin, optimize edin ve tek tıkla biçimlendirin!',
    tabDoctor: '🩺 Hata Doktoru',
    tabOptimizer: '⚡ Kod Optimizasyonu',
    errorLabel: '1. Aldığınız Hata Mesajı (Herhangi bir dil):',
    errorPlaceholder: "Örn: IndentationError veya Cannot read properties of undefined",
    codeLabel: '2. Kodunuz (Doktor için isteğe bağlı / Optimizasyon için zorunlu):',
    codePlaceholder: 'Javascript veya Python kodunuzu buraya yapıştırın...',
    diagnoseBtn: 'Hatayı Teşhis Et ✨',
    optimizeBtn: 'Kodu Optimize Et 🚀',
    formatBtn: 'Kodu Biçimlendir 🧹',
    resetBtn: 'Hepsini Temizle',
    badCodeTitle: '❌ Önceki Kod:',
    goodCodeTitle: '✔️ Önerilen Düzeltme / Optimize Kod:',
    tipTitle: '💡 Akıllı Asistanın İpucu:',
    unknownTitle: 'Bilinmeyen Hata 🧩',
    unknownExplanation: 'Bu hata sisteminize çok özel görünüyor. Lütfen sözdizimini kontrol edin.',
    unknownGood: '// Genel Tavsiye:\n// Tüm değişkenlerin doğru yazıldığından emin olun.',
    unknownTip: 'Hata mesajını kopyalayın ve proje dosyalarınızda arayın.',
    alertEmptyError: 'Lütfen önce hata mesajı girin!',
    alertEmptyCode: 'Lütfen önce kod yapıştırın!',
    placeholderDoctor: 'Hata mesajını girin ve doktorun teşhis etmesine izin verin!',
    placeholderOptimizer: 'Kodunuzu yapıştırın ve "Optimize Et"e tıklayın!',
    optNoIssues: 'Kodunuz harika görünüyor! Optimizasyon gerekmedi. 🌟',
    copyBtn: 'Kodu Kopyala 📋',
    copiedText: 'Kopyalandı! ➔',
    searchPlaceholder: 'Dil ara...',
    selectLang: 'Dil Seçin'
  }
};

const SUPPORTED_LANGUAGES = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' }
];

const ERROR_DATABASE = {
  'cannot read properties of undefined': {
    ar: {
      title: 'قراءة خاصية من عنصر غير معرف (JS/Node) 🚫',
      explanation: 'تحاول الوصول إلى خاصية داخل كائن (Object) قيمته الحالية undefined أو فارغة.',
      badCode: `const user = undefined;\nconsole.log(user.name);`,
      goodCode: `const user = undefined;\nconsole.log(user?.name); // الحل بـ Optional Chaining`,
      tip: 'استخدم علامة الاستفهام (?.) قبل النقطة لتجنب انهيار التطبيق.'
    },
    en: {
      title: 'Accessing property of Undefined (JS/Node) 🚫',
      explanation: 'You are trying to read a property from an object that is currently undefined or null.',
      badCode: `const user = undefined;\nconsole.log(user.name);`,
      goodCode: `const user = undefined;\nconsole.log(user?.name); // Fix with Optional Chaining`,
      tip: 'Always use Optional Chaining (?.) when fetching async data.'
    },
    fr: {
      title: 'Lecture d\'une propriété d\'un élément non défini (JS/Node) 🚫',
      explanation: 'Vous essayez d\'accéder à une propriété dans un objet qui est actuellement indéfini ou nul.',
      badCode: `const user = undefined;\nconsole.log(user.name);`,
      goodCode: `const user = undefined;\nconsole.log(user?.name); // Résolu par Optional Chaining`,
      tip: 'Utilisez l\'opérateur optionnel (?.) pour éviter les plantages d\'application.'
    },
    es: {
      title: 'Lectura de propiedad de un elemento no definido (JS/Node) 🚫',
      explanation: 'Estás intentando leer una propiedad de un objeto que actualmente es undefined o null.',
      badCode: `const user = undefined;\nconsole.log(user.name);`,
      goodCode: `const user = undefined;\nconsole.log(user?.name); // Solución con Optional Chaining`,
      tip: 'Utiliza el operador opcional (?.) para evitar que la aplicación falle.'
    },
    de: {
      title: 'Eigenschaft von undefiniertem Element lesen (JS/Node) 🚫',
      explanation: 'Sie versuchen, eine Eigenschaft aus einem Objekt zu lesen, das undefiniert oder null ist.',
      badCode: `const user = undefined;\nconsole.log(user.name);`,
      goodCode: `const user = undefined;\nconsole.log(user?.name); // Lösung durch Optional Chaining`,
      tip: 'Nutzen Sie die optionale Verkettung (?.) zur Vermeidung von Abstürzen.'
    },
    it: {
      title: 'Lettura proprietà di elemento non definito (JS/Node) 🚫',
      explanation: 'Stai tentando di accedere a una proprietà all\'interno di un oggetto attualmente indefinito o nullo.',
      badCode: `const user = undefined;\nconsole.log(user.name);`,
      goodCode: `const user = undefined;\nconsole.log(user?.name); // Risolto con Optional Chaining`,
      tip: 'Usa l\'operatore (?.) per evitare crash improvvisi dell\'applicazione.'
    },
    pt: {
      title: 'Lendo propriedade de elemento indefinido (JS/Node) 🚫',
      explanation: 'Você está tentando acessar uma propriedade dentro de um objeto que é indefinido ou nulo.',
      badCode: `const user = undefined;\nconsole.log(user.name);`,
      goodCode: `const user = undefined;\nconsole.log(user?.name); // Resolvido com Optional Chaining`,
      tip: 'Utilize o operador opcional (?.) para garantir a estabilidade do app.'
    }
  }
};

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
          transition: background 0.3s ease, color 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }

        /* تأثير الخلفية المتدفقة والمتحركة ديناميكياً */
        @keyframes dynamicGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .app-wrapper {
          min-height: 100vh;
          padding: 40px 20px;
          font-family: 'Cairo', sans-serif;
          background-size: 400% 400% !important;
          animation: dynamicGradient 15s ease infinite !important;
        }

        /* إعدادات الخلفية للوضعين المظلم والمضيء */
        .dark-theme {
          background: linear-gradient(-45deg, #0f172a, #1e1b4b, #311042, #0f172a);
          color: #e2e8f0;
        }

        .light-theme {
          background: linear-gradient(-45deg, #f8fafc, #e0f2fe, #f3e8ff, #f8fafc);
          color: #1e293b;
        }

        .rtl-dir { direction: rtl; }
        .ltr-dir { direction: ltr; }

        /* تأثير التنفس المحسن والسلس */
        @keyframes breathe {
          0% { transform: scale(1); }
          50% { transform: scale(1.018); box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25); }
          100% { transform: scale(1); }
        }

        /* تفعيل التنفس عند مرور الماوس على العناصر التفاعلية */
        .card:hover,
        .btn:hover,
        .toggle-btn:hover,
        .dropdown-trigger:hover,
        .tab-button:hover,
        textarea:focus,
        .dropdown-item:hover {
          animation: breathe 1.5s ease-in-out infinite;
        }

        .dark-theme .card { background: rgba(30, 41, 59, 0.7); border-color: rgba(51, 65, 85, 0.5); backdrop-filter: blur(10px); }
        .dark-theme textarea { background: rgba(15, 23, 42, 0.6); border-color: #475569; color: #f1f5f9; }
        .dark-theme pre { background: rgba(15, 23, 42, 0.8); }

        .light-theme .card { background: rgba(255, 255, 255, 0.8); border-color: rgba(226, 232, 240, 0.8); box-shadow: 0 10px 25px rgba(0,0,0,0.03); backdrop-filter: blur(10px); }
        .light-theme textarea { background: rgba(241, 245, 249, 0.8); border-color: #cbd5e1; color: #0f172a; }
        .light-theme pre { background: rgba(241, 245, 249, 0.9); }

        .doctor-container { max-width: 1100px; margin: 0 auto; }

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

        header h1 { font-size: 2.2rem; color: #38bdf8; font-weight: 800; }

        .controls { display: flex; gap: 10px; align-items: center; }

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
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .light-theme .dropdown-menu {
          background: #ffffff;
          border-color: #cbd5e1;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .dropdown-search {
          width: 100%;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #475569;
          background: #0f172a;
          color: #e2e8f0;
          font-size: 0.85rem;
          outline: none;
        }

        .light-theme .dropdown-search {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #0f172a;
        }

        .dropdown-items-list {
          max-height: 200px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .dropdown-item {
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #e2e8f0;
        }

        .light-theme .dropdown-item {
          color: #1e293b;
        }

        .dropdown-item.selected {
          background: #38bdf8;
          color: #0f172a;
        }

        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
          background: rgba(148, 163, 184, 0.1);
          padding: 6px;
          border-radius: 12px;
          width: fit-content;
        }

        .tab-button {
          background: none;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          color: #94a3b8;
          cursor: pointer;
        }

        .tab-button.active { background: #38bdf8; color: #0f172a; }

        .workspace { display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px; }

        @media (max-width: 768px) { .workspace { grid-template-columns: 1fr; } }

        .card { 
          border: 1px solid; 
          border-radius: 16px; 
          padding: 24px;
        }

        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; opacity: 0.8; }

        textarea {
          width: 100%;
          border: 1px solid;
          border-radius: 8px;
          padding: 12px;
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          resize: vertical;
          outline: none;
        }

        textarea:focus { border-color: #38bdf8; }

        .btn-group { display: flex; gap: 10px; flex-wrap: wrap; }

        .btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-primary { background: #38bdf8; color: #0f172a; }
        .btn-secondary { background: #475569; color: #f1f5f9; }
        .btn-accent { background: #10b981; color: white; }

        .diagnosis-header {
          border-bottom: 2px solid rgba(148, 163, 184, 0.2);
          padding-bottom: 15px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .diagnosis-title { font-size: 1.4rem; color: #38bdf8; font-weight: 700; }
        .explanation-text { font-size: 1.05rem; line-height: 1.8; margin-bottom: 20px; }
        .code-block-title { font-size: 0.9rem; opacity: 0.7; margin-bottom: 6px; }

        pre { padding: 15px; border-radius: 8px; overflow-x: auto; font-family: 'Fira Code', monospace; font-size: 0.85rem; margin-bottom: 20px; }

        .rtl-dir pre { border-right: 4px solid #ef4444; }
        .ltr-dir pre { border-left: 4px solid #ef4444; }

        .rtl-dir pre.good { border-right-color: #10b981; }
        .ltr-dir pre.good { border-left-color: #10b981; }

        .tip-box { background: rgba(56, 189, 248, 0.1); padding: 15px; border-radius: 8px; font-size: 0.95rem; line-height: 1.6; color: #38bdf8; }
        .rtl-dir .tip-box { border-right: 4px solid #38bdf8; }
        .ltr-dir .tip-box { border-left: 4px solid #38bdf8; }

        .copy-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          font-weight: bold;
        }
      `}</style>

      <div className="doctor-container">
        <header>
          <div>
            <h1>{text.title}</h1>
            <p style={{ color: '#94a3b8', marginTop: '5px' }}>{text.subtitle}</p>
          </div>
          <div className="controls">
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

            <button className="toggle-btn" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </header>

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

        <div className="workspace">
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