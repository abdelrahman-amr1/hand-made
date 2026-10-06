# متجر المشغولات اليدوية (Handmade Store) 🛍️✨

مشروع متجر إلكتروني بتصميم عصري وأنيق يعتمد على تأثير **الزجاج الملون والشفاف (Glassmorphism)**. تم بناء المتجر ليكون واجهة أمامية سريعة وخفيفة تعمل مباشرة على المتصفح وتستمد بياناتها ديناميكياً من قاعدة بيانات مجانية بالكامل.

## 🌟 مميزات المشروع

- **تصميم Glassmorphism**: واجهة زجاجية جذابة تضفي طابعاً احترافياً وحديثاً للمتجر.
- **قاعدة بيانات مجانية**: يستخدم المتجر **Google Sheets** كقاعدة بيانات (عن طريق Google Apps Script)، مما يسهل على أصحاب المتجر تعديل المنتجات، الأسعار، والصور وكأنهم يستخدمون برنامج Excel عادي.
- **تجاوب كامل (Responsive)**: يعمل بكفاءة على جميع الشاشات (الموبايل، التابلت، والكمبيوتر).
- **لا يحتاج لخوادم (Serverless)**: بما أنه يعتمد على ملفات Static (HTML/CSS/JS) يمكن استضافته مجاناً على منصات مثل **GitHub Pages** أو **Vercel**.
- **حقوق الملكية الفكرية**: المشروع من هندسة المهندسة هاجر محمود والمهندسة إسراء محمود.

## 🛠️ التقنيات المستخدمة

- **الواجهة الأمامية (Frontend)**:
  - HTML5
  - CSS3 (بتأثيرات الـ Backdrop Filter)
  - Vanilla JavaScript (للتفاعل وجلب البيانات عبر الـ API)

- **الخادم وقاعدة البيانات (Backend & Database)**:
  - Google Sheets (لتخزين بيانات المنتجات)
  - Google Apps Script (لتحويل بيانات الشيت إلى JSON API)

## 🚀 كيفية تشغيل المشروع

بما أن المشروع لا يحتوي على خوادم خلفية (Backend)، تشغيله بغاية السهولة:

1. قم بتحميل الملفات.
2. انقر نقراً مزدوجاً على ملف `index.html` ليتم فتحه في أي متصفح.
3. المتجر سيقوم تلقائياً بجلب أحدث المنتجات من Google Sheets وعرضها للعملاء.

## 📂 هيكل الملفات

```text
├── index.html       # هيكل الصفحة الرئيسي والتخطيط العام
├── style.css        # التنسيقات وتأثيرات Glassmorphism والخلفية التفاعلية
├── script.js        # كود الجافاسكريبت لجلب البيانات (Fetch) وإدارة سلة التسوق
└── README.md        # دليل المشروع (هذا الملف)
```

## 🔗 طريقة ربط المتجر بـ Google Sheets الخاص بك

إذا أردت إنشاء نسختك الخاصة من قاعدة البيانات، اتبع الخطوات التالية:

1. أنشئ ملف **Google Sheets** جديد.
2. اجعل الصف الأول يحتوي على أسماء الأعمدة التالية بالضبط:
   - `id` (رقم المنتج)
   - `name` (اسم المنتج)
   - `price` (سعر المنتج)
   - `image_url` (رابط صورة المنتج)
3. اذهب إلى `Extensions` > `Apps Script` والصق الكود التالي:

   ```javascript
   function doGet() {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = sheet.getDataRange().getValues();
     
     const keys = data[0];
     const products = data.slice(1).map(row => {
       let obj = {};
       keys.forEach((key, i) => obj[key] = row[i]);
       return obj;
     });
     
     return ContentService.createTextOutput(JSON.stringify(products))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
4. اضغط على `Deploy` -> `New Deployment` -> اختر `Web App`.
5. اجعل الصلاحيات (Who has access) إلى **Anyone**.
6. انسخ الرابط الناتج وضعه في المتغير `apiUrl` الموجود داخل ملف `script.js`.

---
*تم تصميم وتطوير هذا المشروع ليكون حجر الأساس لمنصة SaaS متكاملة لدعم منتجات الحرف اليدوية في المستقبل.*
