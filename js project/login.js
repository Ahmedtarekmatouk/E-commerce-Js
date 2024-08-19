var validCustomer = false;
function home_page(event) {
    event.preventDefault();  
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var username = document.getElementById("Name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm").value;

    if (username.trim() !== "" && isNaN(username) && emailRegex.test(email) && password === confirm) {
        validCustomer = true;
    } else {
        validCustomer = false;
    }

    if (validCustomer) {
        save_cookies("user" ,username);
        alert("Valid customer........");
        location.replace("index.html");
    } else {
        alert("Invalid customer........");
    }
}
document.getElementById("loginForm").addEventListener("submit", home_page);


var input = document.getElementById("Name");
var errorMsg = document.getElementById("user_validate");

input.addEventListener("input", function (e) {
	if (e.target.value.length >= 3 && !isNaN(e.target.value.length)) {
		input.style.border = "2px solid green";
		errorMsg.style.display = "none";
	} else {
		errorMsg.style.display = "block";
		input.style.border = "2px solid red";
	}
});

var input1 = document.getElementById("password");
var errorMsg2 = document.getElementById("password_validate");

input1.addEventListener("input", function (e) {
	if (e.target.value.length >= 7 ) {
		input1.style.border = "2px solid green";
		errorMsg2.style.display = "none";
	} else {
		errorMsg2.style.display = "block";
		input1.style.border = "2px solid red";
	}
});

var expiredate=new Date();
expiredate=expiredate.getDate()-1;
function delete_cookies(key){
    document.cookie=key+"=;expires="+expiredate;
}
delete_cookies("cart");
function save_cookies(key,value){
    document.cookie= key +"="+ value +"; expires="+expiredate;
}

