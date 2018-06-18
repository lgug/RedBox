# RedBox
A simple software for the basic penetration testing operations.

### Installation
Pre-requisites:
* Any recent Linux distribution
* Root privileges

You must to have installed:
* fping
* nmap
* OpenVAS CLI
* Metasploit

##### fping installation
To install fping, you have to prompt:

* `sudo apt-get install fping`

##### nmap installation
To install nmap, you have to prompt:

* `sudo apt-get install nmap`

##### OpenVAS installation
Depending on your Linux distribution, there are many ways to install OpenVAS. Red Box uses the version 9 of the software
and the following procedure was tested on Linux Mint and Ubuntu. For more information about the installation in different distribution visit http://www.openvas.org/install-packages.html

To install OpenVAS 9, you have to prompt:

* `sudo apt-get install sqlite3` to install the SQLite libraries

* `sudo add-apt-repository ppa:mrazavi/openvas`

* `sudo apt-get install openvas9`

* `sudo greenbone-nvt-sync`

* `sudo greenbone-scapdata-sync`

* `sudo greenbone-certdata-sync`

* `sudo service openvas-scanner restart`

* `sudo service openvas-manager restart`

* `sudo openvasmd --rebuild --progress`

To check the status of the installation follow the instructions here: http://www.openvas.org/setup-and-start.html

##### Metasploit installation
To install Metasploit, you have to prompt:

* `sudo add-apt-repository -y ppa:webupd8team/java`

* `sudo apt-get install metasploit-framework`

## *Enjoy RED BOX !!!*