/* =====================
   CUSTOM CURSOR
   ===================== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .service-card, .portfolio-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
        follower.style.borderColor = 'rgba(242,181,11,0.8)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.borderColor = 'rgba(242,181,11,0.6)';
    });
});

/* =====================
   SCROLL REVEAL
   ===================== */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

/* =====================
   HAMBURGER MENU
   ===================== */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
    });
});

/* =====================
   PORTFOLIO FILTER BUTTONS
   ===================== */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

/* =====================
   NAVBAR SCROLL SHADOW
   ===================== */
window.addEventListener('scroll', () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.style.boxShadow = window.scrollY > 50
        ? '0 4px 30px rgba(0,0,0,0.5)'
        : 'none';
});

/* =====================
   COUNT-UP ANIMATION
   ===================== */
function countUp(el, target, suffix = '') {
    let start = 0;
    const step = target / (2000 / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) { start = target; clearInterval(timer); }
        el.textContent = Math.floor(start) + suffix;
    }, 16);
}

const statNums = document.querySelectorAll('.stat-num');
const statTargets  = [50, 30, 3, 100];
const statSuffixes = ['+', '+', '+', '%'];

const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        statNums.forEach((el, i) => countUp(el, statTargets[i], statSuffixes[i]));
        statsObserver.disconnect();
    }
}, { threshold: 0.5 });

if (statNums.length) {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) statsObserver.observe(statsSection);
}