<?php
class Delete
{
    public static function File()
    {
        $file = "../" . $_POST['Delete'];
        try {
            if (file_exists($file)) {
                if (pathinfo($file, PATHINFO_EXTENSION)) {
                    unlink($file);
                    echo "Delete Complete";
                } else {
                    if (count(@scandir($file)) > 2) {
                        echo "Can not delete a full folder.";
                    } else {
                        rmdir($file);
                        echo "Delete Complete";
                    }
                }
            } else {
                echo "Does not exist";
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
Delete::File();
#Creator: Mateo Fonseca (MatheoFonck73)