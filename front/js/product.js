// Récupération paramètres URL

var str = window.location.href;
var url = new URL(str); 
var idProduct = url.searchParams.get("id"); 


const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const items = document.querySelector (".item__img")

//On récupère les données produits avec l'URL  et idProduct

async function getArticle() {
    
    fetch("http://localhost:3000/api/products/" + idProduct)
.then((response) => response.json())
.then(product => {
    title.innerHTML = `<h1>${product.name}</h1>`;
    price.innerHTML = `${product.price}`;
    description.innerHTML = `${product.description}`;
    items.innerHTML=`<img src="${product.imageUrl}" alt="${product.altTxt}">`

    //On accède au choix des couleurs

    for (let i=0; i < product.colors.length; i++) {
        var color = product.colors[i]
      colors.innerHTML += `<option value="${color}">${color}</option> `
    }


    var bouton = document.getElementById("addToCart");

    //On surveille les clicks du bouton panier de l'utilisateur

    bouton.addEventListener("click",function(){ 
       
       if (colors.value === ""){
           alert ("Veuillez choisir une couleur")
           return 
       }

//On crée les conditions de la quantité produit pour éviter des erreurs

const quantity = document.getElementById("quantity");
    if (quantity.value <=0 ){
    alert ("Veuillez insérer un nombre supérieur à 0")  
    return  
}
else if (quantity.value >100){
    alert ("Veuillez insérer un nombre inférieur à 100")
    return
};
//On crée un array avec seulement l'id produit, sa couleur et quantité

let choixProduit = {
    idProduit: idProduct,
    couleurProduit: colors.value,
    quantiteProduit: parseInt(quantity.value),
    
};

//Initialisation du local storage
//On transforme les données en objet javascript

let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); 

//Si produit non déclaré alors tableau vide

if (!produitLocalStorage){  
produitLocalStorage =[]
}
//Si produit trouvé, on vérifie que le produit et sa couleur ne sont pas déja stockés dans le LS
//Si produit trouvé , on ajoute juste la quantité
    const foundProduct = produitLocalStorage.find((produit) => {
        if (produit.couleurProduit === colors.value && produit.idProduit === idProduct)
        {
            return produit
        }
    } )
    if(foundProduct){

foundProduct.quantiteProduit +=parseInt(quantity.value)
 
    }
    //On stocke les datas dans le local storage
else {  
    produitLocalStorage.push(choixProduit)
}
//On met a jour le local storage.On transforme l'objet json en chaine de caractères

localStorage.setItem ("produit",JSON.stringify(produitLocalStorage)) 

      alert('Le produit a été ajouté au panier');
    
    })

}

);  
}

getArticle()






        

