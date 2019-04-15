# Robotn

[![Build Status](https://travis-ci.org/go-vgo/robotgo.svg)](https://travis-ci.org/go-vgo/robotgo)
[![CircleCI Status](https://circleci.com/gh/go-vgo/robotgo.svg?style=shield)](https://circleci.com/gh/go-vgo/robotgo)
![Appveyor](https://ci.appveyor.com/api/projects/status/github/go-vgo/robotgo?branch=master&svg=true)
[![Go Report Card](https://goreportcard.com/badge/github.com/go-vgo/robotgo)](https://goreportcard.com/report/github.com/go-vgo/robotgo)
[![GoDoc](https://godoc.org/github.com/go-vgo/robotgo?status.svg)](https://godoc.org/github.com/go-vgo/robotgo)
[![GitHub release](https://img.shields.io/github/release/go-vgo/robotgo.svg)](https://github.com/go-vgo/robotgo/releases/latest)
[![Join the chat at https://gitter.im/go-vgo/robotgo](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/go-vgo/robotgo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

  >Golang 跨平台自动化系统, binding 其他编程语言; 控制键盘鼠标位图和读取屏幕，窗口句柄以及全局事件监听

Robotn 支持 Mac, Windows, and Linux(X11). Robot 支持 go, javascript, python 和其他编程语言.

提 Issues 请到 [Github](https://github.com/go-vgo/robotgo), 便于统一管理和即时更新

QQ 群: 595877611

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
- [中文文档](https://github.com/go-vgo/robotgo/blob/master/docs/doc_zh.md)&nbsp;&nbsp;&nbsp;
- [English Docs](https://github.com/go-vgo/robotgo/blob/master/docs/doc.md)

## Requirements:
环境要求:

在安装 RobotGo 之前, 请确保 `Golang、GCC` 被正确安装

[Robotgo Requirements](https://github.com/go-vgo/robotgo#requirements)

You can [Build from source code](#Build-from-source-code). The prebuilt binaries will be added in the future.

# Install robotn
```
npm install robotn
```
or

```
sudo cnpm install robotn
```

```
npm --registry=http://r.cnpmjs.org install robotn
```

## [Examples:](https://github.com/go-vgo/robotgo/blob/master/examples)

#### [鼠标](https://github.com/go-vgo/robotgo/blob/master/examples/mouse/main.go)

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

#### [键盘](https://github.com/go-vgo/robotgo/blob/master/examples/key/main.go)

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

#### [屏幕](https://github.com/go-vgo/robotgo/blob/master/examples/screen/main.go)

```js
var robot = require('robotn');

var pos = robot.getMousePos()
console.log("pos: ", pos)
var color = robot.getPixelColor(100, 200)
console.log("color---- ", color)
```

#### [位图](https://github.com/go-vgo/robotgo/blob/master/examples/bitmap/main.go)

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

#### [事件](https://github.com/go-vgo/robotgo/blob/master/examples/event/main.go)

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
#### [窗口句柄](https://github.com/go-vgo/robotgo/blob/master/examples/window/main.go)

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

### [Build-tools](github.com/vcaesar/gocs)
```
go get -v github.com/vcaesar/gocs
```

### Building

```
gocs -n robotgo
```

#### node:
##### Install npm modules
```
npm install robotn
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
- 更新 Find an image on screen, read pixels from an image
- 更新 Window Handle
- 尝试支持 Android, 也许支持 IOS

## Donate

支持 robotgo, [buy me a coffee](https://github.com/go-vgo/buy-me-a-coffee).

#### Paypal

Donate money by [paypal](https://www.paypal.me/veni0/25) to my account [vzvway@gmail.com](vzvway@gmail.com)

## Contributors

- See [contributors page](https://github.com/go-vgo/robotgo/graphs/contributors) for full list of contributors.
- See [Contribution Guidelines](https://github.com/go-vgo/robotgo/blob/master/CONTRIBUTING.md).

## License

Robotgo is primarily distributed under the terms of both the MIT license and the Apache License (Version 2.0), with portions covered by various BSD-like licenses.

See [LICENSE-APACHE](http://www.apache.org/licenses/LICENSE-2.0), [LICENSE-MIT](https://github.com/go-vgo/robotgo/blob/master/LICENSE).
