const data = window.PORTFOLIO_DATA;

function setGlobalText() {
  document.querySelectorAll("[data-site-name]").forEach((element) => {
    element.textContent = data.site.name;
  });
  document.querySelectorAll("[data-brand-mark]").forEach((element) => {
    element.textContent = data.site.mark;
  });
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

function mockupMarkup(type) {
  if (type === "mobile") {
    return `
      <div class="mock-mobile mock-mobile--back"><span></span><i></i><i></i><i></i></div>
      <div class="mock-mobile mock-mobile--front"><span></span><b></b><i></i><i></i><em></em></div>
      <div class="mock-orbit"></div>`;
  }
  if (type === "editorial") {
    return `
      <div class="mock-poster"><small>VISUAL / SYSTEM</small><strong>形</strong><span>FORM FOLLOWS INTENT</span></div>
      <div class="mock-poster mock-poster--secondary"><small>TYPE / MOTION</small><strong>意</strong><span>CLARITY IN MOTION</span></div>`;
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

function sectionVisual(section, project) {
  if (section.image) {
    return `
      <figure class="case-project-image">
        <img src="${section.image}" alt="${section.imageAlt || ""}" loading="lazy" decoding="async" />
        ${section.caption ? `<figcaption>${section.caption}</figcaption>` : ""}
      </figure>`;
  }

  const type = section.visual;
  if (type === "flow") {
    return `
      <div class="case-visual case-visual--flow" aria-label="流程示意占位">
        <span>发现</span><i></i><span>定义</span><i></i><span>验证</span><i></i><span>交付</span>
      </div>`;
  }
  if (type === "result") {
    return `
      <div class="case-visual case-visual--result" aria-label="成果示意占位">
        <small>PROJECT SIGNAL</small>
        <strong>${project.highlight}</strong>
        <div><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      </div>`;
  }
  return `
    <div class="case-visual case-visual--map" aria-label="研究与信息结构示意占位">
      <span>用户</span><span>情境</span><span>问题</span><span>机会</span>
      <i></i><i></i><i></i>
    </div>`;
}

function projectCoverMarkup(project) {
  if (project.coverImage) {
    return `
      <div class="case-cover__image case-cover__image--${project.coverFit || "cover"}">
        <img src="${project.coverImage}" alt="${project.coverAlt || project.name}" decoding="async" />
      </div>`;
  }

  return `
    <div class="project-mockup project-mockup--${project.mockType}" aria-hidden="true">
      ${mockupMarkup(project.mockType)}
    </div>`;
}

function renderProject() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || data.projects[0].slug;
  const project = data.projects.find((item) => item.slug === slug) || data.projects[0];
  const currentIndex = data.projects.indexOf(project);
  const nextProject = data.projects[(currentIndex + 1) % data.projects.length];

  document.title = `${project.name} — ${data.site.name}`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", project.summary);

  document.querySelector("#project-content").innerHTML = `
    <article class="case" data-tone="${project.tone}">
      <section class="case-hero">
        <div class="case-hero__meta">
          <p>${project.category}</p>
          <dl>
            <div><dt>角色</dt><dd>${project.role}</dd></div>
            <div><dt>时间</dt><dd>${project.year}</dd></div>
            <div><dt>周期</dt><dd>${project.duration}</dd></div>
          </dl>
        </div>
        <div class="case-hero__title">
          <span>${project.index} / CASE STUDY</span>
          <h1>${(project.headline || [project.title]).map((line) => `<span>${line}</span>`).join("")}</h1>
          <p>${project.summary}</p>
        </div>
      </section>

      <div class="case-cover" data-tone="${project.tone}">
        <span class="case-cover__name">${project.name}</span>
        ${projectCoverMarkup(project)}
      </div>

      <section class="case-problem">
        <div class="case-section-heading">
          <span>项目定义</span>
          <h2>Problem statement</h2>
        </div>
        <div class="problem-grid">
          ${project.problemCards
            .map(
              ([title, body]) => `
                <article>
                  <h3>${title}</h3>
                  <p>${body}</p>
                </article>`,
            )
            .join("")}
        </div>
      </section>

      <div class="case-sections">
        ${project.sections
          .map(
            (section) => `
              <section class="case-story">
                <div class="case-story__copy">
                  <span>${section.eyebrow}</span>
                  <h2>${section.title}</h2>
                  <p>${section.body}</p>
                </div>
                ${sectionVisual(section, project)}
              </section>`,
          )
          .join("")}
      </div>

      <section class="case-next">
        <span>NEXT PROJECT</span>
        <a href="project.html?slug=${nextProject.slug}">
          <small>${nextProject.index} / ${nextProject.category}</small>
          <strong>${nextProject.name}</strong>
          <i aria-hidden="true">→</i>
        </a>
      </section>
    </article>`;
}

setGlobalText();
renderProject();
