document.addEventListener("DOMContentLoaded", () => {
  // 1. Smooth Fade-in Animation on Load
  const card = document.querySelector(".digital-card");

  if (card) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      card.style.opacity = "0";
      card.style.transform = "translateY(15px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50);
    }
  }

  // 2. Download Button Visual Feedback
  const downloadBtn = document.getElementById("downloadBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      const originalHTML = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
      this.style.opacity = "0.8";
      this.style.pointerEvents = "none";

      setTimeout(() => {
        this.innerHTML = originalHTML;
        this.style.opacity = "1";
        this.style.pointerEvents = "auto";
      }, 2000);
    });
  }

  // 3. Prevent double-tap zoom on mobile for links
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (event) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false },
  );

  // ========== TYPING EFFECT ==========
  function initTyping() {
    const typed = document.querySelector(".typed-text");

    if (!typed) {
      return;
    }

    // ✅ First phrase has "Aspiring", the rest do not
    const roles = [
      "Aspiring Software Developer",
      "Problem Solver",
      "Quick Learner",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typed.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeEffect, 500);
          return;
        }

        setTimeout(typeEffect, 60);
      } else {
        typed.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
          return;
        }

        setTimeout(typeEffect, 100);
      }
    }

    setTimeout(typeEffect, 500);
  }

  // Initialize Typing Effect
  initTyping();
});
