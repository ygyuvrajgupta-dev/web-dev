const http = require("http");
const logMessage = require("./modules/logger");

const PORT = 3000;

// Shared HTML layout with navigation
function renderPage(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Smart Utility Toolkit</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Navigation */
    nav {
      background: rgba(15, 23, 42, 0.9);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(148, 163, 184, 0.15);
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .logo {
      font-size: 1.4rem;
      font-weight: 700;
      background: linear-gradient(90deg, #38bdf8, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.5px;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      list-style: none;
    }

    .nav-links a {
      color: #94a3b8;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
    }

    /* Main content */
    main {
      flex: 1;
      max-width: 1100px;
      width: 100%;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    /* Hero section */
    .hero {
      text-align: center;
      padding: 3rem 1rem 4rem;
    }

    .hero h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.2;
    }

    .hero p {
      font-size: 1.2rem;
      color: #94a3b8;
      max-width: 600px;
      margin: 0 auto 2rem;
      line-height: 1.6;
    }

    .badge {
      display: inline-block;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 0.4rem 1rem;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      letter-spacing: 0.5px;
    }

    /* Cards grid */
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .card {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 16px;
      padding: 1.8rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
      border-color: rgba(56, 189, 248, 0.4);
    }

    .card-icon {
      font-size: 2.2rem;
      margin-bottom: 1rem;
    }

    .card h3 {
      font-size: 1.2rem;
      margin-bottom: 0.6rem;
      color: #f1f5f9;
    }

    .card p {
      color: #94a3b8;
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .card code {
      background: rgba(15, 23, 42, 0.8);
      color: #38bdf8;
      padding: 0.2rem 0.5rem;
      border-radius: 6px;
      font-size: 0.8rem;
      display: inline-block;
      margin-bottom: 0.3rem;
    }

    /* Page content (About/Contact) */
    .page-content {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 16px;
      padding: 2.5rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .page-content h1 {
      font-size: 2.2rem;
      margin-bottom: 1.5rem;
      background: linear-gradient(90deg, #38bdf8, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .page-content h2 {
      font-size: 1.3rem;
      color: #f1f5f9;
      margin: 1.5rem 0 0.8rem;
    }

    .page-content p {
      color: #94a3b8;
      line-height: 1.7;
      margin-bottom: 1rem;
    }

    .page-content ul {
      list-style: none;
      margin: 1rem 0;
    }

    .page-content ul li {
      padding: 0.6rem 0;
      color: #cbd5e1;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .page-content ul li::before {
      content: "▸";
      color: #38bdf8;
      font-weight: bold;
    }

    /* Contact form */
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      margin-top: 1.5rem;
    }

    .contact-form label {
      font-weight: 600;
      color: #e2e8f0;
      font-size: 0.9rem;
    }

    .contact-form input,
    .contact-form textarea {
      width: 100%;
      padding: 0.8rem 1rem;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 10px;
      color: #e2e8f0;
      font-size: 0.95rem;
      font-family: inherit;
      transition: border-color 0.3s ease;
    }

    .contact-form input:focus,
    .contact-form textarea:focus {
      outline: none;
      border-color: #38bdf8;
    }

    .contact-form textarea {
      min-height: 120px;
      resize: vertical;
    }

    .btn {
      background: linear-gradient(90deg, #38bdf8, #818cf8);
      color: #0f172a;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.3s ease, transform 0.2s ease;
      align-self: flex-start;
    }

    .btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    /* 404 page */
    .error-page {
      text-align: center;
      padding: 4rem 1rem;
    }

    .error-page h1 {
      font-size: 6rem;
      font-weight: 900;
      background: linear-gradient(90deg, #f87171, #fb923c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }

    .error-page p {
      color: #94a3b8;
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .error-page a {
      color: #38bdf8;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      padding: 0.7rem 1.5rem;
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 10px;
      transition: all 0.3s ease;
    }

    .error-page a:hover {
      background: rgba(56, 189, 248, 0.1);
    }

    /* Footer */
    footer {
      text-align: center;
      padding: 1.5rem;
      color: #64748b;
      font-size: 0.85rem;
      border-top: 1px solid rgba(148, 163, 184, 0.1);
    }

    /* Responsive */
    @media (max-width: 768px) {
      nav {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .hero h1 {
        font-size: 2.2rem;
      }

      .hero p {
        font-size: 1rem;
      }

      main {
        padding: 2rem 1rem;
      }

      .page-content {
        padding: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <nav>
    <div class="logo">⚡ Smart Utility Toolkit</div>
    <ul class="nav-links">
      <li><a href="/" class="${title === 'Home' ? 'active' : ''}">Home</a></li>
      <li><a href="/about" class="${title === 'About' ? 'active' : ''}">About</a></li>
      <li><a href="/contact" class="${title === 'Contact' ? 'active' : ''}">Contact</a></li>
    </ul>
  </nav>

  <main>
    ${content}
  </main>

  <footer>
    © ${new Date().getFullYear()} Smart Utility Toolkit — Node.js Core Modules Lab Assignment
  </footer>
</body>
</html>`;
}

// Home page content
function homePage() {
  const content = `
    <section class="hero">
      <span class="badge">Node.js Core Modules Practice</span>
      <h1>Smart Utility Toolkit</h1>
      <p>A collection of command-line utilities built with Node.js core modules — no external dependencies, just pure Node power.</p>
    </section>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🧮</div>
        <h3>Calculator</h3>
        <p>Perform basic arithmetic operations (add, subtract, multiply, divide) directly from the command line.</p>
        <code>node calculator.js add 10 5</code>
      </div>

      <div class="card">
        <div class="card-icon">🎲</div>
        <h3>Dice Roller</h3>
        <p>Generate cryptographically secure random dice rolls using Node's crypto module.</p>
        <code>node dice.js 5</code>
      </div>

      <div class="card">
        <div class="card-icon">📁</div>
        <h3>File Manager</h3>
        <p>Create, read, update, and delete files using the built-in fs module.</p>
        <code>node fileManager.js</code>
      </div>

      <div class="card">
        <div class="card-icon">🔢</div>
        <h3>Even Checker</h3>
        <p>Check if numbers are even or odd using a custom reusable module.</p>
        <code>node app.js</code>
      </div>
    </div>
  `;
  return renderPage("Home", content);
}

// About page content
function aboutPage() {
  const content = `
    <div class="page-content">
      <h1>About This Project</h1>
      <p>This is a <strong>Lab Assignment 1</strong> focused on practicing Node.js core modules. The project demonstrates how to build reusable utilities without relying on external packages.</p>

      <h2>Core Modules Used</h2>
      <ul>
        <li><strong>http</strong> — Powers this web server with routing</li>
        <li><strong>fs</strong> — File system operations (create, read, update, delete)</li>
        <li><strong>crypto</strong> — Cryptographically secure random dice rolls</li>
        <li><strong>process</strong> — Command-line argument handling</li>
        <li><strong>path</strong> — File path utilities</li>
      </ul>

      <h2>Custom Modules</h2>
      <ul>
        <li><strong>logger.js</strong> — Timestamped console logging</li>
        <li><strong>isEven.js</strong> — Even number checker</li>
      </ul>

      <h2>Project Structure</h2>
      <ul>
        <li><strong>server.js</strong> — HTTP server with routes</li>
        <li><strong>calculator.js</strong> — CLI calculator</li>
        <li><strong>dice.js</strong> — Dice roll generator</li>
        <li><strong>fileManager.js</strong> — File CRUD operations</li>
        <li><strong>app.js</strong> — Module reuse demo</li>
      </ul>
    </div>
  `;
  return renderPage("About", content);
}

// Contact page content
function contactPage() {
  const content = `
    <div class="page-content">
      <h1>Contact Us</h1>
      <p>Have a question about this project or want to suggest improvements? Send us a message!</p>

      <form class="contact-form" action="/contact" method="POST">
        <div>
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" placeholder="John Doe" required />
        </div>
        <div>
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="john@example.com" required />
        </div>
        <div>
          <label for="message">Message</label>
          <textarea id="message" name="message" placeholder="Write your message here..." required></textarea>
        </div>
        <button type="submit" class="btn">Send Message</button>
      </form>
    </div>
  `;
  return renderPage("Contact", content);
}

// 404 page content
function notFoundPage() {
  const content = `
    <div class="error-page">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/">← Back to Home</a>
    </div>
  `;
  return renderPage("404", content);
}

const server = http.createServer((req, res) => {
  logMessage("Request received for " + req.url);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(homePage());
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(aboutPage());
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(contactPage());
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(notFoundPage());
  }
});

server.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});