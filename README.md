# Cloud - MatFon73

## Basic Information
This project was created as a hobby to make a "Google Drive" in a local network. The `php.ini` file is configured to increase the size of the file that can be uploaded to 6GB.

- **Repository:** [![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/MatFon73/Cloud)
- **Systems Engineering, Universidad de Investigación y Desarrollo (UDI)**
- **Operation Video:** [![YouTube](https://img.shields.io/badge/YouTube-Operation%20Video-red?logo=youtube)](https://youtu.be/VxZoZKJHlhY)
- **Created by:** Mateo Fonseca [![Twitter](https://img.shields.io/twitter/url?label=@MatFon73&style=social&url=https%3A%2F%2Ftwitter.com%2FMatFon73)](https://twitter.com/MatFon73)
- **Database:** Username: `MatFon73`, Password: `mateo`

## Programming Languages
- **JavaScript:** AJAX
- **PHP:** Backend
- **HTML and CSS:** Frontend

## Libraries
- **Bootstrap:** Page design
- **jQuery:** To make requests
- **SweetAlert2:** Alerts

## Interfaces

### Login
![Login](https://i.postimg.cc/zGFX0bz6/Login.png)

### Sign Up
![Sign Up](https://i.postimg.cc/N0GGVsLM/Singup.png)

### Light Mode
![Light Mode](https://i.postimg.cc/2SDSQFDn/Light-Mode.png)

### Dark Mode
![Dark Mode](https://i.postimg.cc/xTHdNpW0/DarkMode.png)

## How to Use
- **Login:** To access the main page, use your credentials and click the login button.
- **Sign Up:** Fill in the required information and click the sign up button.
- **LogOut:** Press the LogOut button to end the current session.
- **Search:** Write the name of the file.
- **Upload:** Click on "Browse", select the file, and then click the "Upload" button.
- **Delete:** Click on the trash can icon. You must use the user's password to delete.
- **Rename:** Change the file name.
- **Download:** To download, click on the file name.
- **Reload:** Reload the workspace.
- **Previous Folder:** Returns you to the previous folder.
- **New Folder:** Create a new folder.
- **Properties:** Shows file details.
- **Menu:** Activate and deactivate the menu.

## Linux Server
You can use any version of Linux server; in my case, I use Ubuntu Server ([Download](https://ubuntu.com/download/server)). You must install Apache and PHP to use it.

### Command to Install
```bash
sudo apt install apache2
sudo apt install php7.3 php7.3-common php7.3-opcache php7.3-cli php7.3-gd php7.3-curl php7.3-mysql
sudo apt install mysql-server
sudo mysql_secure_installation
