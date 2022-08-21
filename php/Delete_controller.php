<?php
class Delete
{
    public static function File()
    {
        $file = "../" . $_POST['Delete'];
        $command = "rm -rf $file";
        try {
            if (pathinfo($file, PATHINFO_EXTENSION) == false) {
                shell_exec($command);
            }else{
                unlink($file);
            }
            echo "Delete Complete.";
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
Delete::File();
#Creator: Mateo Fonseca (MatheoFonck73)