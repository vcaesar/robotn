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
    'MoveSmooth': ['void', ['long', 'long']],
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
    'FindColor': [GoInt, ['string']],
    'FindColorCS': [GoInt, ["string", "long", "long", "long", "long"]],
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

function getPixelColor(x, y) {
    return lib.GetPixelColor(x, y);
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


//
function moveMouse(x, y) {
    lib.MoveMouse(x, y);
}

function dragMouse(x, y, btn = "left") {
    lib.DragMouse(x, y, btn);
}

function moveSmooth(x, y) {
    lib.moveSmooth(x, y);
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

//
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
    return lib.KeyToggle(str);
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

//
function getText(path) {
    var s = lib.GetText(path);
    if (s.err === "") {
        return s.arr;
    }

    return s.err;
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

//
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

//
function showAlert(title, msg) {
    return lib.ShowAlert(title, msg);
}

function getTitle(pid = -1) {
    var s = lib.GetTitle(pid);
    return s;
}

function getBounds(name) {
    var s = lib.GetBounds(name);
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
        return s.arr.split(" ");
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
exports.getScreenSize = getScreenSize;
exports.getScaleSize = getScaleSize;
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
//
exports.addEvent = addEvent;
exports.addEvents = addEvents;
exports.stopEvent = stopEvent;
exports.end = end;
//
exports.showAlert = showAlert;
exports.findIds = findIds;
exports.activePID = activePID;
exports.activeName = activeName;