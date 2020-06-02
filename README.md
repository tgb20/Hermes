# Hermes 
* Code the Tello Edu drone with Scratch blocks
* Remote control with mouse or keyboard
* Recognize AruCo markers with OpenCV

## Installation


## Coding

Control the drone with Scratch blocks.

## Keyboard

Use the keyboard to control the drone by selecting the keyboard tab in the sidebar.

![Keyboard Controls](/public/media/keyboard_controls.png?raw=true "Keyboard Controls")

W = Forward, A = Left, S = Back, D = Right

Up Arrow = Up, Left Arrow = Yaw left, Down Arrow = down, Right arrow = Yaw Right

## Mouse Control

Similar control of the drone is possible using the mouse.

## Video

Hermes connects to the video stream from the drone. Select the fullscreen option if you like. Drone remote controls also work there.

Recognition of AruCo markers is possible. Marker labels can be configured with optional names.

## Development

Hermes is a cross-platform app built with Electron. 

Dependecies include this Tello node.js interface:
https://github.com/AlexanderGranhof/tello-drone

and a JavaScript port of the ArUco library:
https://github.com/jcmellado/js-aruco

To get started with development, clone this repository from Github. 

Install node dependencies:
```
npm install
```

Start the app:
```
npm start
```

### Build Instructions

Apple ID credentials go in a .env file in project root
```
APPLEID=XXXXX
APPLEIDPASS=XXXXX
```

To build the app:
```
npm run dist
```

Debugging the app on osX:
```
lldb /path/to/Hermes.app
run --remote-debugging-port=8315
```
