/* variables DOM | balise dans le DOM */
let section = document.querySelector(' main section#produits')
let panier = document.querySelector("header div#panier > p")
let pre_panier = document.querySelector("div.articles")
let nbrArticlepre_panier = document.querySelector("div#contenu-panier > p:first-child > span")

/* variables JavaScript */
let nbrArticles = 0


/* _______________________ PRODUITS.HTML ___________________________ */

/* Affichage des produits */
var mycupcakes = new XMLHttpRequest()
/* Vérification de localStorage et d'articles déjà présent si page réactulisé ou bug internet */
conservationDuNbrArticles()

mycupcakes.open("GET", "/JSON/cupcake-data.json")
/* Nous envoyons les données à la page */
mycupcakes.send()


/* _____________________________ APPLICABLE SUR TOUTES LES PAGES _______________________________ */

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
/* Ajoute les articles se trouvant dans localStorage dans le pre-panier (actioné dans navjs.js par le clique sur le panier) */
function articleDuPrePanier() {

    var emplacementDuPrePanierDansLeDOM = document.querySelector("div.articles")
    var listeDesArticlesSeTrouvantDansLePrePanier = JSON.parse(localStorage.getItem("cupcakesCommander"))
    calculSousTotal("p#prix > span")
    
    emplacementDuPrePanierDansLeDOM.innerHTML = ` ${listeDesArticlesSeTrouvantDansLePrePanier.map(function(articleAuPanier) {
        
        
        return `
       <div id="cake">
           <div class="${articleAuPanier.couleur}">
               <img src="${articleAuPanier.photoProduit}" alt="${articleAuPanier.description}">
           </div>
           <div id="produits-nom-prix">
                <p>${articleAuPanier.nom}</p>
                <p>unitée <span>${articleAuPanier.prix}</span>€</p>
            </div>

            <input class="pre-panier-quantite" type="number" step="1" max="9" min="1" value="${articleAuPanier.enCommande}">
            <p class="total-d-article"><span>${(articleAuPanier.prix * articleAuPanier.enCommande).toFixed(2)}</span>€</p>
            
            <img id="circle-cancel" src="img/svg-icons/circle-cancel.svg" alt="croix pour supprimer l'article du panier">
       </div>
        `
   }).join('')}

   `
   




}

function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

function calculSousTotal(sousTotal) {
    var sousTotalPage = document.querySelector(sousTotal)
    var listeDansLocalStorage = JSON.parse(localStorage.getItem("cupcakesCommander")) 
    let accumulationTotalParArticle = 0

    if(listeDansLocalStorage) {
        listeDansLocalStorage.forEach(function(article) {
        accumulationTotalParArticle += financial(article.prix)*parseFloat(article.enCommande)
    })

    sousTotalPage.innerHTML = accumulationTotalParArticle.toFixed(2) + " €"
    
    }
    else {
        sousTotalPage.innerHTML = 0 + " €"
        
    }

    return accumulationTotalParArticle

}




/* ________________________ FUNCTION POUR LOCALSTORAGE __________________________________ */
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
/* Modification de localstorage en fonction du choix d'article (new or old) */
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




/* document.load(function() {
    var contenuDuPrePanier = document.querySelectorAll("img#circle-cancel")
    var LocalstorageTaille = JSON.parse(localStorage.getItem("cupcakesCommander"))


    console.log(contenuDuPrePanier)

    for(var i=0; i < LocalstorageTaille.length ; i++) {
        contenuDuPrePanier[i].addEventListener("click", () => {
            console.log("bouton", i)
        })
    }
}); */