var Search = document.getElementById("SearchFile");
var button = document.getElementById("darkmode");
var color = ["rgb(29, 33, 41)", "#fff"];
var background = color[button.value];
var elem = document.getElementById("urlFile");
elem.onkeyup = function(e) {
    if (e.keyCode == 13) {
        Load();
    }
};
Search.addEventListener(
    "focus",
    function() {
        document.getElementById("IconSearch").style =
            "border:1px solid white;  border-right: none;";
    },
    true
);
Search.addEventListener(
    "blur",
    function() {
        document.getElementById("IconSearch").style =
            "border:1px solid rgb(41, 46, 54);  border-right: none;";
    },
    true
);

document.getElementById("Data").onclick = function() {
    if (window.outerWidth < 1000 && $("#Menu").is(":visible") == true) {
        $("#Menu").fadeOut();
        document.getElementById("OpenMenu").innerHTML =
            '<i class="fa-solid fa-bars"></i>';
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
) {} else {
    $(window).resize(function() {
        OpenMenu();
    });
}

function UploadFile() {
    var formData = new FormData();
    var File = $("#FilesForm")[0].files[0];
    formData.append("I", File);
    formData.append("url", document.getElementById("urlFile").value);
    let timerInterval;
    if ((File.name.length) >= 25) {
        Swal.fire({
            icon: "warning",
            title: "Upload",
            confirmButtonColor: "#5cb85c",
            text: 'Filename is too long. use less than 25 characters',
            background: background,
        });
        return false;
    }
    Swal.fire({
        icon: "warning",
        title: "Upload alert!",
        confirmButtonColor: "#5cb85c",
        text: "Upload File.",
        background: background,
        timerProgressBar: false,
        didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        },
    });
    $.ajax({
        url: "php/Execute_controller.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(r) {
            if (r == "It is not the correct format.") {
                Swal.fire({
                    icon: "error",
                    title: "Uploaded",
                    text: "It is not the correct format.",
                    background: background,
                    confirmButtonColor: "#5cb85c",
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Uploaded",
                    text: "The file uploaded successfully.",
                    background: background,
                    confirmButtonColor: "#5cb85c",
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                });
                Storage();
                Load();
            }
        },
        error: function(e) {
            Swal.fire({
                icon: "error",
                title: "Upload",
                confirmButtonColor: "#5cb85c",
                text: e,
                background: background,
            });
        },
    });
    return false;
}
async function DeleteFile(file) {
    const { value: password } = await Swal.fire({
        title: "Enter password",
        icon: "question",
        background: background,
        confirmButtonColor: "#5cb85c",
        input: "password",
        inputLabel: "Password",
        inputPlaceholder: "Enter password",
        inputAttributes: {
            maxlength: 10,
            autocapitalize: "off",
            autocorrect: "off",
        },
    });

    if (password != "12345") {
        Swal.fire({
            icon: "error",
            title: "Password",
            confirmButtonColor: "#5cb85c",
            text: "Incorrect password",
            background: background,
        });
        return false;
    }
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        background: background,
        confirmButtonColor: "#5cb85c",
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "warning",
                title: "Delete alert!",
                confirmButtonColor: "#5cb85c",
                text: "Delete File.",
                background: background,
                timerProgressBar: false,
                didOpen: () => {
                    Swal.showLoading();
                    const b = Swal.getHtmlContainer().querySelector("b");
                    timerInterval = setInterval(() => {}, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
            $.ajax({
                type: "POST",
                url: "php/Execute_controller.php",
                data: "Delete=" + file.value,
                success: function(r) {
                    if (r == "Delete Complete.") {
                        Swal.fire({
                            icon: "success",
                            title: "Delete",
                            background: background,
                            text: r,
                            confirmButtonColor: "#5cb85c",
                        });
                        Storage();
                        Load();
                    } else {
                        Swal.fire({
                            icon: "error",
                            background: background,
                            title: "Delete",
                            text: r,
                            confirmButtonColor: "#5cb85c",
                        });
                    }
                },
            });
        }
    });
    return false;
}

function Load() {
    var Url = $("#urlFile").val();
    if (Url == "") {
        return false;
    }
    if (Url.startsWith("upload") == false) {
        Url = "upload/" + Url;
        document.getElementById("urlFile").value = Url;
    }
    if (Url.startsWith("upload/..") == true) {
        Url = Url.replace("upload/..", "upload");
        document.getElementById("urlFile").value = Url;
    }
    $.ajax({
        url: "php/Execute_controller.php",
        type: "POST",
        data: "Load=" + Url,
        success: function(r) {
            if (Search.value == "") {
                if (r == "") {
                    $("#table").html('<h5 class ="text-center"><i class="fa-solid fa-face-frown"></i> No found documents</h5>');
                } else {
                    $("#table").html(r);
                }
            }
        },
        error: function(e) {
            $("#table").html(e);
        },
    });
    return false;
}
async function NewFolder() {
    var Url = $("#urlFile").val();
    if (Url == "") {
        Swal.fire({
            icon: "error",
            background: background,
            title: "New Folder",
            text: 'There is not path.',
            confirmButtonColor: "#5cb85c",
        });
        return false;
    }
    if (Url.startsWith("upload/..") == true) {
        Url = Url.replace("upload/..", "upload");
        document.getElementById("urlFile").value = Url;
    }

    if ((Url.startsWith("upload") == false)) {
        Url = "upload/" + Url;
        document.getElementById("urlFile").value = Url;
    }
    if ((Url.startsWith("upload/") == false) && (Url != "upload")) {
        Swal.fire({
            icon: "warning",
            background: background,
            title: "New Folder",
            text: 'There should be a "/" after upload.',
            confirmButtonColor: "#5cb85c",
        });
        return false;
    }

    await Swal.fire({
        confirmButtonColor: "#5cb85c",
        background: background,
        title: "New Folder.",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Create",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            let Newfolder = result.value;
            $.ajax({
                url: "php/Execute_controller.php",
                type: "POST",
                data: "Create=" + Url + "&name=" + Newfolder,
                success: function(r) {
                    if (r == "The folder has been created successfully.") {
                        Swal.fire({
                            icon: "success",
                            background: background,
                            title: "New Folder",
                            text: r,
                            confirmButtonColor: "#5cb85c",
                        });
                        Load();
                    } else {
                        Swal.fire({
                            icon: "warning",
                            background: background,
                            title: "New Folder",
                            text: r,
                            confirmButtonColor: "#5cb85c",
                        });
                    }
                },
                error: function(e) {
                    Swal.fire({
                        icon: "error",
                        background: background,
                        title: "New Folder",
                        text: e,
                        confirmButtonColor: "#5cb85c",
                    });
                },
            });
            return false;
        }
    });
}
async function Rename(file) {
    var Url = $("#urlFile").val();
    await Swal.fire({
        confirmButtonColor: "#5cb85c",
        background: background,
        title: "Rename.",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Rename",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            let Newfolder = result.value;
            $.ajax({
                url: "php/Execute_controller.php",
                type: "POST",
                data: "NewName=" + Url + "&Nname=" + Newfolder + "&Oname=" + file.value,
                success: function(r) {
                    if (r == "The name has been changed successfully.") {
                        Swal.fire({
                            icon: "success",
                            background: background,
                            title: "New Name",
                            text: r,
                            confirmButtonColor: "#5cb85c",
                        });
                        Load();
                    } else {
                        Swal.fire({
                            icon: "warning",
                            background: background,
                            title: "New Name",
                            text: r,
                            confirmButtonColor: "#5cb85c",
                        });
                    }
                },
                error: function(e) {
                    Swal.fire({
                        icon: "error",
                        background: background,
                        title: "New Name",
                        text: e,
                        confirmButtonColor: "#5cb85c",
                    });
                },
            });
            return false;
        }
    });
}

function Properties(file) {
    $.ajax({
        url: "php/Execute_controller.php",
        type: "POST",
        data: "Properties=" + file.value,
        success: function(r) {
            if (
                file.value.split(".").pop() == "jpg" ||
                file.value.split(".").pop() == "png" ||
                file.value.split(".").pop() == "jpeg"
            ) {
                Swal.fire({
                    imageUrl: file.value,
                    confirmButtonColor: "#5cb85c",
                    imageWidth: file.width,
                    text: r,
                    imageHeight: file.height,
                    background: background,
                    padding: ".5%",
                    imageAlt: "File",
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Properties",
                    background: background,
                    text: r,
                    confirmButtonColor: "#5cb85c",
                });
            }
        },
        error: function(e) {
            $("#table").html(e);
        },
    });
    return false;
}

function SearchFile() {
    var Url = $("#urlFile").val();
    var Search = $("#SearchFile").val();
    var directory = "Load=" + Url + "&search=" + Search;
    $.ajax({
        url: "php/Execute_controller.php",
        type: "POST",
        data: directory,
        success: function(r) {
            if (r == "") {
                $("#table").html('<h5 class ="text-center"><i class="fa-solid fa-face-frown"></i> File not found </h5>');
            } else {
                $("#table").html(r);
            }
        },
        error: function(e) {
            $("#table").html(e);
        },
    });
    return false;
}

function Storage() {
    $.ajax({
        url: "php/Execute_controller.php",
        type: "POST",
        data: "Storage=" + '../upload',
        success: function(r) {
            $("#Storage").html(r);
        },
        error: function(e) {
            $("#Storage").html(e);
        },
    });
    return false;
}

function PreviousFolder() {
    var Url = $("#urlFile").val();
    var directory = "upload";
    if ((Url.startsWith("upload") == false) || (Url.startsWith("upload/") == false)) {
        Url = "upload/" + Url;
        document.getElementById("urlFile").value = Url;
    }
    if ((Url != "upload") || (Url != "/upload")) {
        for (i = Url.length - 1; i >= 0; i--) {
            if (Url[i] != "/") {
                directory = Url.substring(null, i);
            } else {
                directory = Url.substring(null, i);
                break;
            }
        }
    }
    document.getElementById("SearchFile").value = "";
    document.getElementById("urlFile").value = directory;
    $.ajax({
        url: "php/Execute_controller.php",
        type: "POST",
        data: "Load=" + directory,
        success: function(r) {
            if (Search.value == "") {
                if (r == "") {
                    $("#table").html('<h5 class ="text-center"><i class="fa-solid fa-face-frown"></i> No found documents</h5>');
                } else {
                    $("#table").html(r);
                }
            }
        },
        error: function(e) {
            $("#table").html(e);
        },
    });
    return false;
}

function OpenFolder(file) {
    var Url = $("#urlFile").val();
    document.getElementById("urlFile").value = Url + "/" + file.value;
    var directory = "Load=" + Url + "/" + file.value;
    document.getElementById("SearchFile").value = "";
    $.ajax({
        url: "php/Execute_controller.php",
        type: "POST",
        data: directory,
        success: function(r) {
            if (Search.value == "") {
                if (r == "") {
                    $("#table").html('<h5 class ="text-center"><i class="fa-solid fa-face-frown"></i> No found documents</h5>');
                } else {
                    $("#table").html(r);
                }
            }
        },
        error: function(e) {
            $("#table").html(e);
        },
    });
    return false;
}

function OpenMenu() {
    if ($("#Menu").is(":visible") == false) {
        $("#Menu").fadeIn();
        document.getElementById("OpenMenu").innerHTML =
            '<i class="fa-solid fa-x"></i>';
        document
            .getElementById("OpenMenu")
            .animate([{ opacity: "0" }, { opacity: "1" }], {
                duration: 500,
            });
    } else {
        if (window.outerWidth < 1000) {
            $("#Menu").fadeOut();
            document.getElementById("OpenMenu").innerHTML =
                '<i class="fa-solid fa-bars"></i>';
            document
                .getElementById("OpenMenu")
                .animate([{ opacity: "0" }, { opacity: "1" }], {
                    duration: 500,
                });
        }
    }
}

function DarkMode() {
    var root = document.documentElement;
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
    }
}

function Unlock() {
    var button = document.getElementById("UploadFile");
    button.disabled = false;
}
// #Creator: Mateo Fonseca (MatheoFonck73)