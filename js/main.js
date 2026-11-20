document.addEventListener("DOMContentLoaded", () => {
  // 1. Highlight active page link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // 2. Top Gold Scroll Progress Bar + Navbar Scroll State
  const progressBar = document.getElementById("scrollProgress");
  const navbar = document.querySelector(".navbar");

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }
    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 24);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // 3. Minimalist Scroll Reveal (Intersection Observer)
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  // 4. Cursor Spotlight Effect on Sleek Containers
  document.querySelectorAll(".sleek-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    });
  });

  // 5. Ctrl + K Command Palette
  const modal = document.getElementById("cmdModal");
  const openBtn = document.getElementById("openCmd");

  const toggleModal = (forceState) => {
    if (!modal) return;
    const isOpen =
      typeof forceState === "boolean"
        ? forceState
        : !modal.classList.contains("open");
    modal.classList.toggle("open", isOpen);
  };

  if (openBtn) openBtn.addEventListener("click", () => toggleModal(true));

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      toggleModal();
    } else if (e.key === "Escape") {
      toggleModal(false);
    }
  });

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) toggleModal(false);
    });
  }
});