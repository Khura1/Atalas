FULLSCREEN & STARTUP OF USER INTERFACE (WEBPAGE)

Create "browser.desktop" in .config and enter the following code

[Desktop Entry]
Type=Application
Name=Full-Screen Browser
Exec=lxterminal -l -e "/home/pi-name/startup.sh"

Create "startup.sh" in home directory and enter the following code

#!/bin/sh

# Run application
# echo Running application...

# Give the application time to start
echo Waiting to start...
sleep 10

## Open browser
echo Opening browser...
chromium-browser --disable-pinch --overscroll-history-navigation=0 --start-fullscreen http://localhost:1234/ &

echo Done.
bash

WEB-05

USE

npm init -y
npm i -D parcel
npm i -s vue@next

npm run build
-Delete code/lines from package.json

  "main": "index.js",
  "description": ""

npm start

FUNCTIONALITY

Clock - 

WEB-06

http://localhost:3000/bulletin

npm init -y
npm i -s express
npm i -s onoff
npm i -s cors

nodemon server.mjs