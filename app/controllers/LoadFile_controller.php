<?php
class LoadFile
{
    function Icons($element)
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
    function Data($element, $url)
    {
        try {
            echo '<div style="margin:3%;" class="col-4 col-sm-3 text-center">';
            if (pathinfo($element, PATHINFO_EXTENSION) == true) {
                echo "<a title='Download' download='$element' target='_blank' href='" . $url . "$element'>
                        <h1 title='File' ><i class='fa-solid fa-" . LoadFile::Icons($element) . "'></i></h1></a>";
                echo "<a class='text-center' title='Download' download='$element' target='_blank' href='" . $url . "$element'>$element</a> ";
            } else {
                echo "<button type='submit' onclick='OpenFolder(this)' href='$element' value ='$element'>
                        <h1 title='Folder'><i class='fa-solid fa-folder'></i></h1></button><br>";
                echo "<button class='text-center' type='submit' onclick='OpenFolder(this)' href='$element' value ='$element'>$element</button>";
            }
            echo '<div class="dropdown">
            <button type="button" data-bs-toggle="dropdown" id="dropdownMenu"><i class="fa-solid fa-caret-down"></i></a></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                <button onclick="Rename(this)" value="' . $element . '" class="dropdown-item"><i class="fas fa-pencil"></i>&nbsp;Rename</button>
                <button onclick="DeleteFile(this)" value="' . $url .$element . '" class="dropdown-item"><i class="fas fa-trash-can"></i>&nbsp;Delete</button>
                <button onclick="Properties(this)" value="' . $url .$element . '" class="dropdown-item"><i class="fas fa-circle-info"></i>&nbsp;Properties</button>
            </ul>
        </div></div>';
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    function Load($Load)
    {
        try {
            if (file_exists($Load) == false) {
                echo '<h2 class ="text-center"><i class="fa-solid fa-face-frown"></i> Path not found</h2>';
            } else {
                $List = scandir($Load, 0);
                unset($List[array_search('.', $List, true)]);
                unset($List[array_search('..', $List, true)]);
                $SearchFile = $_POST["search"] ?? null;

                if (count($List) > 0) {
                    foreach ($List as $element) {
                        if ($SearchFile == "") {
                            LoadFile::Data($element, $Load);
                        } else {
                            if (strlen(strstr($element, $SearchFile)) > 0) {
                                LoadFile::Data($element, $Load);
                            }
                        }
                    }
                }
            }
            
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    function TotalFile($TotalFile)
    {
        $url = $TotalFile;
        $lastModified = filemtime($url);
        $currentTime = time();

        if ($lastModified == $currentTime || $lastModified - 1 == $currentTime  || $lastModified + 1  == $currentTime) {
            echo "true";
        }
    }
}
#Creator: Mateo Fonseca (MatFon73)