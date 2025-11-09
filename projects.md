---
layout: single
title: "Research Projects"
permalink: /projects/
author_profile: true
scripts:
  - /assets/js/projects.js
---

<div class="projects" data-projects>
  <div class="projects__filters">
    <button class="projects__filter is-active" type="button" data-filter="all">All</button>
    {% assign project_categories = site.data.projects.categories %}
    {% for category in project_categories %}
      <button class="projects__filter" type="button" data-filter="{{ category.id }}">{{ category.title }}</button>
    {% endfor %}
  </div>

  <div class="projects__grid">
    {% for category in project_categories %}
      {% for project in category.projects %}
        {% include project-card.html project=project category_id=category.id %}
      {% endfor %}
    {% endfor %}
  </div>
</div>
