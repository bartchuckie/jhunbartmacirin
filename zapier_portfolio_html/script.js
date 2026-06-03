const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const projectCards = document.querySelectorAll(".project-card");
const projectPanels = document.querySelectorAll(".project-detail");
const revealElements = document.querySelectorAll(
    ".section-heading, .content-panel, .tool-card, .project-card, .project-detail, .contact-panel"
);
const navSectionLinks = document.querySelectorAll(".nav-links a[href^='#']");
const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}

projectCards.forEach(card => {
    card.addEventListener("click", () => {
        const selectedProject = card.dataset.project;

        projectCards.forEach(projectCard => {
            projectCard.classList.toggle("active", projectCard === card);
        });

        projectPanels.forEach(panel => {
            panel.classList.toggle("active", panel.dataset.projectPanel === selectedProject);
        });
    });
});

revealElements.forEach((element, index) => {
    element.classList.add("reveal");

    if (element.classList.contains("content-panel") || element.classList.contains("project-detail")) {
        element.classList.add("reveal-right");
    }

    if (element.classList.contains("project-card")) {
        element.classList.add("reveal-left");
    }

    element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 80}ms`);
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: "0px 0px -12% 0px",
            threshold: 0.15
        }
    );

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("in-view"));
}

const updateNavProgress = () => {
    const sections = [...navSectionLinks]
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    let activeIndex = 0;
    const scrollPosition = window.scrollY + window.innerHeight * 0.35;

    sections.forEach((section, index) => {
        if (section.offsetTop <= scrollPosition) {
            activeIndex = index;
        }
    });

    navSectionLinks.forEach((link, index) => {
        link.classList.toggle("active", index === activeIndex);
    });

    const progress = sections.length > 1 ? activeIndex / (sections.length - 1) : 0;
    navLinks.style.setProperty("--nav-progress-scale", progress);
};

if (navSectionLinks.length) {
    updateNavProgress();
    window.addEventListener("scroll", updateNavProgress);
    window.addEventListener("resize", updateNavProgress);
}

document.querySelectorAll(".sop-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
        const body = toggle.nextElementSibling;
        const icon = toggle.querySelector(".toggle-icon");
        const isOpen = body.classList.toggle("open");

        toggle.setAttribute("aria-expanded", String(isOpen));
        icon.textContent = isOpen ? "-" : "+";
    });
});

document.querySelectorAll(".screenshots-row figure").forEach(figure => {
    const image = figure.querySelector("img");
    const caption = figure.querySelector("figcaption");

    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", `Zoom image: ${caption.textContent}`);

    const openImage = () => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = caption.textContent;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    figure.addEventListener("click", openImage);
    figure.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openImage();
        }
    });
});

const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
};

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
    }
});

window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 420 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
