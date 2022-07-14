<?php
class Delete
{
    public static function File()
    {
        $file = $_POST['Delete'];
        try {
            if (file_exists($_POST["url"].$file)){
                unlink($_POST["url"].$file);
                echo "Delete Complete";
            }else{
                echo "Does not exist";
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
Delete::File();
#Creator: Mateo Fonseca (MatheoFonck73)