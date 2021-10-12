
/* Ajoute les articles se trouvant dans localStorage dans la panier final */
articleDuPanier()
/* Affichage dans le DOM et calcul du sous-panier du panier */
calculSousTotal("div#Total ul:last-child li:first-child")
/* Affichage dans le DOM et Calcul du TOTAL du panier et des frais de livraison */
calculDuTotalPanier()


/* _______________________ Accès au JSON pour affichage des produits dans le pre-panier ___________________________ */

var mycupcakes = new XMLHttpRequest()
/* Vérification de localStorage et d'articles déjà présent si page réactulisé ou bug internet */
conservationDuNbrArticles()
/* Ouverture du fichier JSON */
mycupcakes.open("GET", "/JSON/cupcake-data.json")
/* Envoie des données à la page */
mycupcakes.send()

/* ___________________________ PANIER.HTML  ___________________________*/

function articleDuPanier() {
    var emplacementDuPanierDansLeDOM = document.querySelector("div#CoteProduits")
    var listeDesArticlesSeTrouvantDansLePanier = JSON.parse(localStorage.getItem("cupcakesCommander"))
    calculSousTotal("div#Total ul:last-child li:first-child")
    calculDuTotalPanier()

    emplacementDuPanierDansLeDOM.innerHTML = ` ${listeDesArticlesSeTrouvantDansLePanier.map(function(articleAuPanier) {
        return `
       <div class="produit">
           <div class="${articleAuPanier.couleur}">
               <img src="${articleAuPanier.photoProduit}" alt="${articleAuPanier.description}">
           </div>
           <div class="produits">
                <p>${articleAuPanier.nom}</p>
                <p>${articleAuPanier.prix} €</p>
            </div>

            <input type="number" step="1" name="quantité" value="${articleAuPanier.enCommande}">
            <p>${(articleAuPanier.prix * articleAuPanier.enCommande).toFixed(2)} €</p>
            
            <img class="cross-cancel" src="img/svg-icons/close.svg" alt="croix pour supprimer l'article du panier">
       </div>
        `
   }).join('')}
   `
   indexArticleASupprimer("img.cross-cancel", listeDesArticlesSeTrouvantDansLePanier,articleDuPanier)

   
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

/* Calcul du total de la commande */
function calculDuTotalPanier() {
    /* Dans le DOM */
    var fraisDeLivraisonDOM = document.querySelector("div#Total ul:last-child li:last-child")
    var totalDOM = document.querySelector("div#TotalFinal p:last-child span")
    /* Frais de livraison */
    var fraisDeLivraison = 4.50
    /* Sous-total sans les frais de livraison */
    var total = calculSousTotal("div#Total ul:last-child li:first-child") + fraisDeLivraison
    /* écriture du résultat dans le DOM */
    return totalDOM.innerHTML = total.toFixed(2) , fraisDeLivraisonDOM.innerHTML = fraisDeLivraison.toFixed(2) + ' €'
}
/* Étape finale de la commande : affichage page pour entrer les coordonnéees du client */
function informationClientLivraison() {
    document.querySelector("div#contenu-panier").classList.remove("visible");
    document.querySelector("div#pre-panier").classList.toggle("visible");
    document.querySelector("div#cadre").classList.toggle("visible");
    document.querySelector("html").classList.toggle("noScroll")

    document.querySelector("div#cadre > img.fermer-pre-panier").addEventListener("click", () => {
        document.querySelector("div#pre-panier").classList.remove("visible");
        document.querySelector("html").classList.remove("noScroll")
        document.querySelector("div#cadre").classList.remove("visible")
        document.querySelector("div#contenu-panier").classList.remove("visible");
    })
}
