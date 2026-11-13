/**
 * 21st.dev Pro Interactions & Motion System
 * Shivam Kumar Portfolio
 */

(function () {
  "use strict";

  // 1. Spotlight Mouse Tracking for 21st.dev Cards
  const initSpotlight = () => {
    const cards = document.querySelectorAll(".spotlight-card");
    document.addEventListener("mousemove", (e) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  };

  // 2. Scroll Progress Bar
  const initScrollProgress = () => {
    const progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    window.addEventListener("scroll", () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    });
  };

  // 3. Top Navigation Scrolled Class & Scrollspy
  const initNavScrollspy = () => {
    const navWrapper = document.querySelector(".top-nav-wrapper");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link-item a, .mobile-nav-links a");

    window.addEventListener("scroll", () => {
      const scrollY = window.pageYOffset;

      // Scrolled styling
      if (navWrapper) {
        if (scrollY > 50) {
          navWrapper.classList.add("scrolled");
        } else {
          navWrapper.classList.remove("scrolled");
        }
      }

      // Scrollspy
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    });
  };

  // 4. Mobile Menu Drawer
  const initMobileMenu = () => {
    const toggleBtn = document.querySelector(".mobile-nav-toggle");
    const drawer = document.querySelector(".mobile-menu-drawer");
    const links = document.querySelectorAll(".mobile-menu-drawer a");

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener("click", () => {
      drawer.classList.toggle("open");
      const icon = toggleBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("bi-list");
        icon.classList.toggle("bi-x");
      }
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        drawer.classList.remove("open");
        const icon = toggleBtn.querySelector("i");
        if (icon) {
          icon.classList.add("bi-list");
          icon.classList.remove("bi-x");
        }
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        drawer.classList.remove("open");
        const icon = toggleBtn.querySelector("i");
        if (icon) {
          icon.classList.add("bi-list");
          icon.classList.remove("bi-x");
        }
      }
    });
  };

  // 5. Skills Category Filter Tabs
  const initSkillFilters = () => {
    const filterBtns = document.querySelectorAll(".skill-tab-btn");
    const skillCards = document.querySelectorAll(".skill-category-card");

    if (!filterBtns.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        skillCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block";
            card.style.animation = "fadeInScale 0.3s ease forwards";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  };

  // 6. Interactive Copy to Clipboard Buttons
  const initCopyButtons = () => {
    const copyBtns = document.querySelectorAll(".copy-pill-btn");

    copyBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute("data-copy");
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
          btn.classList.add("copied");

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove("copied");
          }, 2000);
        });
      });
    });
  };

  // 7. Scroll Top Button
  const initScrollTop = () => {
    const scrollTopBtn = document.querySelector(".scroll-top-btn");
    if (!scrollTopBtn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  // 8. Typed.js Initialization
  const initTypedText = () => {
    const typedEl = document.querySelector(".typed");
    if (typedEl && typeof Typed !== "undefined") {
      const items = typedEl.getAttribute("data-typed-items");
      if (items) {
        new Typed(".typed", {
          strings: items.split(","),
          loop: true,
          typeSpeed: 60,
          backSpeed: 35,
          backDelay: 1800,
        });
      }
    }
  };

  // 9. PureCounter Init
  const initCounters = () => {
    if (typeof PureCounter !== "undefined") {
      new PureCounter();
    }
  };

  // 10. AOS (Animate on Scroll)
  const initAOS = () => {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 700,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        once: true,
        offset: 50,
      });
    }
  };

  // 11. WhatsApp Direct Message Handler
  const initWhatsAppForm = () => {
    const form = document.getElementById("whatsapp-contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("wa-name")?.value.trim() || "";
      const email = document.getElementById("wa-email")?.value.trim() || "";
      const subject = document.getElementById("wa-subject")?.value.trim() || "";
      const message = document.getElementById("wa-message")?.value.trim() || "";

      let text = `*New Direct Message (Portfolio Inquiry)*\n\n`;
      text += `👤 *Name:* ${name}\n`;
      if (email) text += `📧 *Email / Company:* ${email}\n`;
      if (subject) text += `📌 *Subject:* ${subject}\n\n`;
      text += `💬 *Message:*\n${message}`;

      const phone = "919472774549";
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

      window.open(waUrl, "_blank");
    });
  };

  // Initialize all after DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    initSpotlight();
    initScrollProgress();
    initNavScrollspy();
    initMobileMenu();
    initSkillFilters();
    initCopyButtons();
    initScrollTop();
    initTypedText();
    initCounters();
    initAOS();
    initWhatsAppForm();
  });
})();
