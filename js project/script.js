var username=document.getElementById("Username");
var user=get_cookie("user");
username.innerText=user.charAt(0).toUpperCase().concat(user.substring(1));

var image=document.images[0];
setInterval(function(){
    switch(image.getAttribute("src")) {
        case "./images/5.jpg":
            image.setAttribute("src", "./images/1.jpg");
            break;
        case "./images/1.jpg":
            image.setAttribute("src", "./images/2.jpg");
            break;
        case "./images/2.jpg":
            image.setAttribute("src", "./images/3.jpg");
            break;
        case "./images/3.jpg":
            image.setAttribute("src", "./images/5.jpg");
            break;
    }
}, 1000);

function forward(){
    switch(image.getAttribute("src")) {
        case "./images/5.jpg":
            image.setAttribute("src", "./images/1.jpg");
            break;
        case "./images/1.jpg":
            image.setAttribute("src", "./images/2.jpg");
            break;
        case "./images/2.jpg":
            image.setAttribute("src", "./images/3.jpg");
            break;
        case "./images/3.jpg":
            image.setAttribute("src", "./images/5.jpg");
            break;
    }
   }
   function back(){
    switch(image.getAttribute("src")) {
        case "./images/5.jpg":
            image.setAttribute("src", "./images/3.jpg");
            break;
        case "./images/3.jpg":
            image.setAttribute("src", "./images/2.jpg");
            break;
        case "./images/2.jpg":
            image.setAttribute("src", "./images/1.jpg");
            break;
        case "./images/1.jpg":
            image.setAttribute("src", "./images/5.jpg");
            break;
    }
   }
   
   function get_cookie(key) {
    var name = key + "=";
    var decodedCookie = document.cookie;
    var cookieArr = decodedCookie.split(';');
    for (var i = 0; i < cookieArr.length; i++) {
        var cookie = cookieArr[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}
var cart=[];
var cartItemsString = get_cookie("cart");
if (cartItemsString) {
     cart = JSON.parse(cartItemsString);
    }
var all_products=[];
document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products');
    fetch('https://fakestoreapi.com/products?limit=8')
        .then(response => response.json())
        .then(products => {
            all_products=products;
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>$${product.price}</p>
                    <p><button onclick="AddToCart(${product.id})">ADD TO CARD</button></p>
                `;
                productElement.querySelector('h2').classList.add('product-title');
                productElement.querySelector('p').classList.add('product-description');
                productsContainer.appendChild(productElement);

            });
        })
        .catch(error => console.error('Error:', error));
});

function AddToCart(ProdId){
    if(cart.find((cartItem) => cartItem.id== ProdId)==undefined){
        selectedProd=all_products.find((product) => product.id == ProdId);
        selectedProd.Quantity=1;
        cart.push(selectedProd);
    }    
    save_cookies("cart",JSON.stringify(cart));
}

var expiredate=new Date();
expiredate=expiredate.getDate()+1;

function save_cookies(key,value){
    document.cookie=key +"="+ value +";expires="+expiredate;
}
function logout(){
    location.replace("login.html");
}





