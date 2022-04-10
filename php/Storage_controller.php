<?php
class Storage
{
    public static function Size($Url)
    {
        $Storage = round((disk_total_space($Url) / 1073741824), 2);
        $Free = round((disk_free_space($Url) / 1073741824), 2);
        $percentage = round((($Free / $Storage) * 100), 2) . "%";
        try {
            echo "<div id='process-back'>";
            echo "<div style='width:" . $percentage . "' id='process'>";
            echo "<h5 style='text-align:center;'>" . $percentage . ' Free' . "</h5></div></div>";
            echo "<h5 style='color:white;' class='text-center'>" . $Free . " GB  Free / " . $Storage . " GB " . "</h5>";
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
Storage::Size('../upload');
#Creator: Mateo Fonseca (MatheoFonck73)