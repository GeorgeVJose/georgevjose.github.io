(function () {
  const projectsSection = document.querySelector('[data-projects]');
  if (!projectsSection) return;

  const filters = Array.from(projectsSection.querySelectorAll('.projects__filter'));
  const cards = Array.from(projectsSection.querySelectorAll('.project-card'));
  if (!filters.length || !cards.length) return;

  const TRANSITION_MS = 280;

  projectsSection.classList.add('is-enhanced');

  const showCard = (card) => {
    if (card._hideTimeout) {
      window.clearTimeout(card._hideTimeout);
      card._hideTimeout = null;
    }

    card.classList.remove('is-hidden');
    window.requestAnimationFrame(() => {
      card.classList.add('is-visible');
    });
  };

  const hideCard = (card) => {
    if (card._hideTimeout) {
      window.clearTimeout(card._hideTimeout);
    }

    card.classList.remove('is-visible');
    card._hideTimeout = window.setTimeout(() => {
      card.classList.add('is-hidden');
      card._hideTimeout = null;
    }, TRANSITION_MS);
  };

  const applyFilter = (filterId) => {
    cards.forEach((card) => {
      const matches = filterId === 'all' || card.dataset.category === filterId;
      if (matches) {
        showCard(card);
      } else {
        hideCard(card);
      }
    });
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('is-active')) return;

      filters.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      applyFilter(button.dataset.filter);
    });
  });

  const initialFilter = projectsSection.querySelector('.projects__filter.is-active') || filters[0];
  if (initialFilter) {
    initialFilter.classList.add('is-active');
    applyFilter(initialFilter.dataset.filter);
  } else {
    cards.forEach(showCard);
  }
})();
