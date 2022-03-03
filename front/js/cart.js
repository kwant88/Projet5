//Init local storage

let produitLocalStorage = JSON.parse (localStorage.getItem("produit"));
const positionEmptyCart = document.querySelector("#cart__items");

let totalPrice = 0

function getTotalsQtt() {
    // Total des quantités
    
    
    let quantityTotal = 0;

    for (let i = 0; i < produitLocalStorage.length; i++) {
        quantityTotal += produitLocalStorage[i].quantiteProduit;
    }

    let productTotalQuantity = document.getElementById("totalQuantity");
    productTotalQuantity.innerHTML = quantityTotal;
    console.log(quantityTotal);
}
getTotalsQtt();

function getCart(){
    
    //Si panier vide
    if (produitLocalStorage === null || produitLocalStorage == 0) {
        const emptyCart = `<p>Votre panier est vide!</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    }
     else {
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

            if (produit == (produitLocalStorage.length -1)) { //On recupere la valeur du prix de la dernière ligne
               document.getElementById ("totalPrice").innerHTML = totalPrice
              
            }
            //Insertion de article et de ses attributs
            
             let productArticle = document.createElement("article");
             document.querySelector("#cart__items").appendChild(productArticle);
             productArticle.className = "cart__item";
             productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);
             productArticle.setAttribute('data-color', produitLocalStorage[produit].couleurProduit);
         
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
            
             deleteProduct();
             changeQtt();
         }
         
            )
            console.log(produit)
     }
     
    }}
    getCart();
    

    // Pour supprimer un article panier

    function deleteProduct() {
        console.log(deleteProduct)
        let btn_supprimer = document.querySelectorAll(".deleteItem");

    //On observe le click de suppression d'un article

        for (let j = 0; j < btn_supprimer.length; j++){
            btn_supprimer[j].addEventListener("click" , (event) => {
                event.preventDefault();
    
                //Selection de l'element à supprimer en fonction de son id ET sa couleur
                let idSuppr = btn_supprimer[j].closest("article").dataset.id;
                let colorSuppr = btn_supprimer[j].closest("article").dataset.color;
    
                produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idSuppr || el.couleurProduit !== colorSuppr );
                
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

                //Quand localStorage vide, le panier est vide
                if (produitLocalStorage.length === 0) {
                    localStorage.clear();
                
                }
                //
                window.location.reload()
            })
        }
    }
    // Pour modifier les quantités du panier

    function changeQtt() {
      let quantitySelector = document.querySelectorAll (".itemQuantity");

// On observe le changement de quantité

      for (let k = 0; k< quantitySelector.length;k++){
          quantitySelector[k].addEventListener("change", (event) =>{
              event.preventDefault();

              // On se positionne et cible l'element que l'on veut supprimer
              let idSuppr = quantitySelector[k].closest("article").dataset.id;
                let colorSuppr = quantitySelector[k].closest("article").dataset.color;

                produitLocalStorage = produitLocalStorage.map (el =>{
                    if (el.idProduit === idSuppr && el.couleurProduit === colorSuppr)
                    {
                        return {
                            ...el,
                            quantiteProduit:parseInt(event.target.value)
                        }
                    }else{
                        return el
                    } 
                })
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                window.location.reload()
          })
      }


    }

    
  
