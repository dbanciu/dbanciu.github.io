//Scrolling Links

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("nav a");

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