# 🎨 Personal Blog Customization Guide

This guide will help you customize your personal blog with your actual information. Simply find and replace the placeholder text with your own content.

## 📝 Quick Customization Checklist

### 1. **Blog Identity**
Replace these placeholders in both `index.html` and `post.html`:

- `[YOUR BLOG NAME]` → Your blog's name (e.g., "Tech Insights Blog")
- `[YOUR NAME]` → Your full name (e.g., "Jane Smith")
- `[YOUR WEBSITE URL]` → Your website URL (e.g., "https://yourblog.com")

### 2. **Meta Information**
Update these in both HTML files:

- `[CUSTOMIZE - Brief description of your blog and what topics you cover]` → Brief description of your blog
- `[YOUR KEYWORDS - e.g., blog, web development, technology, design, programming]` → Relevant keywords for SEO
- `[YOUR BLOG DESCRIPTION]` → Description for social media sharing

### 3. **About Section**
In both `index.html` and `post.html`, replace:

- `[YOUR TITLE/PROFESSION]` → Your job title (e.g., "Full Stack Developer & Tech Writer")
- `[WRITE YOUR INTRODUCTION - ...]` → Your personal introduction paragraph
- `[ADD MORE ABOUT YOURSELF - ...]` → Additional information about yourself
- `[YOUR SKILL 1-5]` → Your actual skills and expertise

### 4. **Contact Information**
Update these in both HTML files:

- `[YOUR-EMAIL@DOMAIN.COM]` → Your actual email address
- `[YOUR-LINKEDIN-USERNAME]` → Your LinkedIn username
- `[YOUR-GITHUB-USERNAME]` → Your GitHub username
- `[YOUR-TWITTER-HANDLE]` → Your Twitter handle
- `[CUSTOMIZE YOUR CONTACT MESSAGE - ...]` → Your contact introduction message
- `[CUSTOMIZE - e.g., "Best for..."]` → Custom descriptions for each contact method

### 5. **Homepage Content**
In `script.js`, replace:

- `[CUSTOMIZE YOUR BLOG TITLE - e.g., "Welcome to My Blog"]` → Your homepage title
- `[CUSTOMIZE YOUR TAGLINE - e.g., "Thoughts, tutorials..."]` → Your blog tagline

## 🔧 Step-by-Step Customization

### Step 1: Blog Name and Identity
1. Open `index.html` and `post.html`
2. Find `[YOUR BLOG NAME]` (appears multiple times)
3. Replace with your blog name, e.g., "Tech Insights Blog"

### Step 2: Personal Information
1. Replace `[YOUR NAME]` with your full name
2. Replace `[YOUR TITLE/PROFESSION]` with your job title
3. Update the author bio sections with your actual story

### Step 3: Contact Details
1. Replace `[YOUR-EMAIL@DOMAIN.COM]` with your email
2. Update social media usernames:
   - LinkedIn: `[YOUR-LINKEDIN-USERNAME]`
   - GitHub: `[YOUR-GITHUB-USERNAME]`
   - Twitter: `[YOUR-TWITTER-HANDLE]`

### Step 4: Skills and Expertise
Replace the skill placeholders with your actual skills:
```html
<li>JavaScript (ES6+, React, Node.js)</li>
<li>Python & Django</li>
<li>Database Design (PostgreSQL, MongoDB)</li>
<li>Cloud Services (AWS, Docker)</li>
<li>UI/UX Design & Figma</li>
```

### Step 5: Homepage Hero Section
1. Open `script.js`
2. Find the hero section content
3. Replace with your custom title and tagline

## 📸 Custom Avatar
To add your own profile picture:

1. Save your photo as `avatar.jpg` in the same folder
2. In both HTML files, replace the avatar img src:
```html
<img src="avatar.jpg" alt="Your Name" width="120" height="120">
```

## 🎨 Custom Favicon
To add your own favicon:

1. Create a favicon (you can use tools like favicon.io)
2. Replace the current favicon link in both HTML files:
```html
<link rel="icon" type="image/png" href="favicon.png">
```

## 📱 Social Media Links
You can add more social media platforms by copying the contact item structure:

```html
<div class="contact-item">
    <div class="contact-icon">📷</div>
    <div class="contact-details">
        <h3>Instagram</h3>
        <p><a href="https://instagram.com/yourusername" target="_blank" rel="noopener">@yourusername</a></p>
        <small>Follow for behind-the-scenes content</small>
    </div>
</div>
```

## 🎯 Example Customization

Here's an example of how your customized content might look:

### Blog Identity:
- **Blog Name**: "Code & Coffee"
- **Your Name**: "Sarah Johnson"
- **Title**: "Senior Frontend Developer & UI Designer"

### About Section:
```
Welcome to Code & Coffee! I'm a passionate frontend developer with 6 years of experience 
in creating beautiful, accessible web applications. I specialize in React, TypeScript, 
and modern CSS frameworks, and I love sharing my knowledge about web development best practices.

When I'm not coding, you can find me exploring new coffee shops, contributing to open-source 
projects, or mentoring junior developers. I believe in the power of clean code and 
user-centered design.
```

### Skills:
- React & TypeScript
- Modern CSS (Tailwind, Styled Components)
- Web Accessibility (WCAG)
- Performance Optimization
- UI/UX Design & Figma

## 🚀 Quick Find & Replace

Use your text editor's find and replace feature to quickly update all instances:

1. `[YOUR BLOG NAME]` → "Your Actual Blog Name"
2. `[YOUR NAME]` → "Your Full Name"
3. `[YOUR-EMAIL@DOMAIN.COM]` → "your.email@domain.com"
4. `[YOUR-LINKEDIN-USERNAME]` → "your-linkedin-username"
5. `[YOUR-GITHUB-USERNAME]` → "your-github-username"
6. `[YOUR-TWITTER-HANDLE]` → "your-twitter-handle"

## ✅ Final Checklist

After customization, make sure to:

- [ ] Test all contact links work correctly
- [ ] Verify your email link opens the mail client
- [ ] Check social media links open in new tabs
- [ ] Ensure your bio reads naturally
- [ ] Test the contact form submission
- [ ] Verify the blog looks good on mobile devices

## 🎨 Advanced Customization

### Colors
To change the color scheme, edit the CSS variables in `style.css`:
```css
:root {
  --accent-color: #your-color;        /* Primary color */
  --accent-hover: #your-hover-color;  /* Hover state */
}
```

### Fonts
To use custom fonts, add Google Fonts or other font services to your HTML head section.

### Layout
The CSS uses CSS Grid and Flexbox for responsive layouts. You can modify the grid templates in `style.css` to change the layout structure.

---

**Need Help?** If you run into any issues during customization, check the browser's developer console for errors, or refer to the main README.md file for troubleshooting tips.

Happy blogging! 🎉
