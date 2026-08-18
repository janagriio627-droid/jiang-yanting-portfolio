const data = window.PORTFOLIO_DATA;

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function applySiteData() {
  const { site } = data;
  setText("[data-site-name]", site.name);
  setText("[data-brand-mark]", site.mark);
  setText("[data-role]", site.role);
  setText("[data-availability]", site.availability);
  setText("[data-location]", site.location);
  setText("[data-intro]", site.intro);
  setText("[data-hero-line-one]", site.heroLineOne);
  setText("[data-hero-line-two]", site.heroLineTwo);
  setText("[data-about]", site.about);
  setText("[data-email]", site.email);
  setText("[data-year]", new Date().getFullYear());

  document.title = `${site.name} — 个人作品集`;

  const emailLink = document.querySelector("[data-email-link]");
  if (emailLink) emailLink.href = `mailto:${site.email}`;

  const facts = document.querySelector("[data-facts]");
  if (facts) {
    facts.innerHTML = site.facts
      .map(
        ([term, detail]) => `
          <div>
            <dt>${term}</dt>
            <dd>${detail}</dd>
          </div>`,
      )
      .join("");
  }
}

function projectCoverMarkup(project) {
  if (!project.coverImage) {
    return `
      <div class="project-mockup project-mockup--${project.mockType}" aria-hidden="true">
        ${mockupMarkup(project.mockType)}
      </div>`;
  }

  return `
    <div class="project-card__cover project-card__cover--${project.coverFit || "cover"}" aria-hidden="true">
      <img src="${project.coverImage}" alt="" loading="lazy" decoding="async" />
    </div>`;
}

function mockupMarkup(type) {
  if (type === "mobile") {
    return `
      <div class="mock-mobile mock-mobile--back">
        <span></span><i></i><i></i><i></i>
      </div>
      <div class="mock-mobile mock-mobile--front">
        <span></span><b></b><i></i><i></i><em></em>
      </div>
      <div class="mock-orbit"></div>`;
  }

  if (type === "editorial") {
    return `
      <div class="mock-poster">
        <small>VISUAL / SYSTEM</small>
        <strong>形</strong>
        <span>FORM FOLLOWS INTENT</span>
      </div>
      <div class="mock-poster mock-poster--secondary">
        <small>TYPE / MOTION</small>
        <strong>意</strong>
        <span>CLARITY IN MOTION</span>
      </div>`;
  }

  return `
    <div class="mock-window">
      <div class="mock-window__bar"><i></i><i></i><i></i></div>
      <div class="mock-window__sidebar"><span></span><span></span><span></span><span></span></div>
      <div class="mock-window__content">
        <div class="mock-window__metric"><small>OVERVIEW</small><strong>86.4</strong></div>
        <div class="mock-window__chart"><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="mock-window__rows"><span></span><span></span><span></span></div>
      </div>
    </div>`;
}

function projectInfoMarkup(project, className) {
  return `
    <div class="${className}">
      <p class="project-info__category">${project.category}</p>
      <h3 class="project-info__title">
        <a href="project.html?slug=${project.slug}">${project.name}</a>
      </h3>
      <p class="project-info__summary">${project.title}</p>
      <dl class="project-info__meta">
        <div><dt>角色</dt><dd>${project.role}</dd></div>
        <div><dt>年份</dt><dd>${project.year}</dd></div>
      </dl>
      <a class="project-info__cta" href="project.html?slug=${project.slug}">
        查看项目 <i aria-hidden="true">↗</i>
      </a>
    </div>`;
}

function renderProjects() {
  const list = document.querySelector("#project-list");
  if (!list) return;

  const cards = data.projects
    .map(
      (project, index) => `
        <div class="project-item" data-project-index="${index}">
          <article
            class="project-card${index === 0 ? " is-active" : ""}"
            data-project-index="${index}"
            data-tone="${project.tone}"
            ${index === 0 ? 'aria-current="true"' : ""}
          >
            <a class="project-card__media" href="project.html?slug=${project.slug}" aria-label="查看项目：${project.name}">
              <span class="project-card__index">${project.index}</span>
              ${projectCoverMarkup(project)}
            </a>
            ${projectInfoMarkup(project, "project-card__info")}
          </article>
        </div>`,
    )
    .join("");

  list.innerHTML = `
    <div class="projects-showcase">
      <div class="projects-media">${cards}</div>
      <div class="projects-info-wrapper">
        <aside class="projects-info" data-active-index="0" aria-live="polite" aria-atomic="true">
          ${projectInfoMarkup(data.projects[0], "projects-info__content")}
        </aside>
      </div>
    </div>`;
}

function initProjectShowcase() {
  const items = [...document.querySelectorAll(".project-item")];
  const cards = items.map((item) => item.querySelector(".project-card"));
  const info = document.querySelector(".projects-info");
  if (!items.length || cards.some((card) => !card) || !info) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const baseHeights = new Map();
  let activeIndex = 0;
  let transitionToken = 0;
  let ticking = false;
  let needsMeasurement = true;

  function cacheBaseHeights() {
    items.forEach((item) => item.style.removeProperty("height"));
    cards.forEach((card) => card.style.removeProperty("transform"));
    cards.forEach((card) => {
      const computedHeight = Number.parseFloat(window.getComputedStyle(card).height);
      const baseHeight = Number.isFinite(computedHeight)
        ? computedHeight
        : card.getBoundingClientRect().height;
      baseHeights.set(card, baseHeight);
    });
  }

  function setActiveProject(index) {
    if (index === activeIndex) return;
    activeIndex = index;

    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === index;
      card.classList.toggle("is-active", isActive);
      if (isActive) card.setAttribute("aria-current", "true");
      else card.removeAttribute("aria-current");
    });

    const token = ++transitionToken;
    const updateContent = () => {
      if (token !== transitionToken) return;
      info.innerHTML = projectInfoMarkup(data.projects[index], "projects-info__content");
      info.dataset.activeIndex = String(index);

      if (reducedMotion) return;
      info.classList.remove("is-leaving");
      info.classList.add("is-entering");
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (token === transitionToken) info.classList.remove("is-entering");
        });
      });
    };

    if (reducedMotion) {
      updateContent();
      return;
    }

    info.classList.add("is-leaving");
    window.setTimeout(updateContent, 140);
  }

  function update() {
    const viewportCenter = window.innerHeight / 2;
    const maxDistance = window.innerHeight * 0.8;
    const useScrollScale = !reducedMotion && window.innerWidth >= 768;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    if (needsMeasurement) {
      cacheBaseHeights();
      needsMeasurement = false;
    }

    if (!useScrollScale) {
      items.forEach((item) => item.style.removeProperty("height"));
      cards.forEach((card) => {
        card.style.removeProperty("transform");
        card.style.removeProperty("opacity");
      });
    }

    const measurements = items.map((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const computedHeight = Number.parseFloat(window.getComputedStyle(cards[index]).height);
      const baseHeight = Number.isFinite(computedHeight)
        ? computedHeight
        : baseHeights.get(cards[index]) || cards[index].offsetHeight;
      baseHeights.set(cards[index], baseHeight);
      return {
        baseHeight,
        distance: Math.abs(itemCenter - viewportCenter),
      };
    });

    cards.forEach((card, index) => {
      const { baseHeight, distance } = measurements[index];

      if (useScrollScale) {
        const progress = 1 - Math.min(distance / maxDistance, 1);
        const scale = 0.88 + progress * 0.12;
        const opacity = 0.55 + progress * 0.45;
        const renderedScale = Number(scale.toFixed(4));
        card.style.transform = `scale(${renderedScale})`;
        card.style.opacity = opacity.toFixed(4);
        items[index].style.height = `${(baseHeight * renderedScale).toFixed(3)}px`;
      }

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveProject(closestIndex);
    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  function requestMeasure() {
    needsMeasurement = true;
    requestUpdate();
  }

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestMeasure);
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8%" },
  );

  elements.forEach((element, index) => {
    element.style.setProperty("--reveal-order", index % 4);
    observer.observe(element);
  });
}

function initScrollIndex() {
  const progressBar = document.querySelector(".scroll-index__line i");
  const progressValue = document.querySelector(".scroll-index__value");
  const sectionName = document.querySelector(".scroll-index__section");
  const header = document.querySelector(".site-header");
  const sections = [...document.querySelectorAll(".section-track")];

  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    const percent = Math.round(progress * 100);
    progressBar.style.transform = `scaleX(${progress})`;
    progressValue.textContent = String(percent).padStart(2, "0");
    header.classList.toggle("is-scrolled", window.scrollY > 48);

    const marker = window.innerHeight * 0.42;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) current = section;
    });
    sectionName.textContent = current?.dataset.section || "INTRO";
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (!toggle || !menu) return;

  menu.inert = true;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    menu.inert = !open;
    document.body.classList.toggle("menu-open", open);
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

function initHeroPointer() {
  const hero = document.querySelector(".hero");
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    hero.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });
}

applySiteData();
renderProjects();
initReveal();
initProjectShowcase();
initScrollIndex();
initMenu();
initHeroPointer();
