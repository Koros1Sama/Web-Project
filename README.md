# عالم الأنمي - موقع ويب بسيط (بدون JavaScript)

## وصف المشروع
موقع ويب بسيط عن الأنمي يحقق جميع متطلبات مقرر تصميم الويب. الموقع مصمم ليكون بسيط ومنظم وسهل الفهم للمبتدئين، مع التركيز على HTML و CSS فقط.

## المتطلبات المحققة

### هيكل المشروع
- ✅ مجلدات أساسية: html, css, images
- ✅ 6 صفحات: Home, About, Services, Contact, Login, Register

### HTML
- ✅ HTML Layout: header, nav, section, aside, footer
- ✅ عناصر HTML أساسية: عناوين، فقرات، جداول، قوائم

### CSS
- ✅ Flexbox في عدة صفحات (الشبكة، الخدمات، الاتصال)
- ✅ Media Queries للاستجابة (768px و 480px)

### المكتبات الخارجية
- ✅ Font Awesome في صفحة Contact

## الميزات التي تم إزالتها (كانت تعتمد على JavaScript)
- التحقق من صحة البيانات في Login و Register
- Toast Notification للنجاح والأخطاء
- Modal مع Ajax simulation
- WowSlider في الصفحة الرئيسية (تم استبداله بصورة ثابتة)
- Bootstrap (تم استبدال البطاقة بزر وستايل CSS عادي)
- jQuery

## كيفية التشغيل
1. افتح ملف `index.html` في المتصفح.
2. تصفح الصفحات المختلفة من خلال القائمة.

## هيكل الملفات
```
anime_website/
├── index.html          # الصفحة الرئيسية
├── css/
│   └── style.css       # الأنماط الرئيسية
├── html/
│   ├── about.html      # صفحة من نحن
│   ├── services.html   # صفحة الخدمات
│   ├── contact.html    # صفحة الاتصال
│   ├── login.html      # صفحة تسجيل الدخول
│   └── register.html   # صفحة إنشاء الحساب
├── images/
│   ├── anime1.jpg      # صورة ناروتو
│   ├── anime2.jpg      # صورة ون بيس
│   └── anime3.jpg      # صورة أتاك أون تايتان
└── README.md           # هذا الملف
```

## المميزات
- تصميم متجاوب يعمل على جميع الأجهزة
- واجهة باللغة العربية مع دعم RTL
- كود منظم وسهل القراءة
- جاهز للرفع على GitHub

## التقنيات المستخدمة
- HTML5
- CSS3 (Flexbox, Media Queries)
- Font Awesome 6.0

## المطور
مشروع تعليمي لمقرر تصميم الويب

