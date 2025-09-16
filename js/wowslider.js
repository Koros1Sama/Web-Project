// WowSlider JavaScript
// ملف منفصل لعارض الصور

(function() {
    'use strict';
    
    // متغيرات عارض الصور
    let sliderInterval;
    let isSliderActive = false;
    
    // تهيئة عارض الصور عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        initWowSlider();
    });
    
    function initWowSlider() {
        const container = document.getElementById('wowslider-container');
        if (!container) return;
        
        const slides = container.querySelectorAll('.ws_images li');
        if (slides.length === 0) return;
        
        // إعداد الشرائح
        setupSlides(slides);
        
        // إنشاء عناصر التحكم
        createControls(container, slides);
        
        // بدء التشغيل التلقائي
        startAutoPlay(slides);
        
        // إيقاف التشغيل عند التمرير فوق العارض
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', () => startAutoPlay(slides));
        
        isSliderActive = true;
    }
    
    function setupSlides(slides) {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.style.transition = 'opacity 1s ease-in-out';
            
            // إضافة عنوان الشريحة
            const img = slide.querySelector('img');
            if (img && img.title) {
                slide.setAttribute('data-title', img.title);
            }
        });
    }
    
    function createControls(container, slides) {
        // إنشاء الأزرار
        const prevBtn = document.createElement('button');
        prevBtn.className = 'ws_prev';
        prevBtn.innerHTML = '❮';
        prevBtn.setAttribute('aria-label', 'الشريحة السابقة');
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'ws_next';
        nextBtn.innerHTML = '❯';
        nextBtn.setAttribute('aria-label', 'الشريحة التالية');
        
        // إنشاء النقاط
        const bullets = document.createElement('div');
        bullets.className = 'ws_bullets';
        bullets.setAttribute('role', 'tablist');
        
        for (let i = 0; i < slides.length; i++) {
            const bullet = document.createElement('div');
            bullet.setAttribute('role', 'tab');
            bullet.setAttribute('aria-label', `الشريحة ${i + 1}`);
            if (i === 0) bullet.className = 'ws_overbull';
            bullets.appendChild(bullet);
        }
        
        // إضافة مستمعي الأحداث
        prevBtn.addEventListener('click', () => changeSlide(slides, -1));
        nextBtn.addEventListener('click', () => changeSlide(slides, 1));
        
        bullets.addEventListener('click', (e) => {
            if (e.target.parentElement === bullets) {
                const index = Array.from(bullets.children).indexOf(e.target);
                goToSlide(slides, index);
            }
        });
        
        // إضافة دعم لوحة المفاتيح
        container.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    changeSlide(slides, -1);
                    break;
                case 'ArrowRight':
                    changeSlide(slides, 1);
                    break;
            }
        });
        
        // إضافة العناصر للحاوية
        container.appendChild(prevBtn);
        container.appendChild(nextBtn);
        container.appendChild(bullets);
        
        // جعل الحاوية قابلة للتركيز
        container.setAttribute('tabindex', '0');
    }
    
    function changeSlide(slides, direction) {
        const currentIndex = getCurrentSlideIndex(slides);
        let newIndex;
        
        if (direction > 0) {
            newIndex = (currentIndex + 1) % slides.length;
        } else {
            newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        }
        
        goToSlide(slides, newIndex);
    }
    
    function goToSlide(slides, index) {
        const currentIndex = getCurrentSlideIndex(slides);
        
        if (currentIndex === index) return;
        
        // إخفاء الشريحة الحالية
        slides[currentIndex].style.opacity = '0';
        
        // إظهار الشريحة الجديدة
        setTimeout(() => {
            slides[index].style.opacity = '1';
        }, 50);
        
        // تحديث النقاط
        updateBullets(index);
        
        // إعادة تشغيل التشغيل التلقائي
        if (isSliderActive) {
            stopAutoPlay();
            startAutoPlay(slides);
        }
    }
    
    function getCurrentSlideIndex(slides) {
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].style.opacity === '1') {
                return i;
            }
        }
        return 0;
    }
    
    function updateBullets(activeIndex) {
        const bullets = document.querySelectorAll('.ws_bullets div');
        bullets.forEach((bullet, index) => {
            bullet.className = index === activeIndex ? 'ws_overbull' : '';
        });
    }
    
    function startAutoPlay(slides) {
        if (slides.length <= 1) return;
        
        sliderInterval = setInterval(() => {
            changeSlide(slides, 1);
        }, 4000);
    }
    
    function stopAutoPlay() {
        if (sliderInterval) {
            clearInterval(sliderInterval);
            sliderInterval = null;
        }
    }
    
    // إيقاف التشغيل التلقائي عند مغادرة الصفحة
    window.addEventListener('beforeunload', stopAutoPlay);
    
    // دعم اللمس للأجهزة المحمولة
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        const container = document.getElementById('wowslider-container');
        if (container && container.contains(e.target)) {
            touchStartX = e.changedTouches[0].screenX;
        }
    });
    
    document.addEventListener('touchend', function(e) {
        const container = document.getElementById('wowslider-container');
        if (container && container.contains(e.target)) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const slides = document.querySelectorAll('.ws_images li');
            if (diff > 0) {
                // سحب لليسار - الشريحة التالية
                changeSlide(slides, 1);
            } else {
                // سحب لليمين - الشريحة السابقة
                changeSlide(slides, -1);
            }
        }
    }
    
})();

