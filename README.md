# Personal Blog Website

A lightweight, responsive personal blog template built with HTML, CSS, and JavaScript. This blog provides writers with a simple, mobile-friendly platform to publish and manage posts without the complexity of a full CMS.

## 🌟 Features

### Core Features
- **Responsive Design**: Mobile-first approach that works seamlessly across desktop, tablet, and mobile devices
- **Dynamic Content**: Blog posts are rendered dynamically from JSON data
- **Single Page Application**: Smooth navigation between homepage and individual posts
- **Clean, Minimal Design**: Focus on readability and user experience
- **Accessibility**: Built with semantic HTML and WCAG guidelines in mind

### Interactive Features
- **Search Functionality**: Real-time search through post titles, content, and tags
- **Category Filtering**: Filter posts by category with interactive buttons
- **Dark/Light Mode**: Toggle between themes with persistent preference storage
- **Sticky Navigation**: Header remains accessible while scrolling

### Technical Features
- **No Backend Required**: Runs entirely in the browser using static files
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Performance Optimized**: Lazy loading, efficient caching, and minimal dependencies
- **Offline Support**: Service worker enables basic offline functionality
- **Keyboard Navigation**: Full keyboard accessibility support

## 📁 Project Structure

```
personal-blog/
├── index.html          # Homepage with blog post listings
├── post.html           # Single blog post view template
├── style.css           # Main stylesheet with responsive design
├── script.js           # JavaScript for dynamic content and interactions
├── posts.json          # Blog posts data (easily editable)
├── sw.js              # Service worker for offline functionality
└── README.md          # This file
```

## 🚀 Quick Start

### 1. Download/Clone the Files
Download all the files to a directory on your computer or web server.

### 2. Customize Your Content
Edit `posts.json` to add your own blog posts:

```json
{
  "id": 6,
  "title": "Your Blog Post Title",
  "date": "2024-03-01",
  "category": "Your Category",
  "author": "Your Name",
  "excerpt": "A brief description of your post...",
  "content": "<p>Your full blog post content in HTML...</p>",
  "tags": ["tag1", "tag2", "tag3"]
}
```

### 3. Serve the Files
You can serve the files using any of these methods:

#### Option A: Simple HTTP Server (Python)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option B: Node.js HTTP Server
```bash
# Install globally
npm install -g http-server

# Run server
http-server -p 8000
```

#### Option C: PHP Built-in Server
```bash
php -S localhost:8000
```

#### Option D: Live Server (VS Code Extension)
Install the "Live Server" extension in VS Code and right-click on `index.html` → "Open with Live Server"

### 4. Open in Browser
Navigate to `http://localhost:8000` in your web browser.

## ✏️ Customization Guide

### Adding New Blog Posts

1. Open `posts.json`
2. Add a new post object to the array:
   ```json
   {
     "id": [unique_number],
     "title": "Your Post Title",
     "date": "YYYY-MM-DD",
     "category": "Category Name",
     "author": "Author Name",
     "excerpt": "Brief description...",
     "content": "<p>Full HTML content...</p>",
     "tags": ["tag1", "tag2"]
   }
   ```
3. Save the file - changes will appear immediately

### Customizing Styles

The CSS uses CSS custom properties (variables) for easy theming:

```css
:root {
  --accent-color: #2563eb;        /* Primary color */
  --text-color: #333333;          /* Main text color */
  --bg-color: #ffffff;            /* Background color */
  /* ... more variables */
}
```

### Modifying the Layout

- **Header/Navigation**: Edit the `<header>` section in `index.html` and `post.html`
- **Footer**: Modify the `<footer>` section in both HTML files
- **Homepage Hero**: Update the `.hero` section content in `script.js`

### Adding New Categories

Categories are automatically generated from the posts in `posts.json`. Simply use new category names in your posts and they'll appear in the filter buttons.

## 🎨 Customization Examples

### Changing the Color Scheme
```css
:root {
  --accent-color: #10b981;        /* Green theme */
  --accent-hover: #059669;
}
```

### Adding a Custom Logo
Replace the emoji logo in the navigation:
```html
<a href="?" class="logo">
  <img src="logo.png" alt="My Blog" width="40" height="40">
  My Blog
</a>
```

### Modifying Post Layout
Edit the post card template in `script.js` (around line 240):
```javascript
postsGrid.innerHTML = this.filteredPosts.map(post => `
  <article class="post-card">
    <!-- Customize this HTML structure -->
  </article>
`).join('');
```

## 📱 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile**: iOS Safari 12+, Chrome Mobile 60+
- **Features**: CSS Grid, Flexbox, ES6+ JavaScript, Fetch API

## 🔧 Advanced Features

### Service Worker
The included service worker provides:
- Offline access to previously visited pages
- Faster loading through caching
- Automatic cache updates

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion support

### SEO Optimization
- Structured data (JSON-LD)
- Open Graph meta tags
- Twitter Card support
- Semantic HTML elements
- Proper heading hierarchy

## 🚀 Deployment Options

### Static Hosting Services
- **Netlify**: Drag and drop the folder to Netlify
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to a GitHub repository and enable Pages
- **Firebase Hosting**: Use Firebase CLI to deploy

### Traditional Web Hosting
Upload all files to your web server's public directory (usually `public_html` or `www`).

## 🛠️ Development

### Local Development Setup
1. Clone or download the repository
2. Start a local server (see Quick Start section)
3. Make changes to the files
4. Refresh the browser to see changes

### File Watching (Optional)
For automatic browser refresh during development, use tools like:
- Browser-sync
- Live Server (VS Code extension)
- Webpack dev server

## 📊 Performance Tips

1. **Optimize Images**: Compress images before adding them to posts
2. **Minimize JSON**: Remove unnecessary whitespace from `posts.json`
3. **CDN**: Consider using a CDN for faster global delivery
4. **Gzip**: Enable gzip compression on your web server

## 🤝 Contributing

This is a template project, but if you have suggestions for improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

**Posts not loading**
- Check that `posts.json` is valid JSON (use a JSON validator)
- Ensure the server is running and files are accessible
- Check browser console for errors

**Search not working**
- Verify JavaScript is enabled in the browser
- Check for console errors
- Ensure `script.js` is loading properly

**Styles not applying**
- Confirm `style.css` is linked correctly in HTML files
- Check for CSS syntax errors
- Clear browser cache

**Service Worker issues**
- Service workers require HTTPS in production (or localhost for development)
- Clear browser cache and service worker storage
- Check browser developer tools → Application → Service Workers

### Browser Developer Tools
Use F12 to open developer tools and check:
- Console for JavaScript errors
- Network tab for failed requests
- Application tab for service worker status

## 📞 Support

For questions or issues:
1. Check this README first
2. Look for similar issues in browser developer console
3. Validate your JSON data
4. Test in different browsers

---

**Happy Blogging!** 🎉

This template provides a solid foundation for a personal blog. Customize it to match your style and start sharing your thoughts with the world!
