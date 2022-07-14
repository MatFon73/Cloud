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
            'file-image', 'file-powerpoint', 'file-alt', 'folder'
        );
        $format = array(
            "iso", "exe", 'mp3',
            'doc', 'docx', 'xls', 'jpeg',
            'jpg', 'mp4', 'rar', 'zip',
            'xlsx', 'pdf', 'png',
            'gif', 'pptx', 'txt'
        );
        try {
            for ($j = 0; $j <= count($format); ++$j) {
                if ($format[$j] == $extension) {
                    return $icon[$j];
                }
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
    public static function Data($element)
    {
        if (pathinfo($element, PATHINFO_EXTENSION) == true) {
            echo '<div style="margin-bottom:1%;" class="col-3 text-center">';
            echo "<h1 ><i class='fas fa-" . LoadFile::Icons($element) . "'></i></h1>";
            echo "<a download='$element' target='_blank' href='" . $_POST['url'] . "/$element'>$element</a> ";
            echo '<div class="dropdown">
					<button type="button" data-bs-toggle="dropdown" id="dropdownMenu"><i class="fa-solid fa-caret-down"></i></a></button>
					<ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                        <button onclick="Rename(this)" value="' . $_POST['url'] . '/'.$element.'" class="dropdown-item" ><i class="fas fa-pencil"></i>&nbsp;Raname</button>
                        <button onclick="DeleteFile(this)" value="' . $_POST['url'] . '/'.$element.'" class="dropdown-item" ><i class="fas fa-trash-can"></i>&nbsp;Delete</button>
                        <button onclick="Properties(this)" value="' . $_POST['url'] . '/'.$element.'" class="dropdown-item" ><i class="fas fa-circle-info"></i>&nbsp;Properties</button>
					</ul>
				</div></div>';
        } else {
            echo '<div style="margin-bottom:1%;" class="col-3 text-center">';
            echo "<h1 ><i class='fas fa-" . LoadFile::Icons($element) . "'></i></h1>";
            echo "<button type='submit' onclick='OpenFolder(this)' href='$element' value ='$element'>$element</button>";
            echo '<div class="dropdown">
            <button type="button" data-bs-toggle="dropdown" id="dropdownMenu"><i class="fa-solid fa-caret-down"></i></a></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                <button onclick="Rename(this)" value="' . $_POST['url'] . '/'.$element.'" class="dropdown-item"><i class="fas fa-pencil"></i>&nbsp;Raname</button>
                <button onclick="DeleteFile(this)" value="' . $_POST['url'] . '/'.$element.'" class="dropdown-item"><i class="fas fa-trash-can"></i>&nbsp;Delete</button>
                <button onclick="Properties(this)" value="' . $_POST['url'] . '/'.$element.'" class="dropdown-item"><i class="fas fa-circle-info"></i>&nbsp;Properties</button>
            </ul>
        </div></div>';
        }
    }
    public static function Load()
    {
        $url = "../" . $_POST['url'];
        error_reporting(E_ALL ^ E_NOTICE);

        if (file_exists($url) == false) {
            echo '<h1 class ="text-center">Path not found</h1>';
            exit();
        } else {
            $List = scandir($url, 0);
            unset($List[array_search('.', $List, true)]);
            unset($List[array_search('..', $List, true)]);
            $SearchFile = $_POST["search"];
        }
        try {
            if (count($List) > 0) {
                echo '<div class="container">
                <div class="row">';
                foreach ($List as $element) {
                    if ($SearchFile == "") {
                        LoadFile::Data($element);
                    } else {
                        if (strlen(strstr($element, $SearchFile)) > 0) {
                            LoadFile::Data($element);
                        }
                    }
                }
                echo '</div></div>';
            }
        } catch (Exception $e) {
            echo "An error has occurred: " . $e;
        }
    }
}
LoadFile::Load();
#Creator: Mateo Fonseca (MatheoFonck73)