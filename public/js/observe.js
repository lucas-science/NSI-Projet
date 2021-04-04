const nav = document.querySelector('.nav-barre');
const link1 = document.getElementById('link1')
const link2 = document.getElementById('link2')
const link3 = document.getElementById('link3')
const link4 = document.getElementById('link4')
const link5 = document.getElementById('link5')
const link6 = document.getElementById('link6')
const forme = document.querySelector('.forme-box');
const logo = document.getElementById('logo1');
const Home = document.querySelector('.home1')
const page2 = document.querySelector('.page2');
const page3 = document.querySelector('.page3');
const page4 = document.querySelector('.page4');
const page5 = document.querySelector('.page5');


let page5style = document.getElementById('page5style')

let ChangePage5min = Home.clientHeight + page2.clientHeight + page3.clientHeight + page4.clientHeight;
let ChangePage5max = Home.clientHeight + page2.clientHeight + page3.clientHeight + page4.clientHeight + page5.clientHeight;

let heightforme = forme.clientHeight * 0.8;

link1.classList.add('link');
link2.classList.add('link');
link3.classList.add('link');
link4.classList.add('link-color');
link5.classList.add('link-color');
link6.classList.add('link-color');
logo.src = "../logo-ichat.png";

window.addEventListener('scroll', () => {
    console.log(window.scrollY);
});



window.addEventListener('scroll', () => {
    if (window.scrollY > ChangePage5min && window.scrollY < ChangePage5max) {
        logo.src = "../logo-ichat-white.png"
        link1.classList.add('link-scroll-video');
        link2.classList.add('link-scroll-video');
        link3.classList.add('link-scroll-video');
        link4.classList.add('link-color');
        link5.classList.add('link-color');
        link6.classList.add('link-color');
    } else {
        logo.src = "../logo-ichat.png"
        link1.classList.remove('link-scroll-video');
        link2.classList.remove('link-scroll-video');
        link3.classList.remove('link-scroll-video');
        link4.classList.remove('link-color');
        link5.classList.remove('link-color');
        link6.classList.remove('link-color');
    }
    if (window.scrollY > ChangePage5min) {
        page5style.style.backgroundColor = '#141824';
    } else {
        page5style.style.backgroundColor = 'rgba(98, 102, 114, 0.09)';
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > heightforme) {
        link1.classList.add('link-scroll');
        link2.classList.add('link-scroll');
        link3.classList.add('link-scroll');
        link4.classList.add('link-blackcolor');
        link5.classList.add('link-blackcolor');
        link6.classList.add('link-blackcolor');
    } else {
        link1.classList.remove('link-scroll');
        link2.classList.remove('link-scroll');
        link3.classList.remove('link-scroll');
        link4.classList.remove('link-blackcolor');
        link5.classList.remove('link-blackcolor');
        link6.classList.remove('link-blackcolor');
        link1.classList.add('link');
        link2.classList.add('link');
        link3.classList.add('link');
        link4.classList.add('link-color');
        link5.classList.add('link-color');
        link6.classList.add('link-color');
    }
});