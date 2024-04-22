// Scrolling Links

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("nav a");

/*
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector("nav a[href*=" + id + "]").classList.add("active");
            });
        }
    });
}; */

const offsetFromBottom = 400;

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let bottom = top + window.innerHeight - offsetFromBottom;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (bottom >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector("nav a[href*=" + id + "]").classList.add("active");
            });
        }
    });
};


// Burger Menu

const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");
const menu = document.querySelector("nav");

openMenuBtn.addEventListener("click", () => {
    menu.classList.add("open");
});

closeMenuBtn.addEventListener("click", () => {
    menu.classList.remove("open");
});



// Cards

let cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.add("open");
    });

    let cardCloseBtn = card.querySelector("a");

    cardCloseBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        card.classList.remove("open");
    });
});



// Smooth Scrolling
/*
const body = document.body,
      jsScroll = document.getElementsByClassName('js-scroll')[0],
      height = jsScroll.getBoundingClientRect().height - 1,
      speed = 0.15;

var offset = 0;

body.style.height = Math.floor(height) + "px";

function smoothScroll() {
    offset += (window.pageYOffset - offset) * speed;
    
    var scroll = "translateY(-" + offset + "px) translateZ(0)";
    jsScroll.style.transform = scroll;
    
    raf = requestAnimationFrame(smoothScroll);
}
smoothScroll();
*/

// Cursor Following Circle

const circleElement = document.querySelector(".circle");

const mouse = {x: 0, y: 0};
const circle = {x: 0, y: 0};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

const circleSpeed = 0.16;

const tick = () => {
    circle.x += (mouse.x - circle.x) * circleSpeed;
    circle.y += (mouse.y - circle.y) * circleSpeed;

    circleElement.style.transform = `translate(${circle.x}px, ${circle.y}px`;

    window.requestAnimationFrame(tick);
}

tick();


let cursorInteractables = document.querySelectorAll(".cursor-interact");

cursorInteractables.forEach(Interactable => {
    Interactable.addEventListener("mouseenter", () => {
        circleElement.classList.add("hover");
    });
    
    Interactable.addEventListener("mouseleave", () => {
        circleElement.classList.remove("hover");
    });
});

cards.forEach(card => {
    card.addEventListener("click", () => {
        circleElement.classList.remove("hover");
    });
});
