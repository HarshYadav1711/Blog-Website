// Blog Application JavaScript
class BlogApp {
  constructor() {
    this.posts = [];
    this.filteredPosts = [];
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  async init() {
    this.setupTheme();
    this.setupEventListeners();
    await this.loadPosts();
    this.handleRouting();
  }

  // Theme Management
  setupTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateThemeToggle();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    this.updateThemeToggle();
  }

  updateThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-label', 
        `Switch to ${this.currentTheme === 'light' ? 'dark' : 'light'} theme`);
    }
  }

  // Mobile Menu Management
  toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks && mobileToggle) {
      const isHidden = navLinks.classList.contains('mobile-hidden');
      
      if (isHidden) {
        navLinks.classList.remove('mobile-hidden');
        navLinks.classList.add('mobile-visible');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.innerHTML = '✕';
      } else {
        this.closeMobileMenu();
      }
    }
  }

  closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks && mobileToggle) {
      // Only hide navigation on mobile screens
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('mobile-visible');
        navLinks.classList.add('mobile-hidden');
      } else {
        // On desktop, just remove mobile-visible class but don't add mobile-hidden
        navLinks.classList.remove('mobile-visible');
        navLinks.classList.remove('mobile-hidden');
      }
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.innerHTML = '☰';
    }
  }

  // Event Listeners
  setupEventListeners() {
    // Theme toggle
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('theme-toggle')) {
        this.toggleTheme();
      }
    });

    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('mobile-menu-toggle')) {
        this.toggleMobileMenu();
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const navLinks = document.querySelector('.nav-links');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      
      // Only close if mobile menu is actually open (has mobile-visible class)
      if (navLinks && navLinks.classList.contains('mobile-visible') && 
          !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        // Only close if mobile menu is actually open
        if (navLinks && navLinks.classList.contains('mobile-visible')) {
          this.closeMobileMenu();
        }
      }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });

      // Clear search on escape
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.target.value = '';
          this.handleSearch('');
        }
      });
    }

    // Smooth scrolling for navigation links
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Close mobile menu when navigation link is clicked
        this.closeMobileMenu();
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.handleRouting();
    });

    // Contact form submission
    document.addEventListener('submit', (e) => {
      if (e.target.classList.contains('contact-form')) {
        e.preventDefault();
        this.handleContactForm(e.target);
      }
    });
  }

  // Data Loading
  async loadPosts() {
    try {
      this.showLoading();
      const response = await fetch('posts.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.posts = await response.json();
      this.filteredPosts = [...this.posts];
      this.hideLoading();
    } catch (error) {
      console.error('Error loading posts:', error);
      this.showError('Failed to load blog posts. Please try again later.');
    }
  }

  // Routing
  handleRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');

    if (postId) {
      this.showSinglePost(parseInt(postId));
    } else {
      this.showHomePage();
    }
  }

  // Search Functionality
  handleSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
      this.filteredPosts = [...this.posts];
    } else {
      this.filteredPosts = this.posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    this.renderPosts();
  }

  // UI Rendering
  showHomePage() {
    document.title = 'Personal Blog - Home';
    const container = document.querySelector('.container');
    if (!container) return;

    container.innerHTML = `
      <div class="hero">
        <h1>A modern, responsive personal blog featuring technology, web development, and lifestyle content.</h1>
        <p>Thoughts, tutorials, and insights on web development, design, and technology</p>
      </div>
      
      <div class="filters-section">
        <div class="category-filter">
          <h3>Filter by Category</h3>
          <div class="category-buttons" id="category-buttons">
            <!-- Category buttons will be rendered here -->
          </div>
        </div>
      </div>
      
      <div id="posts-container">
        <div class="posts-grid" id="posts-grid"></div>
      </div>
    `;

    this.renderCategoryFilter();
    this.renderPosts();
  }

  showSinglePost(postId) {
    const post = this.posts.find(p => p.id === postId);
    
    if (!post) {
      this.showError('Post not found');
      return;
    }

    document.title = `${post.title} - Personal Blog`;
    const container = document.querySelector('.container');
    if (!container) return;

    container.innerHTML = `
      <a href="?" class="back-link">Back to Home</a>
      
      <article class="post">
        <header class="post-header">
          <h1>${this.escapeHtml(post.title)}</h1>
          <div class="post-info">
            <span class="post-date">${this.formatDate(post.date)}</span>
            <span class="post-category">${this.escapeHtml(post.category)}</span>
            <span class="post-author">By ${this.escapeHtml(post.author)}</span>
          </div>
        </header>
        
        <div class="post-content">
          ${post.content}
        </div>
        
        <div class="post-tags">
          <h3>Tags</h3>
          <ul class="tags-list">
            ${post.tags.map(tag => `<li class="tag">${this.escapeHtml(tag)}</li>`).join('')}
          </ul>
        </div>
      </article>
    `;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderCategoryFilter() {
    const categories = ['all', ...new Set(this.posts.map(post => post.category))];
    const categoryButtons = document.getElementById('category-buttons');
    
    if (!categoryButtons) return;

    categoryButtons.innerHTML = categories.map(category => `
      <button 
        class="category-btn ${category === 'all' ? 'active' : ''}"
        data-category="${category}"
        onclick="blogApp.filterByCategory('${category}')"
      >
        ${category === 'all' ? 'All Posts' : this.escapeHtml(category)}
      </button>
    `).join('');
  }

  filterByCategory(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });

    // Filter posts
    if (category === 'all') {
      this.filteredPosts = [...this.posts];
    } else {
      this.filteredPosts = this.posts.filter(post => post.category === category);
    }

    this.renderPosts();

    // Clear search when filtering by category
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.value = '';
    }
  }

  renderPosts() {
    const postsGrid = document.getElementById('posts-grid');
    if (!postsGrid) return;

    if (this.filteredPosts.length === 0) {
      postsGrid.innerHTML = `
        <div class="no-results">
          <h3>No posts found</h3>
          <p>Try adjusting your search terms or browse all posts.</p>
        </div>
      `;
      return;
    }

    postsGrid.innerHTML = this.filteredPosts.map(post => `
      <article class="post-card">
        <div class="post-meta">
          <span class="post-date">${this.formatDate(post.date)}</span>
          <span class="post-category">${this.escapeHtml(post.category)}</span>
        </div>
        <h2 class="post-title">
          <a href="?post=${post.id}">${this.escapeHtml(post.title)}</a>
        </h2>
        <p class="post-excerpt">${this.escapeHtml(post.excerpt)}</p>
        <a href="?post=${post.id}" class="read-more">Read more</a>
      </article>
    `).join('');
  }

  // Utility Functions
  formatDate(dateString) {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showLoading() {
    const container = document.querySelector('.container');
    if (container) {
      container.innerHTML = `
        <div class="loading">
          <h2>Loading...</h2>
          <p>Please wait while we fetch the latest posts.</p>
        </div>
      `;
    }
  }

  hideLoading() {
    // Loading will be hidden when content is rendered
  }

  showError(message) {
    const container = document.querySelector('.container');
    if (container) {
      container.innerHTML = `
        <div class="error">
          <h2>Oops! Something went wrong</h2>
          <p>${this.escapeHtml(message)}</p>
          <button onclick="location.reload()" class="retry-button">Try Again</button>
        </div>
      `;
    }
  }

  // Contact Form Handler
  handleContactForm(form) {
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    // Show success message (in a real app, you'd send this to a server)
    this.showContactSuccess();
    
    // Reset form
    form.reset();
    
    // Log the form data (for demonstration)
    console.log('Contact form submitted:', data);
  }

  showContactSuccess() {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'contact-success';
    successDiv.innerHTML = `
      <div class="success-message">
        <h3>✅ Message Sent Successfully!</h3>
        <p>Thank you for reaching out. I'll get back to you soon!</p>
      </div>
    `;
    
    // Insert before the contact form
    const contactForm = document.querySelector('.contact-form-section');
    if (contactForm) {
      contactForm.parentNode.insertBefore(successDiv, contactForm);
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successDiv.remove();
      }, 5000);
      
      // Scroll to success message
      successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Category Filter Functionality
class CategoryFilter {
  constructor(blogApp) {
    this.blogApp = blogApp;
    this.activeCategory = 'all';
  }

  getCategories() {
    const categories = ['all', ...new Set(this.blogApp.posts.map(post => post.category))];
    return categories;
  }

  renderCategoryFilter() {
    const categories = this.getCategories();
    return `
      <div class="category-filter">
        <h3>Filter by Category</h3>
        <div class="category-buttons">
          ${categories.map(category => `
            <button 
              class="category-btn ${this.activeCategory === category ? 'active' : ''}"
              data-category="${category}"
            >
              ${category === 'all' ? 'All Posts' : category}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  filterByCategory(category) {
    this.activeCategory = category;
    
    if (category === 'all') {
      this.blogApp.filteredPosts = [...this.blogApp.posts];
    } else {
      this.blogApp.filteredPosts = this.blogApp.posts.filter(post => 
        post.category === category
      );
    }
    
    this.blogApp.renderPosts();
    this.updateActiveButton();
  }

  updateActiveButton() {
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === this.activeCategory);
    });
  }
}

// Enhanced Search with Debouncing
class SearchManager {
  constructor(blogApp) {
    this.blogApp = blogApp;
    this.searchTimeout = null;
  }

  setupAdvancedSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300); // Debounce search by 300ms
    });
  }

  performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
      this.blogApp.filteredPosts = [...this.blogApp.posts];
    } else {
      // Advanced search with scoring
      const results = this.blogApp.posts.map(post => {
        let score = 0;
        const titleMatch = post.title.toLowerCase().includes(searchTerm);
        const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);
        const contentMatch = post.content.toLowerCase().includes(searchTerm);
        const categoryMatch = post.category.toLowerCase().includes(searchTerm);
        const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(searchTerm));

        // Weight different types of matches
        if (titleMatch) score += 10;
        if (excerptMatch) score += 5;
        if (contentMatch) score += 2;
        if (categoryMatch) score += 3;
        if (tagMatch) score += 4;

        return { post, score };
      }).filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(result => result.post);

      this.blogApp.filteredPosts = results;
    }

    this.blogApp.renderPosts();
  }
}

// Accessibility Enhancements
class AccessibilityManager {
  static setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Skip to main content with Ctrl+/
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const mainContent = document.querySelector('.container');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Navigate posts with arrow keys when focused
      if (e.target.classList.contains('post-card') || e.target.closest('.post-card')) {
        const postCards = document.querySelectorAll('.post-card');
        const currentIndex = Array.from(postCards).indexOf(
          e.target.closest('.post-card') || e.target
        );

        if (e.key === 'ArrowDown' && currentIndex < postCards.length - 1) {
          e.preventDefault();
          postCards[currentIndex + 1].focus();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
          e.preventDefault();
          postCards[currentIndex - 1].focus();
        }
      }
    });
  }

  static setupScreenReaderAnnouncements() {
    // Create a live region for dynamic content announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(liveRegion);

    return liveRegion;
  }

  static announceToScreenReader(message, liveRegion) {
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }
}

// Performance Optimization
class PerformanceManager {
  static setupLazyLoading() {
    // Lazy load images when they come into view
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  static setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const blogApp = new BlogApp();
  const categoryFilter = new CategoryFilter(blogApp);
  const searchManager = new SearchManager(blogApp);
  const liveRegion = AccessibilityManager.setupScreenReaderAnnouncements();

  // Setup enhanced features
  AccessibilityManager.setupKeyboardNavigation();
  PerformanceManager.setupLazyLoading();
  
  // Make blogApp globally available for debugging
  window.blogApp = blogApp;
  
  console.log('Personal Blog loaded successfully!');
});
