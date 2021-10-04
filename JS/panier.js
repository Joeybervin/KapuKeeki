/* Ajoute les articles se trouvant dans localStorage dans la panier final */
articleDuPanier()
/* Affichage dans le DOM et calcul du sous-panier du panier */
calculSousTotal("div#Total ul:last-child li:first-child")
/* Affichage dans le DOM et Calcul du TOTAL du panier et des frais de livraison */
calculDuTotalPanier()






/* ___________________________ LES FUNCTIONS  ___________________________*/

function articleDuPanier() {
    var emplacementDuPanierDansLeDOM = document.querySelector("div#CoteProduits")
    var listeDesArticlesSeTrouvantDansLePanier = JSON.parse(localStorage.getItem("cupcakesCommander"))
    

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
            
            <img src="img/svg-icons/close.svg" alt="croix pour supprimer l'article du panier">
       </div>
        `
   }).join('')}
   `
}
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
