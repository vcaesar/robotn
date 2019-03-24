// var ffi = require('ffi-napi');
var ffi = require('ffi')

// var ref = require('ref');
var Struct = require("ref-struct");
// var ArrayType = require('ref-array');

var GoInt = Struct({
    x: "int",
    y: "int"
});


var lib = ffi.Library("robotgo", {
    'GetPixelColor': ['string', ['long', 'long']],
    'GetScreenSize': [GoInt, []],
    'GetScaleSize': [GoInt, []],
    'ActivePID': ['string', ['long']],
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