// ===================================
// Responsive Navbar
// ===================================

const mobile_nav = document.querySelector(".mobile-navbar-btn");
const headerElem = document.querySelector(".header");

mobile_nav.addEventListener("click", () => {
  headerElem.classList.toggle("active");
});

// ===================================
// Portfolio Tabbed Component
// ===================================

const p_btns = document.querySelector(".p-btns");
const p_btn = document.querySelectorAll(".p-btn");
const p_img_elem = document.querySelectorAll(".img-overlay");

p_btns.addEventListener("click", (e) => {

  const p_btn_clicked = e.target.closest(".p-btn");

  // stop if clicked element is not button
  if (!p_btn_clicked) return;

  // remove active class from all buttons

 if( ! p_btn_clicked.classList.contains('p-btn')) return;


  p_btn.forEach((curElem) => {
    curElem.classList.remove("p-btn-active");
  });

  // add active class to clicked button
  p_btn_clicked.classList.add("p-btn-active");

  // get button number
  const btn_num = p_btn_clicked.dataset.btnNum;

  // select matching images
  const img_active = document.querySelectorAll(`.p-btn--${btn_num}`);

  // hide all images
  p_img_elem.forEach((curElem) => {
    curElem.classList.add("p-image-not-active");
  });

  // show selected images
  img_active.forEach((curElem) => {
    curElem.classList.remove("p-image-not-active");
  });

});

// ===================================
// Swiper JS
// ===================================

var swiper = new Swiper(".mySwiper", {

  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {

    0: {
      slidesPerView: 1,
    },

    780: {
      slidesPerView: 2,
    },

  },

});

// ===================================
// Media Query Function
// ===================================

const myjsmedia = (widthSize) => {

  if (widthSize.matches) {
    console.log("Mobile View");
  } else {
    console.log("Desktop View");
  }

};

const widthSize = window.matchMedia("(max-width: 780px)");

// call at runtime
myjsmedia(widthSize);

// attach listener
widthSize.addEventListener("change", myjsmedia);

// ===================================
// Scroll To Top Button
// ===================================

const scrollElement = document.createElement("div");

scrollElement.classList.add("scrolltop-style");

scrollElement.innerHTML =
  `<ion-icon name="arrow-up-outline" class="scroll-top"></ion-icon>`;

document.body.append(scrollElement);

// hide initially
scrollElement.style.display = "none";

// show button after scroll
window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {
    scrollElement.style.display = "block";
  } else {
    scrollElement.style.display = "none";
  }

});

// scroll to top
scrollElement.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

});

// ===================================
// Animated Counter
// ===================================

const counterNum = document.querySelectorAll(".counter-numbers");

const speed = 200;

counterNum.forEach((curElem) => {

  const updateNumber = () => {

    const targetNumber = parseInt(curElem.dataset.number);

    const initialNum = parseInt(
      curElem.innerText.replace("+", "")
    );

    const incrementNumber = Math.ceil(targetNumber / speed);

    if (initialNum < targetNumber) {

      curElem.innerText = `${initialNum + incrementNumber}+`;

      setTimeout(updateNumber, 10);

    } else {

      curElem.innerText = `${targetNumber}+`;

    }

  };

  updateNumber();

});

// ===================================
// Lazy Loading Images
// ===================================

const images = document.querySelectorAll("img[data-src]");

const loadImg = (entries, observer) => {

  const [entry] = entries;

  // stop if not visible
  if (!entry.isIntersecting) return;

  // replace placeholder image
  entry.target.src = entry.target.dataset.src;

  // remove blur effect after loading
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  // stop observing
  observer.unobserve(entry.target);

};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

images.forEach((img) => {
  imgObserver.observe(img);
});



