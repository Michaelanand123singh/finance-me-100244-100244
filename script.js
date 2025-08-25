document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuLinks = mobileMenu?.querySelectorAll('a');
  const focusableElements = mobileMenu?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements ? focusableElements[0] : null;
  const lastFocusable = focusableElements
    ? focusableElements[focusableElements.length - 1]
    : null;

  let isMenuOpen = false;

  if (mobileMenuButton && mobileMenu) {
    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle('active');
      mobileMenuButton.classList.toggle('active');
      document.body.classList.toggle('menu-open'); // Prevent scrolling
    };

    mobileMenuButton.addEventListener('click', toggleMenu);

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu();
        mobileMenuButton.focus();
      }
    });

    // Trap focus within the menu
    mobileMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && isMenuOpen) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });

    //Close menu after clicking on a link
    if (menuLinks) {
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          toggleMenu();
        });
      });
    }
  }


  // Smooth Scroll and Back to Top
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  const backToTopButton = document.querySelector('.back-to-top');

  scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // Testimonial Slider
  const sliderContainer = document.querySelector('.testimonial-slider');
  if (sliderContainer) {
    const slides = sliderContainer.querySelectorAll('.testimonial');
    const prevButton = sliderContainer.querySelector('.slider-prev');
    const nextButton = sliderContainer.querySelector('.slider-next');

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slideCount;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      showSlide(currentIndex);
    };

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };

    showSlide(currentIndex);
    startAutoSlide();

    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });

    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
  }


  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove('open');
        otherItem.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Email Capture Validation and Submission
  const emailForm = document.querySelector('#email-capture-form');

  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.querySelector('#email');
      const email = emailInput.value;

      if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      console.log('Submitting email:', email);

      // Reset the form
      emailForm.reset();
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // UTM-aware CTA click logging stub
  const ctaButtons = document.querySelectorAll('.cta-button');

  ctaButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const utmParams = new URLSearchParams(window.location.search);
      const utmSource = utmParams.get('utm_source');
      const utmMedium = utmParams.get('utm_medium');
      const utmCampaign = utmParams.get('utm_campaign');

      console.log('CTA Clicked:', {
        href: button.href,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      });

      // In a real implementation, you'd send this data to an analytics service.
    });
  });


  // Placeholder for non-critical scripts (e.g., analytics, complex animations)
  // These can be loaded with dynamic imports if necessary
});