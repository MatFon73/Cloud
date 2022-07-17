<?php
class Delete
{
    public static function File()
    {
        $file = "../" . $_POST['Delete'];
        $delete = glob($file . "/*");
        try {
            if (pathinfo($file, PATHINFO_EXTENSION) == false || count(@scandir($file)) > 2) {
                foreach ($delete as $element) {
                    if (pathinfo($element, PATHINFO_EXTENSION) == false) {
                        rmdir($element);
                    } else {
                        unlink($element);
                    }
                }
                rmdir($file);
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