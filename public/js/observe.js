const nav = document.querySelector('.nav-barre');
const link1 = document.getElementById('link1')
const link2 = document.getElementById('link2')
const link3 = document.getElementById('link3')
const forme = document.querySelector('.forme-box');
const logo = document.getElementById('logo1');

let page5style = document.getElementById('page5style')

let ChangePage5min = Home.clientHeight + page2.clientHeight + page3.clientHeight + page4.clientHeight;
let ChangePage5max = Home.clientHeight + page2.clientHeight + page3.clientHeight + page4.clientHeight + page5.clientHeight + page6.clientHeight;

let heightforme = forme.clientHeight;



window.addEventListener('scroll', () => {
    if (window.scrollY > ChangePage5min && window.scrollY < ChangePage5max) {
        page5style.style.backgroundColor = '#141824';
        logo.src = "image/logo-ichat-white.png"
        link1.classList.add('link-scroll-video');
        link2.classList.add('link-scroll-video');
        link3.classList.add('link-scroll-video');
    } else {
        page5style.style.backgroundColor = ' hsla(225, 8%, 42%, 0.09)';
        logo.src = "image/logo-ichat.png"
        link1.classList.remove('link-scroll-video');
        link2.classList.remove('link-scroll-video');
        link3.classList.remove('link-scroll-video');
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > heightforme) {
        link1.classList.add('link-scroll');
        link2.classList.add('link-scroll');
        link3.classList.add('link-scroll');
    } else {
        link1.classList.remove('link-scroll');
        link2.classList.remove('link-scroll');
        link3.classList.remove('link-scroll');
        link1.classList.add('link');
        link2.classList.add('link');
        link3.classList.add('link');
    }
});