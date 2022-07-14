const Search = document.getElementById("SearchFile");
var button = document.getElementById("darkmode");
var color = ["rgb(29, 33, 41)", "#fff"];
var background = color[button.value];

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
function Image(image) {
  Swal.fire({
    title: image.value,
    imageUrl: "upload" + image.value,
    confirmButtonColor: "#5cb85c",
    imageWidth: image.width,
    imageHeight: image.height,
    background: background,
    padding: ".5%",
    imageAlt: "Custom image",
  });
}
function SearchFile() {
  var Url = $("#urlFile").val();
  var Search = $("#SearchFile").val();
  var directory = "url=" + Url + "&search=" + Search;
  console.log(Url),
    $.ajax({
      url: "php/LoadFile_controller.php",
      type: "POST",
      data: directory,
      success: function (r) {
        if (r == "") {
          $("#table").html('<h1 class ="text-center">File not found </h1>');
        } else {
          $("#table").html(r);
        }
      },
      error: function (e) {
        $("#table").html(e);
      },
    });
  return false;
}
function UploadFile() {
  var formData = new FormData();
  var File = $("#FilesForm")[0].files[0];
  var FileName = $("#FilesForm")[0].files[0].name;
  formData.append("I", File);
  formData.append("url", document.getElementById("urlFile").value);
  if (FileName.indexOf(" ") >= 0) {
    Swal.fire({
      icon: "warning",
      title: "Upload",
      confirmButtonColor: "#5cb85c",
      text: "No not space name.",
      background: background,
    });
    return false;
  }
  let timerInterval;
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
    url: "php/UploadFile_controller.php",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (r) {
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

function Storage() {
  $.ajax({
    url: "php/Storage_controller.php",
    type: "POST",
    success: function (r) {
      $("#Storage").html(r);
    },
    error: function (e) {
      $("#Storage").html(e);
    },
  });
  return false;
}
async function DeleteFile(Delete) {
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
      $.ajax({
        type: "POST",
        url: "php/Delete_controller.php",
        data: $("#Delete" + Delete.value).serialize(),
        success: function (r) {
          if (r == "Delete Complete") {
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
  $.ajax({
    url: "php/LoadFile_controller.php",
    type: "POST",
    data: "url=" + Url,
    success: function (r) {
      if (Search.value == "") {
        if (r == "") {
          $("#table").html('<h1 class ="text-center">No found documents</h1>');
        } else {
          $("#table").html(r);
        }
      }
    },
    error: function (e) {
      $("#table").html(e);
    },
  });
  return false;
}
function PreviousFolder() {
  var Url = $("#urlFile").val();
  var directory = "upload";
  if (Url != "upload") {
    for (i = Url.length - 1; i >= 0; i--) {
      if (Url[i] == "/") {
        directory = Url.substring(null, i);
        break;
      } else {
        directory = Url.substring(null, i);
      }
    }
  }
  document.getElementById("SearchFile").value = "";
  document.getElementById("urlFile").value = directory;
  $.ajax({
    url: "php/LoadFile_controller.php",
    type: "POST",
    data: "url=" + directory,
    success: function (r) {
      if (Search.value == "") {
        if (r == "") {
          $("#table").html('<h1 class ="text-center">No found documents</h1>');
        } else {
          $("#table").html(r);
        }
      }
    },
    error: function (e) {
      $("#table").html(e);
    },
  });
  return false;
}
function OpenFolder(boton) {
  var Url = $("#urlFile").val();
  document.getElementById("urlFile").value = Url + "/" + boton.value;
  var directory = "url=" + Url + "/" + boton.value;
  document.getElementById("SearchFile").value = "";
  $.ajax({
    url: "php/LoadFile_controller.php",
    type: "POST",
    data: directory,
    success: function (r) {
      if (Search.value == "") {
        if (r == "") {
          $("#table").html('<h1 class ="text-center">No found documents</h1>');
        } else {
          $("#table").html(r);
        }
      }
    },
    error: function (e) {
      $("#table").html(e);
    },
  });
  return false;
}

async function NewFolder() {
  var Url = $("#urlFile").val();
  if (Url == "") {
    return false;
  }
  Swal.fire({
    confirmButtonColor: "#5cb85c",
    background: background,
    title: "Folder name.",
    input: "text",
    showCancelButton: true,
    confirmButtonText: "Create",
    cancelButtonText: "Cancel",
  }).then((r) => {
    let Newfolder = r.value;
    $.ajax({
      url: "php/NewFolder_controller.php",
      type: "POST",
      data: "url=" + Url + "&name=" + Newfolder,
      success: function (r) {
        if ((r == "The folder has been created successfully.")) {
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
  });
}

// #Creator: Mateo Fonseca (MatheoFonck73)
