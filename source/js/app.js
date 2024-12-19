/////////////////////////////////////////////////////////////////////////////
//АНИМАЦИЯ КНОПКИ ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ
////////////////////////////////////////////////////////////////////////////
function initAnchorBtn() {
  $('[data-scroll-top]').on('click', function () {
    $('.modal-scrollable').animate(
      {
        scrollTop: 0,
      },
      1000,
    )
  })
}


//////////////////////////////////////////////////////////////////////////
//ВАЛИДАЦИЯ ИНПУТА
//////////////////////////////////////////////////////////////////////////
function filterInvalidCharacters() {
  $('input[name="name"]').on('input', function() {
    let value = $(this).val();
    $(this).val(value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, ''));
  });
}


/////////////////////////////////////////////////////////////////////////
//АНИМАЦИЯ ПРОГРЕССА ИНПУТА ГОРОД
//////////////////////////////////////////////////////////////////////////
function cityProgress(e) {
  e.preventDefault()
  if (!$(this).valid()) {
    return
  }
  var $input = $(this).find('.js-input-city')
  var $progress = $(this).find('.js-input-city-progress')
  var $percent = $(this).find('.js-input-city-percent')
  var value = 0
  var max = 100

  $input.addClass('active')

  var interval = setInterval(function () {
    value++
    $percent.text(value + '%')
    $progress.css({
      width: value + '%',
    })
    if (value === max) {
      clearInterval(interval)
      setTimeout(function () {
        $input.removeClass('active')
        $('[data-remodal-id=modal-form-city]').remodal().open()
      }, 700)
    }
  }, 40)
}

function initCityForm() {
  $('[data-city-form]').on('submit', cityProgress)
}

$(document).ready(function () {
  initAnchorBtn()
  filterInvalidCharacters()
  initCityForm()

  $('input').inputmask()
})


////////////////////////////////////////////////////////////////////
//АКТИВНАЯ КАРТОЧКА
////////////////////////////////////////////////////////////////////
// const cards = document.querySelectorAll('.card-quantity');
// const input = document.getElementById('quantityInput');

// cards.forEach(card => {
//   card.addEventListener('click', () => {
//     cards.forEach(c => c.classList.remove('active'));
//     card.classList.add('active');
//     input.value = card.dataset.quantity;
//   });
// });


//////////////////////////////////////////////////////////////////////
//АНИМАЦИЯ ЧИСЕЛ
//////////////////////////////////////////////////////////////////////
// function animateCounter(counter) {
//   const target = +counter.getAttribute('data-number-animation');
//   const speed = 200;
//   let current = 0;

//   const increment = Math.ceil(target / speed);

//   const updateCounter = () => {
//     current += increment;
//     if (current > target) {
//       counter.textContent = target;
//     } else {
//       counter.textContent = current;
//       requestAnimationFrame(updateCounter);
//     }
//   };

//   updateCounter();
// }

// const counters = document.querySelectorAll('.counter');
// const observer = new IntersectionObserver(
//   (entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         animateCounter(entry.target);
//         observer.unobserve(entry.target);
//       }
//     });
//   },
//   {
//     // threshold: 0.5,
//     threshold: 1,
//   }
// );

// counters.forEach(counter => observer.observe(counter));


///////////////////////////////////////////////////////////////////////
//КАЛЬКУЛЯТОР
///////////////////////////////////////////////////////////////////////
// document.addEventListener('DOMContentLoaded', function () {
//   const selectHeader = document.getElementById('select-header');
//   const selectOptions = document.getElementById('select-options');
//   const selectedOption = document.getElementById('selected-option');

//   const track = document.querySelector('.custom-range__track');
//   const progress = document.querySelector('.custom-range__progress');
//   const thumb = document.querySelector('.custom-range__thumb');
//   const monthSpans = document.querySelectorAll('.calculation-section__months span');

//   const resultSpan = document.getElementById('result');

//   const steps = 8;
//   const stepValues = [3, 6, 9, 12, 15, 18, 21, 24];
//   const earningsMap = {
//     '500000': 284000,
//     '1000000': 451000,
//     '1000001': 647000,
//   };

//   let selectedPopulation = '500000'; // Значение по умолчанию: до 500 000 жителей
//   let currentStep = stepValues.indexOf(12); // Значение по умолчанию: 12 месяцев

//   // ==== ФУНКЦИИ ====
//   function updateThumbPosition(stepIndex) {
//     const percent = (stepIndex / (steps - 1)) * 100;
//     progress.style.width = `${percent}%`;
//     thumb.style.left = `${percent}%`;
//   }

//   function setActiveMonth(index) {
//     monthSpans.forEach((span, i) => {
//       span.classList.toggle('active', i === index);
//     });
//   }

//   function calculateResult() {
//     if (selectedPopulation && currentStep >= 0) {
//       const baseValue = earningsMap[selectedPopulation];
//       const months = stepValues[currentStep];
//       const result = baseValue * months;
//       resultSpan.textContent = result.toLocaleString();
//     }
//   }

//   // ==== КАСТОМНЫЙ СЕЛЕКТ ====
//   selectHeader.addEventListener('click', (e) => {
//     e.stopPropagation();
//     selectOptions.classList.toggle('show');
//   });

//   selectOptions.addEventListener('click', (e) => {
//     if (e.target.tagName === 'LI') {
//       selectedPopulation = e.target.getAttribute('data-value');
//       selectedOption.textContent = e.target.textContent;
//       selectOptions.classList.remove('show');
//       calculateResult();
//     }
//   });

//   document.addEventListener('click', (e) => {
//     if (!e.target.closest('.custom-select')) {
//       selectOptions.classList.remove('show');
//     }
//   });

//   // ==== ПЕРЕМЕЩЕНИЕ БЕГУНКА И ПОДСВЕТКА МЕСЯЦЕВ ====
//   monthSpans.forEach((span, index) => {
//     span.addEventListener('click', () => {
//       currentStep = index;
//       updateThumbPosition(index);
//       setActiveMonth(index);
//       calculateResult();
//     });
//   });

//   // ==== ПЕРЕТАСКИВАНИЕ БЕГУНКА ====
//   let isDragging = false;

//   thumb.addEventListener('mousedown', () => {
//     isDragging = true;
//     document.body.style.userSelect = 'none';
//   });

//   document.addEventListener('mousemove', (e) => {
//     if (isDragging) {
//       const trackRect = track.getBoundingClientRect();
//       let position = e.clientX - trackRect.left;
//       position = Math.max(0, Math.min(position, trackRect.width));

//       const percent = (position / trackRect.width) * 100;

//       const closestStep = stepValues.reduce((prev, _, index) => {
//         const stepPercent = (index / (steps - 1)) * 100;
//         return Math.abs(stepPercent - percent) < Math.abs((prev / (steps - 1)) * 100 - percent)
//           ? index
//           : prev;
//       }, 0);

//       currentStep = closestStep;
//       updateThumbPosition(closestStep);
//       setActiveMonth(closestStep);
//       calculateResult();
//     }
//   });

//   document.addEventListener('mouseup', () => {
//     if (isDragging) {
//       isDragging = false;
//       document.body.style.userSelect = '';
//     }
//   });

//   track.addEventListener('click', (e) => {
//     const trackRect = track.getBoundingClientRect();
//     let position = e.clientX - trackRect.left;
//     position = Math.max(0, Math.min(position, trackRect.width));

//     const percent = (position / trackRect.width) * 100;

//     const closestStep = stepValues.reduce((prev, _, index) => {
//       const stepPercent = (index / (steps - 1)) * 100;
//       return Math.abs(stepPercent - percent) < Math.abs((prev / (steps - 1)) * 100 - percent)
//         ? index
//         : prev;
//     }, 0);

//     currentStep = closestStep;
//     updateThumbPosition(closestStep);
//     setActiveMonth(closestStep);
//     calculateResult();
//   });

//   // ==== УСТАНОВКА ЗНАЧЕНИЙ ПО УМОЛЧАНИЮ ====
//   function setDefaults() {
//     selectedOption.textContent = 'До 500 000 жителей';
//     selectedPopulation = '500000';

//     currentStep = stepValues.indexOf(12);
//     updateThumbPosition(currentStep);
//     setActiveMonth(currentStep);

//     calculateResult();
//   }

//   setDefaults();
// });
