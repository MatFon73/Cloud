<?php
class LoadFile
{
    public static function Icons($element)
    {
        try {
            $Extension = pathinfo($element, PATHINFO_EXTENSION);

            $Icon  = [
                'file', 'file', 'file-audio', 'file-word', 'file-word', 'file-excel', 'file-image', 'file-image',
                'file-video', 'file-archive', 'file-archive', 'file-excel', 'file-pdf', 'file-image', 'file-image', 'file-powerpoint',
                'file-alt', 'folder', 'file', 'file-code', 'file-code', 'file-code', 'file-code', 'file-archive', 'file'
            ];

            $format = [
                'iso', 'exe', 'mp3', 'doc', 'docx', 'xls',
                'jpeg', 'jpg', 'mp4', 'rar', 'zip', 'xlsx', 'pdf', 'png', 'gif', 'pptx',
                'txt', '', 'msi', 'php', 'js',  'html', 'css',  '7z', 'jar'
            ];
            for ($i = 0; $i <= count($format); ++$i) {
                if ($format[$i] == $Extension) {
                    return $Icon[$i];
                }
            }
            return $Icon;
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    public static function Data($element)
    {
        try {
            echo '<div style="margin:3%;" class="col text-center">';
            if (pathinfo($element, PATHINFO_EXTENSION) == true) {
                echo "<a title='Download' download='$element' target='_blank' href='" . $_POST['url'] . "/$element'>
                        <h1 title='File' ><i class='fa-solid fa-" . LoadFile::Icons($element) . "'></i></h1></a>";
                echo "<a title='Download' download='$element' target='_blank' href='" . $_POST['url'] . "/$element'>$element</a> ";
            } else {
                echo "<button type='submit' onclick='OpenFolder(this)' href='$element' value ='$element'>
                        <h1 title='Folder'><i class='fa-solid fa-folder'></i></h1></button><br>";
                echo "<button type='submit' onclick='OpenFolder(this)' href='$element' value ='$element'>$element</button>";
            }
            echo '<div class="dropdown">
            <button type="button" data-bs-toggle="dropdown" id="dropdownMenu"><i class="fa-solid fa-caret-down"></i></a></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                <button onclick="Rename(this)" value="' . $_POST['url'] . '/' . $element . '" class="dropdown-item"><i class="fas fa-pencil"></i>&nbsp;Raname</button>
                <button onclick="DeleteFile(this)" value="' . $_POST['url'] . '/' . $element . '" class="dropdown-item"><i class="fas fa-trash-can"></i>&nbsp;Delete</button>
                <button onclick="Properties(this)" value="' . $_POST['url'] . '/' . $element . '" class="dropdown-item"><i class="fas fa-circle-info"></i>&nbsp;Properties</button>
            </ul>
        </div></div>';
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    public static function Load()
    {
        $url = "../" . $_POST['url'];
        error_reporting(E_ALL ^ E_NOTICE);
        try {
            if (file_exists($url) == false) {
                echo '<h5 class ="text-center"><i class="fa-solid fa-face-frown"></i> Path not found</h5>';
                exit();
            } else {
                $List = scandir($url, 0);
                unset($List[array_search('.', $List, true)]);
                unset($List[array_search('..', $List, true)]);
                $SearchFile = $_POST["search"];
            }
            if (count($List) > 0) {
                echo '<center><div class="DivisionElement container">
                <div class="row align-items-center">';
                foreach ($List as $element) {
                    if ($SearchFile == "") {
                        LoadFile::Data($element);
                    } else {
                        if (strlen(strstr($element, $SearchFile)) > 0) {
                            LoadFile::Data($element);
                        }
                    }
                }
                echo '</div></div></center>';
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
LoadFile::Load();
#Creator: Mateo Fonseca (MatheoFonck73)