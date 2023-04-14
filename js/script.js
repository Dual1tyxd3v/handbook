function toggleHide(e) {
  const contentBlock = e.parentElement.nextElementSibling;
  contentBlock.style.display === 'block' ? $(contentBlock).slideUp(500) : $(contentBlock).slideDown(500);
  const opener = e.querySelector('.opener');
  opener.innerHTML = opener.innerHTML === '+' ? '-' : '+';
}

const container = document.querySelector('.container');

loadData();

function loadData() {
  for (let k in data) {
    container.innerHTML +=
      `<section class="main">
      <div class="main-header">
        <a href="#" class="main-trigger"><span class="opener">+</span> ${k} (${data[k].length})</a>
      </div>
      <div class="main-content hide ${k.toLowerCase()}">
        <ul class="sub">

        </ul>
      </div>
    </section>`;
    const list = container.querySelector(`.${k.toLowerCase()}`).querySelector('ul');
    data[k].sort().forEach(item => {
      list.innerHTML +=
        `<li>
      <div class="sub-header">
        <a href="" class="sub-trigger"><span class="opener">+</span> ${item[0]}</a>
      </div>
      <div class="sub-content hide">
        <div class="sub-p">
          ${item[1]}
        </div>
      </div>
    </li>`;
    });
  }
  // open and close tabs 
  document.querySelectorAll('.main-trigger, .sub-trigger').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      toggleHide(e.currentTarget);
    });
  });
  // search
  document.querySelector('form').addEventListener('submit', (e) => {
    let counts = 0;
    let coords = null;
    e.preventDefault();

    const search = $('.search').val().toLowerCase();
    if (!search) {
      return;
    }
    reset();
    document.querySelectorAll('.sub-trigger').forEach((tab) => {
      if (tab.textContent.toLowerCase().includes(search) || tab.parentElement.nextElementSibling.textContent.toLowerCase().includes(search)) {
        $(tab.closest('.main-content')).show();
        tab.parentElement.style.backgroundColor = 'green';
        $(tab.parentElement.nextElementSibling).show();
        counts++;
        if (!coords) {
          coords = tab.parentElement.nextElementSibling.getBoundingClientRect().top;
        }
      }
      $('.search').val('');
      $('.search').attr('placeholder', `Founded: ${counts}`);
    });
    window.scrollTo(0, coords);
  });

  function reset() {
    const tabs = $('.main-content, .sub-content');
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].classList.contains('sub-content')) {
        tabs[i].previousElementSibling.style.backgroundColor = '#575454';
      }
      $(tabs[i]).hide();
    }
  }
}
function* cicle() {
  yield 'a';
  yield 'aaa';
  yield 'text';
}
const x = cicle();
console.log(x.next());
console.log(x.next());
console.log(x.next());