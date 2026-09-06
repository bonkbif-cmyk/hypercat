// Hypercat — small, dependency-free interactions.
// Replace the three placeholder URLs below when your official links are ready.
const HYPERCAT_LINKS = {
  buy: "https://perpme.fun/token/0xa0e0ce74d20975b025260109ff3a27ab96640999",
  x: "https://x.com/hypercat_coin?s=11",
  explorer: "https://hyperevmscan.io/token/0xA0E0Ce74D20975b025260109Ff3a27AB96640999#transactions",
  contract: "0xA0E0Ce74D20975b025260109Ff3a27AB96640999",
  telegram: "#telegram",
  discord: "#discord"
};

document.querySelectorAll('a[href="#buy"]').forEach(a => a.href = HYPERCAT_LINKS.buy);
document.querySelectorAll('a[href="#x"]').forEach(a => a.href = HYPERCAT_LINKS.x);
document.querySelectorAll('a[href="#telegram"]').forEach(a => a.href = HYPERCAT_LINKS.telegram);
document.querySelectorAll('a[href="#discord"]').forEach(a => a.href = HYPERCAT_LINKS.discord);
document.querySelectorAll('a[href="#explorer"]').forEach(a => a.href = HYPERCAT_LINKS.explorer);
document.querySelectorAll('[data-contract]').forEach(el => el.textContent = HYPERCAT_LINKS.contract);
document.querySelectorAll('[data-copy-contract]').forEach(btn => btn.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(HYPERCAT_LINKS.contract); btn.textContent = 'COPIED ✓'; setTimeout(() => btn.textContent = 'COPY CA', 1400); } catch(e) {}
}));

const toggle = document.querySelector(".mobile-toggle");
const links = document.querySelector(".nav-links");
toggle?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
links?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const cursor = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  if (cursor) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});

// Highlight the current section in the navigation.
const sections = [...document.querySelectorAll("main section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, {rootMargin: "-35% 0px -55% 0px"});
sections.forEach(s => navObserver.observe(s));
