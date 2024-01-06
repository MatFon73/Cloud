function Properties(file) {
    $.ajax({
        url: "../app/Execute_controller.php",
        type: "POST",
        data: "Properties=" + file.value,
        success: function (r) {
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
        error: function (e) {
            $("#table").html(e);
        },
    });
    return false;
}
function SearchFile() {
    $.ajax({
        url: "../app/Execute_controller.php",
        type: "POST",
        data: "Load=" + RootDirectory + elem.value + "&search=" + Search.value,
        success: function (r) {
            if (Search != "") {
                if (r != "") {
                    $("#table").html('<center><div class="container"><div class="row justify-content-around">' + r + '</div></div></center>');
                } else {
                    $("#table").html('<h2 class ="text-center"><i class="fas fa-sad-tear"></i> No found documents</h2>');
                }
            }
        },
        error: function (e) {
            $("#table").html(e);
        },
    });
    return false;
}
function Storage() {
    $.ajax({
        url: "../app/Execute_controller.php",
        type: "POST",
        data: "Storage=" + RootDirectory,
        success: function (r) {
            $("#Storage").html(r);
        },
        error: function (e) {
            $("#Storage").html(e);
        },
    });
    return false;
}
function OpenFolder(file) {
    elem.value = elem.value +"/"+ file.value;
    $.ajax({
        url: "../app/Execute_controller.php",
        type: "POST",
        data:  "Load=" + RootDirectory  + elem.value + "/",
        success: function (r) {
            if (Search.value == "") {
                if (r == "") {
                    $("#table").html('<h2 class ="text-center"><i class="fas fa-sad-tear"></i> No found documents</h2>');
                } else {
                    $("#table").html('<center><div class="container"><div class="row justify-content-around">' + r + '</div></div></center>');
                }
            }
            document.getElementById("ClearInput").style = "display: none;";
        },
        error: function (e) {
            $("#table").html(e);
        },
    });
    return false;
}