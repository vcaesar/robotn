# Robotn

<!--<img align="right" src="https://raw.githubusercontent.com/go-vgo/robotgo/master/logo.jpg">-->
<!--[![Build Status](https://travis-ci.org/go-vgo/robotgo.svg)](https://travis-ci.org/go-vgo/robotgo)
[![codecov](https://codecov.io/gh/go-vgo/robotgo/branch/master/graph/badge.svg)](https://codecov.io/gh/go-vgo/robotgo)-->
<!--<a href="https://circleci.com/gh/go-vgo/robotgo/tree/dev"><img src="https://img.shields.io/circleci/project/go-vgo/robotgo/dev.svg" alt="Build Status"></a>-->
[![Build Status](https://travis-ci.org/go-vgo/robotgo.svg)](https://travis-ci.org/go-vgo/robotgo)
[![CircleCI Status](https://circleci.com/gh/go-vgo/robotgo.svg?style=shield)](https://circleci.com/gh/go-vgo/robotgo)
![Appveyor](https://ci.appveyor.com/api/projects/status/github/go-vgo/robotgo?branch=master&svg=true)
[![Go Report Card](https://goreportcard.com/badge/github.com/go-vgo/robotgo)](https://goreportcard.com/report/github.com/go-vgo/robotgo)
[![GoDoc](https://godoc.org/github.com/go-vgo/robotgo?status.svg)](https://godoc.org/github.com/go-vgo/robotgo)
[![GitHub release](https://img.shields.io/github/release/go-vgo/robotgo.svg)](https://github.com/go-vgo/robotgo/releases/latest)
[![Join the chat at https://gitter.im/go-vgo/robotgo](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/go-vgo/robotgo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<!-- [![Release](https://github-release-version.herokuapp.com/github/go-vgo/robotgo/release.svg?style=flat)](https://github.com/go-vgo/robotgo/releases/latest) -->
<!-- <a href="https://github.com/go-vgo/robotgo/releases"><img src="https://img.shields.io/badge/%20version%20-%206.0.0%20-blue.svg?style=flat-square" alt="Releases"></a> -->

  >Golang Desktop Automation, binding other language. Control the mouse, keyboard, bitmap, read the screen,   Window Handle and global event listener.

Robotn supports Mac, Windows, and Linux(X11). Robot supports go, javascript, python and other.

[简体中文](https://github.com/vcaesar/robotn/blob/master/README_zh.md)

## Contents
- [Docs](#docs)
- [Requirements](#requirements)
- [Installation](#installation)
- [Update](#update)
- [Examples](#examples)
- [Authors](#authors)
- [Plans](#plans)
- [Donate](#donate)
- [Contributors](#contributors)
- [License](#license)

## Docs
  - [GoDoc](https://godoc.org/github.com/go-vgo/robotgo)
  - [API Docs](https://github.com/go-vgo/robotgo/blob/master/docs/doc.md) &nbsp;&nbsp;&nbsp;
  - [中文文档](https://github.com/go-vgo/robotgo/blob/master/docs/doc_zh.md)

## Requirements:

Now, there is no prebuild binary version available, Please make sure `Golang, GCC` is installed correctly before installing robotgo.

[Robotgo Requirements](https://github.com/go-vgo/robotgo#requirements)

# Install robotn
```
npm install robotn
```

Also, you can [Build from source code](#Build-from-source-code). The python's `pip install`, and the prebuilt binaries will be added in the future.

## [Examples:](https://github.com/go-vgo/robotgo/blob/master/examples)

#### [Mouse](https://github.com/go-vgo/robotgo/blob/master/examples/mouse/main.go)

```js
var robot = require('robotn');

robot.scroll(10, 10);
robot.mouseClick("left", true);
robot.moveSmooth(100, 200, 1.0, 100.0);
```

#### python

```py
import robot

robot.scroll(10, 10)
robot.mouseClick("left", true)
robot.moveSmooth(100, 200, 1.0, 100.0)
```

#### [Keyboard](https://github.com/go-vgo/robotgo/blob/master/examples/key/main.go)

```js
var robot = require('robotn');

robot.typeStr("测试")
robot.typeStr("山达尔星新星军团, galaxy. こんにちは世界.")
robot.sleep(1)

robot.keyTap("enter")

robot.writeAll("Test")
var text = robot.readAll()
console.log(text)
```

#### [Screen](https://github.com/go-vgo/robotgo/blob/master/examples/screen/main.go)

```js
var robot = require('robotn');

var pos = robot.getMousePos()
console.log("pos: ", pos)
var color = robot.getPixelColor(100, 200)
console.log("color---- ", color)
```

#### [Bitmap](https://github.com/go-vgo/robotgo/blob/master/examples/bitmap/main.go)

```js
var robot = require('robotn');

var bitmap = robot.captureScreen(10, 20, 30, 40)
console.log("...", bitmap)

var pos = robot.findBitmap(bitmap)
console.log("FindBitmap------ ", pos)

robot.saveBitmap(bitmap, "test.png")
// use `robot.freeBitmap(bit)` to free the bitmap
robot.freeBitmap(bitmap)
```

#### [Event](https://github.com/go-vgo/robotgo/blob/master/examples/event/main.go)

```js
var robot = require('robotn');

var keve = robot.addEvent("k");
if (keve) {
  console.log("you press... ", "k");
}

var s = robot.addEvents("q", "ctrl");
if (s) {
  console.log("you press... ", "mouse left button");
}
```

#### [Window](https://github.com/go-vgo/robotgo/blob/master/examples/window/main.go)

```js
var robot = require('robotn');

var fpid = robot.findIds("Google")
console.log("pids... ", fpid)

if (fpid.length > 0) {
  robot.activePID(fpid[0])

  robot.kill(fpid[0])
}

robot.activeName("chrome")

var isExist = robot.pidExists(100)
if (isExist) {
  console.log("pid exists is", isExist)

  robot.kill(100)
}

var abool = robot.showAlert("test", "robotgo")
if (abool == 0) {
  console.log("ok@@@ ", "ok")
}

var title = robot.getTitle()
console.log("title@@@ ", title)
```

## Build from source code:

### Install robotgo
```
go get -u github.com/go-vgo/robotgo
```

```
git clone https://github.com/vcaesar/robotn
```

### [Build-tools](https://github.com/vcaesar/gocs)
```
go get -v github.com/vcaesar/gocs
```

### Building

```
cd robotn
```

```
gocs -n robotgo
```

#### node:
##### Install npm modules
```
npm install
```

#### python
```
pip install cffi
```

## Authors
* [The author is vz](https://github.com/vcaesar)
* [Maintainers](https://github.com/orgs/go-vgo/people)
* [Contributors](https://github.com/go-vgo/robotgo/graphs/contributors)

## Plans
- Update Find an image on screen, read pixels from an image
- Update Window Handle
- Try support Android, maybe support IOS

## Contributors

- See [contributors page](https://github.com/go-vgo/robotgo/graphs/contributors) for full list of contributors.
- See [Contribution Guidelines](https://github.com/go-vgo/robotgo/blob/master/CONTRIBUTING.md).

## License

Robotgo is primarily distributed under the terms of both the MIT license and the Apache License (Version 2.0), with portions covered by various BSD-like licenses.

See [LICENSE-APACHE](http://www.apache.org/licenses/LICENSE-2.0), [LICENSE-MIT](https://github.com/go-vgo/robotgo/blob/master/LICENSE).
