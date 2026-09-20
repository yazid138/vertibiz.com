// Mobile Menu Toggle
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const duration = 2000;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCount = () => {
      current += increment;
      counter.textContent = Math.ceil(current);
      if (current < target) {
        requestAnimationFrame(updateCount);
      }
    };
    updateCount();
  });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      const delay = entry.target.classList.contains('stagger-1') ? 150 :
                    entry.target.classList.contains('stagger-2') ? 300 :
                    entry.target.classList.contains('stagger-3') ? 450 : 0;
      entry.target.style.animationDelay = delay + 'ms';
    }
  });
}, { threshold: 0.1 });

// Observe cards
document.querySelectorAll('.service-card').forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-md');
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.classList.remove('shadow-md');
    navbar.style.backgroundColor = 'transparent';
  }
});

// Form submission
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  submitBtn.textContent = 'Mengirim...';
  submitBtn.disabled = true;
  
  // Show success message
  setTimeout(() => {
    alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.');
    form.reset();
    submitBtn.textContent = 'Kirim Pesan';
    submitBtn.disabled = false;
  }, 1500);
}

// Initialize counters when page loads
window.addEventListener('load', () => {
  animateCounters();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Add animation classes on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('[id]:not(#hero)');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.animation = 'fadeUp 0.6s ease-out forwards';
      el.style.opacity = '1';
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// Parallax effect for hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const blobs = document.querySelectorAll('.animate-blob');
  blobs.forEach((blob, index) => {
    const speed = (index + 1) * 0.5;
    blob.style.transform = `translate(${scrolled * speed * -0.01}px, ${scrolled * speed * -0.01}px)`;
  });
});

// Copy email to clipboard
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', function() {
    const text = this.getAttribute('data-copy');
    navigator.clipboard.writeText(text);
    this.textContent = '✅ Disalin!';
    setTimeout(() => {
      this.textContent = 'Salin';
    }, 2000);
  });
});

// Lazy load images (if any)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}