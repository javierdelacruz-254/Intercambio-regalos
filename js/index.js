document.getElementById('toggle-icon').addEventListener('click', function() {

    document.getElementById('deseos').scrollIntoView({ behavior: 'smooth' });

});

document.addEventListener('DOMContentLoaded', () => {
    const wishList = document.querySelector('.wishlist')
    const cards = document.querySelectorAll('.card')
    const infoPanel = document.getElementById("info-panel");

    const handleScrollAnimation = () => {
        const triggerHeight = window.innerHeight * 0.8

        if(wishList.getBoundingClientRect().top < triggerHeight){
            wishList.querySelector('.cards-grid').classList.add('visible')
            infoPanel.classList.add('visible')
        }
        cards.forEach((card, index) => {
            const delay = index * 100
            if(card.getBoundingClientRect().top < triggerHeight){
                setTimeout(() => {
                    card.classList.add('visible')
                }, delay)
            }
        })
    }

    window.addEventListener('scroll', handleScrollAnimation)
})


document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const infoPanel = document.getElementById("info-panel");
    const panelImage = document.getElementById("panel-image");
    const selectedName = document.getElementById("selected-name");
    const selectedWish = document.getElementById("selected-wish");
    const infoText = document.querySelector(".info-text")
    const infoIcon = infoText.querySelector("i")

    const overlay = document.createElement("div")
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    overlay.style.zIndex = "999";
    overlay.style.display = "none";
    document.body.appendChild(overlay);

    const showCardInfo = (imageSrc, name, wish) => {
        overlay.style.display = "block"

        panelImage.src = imageSrc
        panelImage.style.display = "block"
        panelImage.classList.add("fade-in")
        panelImage.style.position = "fixed";
        panelImage.style.top = "0";
        panelImage.style.left = "0";
        panelImage.style.width = "100vw";  
        panelImage.style.height = "100vh"; 
        panelImage.style.objectFit = "contain";
        panelImage.style.zIndex = "1000"

        panelImage.classList.remove("fade-in", "fade-out")
        
        setTimeout(() => {
            panelImage.classList.add("fade-in")
        }, 10)

        selectedName.textContent = ""
        selectedWish.textContent = ""

        setTimeout(() => {
            panelImage.classList.remove("fade-in")
            panelImage.classList.add("fade-out")

            setTimeout(() => {
                overlay.style.display = "none"
                panelImage.style.display = "none"

                selectedName.textContent = `Nombre: ${name}`;
                selectedWish.textContent = `Deseo: ${wish}`;

                selectedName.style.opacity = "0"
                selectedWish.style.opacity = "0"

                selectedName.style.display = "block"
                selectedName.classList.add("fade-in")
                
                setTimeout(() => {
                    selectedWish.style.display = "block"
                    selectedWish.classList.remove("fade-out")
                    selectedWish.classList.add("fade-in")
                }, 500)
            }, 500)
        }, 3000)
    }

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const imageSrc = card.querySelector("img").src
            const nombre = card.getAttribute("data-name");
            const wish = card.getAttribute("data-wish");
            showCardInfo(imageSrc, nombre, wish)
            infoIcon.style.display = 'none'
            selectedName.style.display = 'none'
        });

        card.setAttribute("draggable", true);
        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("imageSrc", card.querySelector("img").src);
            e.dataTransfer.setData("name", card.getAttribute("data-name"));
            e.dataTransfer.setData("wish", card.getAttribute("data-wish"));

            infoText.addEventListener("dragenter", () => {
                infoText.style.backgroundColor = "rgb(32, 32, 32)"; 
                infoIcon.classList.add("vibrate"); 
            });

            
            infoText.addEventListener("dragover", (e) => {
                e.preventDefault();
                infoText.style.backgroundColor = "rgb(45, 45, 45)"; 
            });
        
            infoText.addEventListener("dragleave", () => {
                infoText.style.backgroundColor = ""; 
                infoIcon.classList.remove("vibrate"); 
            });
        
            infoText.addEventListener("drop", () => {
                infoText.style.backgroundColor = "rgb(19, 19, 19)"; 
                infoIcon.classList.remove("vibrate"); 
            });

            const dragPreView = card.cloneNode(true)
            dragPreView.style.position = "absolute"
            dragPreView.style.top = "-9999px"
            dragPreView.style.pointerEvents = "none"
            document.body.appendChild(dragPreView)

            e.dataTransfer.setDragImage(dragPreView, 50, 50)

            e.dataTransfer.setData("name", nombre)
            e.dataTransfer.setData("wish", wish)

            e.target.addEventListener("dragend", () => {
                document.body.removeChild(dragPreView)
            })
        });
    });

    infoPanel.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    infoPanel.addEventListener("drop", (e) => {
        e.preventDefault();
        const imageSrc = e.dataTransfer.getData("imageSrc")
        const name = e.dataTransfer.getData("name");
        const wish = e.dataTransfer.getData("wish");
        showCardInfo(imageSrc, name, wish)
        infoIcon.style.display = 'none'
        selectedName.style.display = 'none'
    });
});

const canvas = document.getElementById('gift-wheel-canvas');
const ctx = canvas.getContext('2d');
const participants = [
    "Ana Raquel", "Dali", "Jose", "Meyner", "Liliana", "Frank",
    "Abigail", "Luis", "Maricielo", "Saira", "Jhon", "Milagros",
    "Javiercito", "Britany", "Vanessa", "Paul"
];
const totalParticipants = participants.length;
const arcSize = (2 * Math.PI) / totalParticipants;

let startAngle = 0;
let spinAngle = 0;
let spinning = false;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < totalParticipants; i++) {
        const angle = startAngle + i * arcSize;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2,
            angle,
            angle + arcSize
        );
        ctx.fillStyle = i % 2 === 0 ? "#131313" : "rgb(45, 45, 45)"; // Alternating colors
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle + arcSize / 2);
        ctx.fillStyle = "#fff";
        ctx.font = "14px Arial";
        ctx.fillText(
            participants[i],
            canvas.width / 4,
            0
        );
        ctx.restore();
    }
}


document.getElementById('spin-wheel').addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    spinAngle = Math.random() * 2000 + 1000; 
    const duration = 5000; 
    const start = Date.now();

    function animate() {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        startAngle += spinAngle * (1 - progress) * 0.05; // Ease-out effect
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            const selectedIndex = Math.floor(
                ((2 * Math.PI - startAngle % (2 * Math.PI)) / arcSize) % totalParticipants
            );
            document.getElementById('gift-result').textContent =
                `¡Le toca regalar a... ${participants[selectedIndex]}! 🎉`;
        }
    }

    animate();
});

drawWheel();

