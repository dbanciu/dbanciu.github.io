// Scrolling Links

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("nav a");
let navLines = document.querySelectorAll("nav .nav-line");

const offsetFromBottom = 400;

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let bottom = top + window.innerHeight - offsetFromBottom;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (bottom >= offset && top < offset + height) {
            navLines.forEach(line => {
                line.classList.remove("active");                
                document.querySelector("nav a[href*=" + id + "]").previousElementSibling.classList.add("active");
            });
        }

        if (bottom >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                document.querySelector("nav a[href*=" + id + "]").classList.add("active");
            });
        }
    });
};


// Burger Menu

const openMenuBtn = document.querySelector(".open-menu > img");
const closeMenuBtn = document.querySelector(".close-menu");
const menu = document.querySelector("nav");

// openMenuBtn.addEventListener("click", () => {
//     menu.classList.add("open");
// });

closeMenuBtn.addEventListener("click", () => {
    menu.classList.remove("open");
});

document.addEventListener("click", function(event) {
    if(menu.classList.contains('open') && !event.target.isEqualNode(openMenuBtn) && !event.target.isEqualNode(menu) && !menu.contains(event.target)) {
        menu.classList.remove('open');
    } else if(event.target.isEqualNode(openMenuBtn)) {
        menu.classList.add("open");
    }
});



// Cards Open

/* let cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.add("open");
    });

    let cardCloseBtn = card.querySelector("a");

    cardCloseBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        card.classList.remove("open");
    });
}); */

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    const menu = document.querySelector("nav");
    const openMenuBtn = document.querySelector(".open-menu > img");
    const closeMenuBtn = document.querySelector(".close-menu");

    // Function to close all open cards
    function closeAllCards() {
        cards.forEach(card => {
            card.classList.remove("open");
        });
        overlay.style.display = 'none';
    }

    // Function to close the menu
    function closeMenu() {
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
        }
    }

    // Listen for clicks on each card
    cards.forEach(card => {
        card.addEventListener("click", function(event) {
            if (menu.classList.contains('open')) {
                // Close menu if it's open and stop further actions
                closeMenu();
                event.stopPropagation();
                return;
            }

            // Ensure only one card can be interacted with at a time
            if (isAnyCardOpen() && !this.classList.contains("open")) {
                closeAllCards();
                // No new card should open
                event.stopPropagation();
                return;
            }

            // Open this card if no other cards are open
            if (!this.classList.contains("open")) {
                this.classList.add("open");
                overlay.style.display = 'block';
            }
            event.stopPropagation();
        });

        // Close button inside the card
        const cardCloseBtn = card.querySelector(".cursor-interact img");
        if (cardCloseBtn) {
            cardCloseBtn.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevent event from bubbling to card
                closeAllCards();
            });
        }
    });

    // Click on the burger menu button
    openMenuBtn.addEventListener("click", function(event) {
        if (isAnyCardOpen()) {
            closeAllCards();
            event.stopPropagation(); // Prevent opening the menu
        } else {
            toggleMenu(); // Otherwise, toggle the menu normally
        }
    });

    // Handling clicks outside the cards to close any open card or the menu
    document.addEventListener("click", function(event) {
        if (!event.target.closest(".card") && !event.target.closest("nav") && overlay.style.display === 'block') {
            closeAllCards();
        }

        if (!event.target.closest(".open-menu") && !event.target.isEqualNode(openMenuBtn) && !event.target.closest("nav")) {
            closeMenu();
        }
    });

    // Overlay click to close any open card
    overlay.addEventListener("click", function() {
        closeAllCards();
    });

    // Close open card and menu with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closeAllCards();
            closeMenu();
        }
    });

    // back to top button
    const backToTopBtn = document.getElementById("backToTopBtn");

    function toggleBackToTopBtn() {
        let scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        let scrollPosition = window.scrollY;
        
        // Modify this value to change when the button appears
        let threshold = scrollTotal * 0.9997; // 80% scroll to appear

        if (scrollPosition >= threshold) {
            backToTopBtn.style.opacity = 1; // Make button visible
            backToTopBtn.style.pointerEvents = 'auto'; // Enable mouse events
        } else {
            backToTopBtn.style.opacity = 0; // Make button invisible
            backToTopBtn.style.pointerEvents = 'none'; // Disable mouse events
        }
    }

    window.addEventListener("scroll", toggleBackToTopBtn);
    
    // Scroll to top smoothly when the button is clicked
    backToTopBtn.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
});

// Check if any card is currently open
function isAnyCardOpen() {
    return Array.from(document.querySelectorAll(".card")).some(card => card.classList.contains("open"));
}



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


// Cursor Interact Animation

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