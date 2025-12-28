const resultatDiv = document.getElementById('resultat-pokemon');
const smashbutton = document.getElementById('smash');
const passbutton = document.getElementById('pass');
const skipbutton = document.getElementById('skip');

function chercherPokemon() {
    // 1. Définir un ID aléatoire
    const randomId = Math.floor(Math.random() * 898) + 1; // Un Pokémon entre 1 et 898
    const url = `https://tyradex.vercel.app/api/v1/pokemon/${randomId}`;
    // 2. Fetch tyradex
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut:
${response.status}`);
            }
            // Transformer la réponse en JSON
            return response.json();
        })
        .then(data => {
            // 3. Afficher les données récupérées
            afficherPokemon(data);
        })
        .catch(error => {
            // 4. Gérer les erreurs
            resultatDiv.innerHTML = `<p style="color: red;">Erreur lors
de la récupération : ${error.message}</p>`;
            console.error(error);
        });
        
        


    }
    
        let compteursmash = 0 //compeur boutons smash, skip et pass
function comptagesmash(){
            
            compteursmash++;
             document.getElementById("smash").textContent   = "smash" + " " + compteursmash;
}

        let compteurpass = 0
function comptagepass(){
            
            compteurpass++;
             document.getElementById("pass").textContent   = "pass" + " " +compteurpass;
}

        let compteurskip = 0
function comptageskip(){
            
            compteurskip++;
             document.getElementById("skip").textContent   = "skip" + " " +compteurskip;
}

function afficherPokemon(pokemonData) {
    // Extraction des données
    const nom = pokemonData.name.fr;
    const id = pokemonData.pokedex_id;
    const image = pokemonData.sprites.regular; // URL de l'image
    const type = pokemonData.types[0].name; // Premier type
    // Construction du contenu HTML à injecter
    const htmlContent = `
<div style="border: 2px solid #1f1f1f; padding: 15px; margin-top:
15px; text-align: center;">
<h2>#${id} - ${nom}</h2>
<p>Type principal :
<strong>${type}</strong></p>
<img src="${image}" alt="Image de ${nom}" style="width:
150px;">
</div>
`;
    // Injection du contenu dans la div résultat
    resultatDiv.innerHTML = htmlContent;
}


//event listeners

document.addEventListener("DOMContentLoaded", () => {chercherPokemon(); });

document.addEventListener("DOMContentLoaded", () => {afficherPokemon(); });

smashbutton.addEventListener("click", comptagesmash);
smashbutton.addEventListener("click", chercherPokemon);

skipbutton.addEventListener("click", comptageskip);
skipbutton.addEventListener("click", chercherPokemon);

passbutton.addEventListener("click", comptagepass);
passbutton.addEventListener("click", chercherPokemon);