
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
      <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    </article>
  </a>
    `
  }
})

