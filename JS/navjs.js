/* Pour ouvrir le menu */

document.querySelector("svg#menu").addEventListener("click", () => {
    document.querySelector("div#page").classList.toggle("open");
    document.querySelector("html").classList.toggle("noScroll");

})

/* Pour ouvrir et fermer le pre-panier*/
/* OUVRIR */
document.querySelector("div#panier").addEventListener("click", () => {
    document.querySelector("div#cadre").classList.remove("visible")
    document.querySelector("div#pre-panier").classList.toggle("visible");
    document.querySelector("div#contenu-panier").classList.toggle("visible");
    document.querySelector("html").classList.toggle("noScroll")
    articleDuPanier()
})

>/* FERMER */
document.querySelector("img.fermer-pre-panier").addEventListener("click", () => {
    document.querySelector("div#pre-panier").classList.remove("visible");
    document.querySelector("html").classList.remove("noScroll")
    document.querySelector("div#cadre").classList.remove("visible")
    document.querySelector("div#contenu-panier").classList.remove("visible");
})

/* Pour entrer ses informations de commande */
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



function articleDuPanier() {

    var emplacementDuPanierDansLeDOM = document.querySelector("div.articles")
    var listeDesArticlesSeTrouvantDansLePanier = JSON.parse(localStorage.getItem("cupcakesCommander"))
    

    emplacementDuPanierDansLeDOM.innerHTML = ` ${listeDesArticlesSeTrouvantDansLePanier.map(function(articleAuPanier) {
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
            <p class="total-d-article"><span>${articleAuPanier.prix} * ${articleAuPanier.enCommande}</span>€</p>
            
            <img id="circle-cancel" src="img/svg-icons/circle-cancel.svg" alt="croix pour supprimer l'article du panier">
       </div>
        `
   }).join('')}

   `
}
