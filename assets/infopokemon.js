document.addEventListener("DOMContentLoaded", async () => {

   //DOM
    const imgElement = document.getElementById("pokemon-image");
    const nameElement = document.getElementById("pokemon-name");
    const idElement = document.getElementById("pokemon-id");
    const typeElement = document.getElementById("pokemon-types");
    const heightElement = document.getElementById("pokemon-height");
    const weightElement = document.getElementById("pokemon-weight");
    const prevBtn = document.getElementById("prev-card");
    const nextBtn = document.getElementById("next-card");
    const toggleCheckbox = document.getElementById("toggle-source");
    


    
    //Paramètres URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // variables
    let poke = null;
    let cards = [];
    let currentCardIndex = 0;
    let currentPokemon = null;
    let currentId = parseInt(params.get("id"), 10);


    
    try {
        //Fetch Tyradex
        const res = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`);
        if (!res.ok) throw new Error("Erreur Tyradex");
        poke = await res.json();
        


        

        //Remplissage infos
        nameElement.textContent = poke.name.fr;
        idElement.textContent = poke.pokedex_id;

        typeElement.textContent = poke.types[0].name
            

        heightElement.textContent = poke.height;
        weightElement.textContent = poke.weight;
        currentPokemon = poke;
        setupEvolutionButtons();

        //Fetch cartes TCGDEX
        const cardRes = await fetch(
            `https://api.tcgdex.net/v2/fr/cards?name=${encodeURIComponent(poke.name.fr)}`
        );

        if (cardRes.ok) {
            const allCards = await cardRes.json();
            cards = allCards.filter(card => card.image);
        }

        //Affichage initial
        updateImage();

    } catch (err) {
        console.error(err);
        nameElement.textContent = "Erreur de chargement";
    }

    //Fonctions
    function updateImage(direction = "none") {
        if (!poke) return;

        if (direction === "left") {
            imgElement.classList.add("slide-left");
        } else if (direction === "right") {
            imgElement.classList.add("slide-right");
        }

        setTimeout(() => {
           if (toggleCheckbox.checked) {
    imgElement.src = poke.sprites.regular;
    nameElement.textContent = poke.name.fr; // Nom Tyradex
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
} else {
    if (!cards.length) return;
    const card = cards[currentCardIndex];
    imgElement.src = card.image ? `${card.image}/high.png` : card.images.large;
    nameElement.textContent = card.name; // Nom de la carte TCG
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
}


            imgElement.classList.remove("slide-left", "slide-right");
        }, 400);
    }

    const tilt = document.getElementById("card-tilt");
const img = document.getElementById("pokemon-image");
const gloss = document.querySelector(".card-gloss");

if (img && tilt) {

    img.addEventListener("mousemove", e => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rotateX = -(y - cy) / 6;
        const rotateY = (x - cx) / 6;

        img.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.08)
        `;

        gloss.style.opacity = 1;
        gloss.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(255,255,255,0.65),
                rgba(255,255,255,0) 60%
            )
        `;
    });

    img.addEventListener("mouseleave", () => {
        img.style.transform = "rotateX(0) rotateY(0) scale(1)";
        gloss.style.opacity = 0;
    });
}

function setupEvolutionButtons() {
    const prevBtn = document.getElementById("prev-evo");
    const nextBtn = document.getElementById("next-evo");

    if (!prevBtn || !nextBtn || !currentPokemon.evolution) return;

    const prevEvos = currentPokemon.evolution.pre || [];
    const nextEvos = currentPokemon.evolution.next || [];

    // Évolution précédente
    if (prevEvos.length > 0) {
        prevBtn.disabled = false;
        prevBtn.onclick = () => {
            goToPokemon(prevEvos[0].pokedex_id);
        };
    } else {
        prevBtn.disabled = true;
    }

    // Évolution suivante
    if (nextEvos.length > 0) {
        nextBtn.disabled = false;
        nextBtn.onclick = () => {
            goToPokemon(nextEvos[0].pokedex_id);
        };
    } else {
        nextBtn.disabled = true;
    }
}




    function setStat(id, value, max = 200) {
        const bar = document.getElementById(id);
        const label = document.getElementById(id + "-value");

        if (!bar || !label) return;

        label.textContent = value;
        bar.style.width = Math.min((value / max) * 100, 100) + "%";
    }

    setStat("stat-hp", poke.stats.hp);
    setStat("stat-atk", poke.stats.atk);
    setStat("stat-def", poke.stats.def);

    function updateStats() {
        if (!poke || !poke.stats) return;

        setStat("stat-hp", poke.stats.hp);
        setStat("stat-atk", poke.stats.atk);
        setStat("stat-def", poke.stats.def);
    }

    function goToPokemon(id) {
    window.location.href = `infopagepokemon.html?id=${id}`;
}

 //event listener
    prevBtn.addEventListener("click", () => {
        if (!cards.length) return;
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
        updateImage("right");
        updateStats();
    });

    nextBtn.addEventListener("click", () => {
        if (!cards.length) return;
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        updateImage("left");
        updateStats();
    });

    toggleCheckbox.addEventListener("change", () => {
        updateImage();
    });

    document.getElementById("nav-prev").addEventListener("click", () => {
    if (currentId > 1) {
        window.location.href = `infopagepokemon.html?id=${currentId - 1}`;
    }
});

document.getElementById("nav-next").addEventListener("click", () => {
    window.location.href = `infopagepokemon.html?id=${currentId + 1}`;
});

});
