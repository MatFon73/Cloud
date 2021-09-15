<?php
class Delete
{
    public static function File()
    {
        try {
            $file = $_POST['Delete'];
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