/* =========================================
   ExpressLine Delivery Services
   Main Website JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE NAVIGATION
  ========================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");

      const expanded =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!expanded));
    });
  }


  /* =========================
     TRACKING FORM
  ========================= */

  const trackingForms = document.querySelectorAll(
    "#trackingForm, .tracking-form"
  );

  trackingForms.forEach((form) => {

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const input = form.querySelector(
        'input[name="trackingNumber"], input[type="text"]'
      );

      const trackingNumber = input
        ? input.value.trim()
        : "";

      let message = form.querySelector(".tracking-message");

      if (!message) {
        message = document.createElement("div");
        message.className = "tracking-message";
        form.appendChild(message);
      }

      message.className = "tracking-message";

      /* Never use or display a sample tracking number. */

      if (!trackingNumber) {
        message.textContent =
          "Please enter your tracking number.";
        message.classList.add("alert", "alert-error");
        return;
      }

      /*
        The real database lookup will be connected
        when the backend/API is added.

        We intentionally do NOT invent shipment data
        or display a fake shipment here.
      */

      const encodedTrackingNumber =
        encodeURIComponent(trackingNumber);

      const trackingPage =
        `track.html?tracking=${encodedTrackingNumber}`;

      window.location.href = trackingPage;
    });
  });


  /* =========================
     SMOOTH INTERNAL LINKS
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* =========================
     CLOSE MOBILE MENU
  ========================= */

  document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

      if (navLinks) {
        navLinks.classList.remove("mobile-open");
      }

      if (menuToggle) {
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    });
  });


  /* =========================
     CURRENT YEAR
  ========================= */

  document.querySelectorAll("[data-current-year]")
    .forEach((element) => {
      element.textContent =
        new Date().getFullYear();
    });


  /* =========================
     BASIC FORM VALIDATION
  ========================= */

  document.querySelectorAll("form").forEach((form) => {

    form.addEventListener("submit", (event) => {

      const requiredFields =
        form.querySelectorAll("[required]");

      let valid = true;

      requiredFields.forEach((field) => {

        if (!field.value.trim()) {
          valid = false;
          field.setAttribute(
            "aria-invalid",
            "true"
          );
        } else {
          field.removeAttribute(
            "aria-invalid"
          );
        }
      });

      if (!valid) {

        event.preventDefault();

        const firstInvalid =
          form.querySelector(
            '[aria-invalid="true"]'
          );

        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  });


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements =
    document.querySelectorAll(
      ".card, .stat, .section-heading, .form-container"
    );

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }

});
