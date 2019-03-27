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


// module.exports = robotn
exports.getPixelColor = getPixelColor;