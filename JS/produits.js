
/* variables DOM | balise dans le DOM */
let section = document.querySelector(' main section#produits')
let panier = document.querySelector("header div#panier > p")
let pre_panier = document.querySelector("div.articles")
let nbrArticlepre_panier = document.querySelector("div#contenu-panier > p:first-child > span")

 /* var de localStorage  */


/* _______________________ Accès au JSON pour affichage des produits ___________________________ */
var mycupcakes = new XMLHttpRequest()
/* Vérification de localStorage et d'articles déjà présent si page réactulisé ou bug internet */
conservationDuNbrArticles("totalArticlesPanier")
/* Ouverture du fichier JSON */
mycupcakes.open("GET", "/JSON/cupcake-data.json")
/* Chargement de la page */
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
            /*J'envoie les infos de l'article sur lequel je viens de cliquer */
            AjouterUnArticle(cupcake[allButtons.length -1],"totalArticlesPanier","cupcakesCommander")
        })
    }
}
/* Nous envoyons les données à la page */
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
/* Fonction qui actualise le nombre d'articles ajouté au panier et dans localStorage*/
function AjouterUnArticle(Cupcakecliquer,keyLocalStorageNbrArticles,keyLocalStorageListeDArticles) {
    let nbrArticles = localStorage.getItem(keyLocalStorageNbrArticles);
    nbrArticles = parseInt(nbrArticles);
    if (nbrArticles) {
        localStorage.setItem(keyLocalStorageNbrArticles , nbrArticles += 1)
        panier.innerHTML = nbrArticles
        nbrArticlepre_panier.innerHTML = nbrArticles
    }
    else {
        localStorage.setItem(keyLocalStorageNbrArticles, 1)
        panier.innerHTML = 1
        nbrArticlepre_panier.innerHTML = 1
    }
    
    listeArticles(Cupcakecliquer,"cupcakesCommander")
}
/* Fonction qui gère l'ajout de nouveaux articles dans localStorage (déjà existant ou nouveau produits et implémente la liste ou la quantité) */
function listeArticles (Cupcakecliquer,keyLocalStorageListeDArticles) {
    let listeDeLaCommande = JSON.parse(localStorage.getItem(keyLocalStorageListeDArticles))
    let double = false;
   
    /* si key déjà existante dans localStorage mais vide */
    if (listeDeLaCommande && listeDeLaCommande.length == 0) {
        listeDeLaCommande.push(Cupcakecliquer);
        localStorage.setItem(keyLocalStorageListeDArticles , JSON.stringify(listeDeLaCommande));
    } 
    /* Si key déjà existante dans localStorage */
    if (listeDeLaCommande) {
        let i = 0
        while(i < listeDeLaCommande.length) {
            /* si produit déjà existant dans la liste */
            if(Cupcakecliquer.id == listeDeLaCommande[i].id) {
                double = true
                return NouvelleArticle(double,i,listeDeLaCommande,Cupcakecliquer)
            }
            /* si produit pas encore dans la liste */
            if (Cupcakecliquer.id !== listeDeLaCommande[i].id) {
                if (i == listeDeLaCommande.length -1) {
                    double = false
                    return NouvelleArticle(double,i,listeDeLaCommande,Cupcakecliquer)
                }
                /* pour passer au prochain produit jusqu'à la fin du panier */
                else {
                    i++
                }
            }
        }
    
    }
    /* Si liste pas encore existante */
    else {
        listeDeLaCommande = [];
        listeDeLaCommande.push(Cupcakecliquer);
        Cupcakecliquer.enCommande += 1
        localStorage.setItem(keyLocalStorageListeDArticles , JSON.stringify(listeDeLaCommande));
    }
}
/* Modification de localstorage en fonction du choix d'article (new or old) */
function NouvelleArticle(double,i,listeDeLaCommande,Cupcakecliquer) {
    if(double) {
        Cupcakecliquer.enCommande = 0
        listeDeLaCommande[i].enCommande += 1
        localStorage.setItem("cupcakesCommander" , JSON.stringify(listeDeLaCommande))
    }
    else {
        listeDeLaCommande.push(Cupcakecliquer);
        Cupcakecliquer.enCommande = 1
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

            <div class="quantite">
                <div class="moins" >-</div>
                <p>${articleAuPanier.enCommande}</p>
                <div class="plus">+</div>
            </div>
            
            <p class="total-d-article"><span>${(articleAuPanier.prix * articleAuPanier.enCommande).toFixed(2)}</span>€</p>
            
            <img id="circle-cancel" src="img/svg-icons/circle-cancel.svg" alt="croix pour supprimer l'article du panier">
       </div>
        `
   }).join('')}

   `
   indexArticleASupprimer("img#circle-cancel", listeDesArticlesSeTrouvantDansLePrePanier,articleDuPrePanier);
   controleDeLaQuantite("div.moins","div.plus",listeDesArticlesSeTrouvantDansLePrePanier);


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
        nouveaunbrArticlesClient = localStorage.setItem("totalArticlesPanier" , nbrArticlesClient - nbrAticlesRetirer)
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

/* Pour intercepter le produit sur lequel nous avons cliqué */
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

/* Pour enlever un produit */
function moinsUnArticle(i,DOMClickMoins) {
    var panierclient = JSON.parse(localStorage.getItem("cupcakesCommander"))
    var nbrArticlesClient = JSON.parse(localStorage.getItem("totalArticlesPanier"))
    
    
    DOMClickMoins[i].addEventListener("click", () => {
        nouveaunbrArticlesClient = localStorage.setItem("totalArticlesPanier" , nbrArticlesClient -= 1)
        var DOMnouveaunbrArticlesClient = JSON.parse(localStorage.getItem("totalArticlesPanier"))
        /* Puis je l'actualise dans mon DOM */
        panier.innerHTML = DOMnouveaunbrArticlesClient
        nbrArticlepre_panier.innerHTML = DOMnouveaunbrArticlesClient

        
        panierclient[i].enCommande -= 1
        localStorage.setItem("cupcakesCommander" , JSON.stringify(panierclient));
        articleDuPrePanier()

        if (panierclient[i].enCommande == 0) {
            /* Je supprime l'article sélectionner de mon localStorage */
            panierclient.splice(i,1)
            /* Puis j'actualise cette nouvelle liste */
            localStorage.setItem("cupcakesCommander" , JSON.stringify(panierclient))
            articleDuPrePanier()
        }

        
    })

}

/* Pour ajouter un produit */

function plusUnArticle(i,DOMClickPlus) {

    var panierclient = JSON.parse(localStorage.getItem("cupcakesCommander"))
    var nbrArticlesClient = JSON.parse(localStorage.getItem("totalArticlesPanier"))
    
    
    DOMClickPlus[i].addEventListener("click", () => {
        nouveaunbrArticlesClient = localStorage.setItem("totalArticlesPanier" , nbrArticlesClient += 1)
        var DOMnouveaunbrArticlesClient = JSON.parse(localStorage.getItem("totalArticlesPanier"))
        /* Puis je l'actualise dans mon DOM */
        panier.innerHTML = DOMnouveaunbrArticlesClient
        nbrArticlepre_panier.innerHTML = DOMnouveaunbrArticlesClient

        
        panierclient[i].enCommande += 1
        localStorage.setItem("cupcakesCommander" , JSON.stringify(panierclient));
        articleDuPrePanier()

        
    })
}




