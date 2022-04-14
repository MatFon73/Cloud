<?php
class Delete
{
    public static function File()
    {
        $file = $_POST['Delete'];
        try {
            if (file_exists('../upload/'.$file)){
                unlink('../upload/'.$file);
                echo "Delete Compelte";
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