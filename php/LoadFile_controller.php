<?php
class LoadFile
{
    public static function Table($i, $element)
    {
        $type_size = array(" Byte", " KB", " MB", " GB");
        $size = array(1, 1024, 1048576, 1073741824);
        $x = 0;
        try {
            if (filesize("../upload/" . $element) < 1024 && filesize("../upload/" . $element) < 1048576) {
                $x = 0;
                $size[0];
                $type_size[0];
            }
            if (filesize("../upload/" . $element) >= 1024 && filesize("../upload/" . $element) < 1048576) {
                $x = 1;
                $size[1];
                $type_size[1];
            }
            if (filesize("../upload/" . $element) >= 1048576 && filesize("../upload/" . $element) < 1073741824) {
                $x = 2;
                $size[2];
                $type_size[2];
            }
            if (filesize("../upload/" . $element) >= 1073741824) {
                $x = 3;
                $size[3];
                $type_size[3];
            }
            echo "<tr><td scope = 'col'>" . $i . "</td>
            <input value = " . $element . " id = 'Delete" . $i . "' name = 'Delete' style = 'display:none'>
            <td scope = 'col'><a title='download' download='$element' href='upload/$element' target='_blank'>$element</a></td>
            <td scope = 'col'>" . date("F d Y", filectime("../upload/" . $element)) . "</td>";
            echo "<td scope = 'col'>" . round(filesize("../upload/" . $element) /  $size[$x], 2) . "" . $type_size[$x] . "" . "</td>";
            echo '<td scope = "col"><button id="Delete' . $i . '" type="submit" onclick="return DeleteFile(this)" value="' . $i . '" class="Delete btn bnt-light"><i class="fas fa-trash-alt"></i></button></td></tr>';
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    public static function Load($Url)
    {
        error_reporting(E_ALL ^ E_NOTICE);
        $i = 1;
        $List = scandir($Url);
        unset($List[array_search('.', $List, true)]);
        unset($List[array_search('..', $List, true)]);
        $SearchFile = $_POST["SearchFile"];
        try {
            if (count($List) < 1) {
                return;
            } else {
                echo '<table class="table">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Size</th>
                    <th scope="col">Delete</th>
                </tr>';
                foreach ($List as $element) {
                    if ($SearchFile == "") {
                        LoadFile::Table($i++, $element);
                    } else {
                        if (strlen(strstr($element, $SearchFile)) > 0) {
                            LoadFile::Table($i++, $element);
                        }
                    }
                }
                echo '</table>';
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
LoadFile::Load('../upload');
#Creator: Mateo Fonseca (MatheoFonck73)