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
    articleDuPrePanier()
    
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






