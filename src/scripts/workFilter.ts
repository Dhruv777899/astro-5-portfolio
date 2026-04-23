export function initWorkFilter() {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const projectCards = document.querySelectorAll<HTMLElement>('.project-card[data-category]');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const cats = card.dataset.category || '';
        if (filter === 'all' || cats.includes(filter!)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }

        if (filter !== 'all' && card.classList.contains('featured') && !card.classList.contains('hidden')) {
          card.style.gridColumn = 'span 1';
        } else if (card.classList.contains('featured')) {
          card.style.gridColumn = '';
        }
      });
    });
  });
}
