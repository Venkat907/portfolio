/* Kona Venkat Portfolio - Interactive JavaScript Scripts */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initMobileMenu();
  initScrollSpyAndReveal();
  initAboutTabs();
  initProjectFilters();
  initContactForm();
  initScrollHeader();
  initLucideIcons();
});

// Initialize Lucide Icons CDN fallback in case we embed svg shapes or text icons
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 1. Navigation header state on scroll
function initScrollHeader() {
  const header = document.getElementById('navbar-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('glass-nav', 'py-4');
      header.classList.remove('bg-transparent', 'py-6');
    } else {
      header.classList.add('bg-transparent', 'py-6');
      header.classList.remove('glass-nav', 'py-4');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger immediately to set initial state
}

// 2. Typing Effect for Hero Title
function initTypingEffect() {
  const textElement = document.getElementById('typed-text');
  if (!textElement) return;

  const words = [
    'Full Stack Web Developer',
    'MERN Stack Engineer',
    'Open Source Enthusiast',
    'UI/UX Developer'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Delete characters
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40; // delete faster
    } else {
      // Add characters
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 120; // type normal speed
    }

    // Word complete typing
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at end of word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next word
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  // Start the typing loop
  setTimeout(type, 1000);
}

// 3. Mobile Navigation Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');
  
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  const toggleMenu = () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    
    // Toggle icon visuals
    menuIconOpen.classList.toggle('hidden');
    menuIconClose.classList.toggle('hidden');
    
    // Animate menu links staggered slide-in
    if (!mobileMenu.classList.contains('hidden')) {
      mobileLinks.forEach((link, idx) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(15px)';
        setTimeout(() => {
          link.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
          link.style.opacity = '1';
          link.style.transform = 'translateY(0)';
        }, 100 + idx * 50);
      });
    }
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu when a link is clicked
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  });
}

// 4. Intersection Observer for Scroll Animations and ScrollSpy Links
function initScrollSpyAndReveal() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-desktop');
  const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
  
  // A. Scroll spy logic
  const scrollSpyCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update Desktop Navbar Link Highlighting
        navLinks.forEach(link => {
          link.classList.remove('text-violet-400', 'font-semibold');
          link.classList.add('text-slate-300');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-violet-400', 'font-semibold');
            link.classList.remove('text-slate-300');
          }
        });

        // Update Mobile Navbar Link Highlighting
        mobileNavLinks.forEach(link => {
          link.classList.remove('text-violet-400', 'bg-slate-900/50');
          link.classList.add('text-slate-400');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-violet-400', 'bg-slate-900/50');
            link.classList.remove('text-slate-400');
          }
        });
      }
    });
  };

  const scrollSpyObserver = new IntersectionObserver(scrollSpyCallback, {
    root: null,
    rootMargin: '-30% 0px -60% 0px' // Trigger when section occupies the active middle portion
  });

  sections.forEach(section => scrollSpyObserver.observe(section));

  // B. Scroll Reveal Animations (like Framer Motion)
  const revealElements = document.querySelectorAll('.reveal, .scale-in, .stagger-in');
  
  const revealCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Activate target element (e.g. reveal parent grid or container)
        entry.target.classList.add('active');

        // If it is a staggered card grid container, find children and animate them with delays
        if (entry.target.classList.contains('stagger-container')) {
          const children = entry.target.querySelectorAll('.stagger-card');
          children.forEach((child, idx) => {
            setTimeout(() => {
              child.classList.add('active');
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, idx * 100);
          });
        }
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.1, // Trigger when 10% of the item is visible
    rootMargin: '0px 0px -50px 0px' // offset to trigger slightly before coming fully into view
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

// 5. About Section Tabs
function initAboutTabs() {
  const tabs = document.querySelectorAll('.about-tab-btn');
  const contents = document.querySelectorAll('.about-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update active tab buttons
      tabs.forEach(t => {
        t.classList.remove('text-violet-400', 'border-violet-500', 'bg-violet-950/20');
        t.classList.add('text-slate-400', 'border-transparent');
      });
      tab.classList.add('text-violet-400', 'border-violet-500', 'bg-violet-950/20');
      tab.classList.remove('text-slate-400', 'border-transparent');

      // Update active content blocks
      contents.forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('block');
        
        if (content.getAttribute('id') === `about-${target}`) {
          content.classList.remove('hidden');
          content.classList.add('block');
          
          // Animate tab content entry
          content.style.opacity = '0';
          content.style.transform = 'translateY(10px)';
          setTimeout(() => {
            content.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
          }, 50);
        }
      });
    });
  });
}

// 6. Project Cards Filter
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active states on buttons
      filterBtns.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-violet-600', 'to-cyan-600', 'text-white', 'shadow-glow-cyan');
        b.classList.add('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800', 'hover:border-slate-700');
      });
      btn.classList.add('bg-gradient-to-r', 'from-violet-600', 'to-cyan-600', 'text-white', 'shadow-glow-cyan');
      btn.classList.remove('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800', 'hover:border-slate-700');

      // Filter and animate card transitions
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          // Animate scale in
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // Wait for transition duration
        }
      });
    });
  });
}

// 7. Contact Form Handling (with state validation and success messages)
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');
  const alertContainer = document.getElementById('form-alert');

  const showAlert = (message, type) => {
    alertContainer.innerHTML = '';
    const alertDiv = document.createElement('div');
    
    if (type === 'success') {
      alertDiv.className = 'p-4 rounded-xl glass border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 flex items-center space-x-2 text-sm';
      alertDiv.innerHTML = `<svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>${message}</span>`;
    } else {
      alertDiv.className = 'p-4 rounded-xl glass border border-rose-500/30 bg-rose-950/20 text-rose-300 flex items-center space-x-2 text-sm';
      alertDiv.innerHTML = `<svg class="w-5 h-5 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>${message}</span>`;
    }

    alertContainer.appendChild(alertDiv);
    
    // Auto-scroll to alert
    alertContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Form inputs
    const name = document.getElementById('user_name').value.trim();
    const email = document.getElementById('user_email').value.trim();
    const message = document.getElementById('user_message').value.trim();

    // Simple Client side validation
    if (!name || !email || !message) {
      showAlert('All fields are required. Please fill in the entire form.', 'error');
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    // Enter Loading State
    submitBtn.disabled = true;
    btnText.textContent = 'Sending Message...';
    btnSpinner.classList.remove('hidden');

    // Simulate Server request (EmailJS Integration Placeholder)
    // To wire EmailJS:
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    //   .then(() => { ... })
    setTimeout(() => {
      // Revert states
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      btnSpinner.classList.add('hidden');
      
      // Success Alert
      showAlert('Thank you for reaching out, Kona Venkat will get back to you shortly!', 'success');
      
      // Reset Form
      form.reset();
    }, 1800);
  });
}
