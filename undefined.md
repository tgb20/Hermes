# Hermes

* Code the Tello Edu drone with Scratch blocks
* Remote control with mouse or keyboard
* Recognize AruCo markers with OpenCV
* This is a test

## Installation

## Coding

Control the drone with Scratch blocks.

## Keyboard

Use the keyboard to control the drone by selecting the keyboard tab in the sidebar.

![Keyboard Controls](https://github.com/tgb20/Hermes/tree/73646529f4a5ee07d36bc2ee06a4b75a9a4d5dd6/public/media/keyboard_controls.png?raw=true)

W = Forward, A = Left, S = Back, D = Right

Up Arrow = Up, Left Arrow = Yaw left, Down Arrow = down, Right arrow = Yaw Right

## Mouse Control

Similar control of the drone is possible using the mouse.

## Video

Hermes connects to the video stream from the drone. Select the fullscreen option if you like. Drone remote controls also work there.

Recognition of AruCo markers is possible. Marker labels can be configured with optional names.

## Development

Hermes is a cross-platform app built with Electron.

Dependecies include this Tello node.js interface: [https://github.com/AlexanderGranhof/tello-drone](https://github.com/AlexanderGranhof/tello-drone)

and a JavaScript port of the ArUco library: [https://github.com/jcmellado/js-aruco](https://github.com/jcmellado/js-aruco)

To get started with development, clone this repository from Github.

Install node dependencies:

```text
npm install
```

Start the app:

```text
npm start
```

### Build Instructions

Apple ID credentials go in a .env file in project root

```text
APPLEID=XXXXX
APPLEIDPASS=XXXXX
```

To build the app:

```text
npm run dist
```

Debugging the app on osX:

```text
lldb /path/to/Hermes.app
run --remote-debugging-port=8315
```

