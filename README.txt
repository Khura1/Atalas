==================================================
DIGITAL TOUCH SCREEN SETUP
==================================================

ADD THE CODE:

hdmi_cvt=1024 600 60 6 0 0 0
config_hdmi_boost=10
max_usb_current=1

MODIFY THE .config.txt FILE:

#framebuffer_width=1280 -> framebuffer_width=1024
#framebuffer_height=720 -> framebuffer_height=600

#hdmi_force_hotplug=1 -> hdmi_force_hotplug=1

#hdmi_group=1 -> hdmi_group=2
#hdmi_mode=1 -> hdmi_mode=87

#dtparam=spi=on -> dtparam=spi=on

==================================================
FULLSCREEN & STARTUP OF USER INTERFACE (WEBPAGE)
==================================================

CREATE "browser.desktop" IN .config AND ENTER THE CODE:

[Desktop Entry]
Type=Application
Name=Full-Screen Browser
Exec=lxterminal -l -e "/home/pi-name/startup.sh"

CREATE "startup.sh" IN HOME DIRECTORY AND ENTER THE CODE:

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

==================================================
WEB-05 (CLIENT SIDE)
==================================================

OPEN DIRECTORY CMD AND RUN:

npm init -y
npm i -D parcel
npm i -s vue@next

npm run build

Optional: If an error is encountered, remove the following lines from package.json:

  "main": "index.js",
  "description": ""

npm start

COMPONENTS BREAKDOWN:

App.vue - Core component encompassing components Clock, UserVR and Alas
Clock.vue - This component manages the clock (UI)
UserVR.vue - This component manages textual transcriptions and relevant operations (e.g. LED)
Alas.vue - This component manages the virtual companion (UI)
ListItem.vue -  This component manages the transcription list displayed in development mode (UI)

==================================================
WEB-06 (SERVER SIDE)
==================================================

OPEN DIRECTORY CMD AND RUN:

npm init -y
npm i -s express
npm i -s onoff
npm i -s cors

nodemon server.mjs

DATABASE BREAKDOWN:

messages.jsonl - Transcriptions are saved in the format {id,time,content}