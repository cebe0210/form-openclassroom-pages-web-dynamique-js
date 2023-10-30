//pièces depuis le fichier JSON
const reponse = await fetch ("pieces-autos.json");
const pieces = await reponse.json();

function genererPieces(pieces){

for(let i = 0; i < pieces.length; i++){
const article = pieces[i];
const sectionFiches = document.querySelector(".fiches");
const pieceElement = document.createElement("article");

const imageElement = document.createElement("img");
imageElement.src = article.image;

const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(aucune catégorie)";


const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "Pas de description pour le moment";

const stockElement = document.createElement ("p");
stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

//rattachement

sectionFiches.appendChild(pieceElement);

pieceElement.appendChild(imageElement);
pieceElement.appendChild(nomElement);
pieceElement.appendChild(prixElement);
pieceElement.appendChild(categorieElement);
pieceElement.appendChild(descriptionElement);
pieceElement.appendChild(stockElement);
}
}
genererPieces(pieces);

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function(){
    const piecesOrdonnees = Array.from(pieces);
    pieces.sort(function(a, b){
        return a.prix - b.prix;
    });
    //console.table(pieces);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix >= 35;
    });
    //console.table(piecesFiltrees);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const boutonDecrois = document.querySelector(".btn-decroissant");
boutonDecrois.addEventListener("click", function(){
    const piecesOrdonnees = Array.from(pieces);
    pieces.sort(function(a, b){
        return b.prix - a.prix;
    });
    //console.table(pieces);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonNodesc = document.querySelector(".btn-nodesc");
boutonNodesc.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.description
    });
    //console.table(piecesFiltrees);
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
}
//console.table(noms);

const abordablesElements = document.createElement('ul');

for(let i=0; i< noms.length; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
document.querySelector('.abordables')
    .appendChild(abordablesElements);

const dispo = pieces.map(piece => `${piece.nom} - ${piece.prix} €`)
for(let i = pieces.length -1; i >= 0; i--){
    if(!pieces[i].disponibilite){
        dispo.splice(i,1);
    }
}
//console.table(dispo);

const dispoElements = document.createElement('ul');

for(let i=0; i< dispo.length; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = dispo[i];
    dispoElements.appendChild(nomElement)
}
document.querySelector('.dispo')
    .appendChild(dispoElements);

//efface le contenu d ela balise body
document.querySelector(".fiches").innerHTML ='';

const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value; 
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
})

