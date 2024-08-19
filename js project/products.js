var username=document.getElementById("Username");
var user=get_cookie("user");
username.innerText=user.charAt(0).toUpperCase().concat(user.substring(1));

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
    function jewelery() {
    const productsContainer = document.getElementById('product');
    productsContainer.innerHTML="";
    fetch('https://fakestoreapi.com/products/category/jewelery')
        .then(response => response.json())
        .then(products => {
            all_products=products;
            products.forEach(product => {
                var productElement = document.createElement('div');
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
};

function men() {
    const productsContainer = document.getElementById('product');
    productsContainer.innerHTML="";
    fetch("https://fakestoreapi.com/products/category/men's clothing")
        .then(response => response.json())
        .then(products => {
            all_products=products;
            products.forEach(product => {
                var productElement = document.createElement('div');
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
};
function women() {
    const productsContainer = document.getElementById('product');
    productsContainer.innerHTML="";
    fetch("https://fakestoreapi.com/products/category/women's clothing")
        .then(response => response.json())
        .then(products => {
            all_products=products;
            products.forEach(product => {
                var productElement = document.createElement('div');
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
};
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