// Récupération paramètres URL
var str = window.location.href; //Recup URL
var url = new URL(str); 
var idProduct = url.searchParams.get("id"); 



async function getArticle() {
    
    let articles = await fetch("http://localhost:3000/api/products/" + idProduct)
        return await articles.json();

}

//Recup id image
getArticle()
.then(function(product){
const items = document.querySelector (".item__img")
items.innerHTML=`<img src="${product.imageUrl}" alt="${product.altTxt}">`


})