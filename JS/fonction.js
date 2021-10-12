/* variables DOM | balise dans le DOM */
let panier = document.querySelector("header div#panier > p")
let nbrArticlepre_panier = document.querySelector("div#contenu-panier > p:first-child > span")



/* _______________________ Accès au JSON pour affichage des produits dans le pre-panier ___________________________ */
var mycupcakes = new XMLHttpRequest()
/* Vérification de localStorage et d'articles déjà présent si page réactulisé ou bug internet */
conservationDuNbrArticles("totalArticlesPanier")
/* Ouverture du fichier JSON */
mycupcakes.open("GET", "/JSON/cupcake-data.json")
/* Envoie des données à la page */
mycupcakes.send()


/* _____________________________ LES FONCTIONS _______________________________ */

/* ______________ LOCALSTORAGE _________________ */

/* Fonction permettant de garder le nombre d'aticle dans le panier même si nous réactualisons la page */
function conservationDuNbrArticles(keyLocalStorage) {
    let nbrArticles = localStorage.getItem(keyLocalStorage);
    /* Losrque le panier est vide -> affichage à 0 */
    if (!nbrArticles) {
        nbrArticles = 0 ;
        panier.innerHTML = nbrArticles
        nbrArticlepre_panier.innerHTML = nbrArticles
    }
    else if (nbrArticles) {
        panier.innerHTML = nbrArticles
        nbrArticlepre_panier.innerHTML = nbrArticles
    }
}



/* _____________________ PRE-PANIER _____________________ */

/* Ajoute les articles se trouvant dans localStorage dans le pre-panier (actioné dans navjs.js par le clique sur le panier) */
function articleDuPrePanier() {

    var emplacementDuPrePanierDansLeDOM = document.querySelector("div.articles")
    var listeDesArticlesSeTrouvantDansLePrePanier = JSON.parse(localStorage.getItem("cupcakesCommander"))
    /* Lancement du calcul et affichage du sous-total */
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

            <div class="quantite">
                <div class="moins">-</div>
                <p>${articleAuPanier.enCommande}</p>
                <div class="plus">+</div>
            </div>

            <p class="total-d-article"><span>${(articleAuPanier.prix * articleAuPanier.enCommande).toFixed(2)}</span>€</p>
            
            <img  id="circle-cancel" src="img/svg-icons/circle-cancel.svg" alt="croix pour supprimer l'article du panier">
       </div>
        `
   }).join('')}

   `
   indexArticleASupprimer("img#circle-cancel", listeDesArticlesSeTrouvantDansLePrePanier,articleDuPrePanier)
   controleDeLaQuantite("div.moins","div.plus",listeDesArticlesSeTrouvantDansLePrePanier)

}
/* Renvoie l'index du produits à supprimer du panier */
function indexArticleASupprimer(imgDansLeDOM, liste,page) {
    var imgPourSupprimer = document.querySelectorAll(imgDansLeDOM)

   for (var i = 0; i < liste.length; i++) {
    supprimerDeLocalStorage(i,imgPourSupprimer,page)
   }
}
/* Actualise le nombre d'aticle dans le panier sur LocalStorage et dans le DOM */
function supprimerDeLocalStorage(i,img,page) {

    var panierclient = JSON.parse(localStorage.getItem("cupcakesCommander"))
    var nbrArticlesClient = JSON.parse(localStorage.getItem("totalArticlesPanier"))

    img[i].addEventListener("click", () => {
        var nbrAticlesRetirer = panierclient[i].enCommande
        /* Je soustrait la quantité de l'article selectionner au total d'aqrticle se trouvant dans le panier */
        nouveauNbrArticlesClient = localStorage.setItem("totalArticlesPanier" , nbrArticlesClient - nbrAticlesRetirer)
        /* Je récupère ce chiffre */
        var DOMnouveaunbrArticlesClient = JSON.parse(localStorage.getItem("totalArticlesPanier"))
        /* Puis je l'actualise dans mon DOM */
        panier.innerHTML = DOMnouveaunbrArticlesClient
        nbrArticlepre_panier.innerHTML = DOMnouveaunbrArticlesClient

        nbrAticlesRetirer = 0
        localStorage.setItem("cupcakesCommander" , nbrAticlesRetirer)

        /* Je supprime l'article sélectionner de mon localStorage */
        panierclient.splice(i,1)
        /* Puis j'actualise cette nouvelle liste */
        localStorage.setItem("cupcakesCommander" , JSON.stringify(panierclient))
        page()
        

    })
}


/* _____________ CALCUL ET AFFICHAGE DES PRIX (sous-total) */

/* Pour rendre les données du JSON calculable (string => number) */
function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
/* Calcul et affichage dans le DOM du sous-total */
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


function controleDeLaQuantite(DOMBoutonsMoins,DOMBoutonsPlus,liste) {

    var bouttonMoins = document.querySelectorAll(DOMBoutonsMoins)
    var bouttonPlus = document.querySelectorAll(DOMBoutonsPlus)

    /* Pour enlever des produits */
    for(var i = 0; i < liste.length; i++) {

        if (moinsUnArticle) {
            moinsUnArticle(i,bouttonMoins)
        }
        if (plusUnArticle) {
            plusUnArticle(i,bouttonPlus)
        }

        
    }
} 

function moinsUnArticle(i,DOMClickMoins) {
    var DOMQuantite = document.querySelectorAll("div.quantite > p")
    var panierclient = JSON.parse(localStorage.getItem("cupcakesCommander"))
    var nbrArticlesClient = JSON.parse(localStorage.getItem("totalArticlesPanier"))
    var nbrAticlesRetirer = panierclient[i].enCommande
    
    DOMClickMoins[i].addEventListener("click", () => {
        
        nouveaunbrArticlesClient = localStorage.setItem("totalArticlesPanier" , nbrArticlesClient - 1)
        var DOMnouveaunbrArticlesClient = JSON.parse(localStorage.getItem("totalArticlesPanier"))
        /* Puis je l'actualise dans mon DOM */
        panier.innerHTML = DOMnouveaunbrArticlesClient
        nbrArticlepre_panier.innerHTML = DOMnouveaunbrArticlesClient

        nbrAticlesRetirer -= 1
        localStorage.setItem("cupcakesCommander" , JSON.stringify(panierclient))
        DOMQuantite[i].innerHTML = nbrAticlesRetirer
        

        
    })

}


function plusUnArticle(i,DOMClickPlus) {

    DOMClickPlus[i].addEventListener("click", () => {
        console.log("plus" +i)
    })
}
