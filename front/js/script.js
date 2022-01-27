
async function getArticles() {
    let articles = await fetch("http://localhost:3000/api/products") //On attend la réponse du serveur avant d'avancer
        return await products.json();

}
