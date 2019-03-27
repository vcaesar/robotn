// var ffi = require('ffi-napi');
var ffi = require('ffi');
const path = require('path');

// var ref = require('ref');
var Struct = require("ref-struct");
// var ArrayType = require('ref-array');

var GoInt = Struct({
    x: "int",
    y: "int"
});

var GoStr = Struct({
    arr: 'string',
    err: 'string'
});

const bin = path.join(__dirname, './robotgo');

var lib = ffi.Library(bin, {
    'GetPixelColor': ['string', ['long', 'long']],
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
    'KeyToggle': ['string', ['string']],
    'TypeStr': ['void', ['string', 'double']],
    'ReadAll': [GoStr, []],
    'WriteAll': ['void', ['string']],
    'PasteStr': ['void', ['string']],
    //
    'GetText': [GoStr, ['string']],
    'FindPic': [GoInt, ['string']],
    'GetImgSize': [GoInt, ['string']],
    //
    'AddEvent': ['bool', ['string']],
    'StopEvent': ['void', []],
    'AddEvents': ['bool', ['string', 'string']],
    'End': ['void', []],
    //
    'ShowAlert': ['int', ['string', 'string']],
    'FindIds': [GoStr, ['string']],
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

function click(btn, double = false) {
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

function keyToggle(str) {
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

// module.exports = robotn
exports.getPixelColor = getPixelColor;