# Cloud - MatheoFonck73

## Basic information
- This project was created by hobbie to make a "google drive" in local network.
- The file "php.ini" is configured to increase the size of the file that can be uploaded to 6g. 
- Repository (https://github.com/MatheoFonck73/Cloud).
- Systems Engineering universidad de investigacion y desarrollo (UDI).
- Created by Mateo Fonseca (https://twitter.com/MatheoFonck73).

## Programming Languages
- js: ajax.
- php: backend.
- html and css: frontend.

## Librarys
- boostap: Page design.
- jquery: to make requests.
- sweetalert2: alert.

## Interface - Light Mode
![](https://i.ibb.co/5vJ412p/light.png)

## Interface - Dark Mode
![](https://i.ibb.co/MCv8Msm/Dark.png)

## How to use
- Search: write the name of the file.
- Upload: click on "browser", select the file and then click on the "Upload" button.
- Delete: click on the trash can icon.
- Download: to download you must give in the file name.
- Reaload: Reaload the table.

## Server Linux
- You can use any version of linux server, in my case I use ubuntu server (https://ubuntu.com/download/server).
- You must install apache and php to be able to use it.

### Command for install
- sudo apt install apache2.
- sudo apt install php7.3 php7.3-common php7.3-opcache php7.3-cli php7.3-gd php7.3-curl php7.3-mysql.

## php.ini
- To change the load size of php you must modify the following variables in the file "php.ini".
- file location: /etc/php/{version}/apache2/php.ini.
- upload_max_filesize: this maximum size in megabytes. 
- post_max_size: Defines the maximum upload limit for POST requests.
- max_execution_time: this sets the maximum time in seconds that a script can run before it ends.
- max_input_time: this sets the maximum time in seconds that a script can parse input data.
- memory limit: Defines the memory allocated to PHP.
- when they change the file "php.ini" you must restart the apache service inside the server with the following command "sudo service apache2 restart".
- you must give permissions to the "Cloud" folder with the command "sudo chmod -R 777".

### End
