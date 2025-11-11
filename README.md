# NIPA-LEDA
Network IP Address LED Authenticator

The following repository represents the final proejct presented during the end of the Fall semester in CCRIs Applied Engineering and Energy Systems pathway.


## Overview
The Project involves a basic HTTP web server (meant to be run on a Rasbery PI 3 B+) that will utilize the IP address of the connecting client, and a Javascript hardware library in order to set voltage down the pins of the Rasberries board in order to flash different LED color codes that correspond to different authentication levels and states.

The process by which this occurs is by sitting idle, then upon a client connecting, the server will smaple all allowed IPs on file, if the clients IP is also found within the file, the client is allowed, if their address is not an allowed IP, then they are flagged by the server.

The flagging and allowing system is encoded in LED color flashes on the board.
By observing the color flashes, you can see in real time not only when a client connects, but also weather clients connecting are allowed or flagged.



### LED Color Codes
* Orange/White = Client Has Connected.
* Green = Clients IP address is on file and is allowed.
* Red = Clients IP address is not on file and is flagged.

### Setup Tutorial
* Go into the allowedIPs.txt folder and replace the address with the one you want (or add more lines for more than one allowed address)

### Configurations
* HTTP Port is defaulted to 3000
* allowedIPs.txt is defaulted to localhost (192.168.0.1), hit the Enter key and add additional addresses on different lines in order to include other IPs that are considered allowed. (a text file was decided on for whitelisting because The server should not just parse the first line, it should parse all lines seperately so additional whitelisted IPs can be added later if more than one is desired) Therefore, an infinite number of IPs are allowed due to the ability to add an aditional line to the server. 


### JS Libraries
* express
* path
* os 
* (GPIO?)