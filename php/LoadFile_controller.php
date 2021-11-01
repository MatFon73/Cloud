<?php
class LoadFile
{
    public static function Load($Url)
    {
        try {
            error_reporting(E_ALL ^ E_NOTICE);
            $i = 1;
            $List = scandir($Url);
            unset($List[array_search('.', $List, true)]);
            unset($List[array_search('..', $List, true)]);
            $SearchFile = $_POST["SearchFile"];

            if (count($List) < 1) {
                return;
            } else {
                echo '<table class="table">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Size</th>
                </tr>';
                foreach ($List as $element) {
                    if ($SearchFile == "") {
                        echo "<tr>
                        <td scope = 'col'>" . $i++ . "</td>
                        <td scope = 'col'><a title='download' download='$element' href='upload/$element' target='_blank'>$element</a></td>
                        <td scope = 'col'>" . date("F d Y", filectime("../upload/" . $element)) . "</td>";
                        if (filesize("../upload/" . $element) < 1024 && filesize("../upload/" . $element) < 1048576) {
                            echo "<td scope = 'col'>" . round(filesize("../upload/" . $element), 2) . " Byte" . "</td></tr>";
                        } else {
                            if (filesize("../upload/" . $element) >= 1024 && filesize("../upload/" . $element) < 1048576) {
                                echo "<td scope = 'col'>" . round(filesize("../upload/" . $element) / 1024, 2) . " KB" . "</td></tr>";
                            } else {
                                if (filesize("../upload/" . $element) >= 1048576 && filesize("../upload/" . $element) < 1073741824) {
                                    echo "<td scope = 'col'>" . (round(filesize("../upload/" . $element) / 1048576, 2)) . " MB" . "</td></tr>";
                                } else {
                                    if (filesize("../upload/" . $element) >= 1024000) {
                                        echo "<td scope = 'col'>" . (round(filesize("../upload/" . $element) / 1073741824, 2)) . " GB" . "</td></tr>";
                                    }
                                }
                            }
                        }
                    } else {
                        if (strlen(strstr($element, $SearchFile)) > 0) {
                            echo "<tr>
                        <td scope = 'col'>" . $i++ . "</td>
                        <td scope = 'col'><a title='download' download='$element' href='upload/$element' target='_blank'>$element</a></td>
                        <td scope = 'col'>" . date("F d Y", filectime("../upload/" . $element)) . "</td>";
                            if (filesize("../upload/" . $element) < 1024 && filesize("../upload/" . $element) < 1048576) {
                                echo "<td scope = 'col'>" . round(filesize("../upload/" . $element), 2) . " Byte" . "</td></tr>";
                            } else {
                                if (filesize("../upload/" . $element) >= 1024 && filesize("../upload/" . $element) < 1048576) {
                                    echo "<td scope = 'col'>" . round(filesize("../upload/" . $element) / 1024, 2) . " KB" . "</td></tr>";
                                } else {
                                    if (filesize("../upload/" . $element) >= 1048576 && filesize("../upload/" . $element) < 1073741824) {
                                        echo "<td scope = 'col'>" . (round(filesize("../upload/" . $element) / 1048576, 2)) . " MB" . "</td></tr>";
                                    } else {
                                        if (filesize("../upload/" . $element) >= 1024000) {
                                            echo "<td scope = 'col'>" . (round(filesize("../upload/" . $element) / 1073741824, 2)) . " GB" . "</td></tr>";
                                        }
                                    }
                                }
                            }
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