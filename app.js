const Search = document.getElementById("SearchFile");
const button = document.getElementById("darkmode");
const color = ["rgb(29, 33, 41)", "#fff"];
const elem = document.getElementById("urlFile");
const RootDirectory = "../uploads/"+localStorage.getItem("UserData");
var background = color[button.value];
var Url = $("#urlFile").val();
let = lastExecuted = 0;

document.addEventListener("DOMContentLoaded", function () {
    Load();
    Storage();
    if (localStorage.getItem("DarkValue", button.value) == 0) {
        DarkMode();
    } else {
        localStorage.setItem("DarkValue", button.value)
        return false;
    }
});

elem.onkeyup = function (e) {
    if (e.keyCode == 13) {
        Load();
    }
};

Search.addEventListener(
    "focus",
    function () {
        document.getElementById("IconSearch").style =
            "border:1px solid white;  border-right: none;";
        document.getElementById("CloseSearch").style =
            "border:1px solid white; border-left: none;";
        document.getElementById("ClearInput").style = "border-left: none; display: block;";
    },
    true
);
Search.addEventListener(
    "blur",
    function () {
        document.getElementById("IconSearch").style =
            "border:1px solid rgb(41, 46, 54);  border-right: none;";
        document.getElementById("CloseSearch").style =
            "border:1px solid rgb(41, 46, 54); border-left: none;";

        if (document.getElementById("SearchFile").value == "") {
            document.getElementById("ClearInput").style = "display: none;";
        }
    },
    true
);

document.getElementById("Data").onclick = function () {
    if (window.outerWidth < 1000 && $("#Menu").is(":visible") == true) {
        $("#Menu").fadeOut();
        document.getElementById("OpenMenu").innerHTML =
            '<i class="fas fa-bars"></i>';
        document
            .getElementById("OpenMenu")
            .animate([{ opacity: "0" }, { opacity: "1" }], {
                duration: 500,
            });
    }
};

if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
) { } else {
    $(window).resize(function () {
        OpenMenu();
    });
} 

function Clear() {
    document.getElementById("SearchFile").value = "";
    SearchFile();
    document.getElementById("ClearInput").style = "display: none;";
}

function Unlock() {
    let button = document.getElementById("UploadFile");
    button.disabled = false;
}

function DarkMode() {
    let root = document.documentElement;
    if (button.value == "1") {
        button.innerHTML = '<i class="fas fa-solid fa-sun"></i>';
        button.value = "0";
        background = color[button.value];
        root.style.setProperty("--Light-color", color[0]);
        root.style.setProperty("--text-primary-color", color[1]);
        button.animate([{ opacity: "0" }, { opacity: "1" }], {
            duration: 500,
        });
        document
            .getElementById("Data")
            .animate([{ opacity: "0" }, { opacity: "1" }], {
                duration: 500,
            });
        localStorage.setItem("DarkValue", button.value)
    } else {
        button.innerHTML = '<i class="fa-solid fa-moon"></i>';
        button.value = "1";
        background = color[button.value];
        root.style.setProperty("--Light-color", color[1]);
        root.style.setProperty("--text-primary-color", color[0]);
        button.animate([{ opacity: "0" }, { opacity: "1" }], {
            duration: 500,
        });
        document
            .getElementById("Data")
            .animate([{ opacity: "0" }, { opacity: "1" }], {
                duration: 500,
            });
        localStorage.setItem("DarkValue", button.value)
    }
}

function OpenMenu() {
    if ($("#Menu").is(":visible") == false) {
        $("#Menu").fadeIn();
        document.getElementById("OpenMenu").innerHTML =
            '<i class="fas fa-times"></i>';
        document
            .getElementById("OpenMenu")
            .animate([{ opacity: "0" }, { opacity: "1" }], {
                duration: 500,
            });
    } else {
        if (window.outerWidth < 1000) {
            $("#Menu").fadeOut();
            document.getElementById("OpenMenu").innerHTML =
                '<i class="fas fa-bars"></i>';
            document
                .getElementById("OpenMenu")
                .animate([{ opacity: "0" }, { opacity: "1" }], {
                    duration: 500,
                });
        }
    }
}

setInterval(() => {
    let currentTime = Date.now();
    $.ajax({
        url: "../app/Execute_controller.php",
        type: "POST",
        data: "TotalFile=" + RootDirectory + "/" + elem.value,
        success: function (r) {
            if (currentTime - lastExecuted >= 1000) {
                if (r == "true") {
                    Load();
                    Storage();
                } else {
                    return false
                }
            }
        },
        error: function (e) {
            $("#table").html(e);
        },
    });
}, 1000);
// #Creator: Mateo Fonseca (MatFon73)