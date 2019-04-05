# // Copyright 2016 The go-vgo Project Developers. See the COPYRIGHT
# // file at the top-level directory of this distribution and at
# // https://github.com/go-vgo/robotgo/blob/master/LICENSE
# //
# // Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
# // http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
# // <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
# // option. This file may not be copied, modified, or distributed
# // except according to those terms.

from __future__ import print_function
import sys
from cffi import FFI

is_64b = sys.maxsize > 2**32

ffi = FFI()
if is_64b: ffi.cdef("typedef long GoInt;\n")
else:      ffi.cdef("typedef int GoInt;\n")

ffi.cdef("""
	char* GetPixelColor(GoInt x, GoInt y);
""")

lib = ffi.dlopen("../robotgo")