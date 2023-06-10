var Name = document.getElementById("Name");
var User = document.getElementById("User");
var Pass = document.getElementById("Password");
var Rpass = document.getElementById("Rpassword");

var UserLogin = document.getElementById("Login");
var PassLogin = document.getElementById("PassLogin");

function SignUp() {
    if (User.value == "" || Name.value == "" || Pass.value == "" || Rpass.value == "") {
        Swal.fire({
            icon: "warning",
            title: "Sign up",
            confirmButtonColor: "#5cb85c",
            text: 'There is a blank space.',
        });
        return false;
    }

    if (Pass.value !== Rpass.value) {
        Swal.fire({
            icon: "error",
            title: "Sign up",
            confirmButtonColor: "#5cb85c",
            text: 'The passwords are different.',
        });
        return false;
    }

    $.ajax({
        url: "../app/Execute_controller.php",
        type: "POST",
        data: "userSignup=" + User.value + "&nameSignup=" + Name.value + "&passSignup=" + Pass.value,
        dataType: 'json',
        success: function (response) {
            Swal.fire({
                icon: response.r2,
                title: "Sign up",
                confirmButtonColor: "#5cb85c",
                text: response.r1,
            }).then(function () {
                if (response.r2 == "success") {
                    window.location.href = "../index.html";
                }
            });
        },
        error: function (e) {
            Swal.fire({
                icon: "error",
                title: "Sign up",
                confirmButtonColor: "#5cb85c",
                text: e,
            });
        },
    });
    return false;
}
function Login() {
    if (UserLogin.value == "" || PassLogin.value == "") {
        Swal.fire({
            icon: "warning",
            title: "Login",
            confirmButtonColor: "#5cb85c",
            text: 'There is a blank space.',
        });
        return false;
    }
    $.ajax({
        url: "app/Execute_controller.php",
        type: "POST",
        data: "userLogin=" + UserLogin.value + "&passLogin=" + PassLogin.value,
        dataType: 'json',
        success: function (response) {
            localStorage.setItem("UserData", response.CheckUser);
            Swal.fire({
                icon: response.r2,
                title: "Login",
                confirmButtonColor: "#5cb85c",
                text: response.r1 + " with " + response.CheckUser,
            }).then(function () {
                if (response.r2 == "success") {
                    window.location.href = "public/home.html";
                }
            });
        },
        error: function (e) {
            Swal.fire({
                icon: "error",
                title: "Login",
                confirmButtonColor: "#5cb85c",
                text: e,
            });
        },
    });
    return false;
}
function LogOut() {
    $.ajax({
        url: "../app/Execute_controller.php",
        type: "POST",
        data: "LogOut=" + localStorage.getItem("UserData"),
        success: function () {
            localStorage.removeItem("UserData");
            Swal.fire({
                icon: "success",
                title: "LogOut",
                confirmButtonColor: "#5cb85c",
                text: "Logged out successfully.",
            }).then(function () {
                window.location.href = "../index.html";
            });
        },
        error: function (e) {
            Swal.fire({
                icon: "error",
                title: "LogOut",
                confirmButtonColor: "#5cb85c",
                text: e,
            });
        },
    });
    return false;
}

function RecoverPassword() {

}