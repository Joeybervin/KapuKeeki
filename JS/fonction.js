/* variables DOM | balise dans le DOM */
let panier = document.querySelector("header div#panier > p")
let nbrArticlepre_panier = document.querySelector("div#contenu-panier > p:first-child > span")

var pagePanierHTML = false

/* _______________________ Accès au JSON pour affichage des produits dans le pre-panier ___________________________ */

var mycupcakes = new XMLHttpRequest()
/* Vérification de localStorage et d'articles déjà présent si page réactulisé ou bug internet */
conservationDuNbrArticles()
/* Ouverture du fichier JSON */
mycupcakes.open("GET", "/JSON/cupcake-data.json")
/* Envoie des données à la page */
mycupcakes.send()


/* _____________________________ LES FONCTIONS _______________________________ */

/* ______________ LOCALSTORAGE _________________ */

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
    let listeDeLaCommande = JSON.parse(localStorage.getItem("cupcakesCommander"))
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
/* Fonction qui gère l'ajout de nouveaux articles dans localStorage (déjà existant ou nouveau produits et implémente la liste ou la quantité) */
function listeArticles (Cupcakecliquer) {
 
    let listeDeLaCommande = JSON.parse(localStorage.getItem("cupcakesCommander"))
    let double = false;
   
    if (listeDeLaCommande && listeDeLaCommande.length == 0) {
        listeDeLaCommande.push(Cupcakecliquer);
        localStorage.setItem("cupcakesCommander" , JSON.stringify(listeDeLaCommande));
    } 
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

            <input class="pre-panier-quantite" type="number" step="1" max="9" min="1" value="${articleAuPanier.enCommande}">
            <p class="total-d-article"><span>${(articleAuPanier.prix * articleAuPanier.enCommande).toFixed(2)}</span>€</p>
            
            <img  id="circle-cancel" src="img/svg-icons/circle-cancel.svg" alt="croix pour supprimer l'article du panier">
       </div>
        `
   }).join('')}

   `
   indexArticleASupprimer("img#circle-cancel", listeDesArticlesSeTrouvantDansLePrePanier,pagePanierHTML)
   
}

function indexArticleASupprimer(imgDansLeDOM, liste,pagePanierHTML) {
    var imgPourSupprimer = document.querySelectorAll(imgDansLeDOM)

   for (var i = 0; i < liste.length; i++) {
    supprimerDeLocalStorage(i,imgPourSupprimer,pagePanierHTML)
   }
}


function supprimerDeLocalStorage(i,img) {

    var panierclient = JSON.parse(localStorage.getItem("cupcakesCommander"))
    var nbrArticlesClient = JSON.parse(localStorage.getItem("totalArticlesPanier"))

    img[i].addEventListener("click", () => {
        var nbrAticlesRetirer = panierclient[i].enCommande
        
        nouveaunbrArticlesClient = localStorage.setItem("totalArticlesPanier" , nbrArticlesClient - nbrAticlesRetirer)
        /* voir si amélioration */
        var DOMnouveaunbrArticlesClient = JSON.parse(localStorage.getItem("totalArticlesPanier"))
        panier.innerHTML = DOMnouveaunbrArticlesClient
         nbrArticlepre_panier.innerHTML = DOMnouveaunbrArticlesClient
        /*nbrAticlesRetirer = -1 */
        console.log("LE NOMBRE D'ARTICLES EST : ", nbrAticlesRetirer)
        panierclient.splice(i,1)
        localStorage.setItem("cupcakesCommander" , JSON.stringify(panierclient))
        articleDuPrePanier()

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

