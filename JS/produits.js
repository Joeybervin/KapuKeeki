
/* variables DOM | balise dans le DOM */
let section = document.querySelector(' main section#produits')
let panier = document.querySelector("header div#panier > p")
let pre_panier = document.querySelector("div.articles")
let nbrArticlepre_panier = document.querySelector("div#contenu-panier > p:first-child > span")

/* variables JavaScript */
let nbrArticles = 0



/* Affichage des produits */
var mycupcakes = new XMLHttpRequest()
/* Vérification de localStorage et d'articles déjà présent si page réactulisé ou bug internet */
conservationDuNbrArticles()

mycupcakes.open("GET", "/JSON/cupcake-data.json")
mycupcakes.onload = function() {

    var cupcake = JSON.parse(mycupcakes.responseText)
    
    for (var i = 0; i < cupcake.length; i++) {
        /* Création des différentes balises qui composeront le carré de chaque article*/ 
        var divArticle = document.createElement("div")
        divArticle.className = "article"
        var a = document.createElement("a")
        a.href = "#"
        var divColor = document.createElement("div")
        divColor.className = cupcake[i].couleur
        var img = document.createElement("img")
        img.src = cupcake[i].photoProduit
        img.alt = cupcake[i].description
        var pArtcicleName = document.createElement("p")
        var pArticlePrice = document.createElement("p")
        var button = document.createElement("button")
        button.className = cupcake[i].couleur

        /*Je place le texte (nom du produit, prix et le texte du boutton) */
        pArtcicleName.innerHTML = cupcake[i].nom
        pArticlePrice.innerHTML = cupcake[i].prix + " €"
        button.innerHTML = "Ajouter au panier"

        /*Création et assemblage du carré de chaque article */
        divArticle.appendChild(a)
        a.appendChild(divColor)
        divColor.appendChild(img)
        divArticle.appendChild(pArtcicleName)
        divArticle.appendChild(pArticlePrice)
        divArticle.appendChild(button)

        section.appendChild(divArticle)

        /* Je selectionne/récupère tous les bouttons de chaque article */
        let allButtons = document.querySelectorAll('button[class^="photo"]')
        
        /* Je créer un event sur le clique des bouttons */
        allButtons[i].addEventListener('click',() => {
            /*Je récupère indice du boutton, pour avoir accès à l'indice du JSON correspondant */
            AjouterUnArticle(cupcake[allButtons.length -1])
            
            
        })

    }

}

/* Nous envoyons les données à la page */
mycupcakes.send()


/* Fonction permettant de garder le nombre d'aticle dans le panier même si nous réactualisons la page */
function conservationDuNbrArticles() {
    let nbrArticles = localStorage.getItem("totalArticlesPanier");
    /* Losrque le panier est vide -> affichage à 0 */
    if (!nbrArticles) {
        nbrArticles = 0 ;
        panier.innerHTML = nbrArticles
        nbrArticlepre_panier.innerHTML = nbrArticles
    }
    else if (nbrArticles) {
        localStorage.setItem("totalArticlesPanier" , nbrArticles)
        panier.innerHTML = nbrArticles
        nbrArticlepre_panier.innerHTML = nbrArticles
    }
}


/* Fonction qui actualise le nombre d'articles ajouté au panier et dans localStorage*/
function AjouterUnArticle(Cupcakecliquer) {
    let nbrArticles = localStorage.getItem("totalArticlesPanier");
    nbrArticles = parseInt(nbrArticles);
    if (nbrArticles) {
        localStorage.setItem("totalArticlesPanier" , nbrArticles += 1)
        panier.innerHTML = nbrArticles
        nbrArticlepre_panier.innerHTML = nbrArticles
        
    }
    else {
        localStorage.setItem("totalArticlesPanier", 1)
        panier.innerHTML = 1
        nbrArticlepre_panier.innerHTML = 1
    }
    
    listeArticles(Cupcakecliquer)
}


//Fonction qui renouvelle l'état de la commande (en implémentant dans localStorage, les articles choisis et leur quantité)
function listeArticles (Cupcakecliquer) {
 
    let listeDeLaCommande = JSON.parse(localStorage.getItem("cupcakesCommander"))
    let double = false;
   
    if (listeDeLaCommande) {
        let i = 0
        while(i < listeDeLaCommande.length) {
            if(Cupcakecliquer.id == listeDeLaCommande[i].id) {
                double = true
                return NouvelleArticle(double,i,listeDeLaCommande,Cupcakecliquer)
              
            }
            if (Cupcakecliquer.id !== listeDeLaCommande[i].id) {
                if (i == listeDeLaCommande.length -1) {
                    double = false
                    return NouvelleArticle(double,i,listeDeLaCommande,Cupcakecliquer)
                }
                else {
                    i++
                }
            }
        }
    
    }
    
    else {
        listeDeLaCommande = [];
        listeDeLaCommande.push(Cupcakecliquer);
        Cupcakecliquer.enCommande += 1
        localStorage.setItem("cupcakesCommander" , JSON.stringify(listeDeLaCommande));
    }

}

function NouvelleArticle(double,i,listeDeLaCommande,Cupcakecliquer) {
    if(double) {
        listeDeLaCommande[i].enCommande += 1
        localStorage.setItem("cupcakesCommander" , JSON.stringify(listeDeLaCommande))
    }
    else {
        listeDeLaCommande.push(Cupcakecliquer);
        Cupcakecliquer.enCommande += 1
        localStorage.setItem("cupcakesCommander" , JSON.stringify(listeDeLaCommande));
    }
    
}