<?php
class Properties
{
    public static function File()
    {
        error_reporting(E_ALL ^ E_NOTICE);
        $extension = pathinfo('../' . $_POST['url'], PATHINFO_EXTENSION);
        $type_size = array(" Byte", " KB", " MB", " GB");
        $size = array(1, 1024, 1048576, 1073741824);
        $x = 0;
        try {
            for ($j = 0; $j <= count($size); ++$j) {
                if (filesize("../" . $_POST['url']) >= $size[$j] && filesize("../" . $_POST['url']) < $size[$j + 1]) {
                    $x = $j;
                } else {
                    if (filesize("../" . $_POST['url']) > $size[3] && $j == 3) {
                        $x = $j;
                    }
                }
            }
            if ($extension == 'jpg' || $extension == 'png' || $extension == 'jpeg') {
                echo  "Date: " . date("F d Y", filectime("../" . $_POST['url']));
                echo " \nSize: " . round(filesize("../" . $_POST['url']) / $size[$x], 2) . " " . $type_size[$x];
                echo  " \nLocation: " . $_POST['url'];
                echo  " \nType file: " . pathinfo('../' . $_POST['url'], PATHINFO_EXTENSION);
            } else {
                if ($extension == "") {
                    echo  "Date: " . date("F d Y", filectime("../" . $_POST['url']));
                    echo  " Type file: folder";
                    echo "\nLocation: " . $_POST['url'];
                } else {
                    echo  "Date: " . date("F d Y", filectime("../" . $_POST['url']));
                    echo " \nSize: " . round(filesize("../" . $_POST['url']) / $size[$x], 2) . " " . $type_size[$x];
                    echo  " \nType file: " . pathinfo('../' . $_POST['url'], PATHINFO_EXTENSION) . "\n";
                    echo "\nLocation: " . $_POST['url'];
                }
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
Properties::File();
#Creator: Mateo Fonseca (MatheoFonck73)