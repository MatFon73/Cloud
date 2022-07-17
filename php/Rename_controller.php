<?php
class Rename
{
    public static function File()
    {
        $OldName = "../" . $_POST['Oname'];
        $NewName = "../" . $_POST['url'] . "/" . $_POST['Nname'];
        try {
            if (pathinfo($_POST['Nname'], PATHINFO_EXTENSION) == false && pathinfo($_POST['Oname'], PATHINFO_EXTENSION) == true) {
                echo "You must put extension to the name.";
            } else {
                if (!file_exists($NewName)) {
                    rename($OldName, $NewName);
                    echo "The name has been changed successfully.";
                } else {
                    if ($_POST['Nname'] == "." || $_POST['Nname'] == "") {
                        echo "The name can not be changed.";
                    } else {
                        echo 'This folder or file already exists.';
                    }
                }
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
Rename::File();
#Creator: Mateo Fonseca (MatheoFonck73)