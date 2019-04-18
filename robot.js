// Copyright 2016 The go-vgo Project Developers. See the COPYRIGHT
// file at the top-level directory of this distribution and at
// https://github.com/go-vgo/robotgo/blob/master/LICENSE
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

// var ffi = require('ffi-napi');
var ffi = require('ffi');
const path = require('path');

var ref = require('ref');
var Struct = require("ref-struct");
// var ArrayType = require('ref-array');

var long = ref.types.long;

var GoInt = Struct({
    x: "int",
    y: "int"
});

var GoStr = Struct({
    arr: 'string',
    err: 'string'
});

var GoBool = Struct({
    b: 'bool',
    err: 'string'
})

var GoBoud = Struct({
    x: 'long',
    y: 'long',
    w: 'long',
    h: 'long'
})

var bitmap = Struct({
    imgBuf: long,
    width: 'long',
    height: 'long',
    bytewidth: 'long',
    bitsPixel: 'uint8',
    bytesPerPixel: 'uint8'
})

const bin = path.join(__dirname, './robotgo');

var lib = ffi.Library(bin, {
    'GetVersion': ['string', []],
    'Sleep': ['void', ['long']],
    'MSleep': ['void', ['double']],
    //
    'GetPixelColor': ['string', ['long', 'long']],
    'GetMouseColor': ['string', []],
    'GetScreenSize': [GoInt, []],
    'GetScaleSize': [GoInt, []],
    //
    'MoveMouse': ['void', ['long', 'long']],
    'DragMouse': ['void', ['long', 'long', "string"]],
    'MoveSmooth': ['void', ['long', 'long', 'double', 'double']],
    'GetMousePos': [GoInt, []],
    'Click': ['void', ['string', 'bool']],
    'MouseToggle': ['void', ['string', 'string']],
    'Scroll': ['void', ['long', 'long']],
    //
    'KeyTap': ['string', ['string', 'string']],
    'KeyToggle': ['string', ['string', 'string']],
    'TypeStr': ['void', ['string', 'double']],
    'ReadAll': [GoStr, []],
    'WriteAll': ['void', ['string']],
    'PasteStr': ['void', ['string']],
    //
    'GetText': [GoStr, ['string']],
    'FindPic': [GoInt, ['string']],
    'GetImgSize': [GoInt, ['string']],
    'CaptureScreen': [bitmap, ["long", "long", "long", "long"]],
    //
    'SaveCapture': ['void', ["string", "long", "long", "long", "long"]],
    'FreeBitmap': ['void', [long, 'long', "long", "long", 'uint8', 'uint8']],
    'SaveBitmapArgs': ["string", ['string', long,
        'long', "long", "long", 'uint8', 'uint8'
    ]],
    'OpenBitmapArgs': [bitmap, ['string']],
    'FindBitmapArgs': [GoInt, [long,
        'long', "long", "long", 'uint8', 'uint8'
    ]],
    'ToStrBitmap': ['string', [long,
        'long', "long", "long", 'uint8', 'uint8'
    ]],
    'BitmapFromStr': [bitmap, ["string"]],
    //
    'CaptureBitmapStr': ['string', ["long", "long", "long", "long"]],
    'OpenBitmapStr': ['string', ['string']],
    'SaveBitmapStr': ["string", ['string', 'string']],
    'FindBitmapStr': [GoInt, ["string"]],
    'FindColor': [GoInt, ['uint32']],
    'FindColorCS': [GoInt, ["uint32", "long", "long", "long", "long"]],
    //
    'AddEvent': ['bool', ['string']],
    'StopEvent': ['void', []],
    'AddEvents': ['bool', ['string', 'string']],
    'End': ['void', []],
    'AddMouse': ['bool', ["string", "long", "long"]],
    'AddMousePos': ['bool', ["long", "long"]],
    //
    'ShowAlert': ['int', ['string', 'string']],
    'GetTitle': ['string', ["long"]],
    'GetBounds': [GoBoud, ['long']],
    'PidExists': [GoBool, ['long']],
    'FindIds': [GoStr, ['string']],
    'FindName': [GoStr, ['long']],
    'FindNames': [GoStr, []],
    'Kill': ['string', ['long']],
    'ActivePID': ['string', ['long']],
    'ActiveName': ['string', ['string']],
});

function sleep(tm) {
    lib.Sleep(tm);
}

function MSleep(tm) {
    lib.MSleep(tm);
}

function getVersion() {
    return lib.GetVersion();
}

/*
      _______.  ______ .______       _______  _______ .__   __.
    /       | /      ||   _  \     |   ____||   ____||  \ |  |
   |   (----`|  ,----'|  |_)  |    |  |__   |  |__   |   \|  |
    \   \    |  |     |      /     |   __|  |   __|  |  . `  |
.----)   |   |  `----.|  |\  \----.|  |____ |  |____ |  |\   |
|_______/     \______|| _| `._____||_______||_______||__| \__|
*/

function getPixelColor(x, y) {
    return lib.GetPixelColor(x, y);
}

function getMouseColor() {
    return lib.GetMouseColor();
}

function getScreenSize() {
    var s = lib.GetScreenSize();
    return {
        width: s.x,
        height: s.y
    };
}

function getScaleSize() {
    var s = lib.GetScaleSize();
    return {
        width: s.x,
        height: s.y
    };
}

function saveCapture(path, x = -1, y = -1, w = -1, h = -1) {
    lib.SaveCapture(path, x, y, w, h);
}

/*
.___  ___.   ______    __    __       _______. _______
|   \/   |  /  __  \  |  |  |  |     /       ||   ____|
|  \  /  | |  |  |  | |  |  |  |    |   (----`|  |__
|  |\/|  | |  |  |  | |  |  |  |     \   \    |   __|
|  |  |  | |  `--'  | |  `--'  | .----)   |   |  |____
|__|  |__|  \______/   \______/  |_______/    |_______|

*/

function moveMouse(x, y) {
    lib.MoveMouse(x, y);
}

function dragMouse(x, y, btn = "left") {
    lib.DragMouse(x, y, btn);
}

function moveSmooth(x, y, low = 1.0, high = 3.0) {
    lib.moveSmooth(x, y, low, high);
}

function getMousePos() {
    var s = lib.GetMousePos();
    return {
        x: s.x,
        y: s.y
    };
}

function click(btn = "left", double = false) {
    lib.Click(btn, double);
}

function mouseToggle(key, btn) {
    lib.MouseToggle(key, btn);
}

function scroll(x, y) {
    lib.Scroll(x, y);
}

/*
 __  ___  ___________    ____ .______     ______        ___      .______       _______
|  |/  / |   ____\   \  /   / |   _  \   /  __  \      /   \     |   _  \     |       \
|  '  /  |  |__   \   \/   /  |  |_)  | |  |  |  |    /  ^  \    |  |_)  |    |  .--.  |
|    <   |   __|   \_    _/   |   _  <  |  |  |  |   /  /_\  \   |      /     |  |  |  |
|  .  \  |  |____    |  |     |  |_)  | |  `--'  |  /  _____  \  |  |\  \----.|  '--'  |
|__|\__\ |_______|   |__|     |______/   \______/  /__/     \__\ | _| `._____||_______/

*/

function arrAdd(args) {
    var arr = "";
    for (let i = 0; i < args.length; i++) {
        if (i < args.length - 1) {
            arr += args[i] + ",";
        } else {
            arr += args[i]
        }
    }

    return arr;
}

function keyTap(str, ...args) {
    var arr = arrAdd(args);
    return lib.KeyTap(str, arr);
}

function keyToggle(str, ...args) {
    var arr = arrAdd(args);
    return lib.KeyToggle(str, arr);
}

function typeStr(str, args = 3.0) {
    lib.TypeStr(str, args);
}

function readAll() {
    var s = lib.ReadAll();
    if (s.err === "") {
        return s.arr;
    }

    return s.err;
}

function writeAll(str) {
    lib.WriteAll(str);
}

function pasteStr(str) {
    lib.PasteStr(str);
}

/*
.______    __  .___________..___  ___.      ___      .______
|   _  \  |  | |           ||   \/   |     /   \     |   _  \
|  |_)  | |  | `---|  |----`|  \  /  |    /  ^  \    |  |_)  |
|   _  <  |  |     |  |     |  |\/|  |   /  /_\  \   |   ___/
|  |_)  | |  |     |  |     |  |  |  |  /  _____  \  |  |
|______/  |__|     |__|     |__|  |__| /__/     \__\ | _|
*/

function getText(path) {
    var s = lib.GetText(path);
    if (s.err === "") {
        return s.arr;
    }

    return s.err;
}

function captureScreen(x = -1, y = -1, w = -1, h = -1) {
    var bit = lib.CaptureScreen(x, y, w, h);

    return toObj(bit);
}

function toStrBitmap(bit) {
    return lib.toStrBitmap(bit.imgBuf,
        bit.width,
        bit.height,
        bit.bytewidth,
        bit.bitsPixel,
        bit.bytesPerPixel);
}

function bitmapFromStr(str) {
    var bit = lib.BitmapFromStr(str);
    return toObj(bit);
}

function captureBitmapStr(x, y, w, h) {
    return lib.CaptureBitmapStr(x, y, w, h);
}

function openBitmapStr(path) {
    return lib.OpenBitmapStr(path);
}

function findBitmapStr(str) {
    var s = lib.FindBitmapStr(str);
    return {
        x: s.x,
        y: s.y
    };
}

function saveBitmapStr(str, path) {
    return lib.SaveBitmapStr(str, path);
}

function toObj(bit) {
    return {
        imgBuf: bit.imgBuf,
        width: bit.width,
        height: bit.height,
        bytewidth: bit.bytewidth,
        bitsPixel: bit.bitsPixel,
        bytesPerPixel: bit.bytesPerPixel
    }
}

function freeBitmap(bit) {
    lib.FreeBitmap(
        bit.imgBuf,
        bit.width,
        bit.height,
        bit.bytewidth,
        bit.bitsPixel,
        bit.bytesPerPixel);
}

function openBitmap(path) {
    var bit = lib.OpenBitmapArgs(path);
    return toObj(bit);
}

function saveBitmap(bit, path) {
    return lib.SaveBitmapArgs(path,
        bit.imgBuf,
        bit.width,
        bit.height,
        bit.bytewidth,
        bit.bitsPixel,
        bit.bytesPerPixel);
}


function findBitmap(bit) {
    var s = lib.FindBitmapArgs(
        bit.imgBuf,
        bit.width,
        bit.height,
        bit.bytewidth,
        bit.bitsPixel,
        bit.bytesPerPixel
    );

    return {
        x: s.x,
        y: s.y
    };
}

function findColor(color) {
    var s = lib.FindColor(color);
    return {
        x: s.x,
        y: s.y
    };
}

function findColorCS(color, x, y, w, h) {
    var s = lib.FindColorCS(color, x, y, w, h);
    return {
        x: s.x,
        y: s.y
    };
}


function findPic(path) {
    var s = lib.FindPic(path);

    return {
        x: s.x,
        y: s.y
    };
}

function getImgSize(path) {
    var s = lib.GetImgSize(path);

    return {
        width: s.x,
        height: s.y
    };
}

/*
 ___________    ____  _______ .__   __. .___________.
|   ____\   \  /   / |   ____||  \ |  | |           |
|  |__   \   \/   /  |  |__   |   \|  | `---|  |----`
|   __|   \      /   |   __|  |  . `  |     |  |
|  |____   \    /    |  |____ |  |\   |     |  |
|_______|   \__/     |_______||__| \__|     |__|
*/

function addEvent(key) {
    return lib.addEvent(key);
}

function stopEvent() {
    lib.StopEvent();
}

function addEvents(str, ...args) {
    var arr = arrAdd(args);

    return lib.AddEvents(str, arr);
}

function end() {
    lib.End();
}

function addMouse(btn, x = -1, y = -1) {
    return lib.AddMouse(btn, x, y);
}

function addMousePos(x, y) {
    return lib.AddMousePos(x, y);
}

/*
____    __    ____  __  .__   __.  _______   ______   ____    __    ____
\   \  /  \  /   / |  | |  \ |  | |       \ /  __  \  \   \  /  \  /   /
 \   \/    \/   /  |  | |   \|  | |  .--.  |  |  |  |  \   \/    \/   /
  \            /   |  | |  . `  | |  |  |  |  |  |  |   \            /
   \    /\    /    |  | |  |\   | |  '--'  |  `--'  |    \    /\    /
    \__/  \__/     |__| |__| \__| |_______/ \______/      \__/  \__/

*/

function showAlert(title, msg) {
    return lib.ShowAlert(title, msg);
}

function getTitle(pid = -1) {
    var s = lib.GetTitle(pid);
    return s;
}

function getBounds(pid) {
    var s = lib.GetBounds(pid);
    return {
        x: s.x,
        y: s.y,
        w: s.w,
        h: s.h
    };
}

function pidExists(pid) {
    var s = lib.PidExists(pid);
    if (s.err === "") {
        return s.b;
    }

    return s.err;
}

function findIds(name) {
    var s = lib.FindIds(name);
    if (s.err === "") {
        return s.arr.split(" ");
    }

    return s.err;
}

function findName(pid) {
    var s = lib.FindName(pid);
    if (s.err === "") {
        return s.arr;
    }

    return s.err;
}

function findNames() {
    var s = lib.FindNames();
    if (s.err === "") {
        return s.arr.split(" ");
    }

    return s.err;
}

function activePID(pid) {
    return lib.ActivePID(pid);
}

function activeName(name) {
    return lib.ActiveName(name);
}

function kill(pid) {
    return lib.Kill(pid);
}

// module.exports = robotn
exports.getVersion = getVersion;
exports.sleep = sleep;
exports.MSleep = MSleep;
//
exports.getPixelColor = getPixelColor;
exports.getMouseColor = getMouseColor;
exports.getScreenSize = getScreenSize;
exports.getScaleSize = getScaleSize;
exports.saveCapture = saveCapture;
//
exports.moveMouse = moveMouse;
exports.dragMouse = dragMouse;
exports.moveSmooth = moveSmooth;
exports.getMousePos = getMousePos;
exports.click = click;
exports.mouseToggle = mouseToggle;
exports.scroll = scroll;
//
exports.keyTap = keyTap;
exports.keyToggle = keyToggle;
exports.typeStr = typeStr;
exports.readAll = readAll;
exports.writeAll = writeAll;
exports.pasteStr = pasteStr;
//
exports.getText = getText;
exports.findPic = findPic;
exports.getImgSize = getImgSize;

exports.captureScreen = captureScreen;
exports.freeBitmap = freeBitmap;
exports.openBitmap = openBitmap;
exports.saveBitmap = saveBitmap;
exports.findBitmap = findBitmap;
exports.findColor = findColor;
exports.findColorCS = findColorCS;

exports.toStrBitmap = toStrBitmap;
exports.bitmapFromStr = bitmapFromStr;
exports.captureBitmapStr = captureBitmapStr;
exports.openBitmapStr = openBitmapStr;
exports.findBitmapStr = findBitmapStr;
exports.saveBitmapStr = saveBitmapStr;
//
exports.addEvent = addEvent;
exports.stopEvent = stopEvent;
exports.addEvents = addEvents;
exports.end = end;
exports.addMouse = addMouse;
exports.addMousePos = addMousePos;
//
exports.showAlert = showAlert;
exports.getTitle = getTitle;
exports.getBounds = getBounds;
exports.pidExists = pidExists;
exports.findIds = findIds;
exports.findName = findName;
exports.findNames = findNames;
exports.activePID = activePID;
exports.activeName = activeName;
exports.kill = kill;