# Sreedevi AU – Cybersecurity Portfolio

A static portfolio built with HTML5, CSS3 and vanilla JavaScript. No build tools, works on GitHub Pages.

## Files
- `index.html` – page structure
- `styles.css` – design, dark/light themes, responsive layout
- `script.js` – content + behaviour. **All editable content is in the `CONFIG` object at the top.**
- `assets/resume.pdf` – add your resume here (create the `assets` folder)

## Things to update later
1. **Resume:** create `assets/resume.pdf`. Until it exists, the button shows "Resume coming soon".
2. **GitHub:** after creating your profile, set `githubProfile` in `CONFIG` (e.g. `https://github.com/your-username`). Add each project's `link` when its repo exists.
3. **LinkedIn (optional):** set `linkedin` in `CONFIG`.
4. **Projects / skills / roadmap:** edit the arrays in `CONFIG`. Keep statuses honest ("Planned", "In progress", "Completed").

## Deploy on GitHub Pages
1. Create a GitHub account, then a new **public** repository (e.g. `portfolio`, or `your-username.github.io` for a root URL).
2. Upload `index.html`, `styles.css`, `script.js`, `README.md` (and `assets/resume.pdf`).
3. Go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then Save.
4. Your site will be live at `https://your-username.github.io/portfolio/` within a minute or two.

## Preview locally
Double-click `index.html`, or run `python3 -m http.server` in this folder and open http://localhost:8000.
