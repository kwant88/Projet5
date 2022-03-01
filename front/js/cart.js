//Init local storage

let produitLocalStorage = JSON.parse (localStorage.getItem("produit"));
const positionEmptyCart = document.querySelector("#cart__items");

let totalPrice = 0

function getCart(){
    
    //Si panier vide
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide!</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        //Si 1 ou + articles boucle 
     for (let produit in produitLocalStorage){
         fetch("http://localhost:3000/api/products/" + produitLocalStorage[produit].idProduit)
         .then ((response) => response.json())
         .then (product =>{
             console.log(product)
             produitLocalStorage[produit].prixProduit =product.price
            produitLocalStorage [produit].imgProduit = product.imageUrl
            produitLocalStorage [produit].altImgProduit = product.altTxt
            produitLocalStorage [produit].nomProduit = product.name
            totalPrice += product.price*produitLocalStorage[produit].quantiteProduit

           // Recup prix total

            if (produit == (produitLocalStorage.length -1)) {
               document.getElementById ("totalPrice").innerHTML = totalPrice
              
            }
            
             let productArticle = document.createElement("article");
             document.querySelector("#cart__items").appendChild(productArticle);
             productArticle.className = "cart__item";
             productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);
         
             // Insertion de "div"
             let productDivImg = document.createElement("div");
             productArticle.appendChild(productDivImg);
             productDivImg.className = "cart__item__img";
         
             // Insertion de l'image
             let productImg = document.createElement("img");
             productDivImg.appendChild(productImg);
             productImg.src = produitLocalStorage[produit].imgProduit;
             productImg.alt = produitLocalStorage[produit].altImgProduit;
             
             // Insertion des "div"
             let productItemContent = document.createElement("div");
             productArticle.appendChild(productItemContent);
             productItemContent.className = "cart__item__content";
         
             let productItemContentTitlePrice = document.createElement("div");
             productItemContent.appendChild(productItemContentTitlePrice);
             productItemContentTitlePrice.className = "cart__item__content__titlePrice";
             
             // Insertion du titre
             let productTitle = document.createElement("h2");
             productItemContentTitlePrice.appendChild(productTitle);
             productTitle.innerHTML = produitLocalStorage[produit].nomProduit;
         
             // Insertion de la couleur
             let productColor = document.createElement("p");
             productTitle.appendChild(productColor);
             productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
         
             // Insertion du prix
             let productPrice = document.createElement("p");
             console.log (productPrice);
             productItemContentTitlePrice.appendChild(productPrice);
             productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";
         
             // Insertion des "div"
             let productItemContentSettings = document.createElement("div");
             productItemContent.appendChild(productItemContentSettings);
             productItemContentSettings.className = "cart__item__content__settings";
         
             let productItemContentSettingsQuantity = document.createElement("div");
             productItemContentSettings.appendChild(productItemContentSettingsQuantity);
             productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
             
             // Insertion de p "Quantité : "
             let productQte = document.createElement("p");
             productItemContentSettingsQuantity.appendChild(productQte);
             productQte.innerHTML = "Quantité : ";
         
             // Insertion des attributs de quantité
             let productQuantity = document.createElement("input");
             productItemContentSettingsQuantity.appendChild(productQuantity);
             productQuantity.value = produitLocalStorage[produit].quantiteProduit;
             productQuantity.className = "itemQuantity";
             productQuantity.setAttribute("type", "number");
             productQuantity.setAttribute("min", "1");
             productQuantity.setAttribute("max", "100");
             productQuantity.setAttribute("name", "itemQuantity");
         
             // Insertion de "div"
             let productItemContentSettingsDelete = document.createElement("div");
             productItemContentSettings.appendChild(productItemContentSettingsDelete);
             productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
         
             // Insertion  supprimer
             let productSupprimer = document.createElement("p");
             productItemContentSettingsDelete.appendChild(productSupprimer);
             productSupprimer.className = "deleteItem";
             productSupprimer.innerHTML = "Supprimer";
             
         }
         
            )
            console.log(produit)
     }
     
    }}
    getCart();
    
    // Pour modifier la quantité du panier
