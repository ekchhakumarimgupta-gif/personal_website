# Personal Portfolio Website - Ekcha Gupta

A minimal, accessible, and high-performance single-page personal portfolio website built with pure vanilla **HTML5**, **CSS3**, and **JavaScript** (no external frameworks or build steps required).

Live Demo Repository: [ekchhakumarimgupta-gif/personal_website](https://github.com/ekchhakumarimgupta-gif/personal_website)

---

## 🌟 Highlights & Features

- **Executive Aesthetic**: Clean off-white background (`#FAF9F6`) with a subtle blush radial glow overlay and crimson accent highlights (`#DC2650`).
- **Interactive Single-Page Navigation**:
  - Smooth 300ms fade-out and slide-up transitions between **About Me** and **My Work**.
  - Direct URL hash routing support (`#about` and `#work`).
  - Browser history compatibility with back/forward navigation (`popstate`).
- **Responsive Layout**:
  - Desktop 2-column layout with profile portrait on the right and bio & skill chips on the left.
  - Mobile-first breakpoint with profile photo stacked neatly above the bio.
- **Projects Grid**:
  - Lift-on-hover interactive project cards with tech tags and repository links.
  - "Coming Soon" status badge for in-development projects.
- **Full Accessibility (a11y)**:
  - W3C semantic markup (`header`, `main`, `section`, `article`, `footer`).
  - ARIA tablist patterns (`role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`).
  - WCAG keyboard navigation (Arrow keys, Home, End).
  - Respects `@media (prefers-reduced-motion)`.
  - Visible keyboard focus rings.
- **Maintainable Architecture**:
  - Configurable CSS variables (`:root`) for instant re-theming and spacing adjustments.
  - Clean, modular, and fully commented codebase.

---

## 📁 Project Structure

```text
personal_website/
├── index.html       # Semantic HTML5 markup and tab sections
├── style.css        # CSS variables, animations, and responsive styles
├── script.js        # Vanilla JS for section switching and ARIA states
├── assets/
│   └── me.jpg       # Profile picture (rounded with drop shadow)
└── README.md        # Project documentation
```

---

## 🚀 Running Locally

No npm or dependencies required.

### Option 1: Direct Browser Open
Double-click `index.html` to open it in any web browser.

### Option 2: Local Python Server (Recommended)
Run the following in your terminal from this folder:
```bash
python -m http.server 8000
```
Then navigate to [http://localhost:8000](http://localhost:8000).

---

## 🌐 Free Deployment (GitHub Pages)

1. Push or upload these files to your GitHub repository `personal_website`.
2. Go to your repository settings: **Settings** -> **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your website will be live in ~1-2 minutes at:
   `https://ekchhakumarimgupta-gif.github.io/personal_website/`

---

## 👤 Author

**Ekcha Gupta**  
- BCA CS student at SRM Gangtok  
- GitHub: [@ekchhakumarimgupta-gif](https://github.com/ekchhakumarimgupta-gif)  
- Email: [contact@ekchagupta.dev](mailto:contact@ekchagupta.dev)  
- LinkedIn: [in/ekchagupta](https://linkedin.com/in/ekchagupta)
