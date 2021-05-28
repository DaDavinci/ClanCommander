# RuneScape 3 - ClanCommander
ClanCommander is a Utility Tool to add Features to Clans in RuneScape 3. It features OCR and Pattern Recognition Classifiactions to handle the interfacing with the NXT Client. This is basically undetectable once you add some ML Artifical Intelligence into the mix... Just so you know!

# Progress - Checklist
Current status on project features and implementation, uses images to display colors...<br>
![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) = NO Progress<br>
![#ffd700](https://via.placeholder.com/15/ffd700/000000?text=+) = in Development<br>
![#00ff7f](https://via.placeholder.com/15/00ff7f/000000?text=+) = Fully Implemented<br>

## @TODO:
1. ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Create a Class called `ConfigFiles` that handles the data in `AnyConfig.json` files in project root.
2. ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Change Screen Capturing output from a `<video>` element to `<canvas>` so `Tessaract.js` can interact with the feed.
3. ![#00ff7f](https://via.placeholder.com/15/00ff7f/000000?text=+) Fix local URL's to the newly structured src folder.
4. ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Make sure to try out live ocr with `tessaract-video` on github.
5. ![#ffd700](https://via.placeholder.com/15/ffd700/000000?text=+) Add `ml5.js` library and add Robot functionality.
6. ![#ffd700](https://via.placeholder.com/15/ffd700/000000?text=+) `Refactor` The code to be efficient with typescript.
7. ![#ffd700](https://via.placeholder.com/15/ffd700/000000?text=+) Add build scripts for Linux / Windows 10 and maybe MacOS

## Application Features & User Interface
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Fix `.ts` files not being executed withing electron
- ![#ffd700](https://via.placeholder.com/15/ffd700/000000?text=+) Create HTTP EndPoints for Console and Capturer
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Convert Variables to take default values from `*Config.json` files
- ![#ffd700](https://via.placeholder.com/15/ffd700/000000?text=+) Fix Main method `getConfig()` to return JSON files as Objects
- ![#ffd700](https://via.placeholder.com/15/ffd700/000000?text=+) Change video stream to be visible in a `<canvas></canvas>` DOM Element
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Add Loading animation when transitioning to other page or when starting ClanCommander
- ![#00ff7f](https://via.placeholder.com/15/00ff7f/000000?text=+) Fix DOM using remote Assets, use local assets only...

## Macro's:
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Scripting / Recording
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Account Sessions & Creation
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Event Listeners
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Automated Client Updates
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Automated Sessions
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Realtime Client Detection
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Realtime Game Update Detection
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Realtime UI Image Recognition with Screenshots & Pixel Detection
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Realtime Optical Charachter Recognition with Tessaract.js
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Realtime Object Recognition with OpenCV

## Clan Chat & Management Tools
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Discord (API) Intergration
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Chat Event Listeners
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Chat Management Tools
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Chat Games
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Chat Commands w/ Ranks & Permissions

## Clan Website & Management Tools
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Community Homepage
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Community Forums
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Community Player List
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Community Staff Team List
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Community Calendar & Events
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Community Rules / Recruiting & Ranks
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Development API & Control Panel

## Client & Macro Development Tools
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Client Automation
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Client Automation Configuration Tools
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Client & Macro Debugging Console
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) HTTP API Proxy Interface at http://localhost:8081/[Object]/[Function]?[Arguments]
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) HTTP API at api/v[API Version]/[Object]/[Get | Set]/[Property]

## Macro Scripting & API's
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Automatic Login on Crash or Start (RuneScape Session)
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) NewPlayer API
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Automatic Chat Event Listeners
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) EventListener API
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) Automatic Client Restart on Update or Login Failures
- ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) GameUpdates API
