const Search = document.getElementById("SearchFile");

function Unlock(){
  var button = document.getElementById('UploadFile');
  button.disabled = false; 
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

function DeleteFile(Delete) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(29, 33, 41)",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "php/Delete_controller.php",
        data: $("#Delete" + Delete.value).serialize(),
        success: function (r) {
          if (r == "Delete Compelte") {
            Swal.fire({
              icon: "success",
              title: "Delete",
              text: r,
              confirmButtonColor: "rgb(29, 33, 41)",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Delete",
              text: r,
              confirmButtonColor: "rgb(29, 33, 41)",
            });
          }
        },
      });
    }
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
    });
    return false;
  }
  let timerInterval;
  Swal.fire({
    icon: "warning",
    title: "Upload alert!",
    text: "Upload File.",
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
          confirmButtonColor: "rgb(29, 33, 41)",
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Uploaded",
          text: "The file was loaded successfully.",
          confirmButtonColor: "rgb(29, 33, 41)",
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      }
    },
    error: function (e) {
      Swal.fire({
        icon: "error",
        title: "Upload",
        text: e,
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
setInterval("Load()", 2000);
// #Creator: Mateo Fonseca (MatheoFonck73)
