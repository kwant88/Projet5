
async function getArticles() {
    
    let articles = await fetch("http://localhost:3000/api/products") //On attend la réponse du serveur avant d'avancer
        return await articles.json();

}
getArticles()
.then(function(products){
  const items = document.getElementById("items") //Fonction pour afficher nom produits
  for (let i=0; i<products.length;i++) {
  var product = products[i]
    items.innerHTML += `
<a href="./product.html?id=42">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>
    `
  }
})
