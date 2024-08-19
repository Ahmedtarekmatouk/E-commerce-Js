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
debugger;
var cart=[];
var cartItemsString = get_cookie("cart");
if (cartItemsString) {
     cart = JSON.parse(cartItemsString);
     const productsContainer = document.getElementById('data');
     cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product_cart';
        productElement.setAttribute('id',`product_${product.id}`)
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p id="price_${product.id}">${product.price}</p>
            <p><button onclick="increment(${product.id})"> + </button>  Quantity: <span id="Quantity_${product.id}"> ${product.Quantity} </span> <button onclick="decrement(${product.id})"> - </button></p>
            <p><button onclick="remove(${product.id})"> REMOVE </button></p>
        `;
        productsContainer.appendChild(productElement);
    });
}

function logout(){
    location.replace("login.html");
}
function increment(ProdID){
   var index= cart.map(prod=>prod.id).indexOf(ProdID);
   cart[index].Quantity++;
  var Qelem= document.getElementById(`Quantity_${ProdID}`);
  var price= document.getElementById(`price_${ProdID}`);
  price.innerHTML= cart[index].Quantity * cart[index].price;
  Qelem.innerHTML= cart[index].Quantity;
  calculate();
}
function decrement(ProdID){
   var index= cart.map(prod=>prod.id).indexOf(ProdID);
   if(cart[index].Quantity > 1){
   cart[index].Quantity--;
   }
  var Qelem= document.getElementById(`Quantity_${ProdID}`);
  var price= document.getElementById(`price_${ProdID}`);
  price.innerHTML= cart[index].Quantity * cart[index].price;
  Qelem.innerHTML= cart[index].Quantity;
  calculate();
}
function remove(ProdID){
    cart=cart.filter(item=>item.id != ProdID);
    save_cookies("cart",cart);
   var product= document.getElementById(`product_${ProdID}`);
    product.remove();
    calculate();
 }

 function delete_cookies(key){
    document.cookie=key+"=;expires="+expiredate;
}
function checkout(){
    delete_cookies("cart");
    alert('Thank You For shoping with us');
    location.reload();

}

var expiredate=new Date();
expiredate=expiredate.getDate()-1;
function delete_cookies(key){
    document.cookie=key+"=;expires="+expiredate;
}
function save_cookies(key,value){
    document.cookie=key +"="+ value +";expires="+expiredate;
}

function calculate(){
    var total=0;
    for(var i=0;i <cart.length;i++){
        total +=cart[i].Quantity * cart[i].price;
    }
    var span=document.getElementById("total");
    span.innerHTML=total;
}
calculate();
