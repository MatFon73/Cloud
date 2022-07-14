<?php
class UploadFile
{
    public static function Upload()
    {
        $upload = "../".$_POST['url'];
        $format = array(
            "iso", "exe", 'mp3',
            'doc', 'docx', 'xls', 'jpeg',
            'jpg', 'mp4', 'rar', 'zip',
            'xlsx', 'pdf', 'png',
            'gif', 'pptx', 'txt'
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
}
UploadFile::Upload();
#Creator: Mateo Fonseca (MatheoFonck73)