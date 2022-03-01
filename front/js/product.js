// Récupération paramètres URL
var str = window.location.href; //Recup URL
var url = new URL(str); 
var idProduct = url.searchParams.get("id"); 



async function getArticle() {
    
    let articles = await fetch("http://localhost:3000/api/products/" + idProduct)
        return await articles.json();

}


const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');

//Recup id image
getArticle()
.then(function(product){
const items = document.querySelector (".item__img")
items.innerHTML=`<img src="${product.imageUrl}" alt="${product.altTxt}">`
})

//Données produits

getArticle()

fetch("http://localhost:3000/api/products/" + idProduct)
.then((response) => response.json())
.then(product => {
    title.innerHTML = `<h1>${product.name}</h1>`;
    price.innerHTML = `${product.price}`;
    description.innerHTML = `${product.description}`;
    
    for (let i=0; i < product.colors.length; i++) {
        var color = product.colors[i]
        console.log(color)
      colors.innerHTML += `<option value="${color}">${color}</option> `
    }


    var bouton = document.getElementById("addToCart");

    bouton.addEventListener("click",function(){ //On surveille les clicks du bouton panier
       
       if (colors.value === ""){
           alert ("Veuillez choisir une couleur")
           return 
       }
const quantity = document.getElementById("quantity");
    if (quantity.value <=0 ){
    alert ("Veuillez insérer un nombre supérieur à 0")  
    return  
}
else if (quantity.value >100){
    alert ("Veuillez insérer un nombre inférieur à 100")
    return
};

let choixProduit = {
    idProduit: idProduct,
    couleurProduit: colors.value,
    quantiteProduit: parseInt(quantity.value),
    
};
    console.log(idProduct, colors.value, product.name, product.price, quantity, product.imageUrl, product.altTxt);

//Initialisation du local storage

let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); //On transforme l'objet en chaine de caractères
console.log(produitLocalStorage)
if (!produitLocalStorage){  //Si produit non déclaré alors tableau vide
produitLocalStorage =[]
}
    const foundProduct = produitLocalStorage.find((produit) => {
        if (produit.couleurProduit === colors.value && produit.idProduit === idProduct)
        {
            return produit
        }
    } )
    console.log(foundProduct)
    if(foundProduct){

foundProduct.quantiteProduit +=parseInt(quantity.value)
 
    }
else {  
    produitLocalStorage.push(choixProduit)
}
localStorage.setItem ("produit",JSON.stringify(produitLocalStorage)) //On met a jour le local storage

      alert('Le produit a été ajouté au panier');
    
    })

    

}

);          

