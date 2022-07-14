<?php
class NewFolder
{
    public static function Create()
    {
        $upload = "../" . $_POST['url'] . '/' . $_POST['name'];
        try {
            if (pathinfo($_POST['name'], PATHINFO_EXTENSION)) {
                echo "Only folders can be created.";
            } else {
                if (!file_exists($upload)) {
                    mkdir($upload, 0777, true);
                    echo "The folder has been created successfully.";
                } else {
                    if ($_POST['name'] == ".") {
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
}
NewFolder::Create();
#Creator: Mateo Fonseca (MatheoFonck73)