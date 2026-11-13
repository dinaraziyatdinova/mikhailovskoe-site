
(() => {
  'use strict';
  const body = document.body;
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const dialog = document.querySelector('.detail-dialog');
  let lastTrigger = null;

  const setMenu = (open, restoreFocus = false) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mobileMenu.hidden = !open;
    body.classList.toggle('scroll-locked', open || dialog.open);
    document.querySelector('main').inert = open;
    document.querySelector('footer').inert = open;
    if (open) mobileMenu.querySelector('a').focus();
    if (!open && restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenu(false);
    const destination = document.querySelector(link.hash);
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
      destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true });
    }
  }));
  document.querySelector('.brand').addEventListener('click', () => setMenu(false));
  const desktopQuery = window.matchMedia('(min-width: 981px)');
  desktopQuery.addEventListener('change', event => { if (event.matches) setMenu(false); });
  document.addEventListener('keydown', event => {
    if (menuButton.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
    if (event.key === 'Tab') {
      const links = [...document.querySelectorAll('.site-header a, .menu-toggle, .mobile-menu a')].filter(el => el.getClientRects().length);
      const first = links[0], last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  const spaces = {
  "house": {
    "title": "Главный дом",
    "lead": "Музей истории усадьбы и естественных наук.",
    "image": "estate-illustration.webp",
    "description": "Экспозиции главного дома знакомят с историей Михайловского и его научно-просветительской традицией. Здесь рассказывают о культурном наследии усадьбы, естественно-историческом музее и интересе к изучению природы.",
    "notice": "Подойдёт для начала визита. Продолжить знакомство с историей можно на экскурсии «Михайловское: диалог времён»."
  },
  "wings": {
    "title": "Флигели",
    "lead": "Выставки, лекции и творческие мастерские.",
    "image": "studio-study.svg",
    "description": "Во флигелях проходит образовательная и творческая жизнь усадьбы. Здесь можно посетить выставку, послушать лекцию или принять участие в мастер-классе. Занятия помогают перейти от знакомства с темой к собственной практике.",
    "notice": "Для творческого занятия выберите программу «Усадьба в цвете и линии», для знакомства с ботаникой — лекцию «Как читать ботанический сад»."
  },
  "park": {
    "title": "Исторический парк",
    "lead": "Прогулки по истории и природе Михайловского.",
    "image": "botanical-study.svg",
    "description": "Исторический парк подходит для прогулки после музея и для отдельного знакомства с природой. Тематические маршруты посвящены истории усадьбы, растениям и внимательному наблюдению за окружающим миром.",
    "notice": "В разделе «Парк» можно выбрать тему прогулки. Для посещения подойдёт удобная обувь и одежда по погоде."
  },
  "greenhouse": {
    "title": "Оранжерея",
    "lead": "Инициатива развития ботанического образования.",
    "image": "greenhouse-study.svg",
    "kicker": "Ботаническая инициатива / Требует согласования",
    "description": "Оранжерея пока не построена и не принимает посетителей. Возможность её создания требует согласования. С ботаническим направлением усадьбы можно познакомиться уже сейчас — на прогулках, лекциях и образовательных занятиях.",
    "notice": "Выберите ботаническую прогулку «Природа крупным планом» или лекцию «Как читать ботанический сад». На изображении показана условная иллюстрация оранжереи."
  }
};
  const events = {
  "estate-walk": {
    "title": "Михайловское: диалог времён",
    "lead": "Первое знакомство с Михайловским.",
    "image": "img/dialogue-of-times.png",
    "description": "Экскурсия объединяет рассказ об истории усадьбы, её архитектуре и научно-просветительской традиции. Вы узнаете, как связаны музей, ботаника и культурная жизнь Михайловского, и познакомитесь с основными темами музейных экспозиций.",
    "kicker": "Экскурсия / История усадьбы",
    "notice": "Подойдёт тем, кто впервые в усадьбе и хочет начать посещение с общего знакомства с её историей."
  },
  "natural-history": {
    "title": "Кабинет естественной истории",
    "lead": "Как наблюдение за природой становится знанием.",
    "image": "img/programme-natural-history.png",
    "description": "Выставка знакомит с традицией естественно-исторического музея. В её центре — способы изучения природы: внимательно рассматривать, сравнивать, задавать вопросы и сохранять результаты наблюдений.",
    "kicker": "Выставка / Естественные науки",
    "notice": "Выставка дополняет знакомство с историей главного дома. Тему растений можно продолжить на ботанической прогулке по парку."
  },
  "garden-lecture": {
    "title": "Как читать ботанический сад",
    "lead": "Зачем нужны ботанические сады и коллекции растений.",
    "image": "img/programme-botanical-lecture.png",
    "description": "На лекции говорим о том, как ботанические сады помогают исследовать растительный мир и сохранять знания о нём. Разбираемся, что отличает научную коллекцию от обычного сада и почему растения важно изучать во взаимосвязи с окружающей средой.",
    "kicker": "Лекция / Ботаника",
    "notice": "Подойдёт тем, кто интересуется растениями и хочет лучше понимать ботанические коллекции и образовательную роль сада."
  },
  "art-workshop": {
    "title": "Усадьба в цвете и линии",
    "lead": "Рисуем, вдохновляясь архитектурой и природой.",
    "image": "img/programme-masterclass.png",
    "description": "На мастер-классе рассматриваем линии зданий, ритм архитектурных деталей и формы растений. Выбираем выразительные элементы и переносим впечатления от усадьбы на бумагу, работая с цветом и линией.",
    "kicker": "Мастер-класс / Творчество",
    "notice": "Практическое занятие для тех, кто хочет дополнить посещение усадьбы творческой работой."
  },
  "young-researcher": {
    "title": "Маленькие исследователи",
    "lead": "Замечаем, сравниваем и задаём вопросы.",
    "image": "img/programme-children.png",
    "description": "Дети знакомятся с природой через наблюдение и небольшие исследования. Рассматривают детали, находят сходства и различия, учатся формулировать вопросы и объяснять свои наблюдения.",
    "kicker": "Для детей / Естественные науки",
    "notice": "Программа посвящена детскому интересу к окружающему миру. Возрастные рекомендации и условия участия уточняйте перед посещением."
  },
  "botanical-walk": {
    "title": "Природа крупным планом",
    "lead": "Учимся замечать растения и сезонные изменения.",
    "image": "img/nature-closeup.png",
    "description": "Во время прогулки по парку рассматриваем листья и силуэты растений, сравниваем формы и замечаем изменения в природе. Знакомство с ботаникой начинается с простых наблюдений, которые можно продолжать и после посещения усадьбы.",
    "kicker": "Ботаническая прогулка / Парк",
    "notice": "Программа проходит на открытом воздухе. Выбирайте удобную обувь и одежду по погоде."
  }
};
  function openDetail(item, kind, trigger) {
    lastTrigger = trigger;
    document.getElementById('dialog-title').textContent = item.title;
    document.getElementById('dialog-kicker').textContent = item.kicker || (kind === 'space' ? 'Пространство усадьбы' : 'Афиша и программы');
    document.getElementById('dialog-lead').textContent = item.lead;
    document.getElementById('dialog-description').textContent = item.description;
    document.getElementById('dialog-notice').textContent = item.notice || 'Другие экскурсии и занятия представлены в разделе «Афиша и программы».';
    const image = document.getElementById('dialog-image');
    image.src = 'assets/' + item.image;
    image.alt = item.image === 'estate-illustration.webp' ? 'Главный дом Михайловского — иллюстрация' : 'Иллюстрация: ' + item.title;
    image.parentElement.classList.toggle('is-estate', item.image === 'estate-illustration.webp');
    dialog.showModal();
    body.classList.add('scroll-locked');
    dialog.scrollTop = 0;
    document.querySelector('.dialog-close').focus({ preventScroll: true });
  }
  document.querySelectorAll('[data-space]').forEach(button => button.addEventListener('click', () => openDetail(spaces[button.dataset.space], 'space', button)));
  document.querySelectorAll('[data-event]').forEach(button => button.addEventListener('click', () => openDetail(events[button.dataset.event], 'event', button)));
  document.querySelectorAll('.dialog-close,.dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    body.classList.remove('scroll-locked');
    if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus({ preventScroll: true });
  });

  const filters = [...document.querySelectorAll('[data-filter]')];
  const eventCards = [...document.querySelectorAll('.event-card')];
  function filterEvents(category) {
    let visible = 0;
    filters.forEach(button => {
      const selected = button.dataset.filter === category;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    eventCards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) visible++;
    });
    document.getElementById('filter-announcement').textContent = 'Показано программ: ' + visible;
  }
  filters.forEach(button => button.addEventListener('click', () => filterEvents(button.dataset.filter)));
  document.querySelectorAll('[data-direction]').forEach(link => link.addEventListener('click', () => filterEvents(link.dataset.direction)));

  const routes = {
  "history": {
    "title": "История усадьбы",
    "text": "На прогулке знакомимся с усадебным пространством и его историей. Рассматриваем связь главного дома и парка, говорим о культурной и научно-просветительской жизни Михайловского."
  },
  "botany": {
    "title": "Растения парка",
    "text": "Рассматриваем растения, сравниваем форму листьев и силуэты деревьев. Знакомимся с ботанической традицией усадьбы и учимся видеть разнообразие растительного мира."
  },
  "observation": {
    "title": "Наблюдение за природой",
    "text": "Обращаем внимание на детали: рисунок листа, фактуру коры, свет и сезонные изменения. Такая прогулка помогает замедлиться и по-новому посмотреть на привычный пейзаж."
  }
};
  const routeTabs = [...document.querySelectorAll('[data-route]')];
  function selectRoute(tab) {
    routeTabs.forEach(button => {
      const selected = button === tab;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    const route = routes[tab.dataset.route];
    const panel = document.getElementById('route-panel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.querySelector('h3').textContent = route.title;
    panel.querySelector('p').textContent = route.text;
  }
  routeTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectRoute(tab));
    tab.addEventListener('keydown', event => {
      let nextIndex;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % routeTabs.length;
      else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + routeTabs.length) % routeTabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = routeTabs.length - 1;
      else return;
      event.preventDefault();
      selectRoute(routeTabs[nextIndex]);
      routeTabs[nextIndex].focus();
    });
  });

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.desktop-nav a').forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      body.classList.add('js-reveal');
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });
      document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
    }
  }
})();
