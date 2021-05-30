document.querySelector("svg#menu").addEventListener("click", () => {
    document.querySelector("div#page").classList.toggle("open");
    document.querySelector("html").classList.toggle("noScroll")

})

/* Pour ouvrir et fermer le pre-panier*/

document.querySelector("div#panier").addEventListener("click", () => {
    document.querySelector("div#pre-panier").classList.toggle("visible");
    document.querySelector("html").classList.toggle("noScroll")

})

document.querySelector("img#fermer-pre-panier").addEventListener("click", () => {
    document.querySelector("div#pre-panier").classList.remove("visible");
    document.querySelector("html").classList.remove("noScroll")
})