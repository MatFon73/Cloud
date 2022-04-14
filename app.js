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
    imageUrl: "upload/" + image.value,
    imageWidth: image.width,
    imageHeight: image.height,
    background: background,
    padding: ".5%",
    imageAlt: "Custom image",
  });
}
function SearchFile() {
  $.ajax({
    url: "php/LoadFile_controller.php",
    type: "Post",
    data: $("#SearchFile").serialize(),
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

  if (FileName.indexOf(" ") >= 0) {
    Swal.fire({
      icon: "warning",
      title: "Upload",
      text: "No not space name.",
      background: background,
    });
    return false;
  }
  let timerInterval;
  Swal.fire({
    icon: "warning",
    title: "Upload alert!",
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
    type: "Post",
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
          text: "The file was loaded successfully.",
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
        text: e,
        background: background,
      });
    },
  });
  return false;
}
function Load() {
  $.ajax({
    url: "php/LoadFile_controller.php",
    type: "Post",
    success: function (r) {
      if (Search.value == "") {
        if (r == "") {
          $("#table").html('<h1 class ="text-center">No documents</h1>');
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
function Storage() {
  $.ajax({
    url: "php/Storage_controller.php",
    type: "Post",
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
// #Creator: Mateo Fonseca (MatheoFonck73)
