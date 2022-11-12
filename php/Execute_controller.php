<?php
require 'Detail_controller.php';
require 'LoadFile_controller.php';
require 'Crud_controller.php';

$LoadFile = new LoadFile();
$Detail = new Detail();
$Crud = new Crud();

//Detail
if(isset($_POST['Storage'])){
    $Detail->Size($_POST['Storage']);
}
if (isset($_POST['Properties'])) {
    $Detail->Properties($_POST['Properties']);
}

//Load
if (isset($_POST['Load'])) {
    $LoadFile->Load($_POST['Load']);
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