<?php
class Detail
{
    function Size($Url)
    {
        $Storage = round((disk_total_space($Url) / 1073741824), 2);
        $Free = round((disk_free_space($Url) / 1073741824), 2);
        $percentage =  round((($Free / $Storage) * 100), 2);
        try {
            echo "<div id='process-back'>";
            echo "<h5 style='left:25%; position:absolute' title='" . $percentage . ' Free' . "'>" . $percentage . '% Free' . "</h5>";
            echo "<div style='width:" . (100 - $percentage) . "%' id='process'>";
            echo "<h5>&nbsp;</h5></div></div>";
            echo "<h5 style='color:white;' class='text-center'>" . $Free . " GB  Free / " . $Storage . " GB " . "</h5>";
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    function Properties($url)
    {
        str_replace('//', '/', $url);
        str_replace(".//", "", $url);
        str_replace("///", "/", $url);

        error_reporting(0);
        $extension = pathinfo($url, PATHINFO_EXTENSION);
        $type_size = array(" Byte", " KB", " MB", " GB");
        $size = array(1, 1024, 1048576, 1073741824);
        $x = 0;
        try {
            if (file_exists($url)) {
                for ($j = 0; $j <= count($size); ++$j) {
                    if (filesize($url) >= $size[$j] && filesize($url) <= $size[$j + 1]) {
                        $x = $j;
                    } else {
                        if (filesize($url) > $size[3] && $j == 3) {
                            $x = $j;
                        }
                    }
                }
                echo  "Date: " . date("F d Y", filemtime($url));
                if ($extension == 'jpg' || $extension == 'png' || $extension == 'jpeg') {
                    echo " Size: " . round(filesize($url) / $size[$x], 2) . " " . $type_size[$x];
                } else {
                    if ($extension == "") {
                        $extension = "folder";
                    } else {
                        echo " Size: " . round(filesize($url) / $size[$x], 2) . " " . $type_size[$x];
                    }
                }
            } else {
                echo $url;
            }
            echo  " Location: " . $url;
            echo  " Type file: " . $extension;
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
#Creator: Mateo Fonseca (MatFon73)