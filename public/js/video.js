const Home = document.querySelector('.home1')
const page2 = document.querySelector('.page2');
const page3 = document.querySelector('.page3');
const page4 = document.querySelector('.page4');
const page5 = document.querySelector('.page5');
const page6 = document.getElementById('page6')
const page7 = document.querySelector('.page7')
const bouton = document.getElementById('bouton');
const myvideo = document.getElementById('myvideo');

let minHeight = Home.clientHeight + page2.clientHeight + page3.clientHeight + page4.clientHeight + page5.clientHeight;
let maxHeight = Home.clientHeight + page2.clientHeight + page3.clientHeight + page4.clientHeight + page5.clientHeight + page6.clientHeight;

console.log(minHeight, maxHeight)

window.addEventListener('scroll', () => {
    console.log(window.scrollY);
});

bouton.addEventListener('click', () => {
    FirstPlay();
});
let test = "<video class='myvideo' id='myvideo' height='auto' loop muted preload='none'><source src='video/annonce.mp4' type='video/mp4'>Your browser does not support the video tag.</video>"

function FirstPlay() {
    page6.style.display = "flex";
    ChangePage5max = ChangePage5max + page7.clientHeight;
    page6.innerHTML = test;
    const myvideo = document.getElementById('myvideo');
    window.scrollTo({
        top: minHeight,
        left: 0,
        behavior: 'smooth'
    });
    myvideo.pause();
}


function Play() {
    myvideo.play();
    myvideo.volume = 0.15;
    myvideo.classList.remove('myvideo');
    myvideo.classList.add('video-open');
}

function Stop() {
    myvideo.pause();
    myvideo.classList.add('myvideo');
    myvideo.classList.remove('video-open');
}

window.addEventListener('scroll', () => {
    console.log(window.scrollY)
    if (window.scrollY > 4000 && window.scrollY < 5000) {
        Play();
        console.log('go')
    } else {
        Stop()
        console.log('stop')
    }
});