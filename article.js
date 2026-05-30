const shell = document.querySelector(".article-shell");

if (shell) {
  const title = shell.querySelector("h1");
  const firstHeading = shell.querySelector("h2");
  const recommendation = shell.querySelector(".amazon-recommendation");

  const breadcrumb = document.createElement("nav");
  breadcrumb.className = "breadcrumb";
  breadcrumb.setAttribute("aria-label", "Breadcrumb");
  breadcrumb.innerHTML = '<a href="../index.html">Home</a><span aria-hidden="true">/</span><a href="../index.html#guides">Guides</a>';
  shell.prepend(breadcrumb);

  if (title) {
    const meta = document.createElement("p");
    meta.className = "article-meta";
    meta.textContent = "Practical guide · About 3 minutes";
    title.insertAdjacentElement("afterend", meta);
  }

  if (firstHeading) {
    const jump = document.createElement("a");
    jump.className = "article-jump";
    jump.href = recommendation ? "#recommendation" : "#guide-content";
    jump.textContent = recommendation ? "Jump to optional product idea" : "Jump to the guide";
    firstHeading.id = "guide-content";
    const intro = shell.querySelector(".article-intro");
    if (intro) intro.insertAdjacentElement("afterend", jump);
  }

  if (recommendation) recommendation.id = "recommendation";

  const next = document.createElement("aside");
  next.className = "article-next";
  next.innerHTML = '<p class="eyebrow">Keep exploring</p><h2>Find the next small fix.</h2><p>Browse the complete guide library by apartment storage, entryway organization, and measure-first ideas.</p><a class="text-link" href="../index.html#guides">Browse all guides <span aria-hidden="true">&rarr;</span></a>';
  shell.append(next);
}
