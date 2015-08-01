function login() {
	var username = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	
	authUser(username, password);
}

function authUser(user, password) {
	$.post("/api/powershop/user_auth", function(data, status) {
		console.log(data);
	});
}