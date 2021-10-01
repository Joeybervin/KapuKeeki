
/* Mes variables */


/* Affichage des produits sur la page */
var mycupcakes = new XMLHttpRequest()


mycupcakes.open("GET", "/JSON/cupcake-data.json")
mycupcakes.onload = function() {

    var cupcake = JSON.parse(mycupcakes.responseText)
    var section = document.querySelector("main section#produits")
    
   
    section.innerHTML = ` ${cupcake.map(function(cake) {
         return `
        <div id="article">
            <a href="">
            <div class="${cake.couleur}">
                <img src="${cake.photoProduit}" alt="${cake.description}">
            </div>
            </a>
            <p>${cake.nom}</p>
            <p>${cake.prix} €</p>
            <button type="button" class="${cake.couleur}" class="add">Ajouter au panier</button>
        </div>
         `
    }).join('')}
    
`

}
mycupcakes.send()

document.addEventListener('DOMContentLoaded', function (butt) {
    var butt = document.querySelectorAll('button')
   

});