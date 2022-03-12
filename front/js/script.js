//On crée une fonction asynchrone qui utilise une promise comme valeur de retour.Il faut obtenir un résultat pour passer au then.

async function getArticles() {

//On récupère les données depuis l'API

    let articles = await fetch("http://localhost:3000/api/products") 
    return await articles.json();

  }
  getArticles()
  .then(function(products)
  {

    const items = document.getElementById("items") 

// On affiche les produits de la page accueil

  for (let i=0; i<products.length;i++)
  { 
    var product = products[i]
    items.innerHTML += ` 
    <a href="./product.html?id=${product._id}">
    <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}"> 
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
    </article>
    </a> 
    ` 
  }
})
