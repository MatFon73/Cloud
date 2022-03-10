<?php
class LoadFile
{
    public static function Icons($element)
    {
        $extension = pathinfo($element, PATHINFO_EXTENSION);
        $icon = array(
            'file', 'file', 'file-audio',
            'file-word', 'file-word', 'file-excel', 'file-image',
            'file-image', 'file-video', 'file-archive', 'file-archive',
            'file-excel', 'file-pdf', 'file-image',
            'file-image', 'file-powerpoint', 'file-alt',
        );
        $format = array(
            "iso", "exe", 'mp3',
            'doc', 'docx', 'xls', 'jpeg',
            'jpg', 'mp4', 'rar', 'zip',
            'xlsx', 'pdf', 'png',
            'gif', 'pptx', 'txt'
        );
        for ($j = 0; $j <= count($format); ++$j) {
            if ($format[$j] == $extension) {
                return $icon[$j];
            }
        }
    }
    public static function Table($i, $element)
    {
        $type_size = array(" Byte", " KB", " MB", " GB");
        $size = array(1, 1024, 1048576, 1073741824);
        $url = "../upload/" . $element;
        $x = 0;
        try {
            for ($j = 0; $j <= count($size); ++$j) {
                if (filesize($url) >= $size[$j] && filesize($url) < $size[$j+1]) {
                    $x = $j;
                }
            }
            echo "<tr><td scope = 'col'>" . $i . "</td>
            <input value = " . $element . " id = 'Delete" . $i . "' name = 'Delete' style = 'display:none'>
            <td scope = 'col'><a title='download' download='$element' href='upload/$element' target='_blank'><i class='fas fa-" . LoadFile::Icons($element) . "'></i>&nbsp;$element</a></td>
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