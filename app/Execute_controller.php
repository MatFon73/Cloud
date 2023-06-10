<?php
include  'controllers/Detail_controller.php';
include  'controllers/LoadFile_controller.php';
include  'controllers/Crud_controller.php';
include  'auth/Auth.php';
include  'Connection.php';

$LoadFile = new LoadFile();
$Detail = new Detail();
$Crud = new Crud();
$Auth = new Auth();

//SignUp
if (isset($_POST['nameSignup']) && isset($_POST['passSignup']) && isset($_POST['userSignup'])) {
    $Auth->SignUp($_POST['nameSignup'], $_POST['userSignup'], $_POST['passSignup']);
}

//Login
if (isset($_POST['passLogin']) && isset($_POST['userLogin'])) {
    $Auth->Login($_POST['userLogin'], $_POST['passLogin']);
}

//LogOut
if (isset($_POST["LogOut"])) {
    $Auth->LogOut($_POST["LogOut"]);
}

//CheckLog
if (isset($_POST["CheckLog"])) {
    $Auth->Check($_POST["CheckLog"]);
}

//Detail
if (isset($_POST['Storage'])) {
    $Detail->Size($_POST['Storage']);
}
//Properties
if (isset($_POST['Properties'])) {
    $Detail->Properties($_POST['Properties']);
}

//Previous
if (isset($_POST['Previous'])) {
    $Crud->PreviousFolder($_POST['Previous']);
}

//Load
if (isset($_POST['Load'])) {
    $LoadFile->Load($_POST['Load']);
}

//Total
if (isset($_POST['TotalFile'])) {
    $LoadFile->TotalFile($_POST['TotalFile']);
}

//Crud
if (isset($_FILES['I']['name']) && $_FILES['I']['tmp_name']) {
    $Crud->Upload();
}
if (isset($_POST['Create']) && isset($_POST['name'])) {
    $Crud->Create($_POST['Create'], $_POST['name']);
}
if (isset($_POST['NewName']) && isset($_POST['Nname']) && isset($_POST['Oname'])) {
    $Crud->NewName($_POST['NewName'], $_POST['Nname'], $_POST['Oname']);
}
if (isset($_POST['Delete'])) {
    $Crud->Delete($_POST['Delete']);
}
