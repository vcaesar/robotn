local ffi = require("ffi")
local robot = ffi.load("../robotgo")

ffi.cdef([[
extern char* GetPixelColor(GoInt x, GoInt y);
]]);