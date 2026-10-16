/* =====================================================
   EASY-EDIT CONFIGURATION
   Update the values below; the page rebuilds itself.
   ===================================================== */
const CONFIG = {
  name: "SREEDEVI AU",
  email: "sreedeviii1160@gmail.com",
  phone: "9961791160",
  phoneIntl: "+919961791160",

  // Leave empty ("") until you create the profiles; links will show "coming soon".
  // After creating GitHub, set e.g. "https://github.com/your-username"
  githubProfile: "",
  linkedin: "",

  // Put your PDF at assets/resume.pdf (or change the path here).
  resumePath: "assets/resume.pdf",

  typedLines: [
    "monitoring alerts and triaging events",
    "analysing logs to find suspicious activity",
    "learning incident response, step by step",
    "building a portfolio in public"
  ],

  // level: 1 = Beginner, 2 = Learning, 3 = Practising
  skills: [
    { icon: "🛡️", title: "SOC Fundamentals", desc: "Alert triage, event severity, escalation and shift handover basics.", level: 2, tags: ["Triage", "Escalation", "Ticketing"] },
    { icon: "📊", title: "Log Analysis & SIEM", desc: "Reading logs, spotting anomalies and understanding SIEM workflows.", level: 2, tags: ["Logs", "SIEM concepts", "Correlation"] },
    { icon: "🌐", title: "Network Security", desc: "TCP/IP, common ports and protocols, firewalls and packet inspection.", level: 2, tags: ["TCP/IP", "Wireshark", "Nmap"] },
    { icon: "🐧", title: "Linux & Command Line", desc: "Everyday Linux usage, file permissions and basic shell tooling.", level: 2, tags: ["Linux", "Bash", "Permissions"] },
    { icon: "🕵️", title: "Threats & Vulnerabilities", desc: "Common attack types, MITRE ATT&CK basics and the OWASP Top 10.", level: 2, tags: ["MITRE ATT&CK", "OWASP", "Phishing"] },
    { icon: "🧯", title: "Incident Response", desc: "The incident lifecycle: preparation, detection, containment and recovery.", level: 1, tags: ["IR lifecycle", "Reporting", "Documentation"] }
  ],

  timeline: [
    { when: "Completed", title: "Bachelor of Computer Applications (BCA)", place: "University of Calicut", desc: "Built a foundation in programming, databases, networking and computer systems." },
    { when: "Completed", title: "Cybersecurity Training", place: "Offeso Hackers Academy", desc: "Hands-on training covering core security concepts and practical techniques." },
    { when: "Ongoing", title: "Self-directed practice", place: "Labs, reading and projects", desc: "Continuing to learn and sharpen practical SOC and blue-team skills." }
  ],

  // status: "In progress" | "Planned" | "Completed". Add "link" once a repo exists.
  projects: [
    { title: "Home SOC Lab", status: "Planned", desc: "A small virtual lab to collect logs, generate test events and practise detection and triage.", tags: ["Virtualisation", "Logs", "SIEM"], link: "" },
    { title: "Log Analysis Write-ups", status: "In progress", desc: "Short write-ups on investigating sample log files and documenting findings clearly.", tags: ["Log analysis", "Reporting"], link: "" },
    { title: "Phishing Email Analysis", status: "Planned", desc: "A repeatable checklist for analysing suspicious emails: headers, links and attachments.", tags: ["Phishing", "Email headers"], link: "" }
  ],

  // state: "done" | "doing" | "todo"
  roadmap: [
    { state: "done", title: "Complete BCA degree", desc: "University of Calicut." },
    { state: "done", title: "Cybersecurity training", desc: "Offeso Hackers Academy." },
    { state: "doing", title: "Build hands-on SOC skills", desc: "Log analysis, alert triage and network fundamentals." },
    { state: "doing", title: "Publish projects on GitHub", desc: "Create a GitHub profile and document labs." },
    { state: "todo", title: "Earn an entry-level security certification", desc: "Choose a recognised foundational certification." },
    { state: "todo", title: "Land a SOC analyst (Tier 1) role", desc: "Apply, interview and keep growing." }
  ]
};

/* ===================== helpers ===================== */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const LEVELS = ["", "Beginner", "Learning", "Practising"];

/* ===================== theme ===================== */
(function theme() {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved) root.dataset.theme = saved;
  else if (window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches) root.dataset.theme = "light";
  $("#themeBtn").addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

/* ===================== nav ===================== */
(function nav() {
  const toggle = $("#navToggle"), links = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", e => {
    if (e.target.closest("a")) { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });
  const sections = [...document.querySelectorAll("main section[id]")];
  const anchors = [...links.querySelectorAll("a")];
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) anchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => io.observe(s));
})();

/* ===================== render content ===================== */
(function render() {
  // skills
  const sg = $("#skillsGrid");
  CONFIG.skills.forEach(s => {
    const c = el("article", "card reveal");
    c.innerHTML = `<span class="ico" aria-hidden="true">${s.icon}</span><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p>
      <div class="meter" role="img" aria-label="${LEVELS[s.level]}">${[1, 2, 3].map(i => `<i class="${i <= s.level ? "on" : ""}"></i>`).join("")}</div>
      <div class="meter-label">${LEVELS[s.level]}</div>
      <ul class="tags">${s.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`;
    sg.appendChild(c);
  });

  // timeline
  const tl = $("#timeline");
  CONFIG.timeline.forEach(t => {
    const li = el("li", "reveal");
    li.innerHTML = `<span class="when">${esc(t.when)}</span><h3>${esc(t.title)}</h3><strong style="font-size:.9rem;color:var(--accent-2)">${esc(t.place)}</strong><p>${esc(t.desc)}</p>`;
    tl.appendChild(li);
  });

  // projects
  const pg = $("#projectsGrid");
  CONFIG.projects.forEach(p => {
    const c = el("article", "card reveal");
    const planned = p.status.toLowerCase() === "planned";
    c.innerHTML = `<span class="status ${planned ? "planned" : ""}">${esc(p.status)}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      <ul class="tags">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      ${p.link ? `<a class="card-link" href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">View on GitHub &rarr;</a>` : ""}`;
    pg.appendChild(c);
  });

  // roadmap
  const rl = $("#roadmapList");
  const mark = { done: "✓", doing: "…", todo: "" };
  CONFIG.roadmap.forEach(r => {
    const li = el("li", `${r.state} reveal`);
    li.innerHTML = `<span class="box" aria-hidden="true">${mark[r.state]}</span><div><strong>${esc(r.title)}</strong><span class="d">${esc(r.desc)}</span></div>`;
    rl.appendChild(li);
  });

  // contact
  const mail = $("#emailLink"); mail.href = "mailto:" + CONFIG.email; mail.textContent = CONFIG.email;
  const ph = $("#phoneLink"); ph.href = "tel:" + CONFIG.phoneIntl; ph.textContent = CONFIG.phone;

  // socials (GitHub / LinkedIn configurable)
  const socials = $("#heroSocials"), slot = $("#githubSlot");
  const addSocial = (label, url) => {
    const li = el("li");
    li.innerHTML = url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>` : `<span style="color:var(--muted);font-size:.88rem">${label} (coming soon)</span>`;
    socials.appendChild(li);
  };
  addSocial("GitHub", CONFIG.githubProfile);
  if (CONFIG.linkedin) addSocial("LinkedIn", CONFIG.linkedin);
  slot.innerHTML = CONFIG.githubProfile ? `<a href="${esc(CONFIG.githubProfile)}" target="_blank" rel="noopener noreferrer">${esc(CONFIG.githubProfile.replace(/^https?:\/\//, ""))}</a>` : "Coming soon";

  $("#year").textContent = new Date().getFullYear();
})();

/* ===================== resume (PDF added later) ===================== */
(function resume() {
  const btn = $("#resumeBtn");
  btn.href = CONFIG.resumePath;
  btn.addEventListener("click", async e => {
    try {
      const r = await fetch(CONFIG.resumePath, { method: "HEAD" });
      if (!r.ok) throw new Error("missing");
    } catch (err) {
      // On file:// fetch can fail even if the file exists; only block on a clear 404 over http(s)
      if (location.protocol.startsWith("http")) {
        e.preventDefault();
        btn.textContent = "Resume coming soon";
        btn.classList.add("disabled");
        setTimeout(() => { btn.textContent = "Download resume"; btn.classList.remove("disabled"); }, 3000);
      }
    }
  });
})();

/* ===================== typing effect ===================== */
(function typing() {
  const out = $("#typed");
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lines = CONFIG.typedLines;
  if (reduce) { out.textContent = lines[0]; return; }
  let li = 0, ci = 0, del = false;
  (function tick() {
    const line = lines[li];
    out.textContent = line.slice(0, ci);
    if (!del && ci < line.length) { ci++; return setTimeout(tick, 55); }
    if (!del) { del = true; return setTimeout(tick, 1600); }
    if (ci > 0) { ci--; return setTimeout(tick, 25); }
    del = false; li = (li + 1) % lines.length; setTimeout(tick, 400);
  })();
})();

/* ===================== reveal on scroll ===================== */
(function reveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("in")); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
  }, { threshold: .12 });
  items.forEach(i => io.observe(i));
})();

/* ===================== contact ===================== */
(function contact() {
  $("#copyEmail").addEventListener("click", async e => {
    try { await navigator.clipboard.writeText(CONFIG.email); e.target.textContent = "Copied!"; }
    catch (err) { e.target.textContent = "Press Ctrl+C"; }
    setTimeout(() => (e.target.textContent = "Copy"), 2000);
  });

  const form = $("#contactForm"), note = $("#formNote");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const name = (d.get("name") || "").trim(), email = (d.get("email") || "").trim(), msg = (d.get("message") || "").trim();
    let ok = true;
    form.querySelectorAll("input,textarea").forEach(f => {
      const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value.trim()));
      f.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) { note.textContent = "Please fill in all fields with a valid email."; return; }
    const subject = encodeURIComponent("Portfolio enquiry from " + name);
    const body = encodeURIComponent(msg + "\n\n— " + name + " (" + email + ")");
    note.textContent = "Opening your email app…";
    location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  });
})();
