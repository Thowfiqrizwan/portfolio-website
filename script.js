script.js
// Modern Portfolio Website JavaScript - 2025
// Enhanced with smooth animations, theme switching, and interactive features

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupScrollAnimations();
    this.setupSkillBars();
    this.setupContactForm();
    this.setupLoadingScreen();
    this.setupParallaxEffects();
    this.setupTypewriter();
  }

  // Theme Management
  setupTheme() {
    const themeBtn = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);
    this.updateThemeButton(initialTheme);

    // Theme toggle event
    themeBtn?.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      this.updateThemeButton(newTheme);
      
      // Add smooth transition effect
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }

  updateThemeButton(theme) {
    const themeBtn = document.getElementById('themeToggle');
    const icon = themeBtn?.querySelector('i');
    
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    }
  }

  // Navigation
  setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
      });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // Active navigation highlighting
    this.setupActiveNavigation();
  }

  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-70px 0px -70px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          
          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('active'));
          
          // Add active class to current link
          activeLink?.classList.add('active');
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // Scroll Animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Add reveal class to elements that should animate
    const animatedElements = document.querySelectorAll(`
      .about-card,
      .skill-category,
      .project-card,
      .contact-card,
      .stat-item
    `);

    animatedElements.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  // Skill Bars Animation
  setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute('data-width');
          
          setTimeout(() => {
            progressBar.style.width = width + '%';
          }, 200);
          
          observer.unobserve(progressBar);
        }
      });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
  }

  // Contact Form
  setupContactForm() {
    const form = document.querySelector('.contact-form');
    
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      try {
        // Simulate form submission (replace with actual endpoint)
        await this.simulateFormSubmission(data);
        
        // Show success message
        this.showNotification('Message sent successfully!', 'success');
        form.reset();
        
      } catch (error) {
        // Show error message
        this.showNotification('Failed to send message. Please try again.', 'error');
      } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  async simulateFormSubmission(data) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% of the time)
        if (Math.random() > 0.1) {
          resolve(data);
        } else {
          reject(new Error('Submission failed'));
        }
      }, 2000);
    });
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '0.5rem',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease-out',
      backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  // Loading Screen
  setupLoadingScreen() {
    window.addEventListener('load', () => {
      const loading = document.querySelector('.loading');
      if (loading) {
        setTimeout(() => {
          loading.classList.add('hidden');
          setTimeout(() => {
            loading.remove();
          }, 500);
        }, 1000);
      }
    });
  }

  // Enhanced Apple-style Parallax Effects
  setupParallaxEffects() {
    let ticking = false;
    
    const parallaxElements = [
      { selector: '.gradient-orb', speed: 0.5 },
      { selector: '.card', speed: 0.3 },
      { selector: '.glass-card', speed: 0.15 },
      { selector: '.hero::before', speed: 0.2 }
    ];
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      parallaxElements.forEach(({ selector, speed }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          if (!element) return;
          
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrolled;
          const elementHeight = rect.height;
          
          // Check if element is in viewport
          if (elementTop < scrolled + windowHeight && elementTop + elementHeight > scrolled) {
            const yPos = -(scrolled - elementTop) * speed;
            const rotateX = Math.sin((scrolled - elementTop) * 0.001) * 2;
            
            // Apply 3D transform for depth
            element.style.transform = `translate3d(0, ${yPos}px, 0) rotateX(${rotateX}deg)`;
            element.style.willChange = 'transform';
          }
        });
      });
      
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Mouse parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 30;
        const yPos = (clientY / innerHeight - 0.5) * 30;
        
        const cards = hero.querySelectorAll('.card');
        cards.forEach((card, index) => {
          const multiplier = (index + 1) * 0.3;
          const currentTransform = card.style.transform || '';
          const newTransform = `translate3d(${xPos * multiplier}px, ${yPos * multiplier}px, 0)`;
          card.style.transform = newTransform;
          card.style.transition = 'transform 0.1s ease-out';
        });
      });
      
      hero.addEventListener('mouseleave', () => {
        const cards = hero.querySelectorAll('.card');
        cards.forEach(card => {
          card.style.transform = 'translate3d(0, 0, 0)';
          card.style.transition = 'transform 0.3s ease-out';
        });
      });
    }
  }

  // Typewriter Effect
  setupTypewriter() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
      const text = element.textContent;
      const speed = parseInt(element.getAttribute('data-speed')) || 100;
      
      element.textContent = '';
      element.style.borderRight = '2px solid';
      element.style.animation = 'blink 1s infinite';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        } else {
          element.style.borderRight = 'none';
          element.style.animation = 'none';
        }
      };
      
      // Start typewriter when element is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(typeWriter, 500);
            observer.unobserve(element);
          }
        });
      });
      
      observer.observe(element);
    });
  }
}

// Utility Functions
class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Performance Optimizations
class PerformanceOptimizer {
  constructor() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupScrollOptimization();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  setupImageOptimization() {
    // Preload critical images
    const criticalImages = [
      // Add paths to critical images here
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  setupScrollOptimization() {
    let ticking = false;

    const updateScrollEffects = () => {
      // Update scroll-dependent effects here
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
  constructor() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupARIALabels();
  }

  setupKeyboardNavigation() {
    // Enable keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('[data-keyboard-interactive]');
    
    interactiveElements.forEach(element => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click();
        }
      });
    });
  }

  setupFocusManagement() {
    // Manage focus for modal dialogs and dynamic content
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll(focusableElements));
        const index = focusable.indexOf(document.activeElement);
        
        if (e.shiftKey) {
          const prevIndex = index > 0 ? index - 1 : focusable.length - 1;
          focusable[prevIndex]?.focus();
        } else {
          const nextIndex = index < focusable.length - 1 ? index + 1 : 0;
          focusable[nextIndex]?.focus();
        }
      }
    });
  }

  setupARIALabels() {
    // Add ARIA labels for better screen reader support
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
      if (!button.textContent.trim()) {
        button.setAttribute('aria-label', 'Interactive button');
      }
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add loading screen HTML if it doesn't exist
  if (!document.querySelector('.loading')) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loader"></div>';
    document.body.prepend(loading);
  }

  // Initialize all components
  new PortfolioApp();
  new PerformanceOptimizer();
  new AccessibilityEnhancer();
});

// Add CSS for additional animations
const additionalCSS = `
  @keyframes blink {
    0%, 50% { border-color: transparent; }
    51%, 100% { border-color: currentColor; }
  }
  
  .nav-link.active::after {
    width: 100%;
  }
  
  .notification {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PortfolioApp, Utils, PerformanceOptimizer, AccessibilityEnhancer };
}