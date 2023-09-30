function Load() {
    $.ajax({
        url: "../app/Execute_controller.php",
        type: "POST",
        data: "Load=" + RootDirectory + "/" + elem.value,
        success: function (r) {
            if (Search.value == "") {
                if (r == "") {
                    $("#table").html('<h2 class ="text-center"><i class="fas fa-sad-tear"></i> No found documents</h2>');
                } else {
                    $("#table").html('<center><div class="container"><div class="row justify-content-around">' + r + '</div></div></center>');
                }
            }
        },
        error: function (e) {
            $("#table").html(e);
        },
    });
    lastExecuted = Date.now();
    return false;
}
function UploadFile() {
    let formData = new FormData();
    let File = $("#FilesForm")[0].files[0];
    formData.append("I", File);
    formData.append("url", RootDirectory + elem.value);
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
            timerInterval = setInterval(() => { }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        },
    });
    $.ajax({
        url: "../app/Execute_controller.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function (data) {
            Swal.fire({
                icon: data.r2,
                title: "Uploaded",
                text: data.r1,
                background: background,
                confirmButtonColor: "#5cb85c",
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        },
        error: function (e) {
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
async function NewFolder() {
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
                url: "../app/Execute_controller.php",
                type: "POST",
                data: "Create=" + RootDirectory + "/" + elem.value + "&name=" + Newfolder,
                dataType: 'json',
                success: function (data) {
                    Swal.fire({
                        icon: data.r2,
                        background: background,
                        title: "New Folder",
                        text: data.r1,
                        confirmButtonColor: "#5cb85c",
                    })
                },
                error: function (e) {
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
    await Swal.fire({
        confirmButtonColor: "#5cb85c",
        background: background,
        title: "Rename.",
        input: 'text',
        inputValue: file.value,
        inputAttributes: {
            placeholder: 'New Name File',
        },
        showCancelButton: true,
        confirmButtonText: "Rename",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            let Newfolder = result.value;
            $.ajax({
                url: "../app/Execute_controller.php",
                type: "POST",
                data: "NewName=" + RootDirectory + "/" + elem.value + "&Nname=" + Newfolder + "&Oname=" + (RootDirectory + "/" + elem.value + "/" + file.value),
                dataType: 'json',
                success: function (data) {
                    Swal.fire({
                        icon: data.r2,
                        background: background,
                        title: "New Name",
                        text: data.r1,
                        confirmButtonColor: "#5cb85c",
                    });
                },
                error: function (e) {
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
function PreviousFolder() {
    $.ajax({
        url: "../app/Execute_controller.php",
        type: "POST",
        data: "Previous=" + elem.value,
        dataType: 'json',
        success: function (data) {
            if (elem.value.length === 0) {
                console.log(elem.value);
                return false;
            } else {
                if (Search.value == "") {
                    if (data.r == "") {
                        $("#table").html('<h2 class ="text-center"><i class="fas fa-sad-tear"></i> No found documents</h2>');
                    } else {
                        if (data.r == "\\") {
                            data.r = "";
                        }
                        elem.value = data.r;
                        Load();
                    }
                }
            }
        },
        error: function (e) {
            $("#table").html(e);
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
    if (md5(password) != localStorage.getItem("UserPass")) {
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
                    timerInterval = setInterval(() => { }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
            console.log(RootDirectory + "/" + file.value)
            $.ajax({
                type: "POST",
                url: "../app/Execute_controller.php",
                data: "Delete=" + file.value,
                dataType: 'json',
                success: function (data) {
                    Swal.fire({
                        icon: data.r2,
                        title: "Delete",
                        background: background,
                        text: data.r1,
                        confirmButtonColor: "#5cb85c",
                    });
                },
                error: function (e) {
                    Swal.fire({
                        icon: e.r2,
                        background: background,
                        title: "Delete",
                        text: e.r1,
                        confirmButtonColor: "#5cb85c",
                    });
                },
            });
        }
    });
    return false;
}