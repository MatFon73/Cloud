<?php
class Crud
{
    function Upload()
    {
        $upload = $_POST['url'];
        $format = array(
            "iso", "exe", 'mp3',
            'doc', 'docx', 'xls', 'jpeg',
            'jpg', 'mp4', 'rar', 'zip',
            'xlsx', 'pdf', 'png', 'sql',
            'gif', 'pptx', 'txt', 'js',
            'php', 'css', 'html', 'msi', '7z', 'jar', 'json'
        );
        $File = $_FILES['I']['name'];
        $tmp = ($_FILES['I']['tmp_name']);
        $save =  $upload . "/" . $File;
        $extension = pathinfo($File, PATHINFO_EXTENSION);
        try {
            if (!in_array($extension, $format)) {
                $Icon = "warning";
                $Messege = "It is not the correct format.";
            } else {
                move_uploaded_file($tmp,  $save);
                $Icon = "success";
                $Messege = "It has been uploaded successfully.";
            }
            Crud::PrintMessenge($Icon, $Messege);
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    function Create($Create, $Name)
    {
        $upload = $Create . '/' . $Name;
        try {
            $Icon = "warning";
            if (pathinfo($Name, PATHINFO_EXTENSION)) {
                $Messege = "Only folders can be created.";
            } else {
                if (!file_exists($upload)) {
                    mkdir($upload, 0777, true);
                    $Icon = "success";
                    $Messege = "The folder has been created successfully.";
                } else {
                    if ($Name == "." || $Name == "") {
                        $Messege = "Can not create a folder with that name.";
                    } else {
                        $Messege = 'This folder already exists.';
                    }
                }
            }
            Crud::PrintMessenge($Icon, $Messege);
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    function NewName($url, $Nname, $OName)
    {
        $OldName = $OName;
        $NewName =  $url . "/" . $Nname;
        try {
            $Icon = "warning";
            if (pathinfo($_POST['Nname'], PATHINFO_EXTENSION) == false && pathinfo($OName, PATHINFO_EXTENSION) == true) {
                $Messege = "You must put extension to the name.";
            } else {
                if (pathinfo($_POST['Nname'], PATHINFO_EXTENSION) == true && pathinfo($OName, PATHINFO_EXTENSION) == false) {
                    $Messege = "Is a folder, you can not put extension.";
                } else {
                    if (!file_exists($NewName)) {
                        rename($OldName, $NewName);
                        $Icon = "success";
                        $Messege = "The name has been changed successfully.";
                    } else {
                        if ($Nname == "." || $Nname == "") {
                            $Messege = "The name can not be changed.";
                        } else {
                            $Messege = 'This folder or file already exists.';
                        }
                    }
                }
            }
            Crud::PrintMessenge($Icon, $Messege);
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    function PreviousFolder($Load)
    {
        $ProyectPath = rtrim(dirname($Load), DIRECTORY_SEPARATOR);

        $response = array(
            'r' => $ProyectPath."/"
        );
        echo json_encode($response);
    }
    function Delete($Delete)
    {
        $file = $Delete;
        try {
            if (pathinfo($file, PATHINFO_EXTENSION) == false) {
                if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                    exec("rmdir /s /q \"$file\"");
                } else {
                    shell_exec("rm -rf $file");
                }
            } else {
                unlink($file);
            }
            $Icon = "success";
            $Messege = "Delete Complete.";
            Crud::PrintMessenge($Icon, $Messege);
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    function PrintMessenge($Icon, $Messege)
    {
        $response = array(
            'r1' => $Messege,
            'r2' => $Icon
        );
        echo json_encode($response);
    }
}
#Creator: Mateo Fonseca (MatFon73)