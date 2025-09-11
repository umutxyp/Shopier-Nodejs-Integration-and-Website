/* JavaScript for CodeShare Store */

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Yükleniyor...';
                submitBtn.disabled = true;
            }
        });
    });

    // Add entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.card, section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Payment modal functions
function showPaymentForm(amount, productName) {
    const modal = document.getElementById('paymentModal');
    document.getElementById('productAmount').value = amount;
    document.getElementById('productName').value = productName;
    document.getElementById('modalProductName').textContent = productName;
    document.getElementById('modalProductAmount').textContent = amount + '₺';
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input[type="text"]');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modals on outside click
document.addEventListener('DOMContentLoaded', function() {
    const paymentModal = document.getElementById('paymentModal');
    
    if (paymentModal) {
        paymentModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closePaymentModal();
            }
        });
    }
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePaymentModal();
        }
    });
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('border-red-500');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^05\d{9}$/;
            if (!phoneRegex.test(input.value.replace(/\s/g, ''))) {
                input.classList.add('border-red-500');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Add input event listeners for real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('border-red-500');
                this.classList.add('border-green-500');
            }
        });
    });
});

// Loading animation for page
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// Add to cart animation
function addToCartAnimation(button) {
    const original = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check mr-2"></i>Eklendi!';
    button.classList.add('bg-green-500');
    
    setTimeout(() => {
        button.innerHTML = original;
        button.classList.remove('bg-green-500');
    }, 1500);
}

// Price counter animation
function animatePrice(element, targetPrice) {
    const start = 0;
    const duration = 1000;
    const startTime = performance.now();
    
    function updatePrice(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentPrice = Math.floor(start + (targetPrice - start) * progress);
        
        element.textContent = currentPrice + '₺';
        
        if (progress < 1) {
            requestAnimationFrame(updatePrice);
        }
    }
    
    requestAnimationFrame(updatePrice);
}

// Success confetti animation
function createConfetti() {
    const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];
    const confetti = document.createElement('div');
    
    confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}%;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        transform: rotate(${Math.random() * 360}deg);
        animation: confetti-fall 3s linear forwards;
        pointer-events: none;
        z-index: 9999;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    `;
    
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
}

// Initialize confetti on success page
if (window.location.pathname.includes('success') || document.querySelector('.success-page')) {
    window.addEventListener('load', () => {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createConfetti(), i * 100);
        }
    });
}