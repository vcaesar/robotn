// var ffi = require('ffi-napi');
var ffi = require('ffi')

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

var lib = ffi.Library("robotgo", {
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
    'TypeStr': ['void', ['string', 'double']],
    'ReadAll': [GoStr, []],
    'WriteAll': ['void', ['string']],
    'PasteStr': ['void', ['string']],
    //
    'FindIds': [GoStr, ['string']],
    'ActivePID': ['string', ['long']],
    'ActiveName': ['string', ['string']],
});

// module.exports = robotn

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