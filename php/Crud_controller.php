<?php
class Crud
{
    function Upload()
    {
        $upload = "../".$_POST['url'];
        $format = array(
            "iso", "exe", 'mp3',
            'doc', 'docx', 'xls', 'jpeg',
            'jpg', 'mp4', 'rar', 'zip',
            'xlsx', 'pdf', 'png',
            'gif', 'pptx', 'txt', 'js',
            'php','css','html','msi', '7z','jar'
        );
        $File = $_FILES['I']['name'];
        $tmp = ($_FILES['I']['tmp_name']);
        $save =  $upload. "/".$File;
        $extension = pathinfo($File, PATHINFO_EXTENSION);
        try {
            if (!in_array($extension, $format)) {
                echo "It is not the correct format.";
            } else {
                move_uploaded_file($tmp,  $save);
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    function Create($Create, $Name)
    {
        $upload = "../" . $Create . '/' . $Name;
        try {
            if (pathinfo($Name, PATHINFO_EXTENSION)) {
                echo "Only folders can be created.";
            } else {
                if (!file_exists($upload)) {
                    mkdir($upload, 0777, true);
                    echo "The folder has been created successfully.";
                } else {
                    if ($Name == "." || $Name == "") {
                        echo "Can not create a folder with that name.";
                    } else {
                        echo 'This folder already exists.';
                    }
                }
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }

    function NewName( $url, $Nname, $OName)
    {
        $OldName = "../" . $OName;
        $NewName = "../" .  $url . "/" . $Nname;
        try {
            if (pathinfo($_POST['Nname'], PATHINFO_EXTENSION) == false && pathinfo($OName, PATHINFO_EXTENSION) == true) {
                echo "You must put extension to the name.";
            } else {
                if(pathinfo($_POST['Nname'], PATHINFO_EXTENSION) == true && pathinfo($OName, PATHINFO_EXTENSION) == false){
                    echo "Is a folder, you can not put extension.";
                }else{
                    if (!file_exists($NewName)) {
                        rename($OldName, $NewName);
                        echo "The name has been changed successfully.";
                    } else {
                        if ( $Nname == "." || $Nname == "") {
                            echo "The name can not be changed.";
                        } else {
                            echo 'This folder or file already exists.';
                        }
                    }
                }                
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    function Delete($Delete)
    {
        $file = "../" . $Delete;
        $command = "rm -rf $file";
        try {
            if (pathinfo($file, PATHINFO_EXTENSION) == false) {
                shell_exec($command);
            } else {
                unlink($file);
            }
            echo "Delete Complete.";
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
#Creator: Mateo Fonseca (MatheoFonck73)