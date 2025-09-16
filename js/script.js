// JavaScript للموقع - عالم الأنمي

// متغيرات عامة
let currentSlide = 0;
const slides = document.querySelectorAll('.ws_images li');

// تهيئة الموقع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeForms();
    initializeModal();
    initializeToast();
    initializeJQuery();
});

// تهيئة عارض الصور (WowSlider)
function initializeSlider() {
    if (slides.length > 0) {
        // إنشاء أزرار التنقل
        createSliderControls();
        
        // بدء التشغيل التلقائي
        setInterval(nextSlide, 4000);
    }
}

// إنشاء أزرار التحكم في عارض الصور
function createSliderControls() {
    const container = document.getElementById('wowslider-container');
    if (!container) return;
    
    // إنشاء الأزرار
    const prevBtn = document.createElement('button');
    prevBtn.className = 'ws_prev';
    prevBtn.innerHTML = '❮';
    prevBtn.onclick = prevSlide;
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'ws_next';
    nextBtn.innerHTML = '❯';
    nextBtn.onclick = nextSlide;
    
    // إنشاء النقاط
    const bullets = document.createElement('div');
    bullets.className = 'ws_bullets';
    
    for (let i = 0; i < slides.length; i++) {
        const bullet = document.createElement('div');
        if (i === 0) bullet.className = 'ws_overbull';
        bullet.onclick = () => goToSlide(i);
        bullets.appendChild(bullet);
    }
    
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
    container.appendChild(bullets);
}

// الانتقال للشريحة التالية
function nextSlide() {
    if (slides.length === 0) return;
    
    slides[currentSlide].style.opacity = '0';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.opacity = '1';
    updateBullets();
}

// الانتقال للشريحة السابقة
function prevSlide() {
    if (slides.length === 0) return;
    
    slides[currentSlide].style.opacity = '0';
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    slides[currentSlide].style.opacity = '1';
    updateBullets();
}

// الانتقال لشريحة محددة
function goToSlide(index) {
    if (slides.length === 0) return;
    
    slides[currentSlide].style.opacity = '0';
    currentSlide = index;
    slides[currentSlide].style.opacity = '1';
    updateBullets();
}

// تحديث النقاط
function updateBullets() {
    const bullets = document.querySelectorAll('.ws_bullets div');
    bullets.forEach((bullet, index) => {
        bullet.className = index === currentSlide ? 'ws_overbull' : '';
    });
}

// تهيئة النماذج والتحقق من صحة البيانات
function initializeForms() {
    // نموذج تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // نموذج إنشاء الحساب
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
}

// معالجة تسجيل الدخول
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // مسح الأخطاء السابقة
    clearErrors();
    
    // التحقق من صحة البيانات
    let isValid = true;
    
    if (!validateEmail(email)) {
        showError('emailError', 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    if (password.length < 6) {
        showError('passwordError', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        isValid = false;
    }
    
    if (isValid) {
        // محاكاة تسجيل الدخول
        if (email === 'admin@anime.com' && password === '123456') {
            showToast('تم تسجيل الدخول بنجاح!', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        } else {
            showToast('بيانات الدخول غير صحيحة', 'error');
        }
    }
}

// معالجة إنشاء الحساب
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const favoriteAnime = document.getElementById('favoriteAnime').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // مسح الأخطاء السابقة
    clearErrors();
    
    // التحقق من صحة البيانات
    let isValid = true;
    
    if (name.length < 2) {
        showError('nameError', 'الاسم يجب أن يكون حرفين على الأقل');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        showError('regEmailError', 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    if (password.length < 6) {
        showError('regPasswordError', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'كلمات المرور غير متطابقة');
        isValid = false;
    }
    
    if (!favoriteAnime) {
        showError('animeError', 'يرجى اختيار الأنمي المفضل');
        isValid = false;
    }
    
    if (!agreeTerms) {
        showError('termsError', 'يجب الموافقة على الشروط والأحكام');
        isValid = false;
    }
    
    if (isValid) {
        showToast('تم إنشاء الحساب بنجاح!', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
}

// معالجة نموذج الاتصال
function handleContact(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message && validateEmail(email)) {
        showToast('تم إرسال الرسالة بنجاح!', 'success');
        document.getElementById('contactForm').reset();
    } else {
        showToast('يرجى ملء جميع الحقول بشكل صحيح', 'error');
    }
}

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// عرض رسالة خطأ
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// مسح رسائل الخطأ
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// تهيئة Toast Notification
function initializeToast() {
    const toastClose = document.getElementById('toastClose');
    if (toastClose) {
        toastClose.addEventListener('click', hideToast);
    }
}

// عرض Toast Notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'block';
        
        // إخفاء تلقائي بعد 5 ثوان
        setTimeout(hideToast, 5000);
    }
}

// إخفاء Toast Notification
function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.style.display = 'none';
    }
}

// تهيئة Modal
function initializeModal() {
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// فتح Modal (يتم استدعاؤها من HTML)
function openModal() {
    // محاكاة Ajax request
    fetch('/api/service-info')
        .then(response => {
            // محاكاة استجابة ناجحة
            return Promise.resolve({
                title: 'خدمة التوصيات الشخصية',
                description: 'نستخدم خوارزميات متقدمة لتحليل تفضيلاتك وتقديم توصيات مخصصة لك.'
            });
        })
        .catch(error => {
            console.log('محاكاة Ajax request');
        })
        .finally(() => {
            const modal = document.getElementById('serviceModal');
            if (modal) {
                modal.style.display = 'block';
            }
        });
}

// إغلاق Modal
function closeModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// تهيئة jQuery (استخدام واحد فقط)
function initializeJQuery() {
    // التحقق من وجود jQuery
    if (typeof $ !== 'undefined') {
        // استخدام jQuery لإخفاء/إظهار عنصر
        $(document).ready(function() {
            // إضافة زر لإخفاء/إظهار الشريط الجانبي
            if ($('aside').length > 0) {
                $('aside').prepend('<button id="toggleSidebar" style="margin-bottom: 1rem; padding: 0.5rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">إخفاء/إظهار</button>');
                
                $('#toggleSidebar').click(function() {
                    $('aside .container > *:not(#toggleSidebar)').toggle();
                });
            }
        });
    }
}

// دالة مساعدة لتحميل jQuery
function loadjQuery() {
    if (typeof $ === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.onload = initializeJQuery;
        document.head.appendChild(script);
    }
}

