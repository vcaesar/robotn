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
if is_64b:
    ffi.cdef("typedef long GoInt;\n")
else:
    ffi.cdef("typedef int GoInt;\n")

ffi.cdef("""
    typedef struct {
		GoInt x;
		GoInt y;
	} GoRInt;

	typedef struct {
		char* arr;
		char* err;
	} GoStr;

	char* GetVersion();
	void Sleep(GoInt tm);
	void MSleep(double tm);

	char* GetPixelColor(GoInt x, GoInt y);
	char* GetMouseColor();
    GoRInt GetScreenSize();
	GoRInt GetScaleSize();

    void MoveMose(GoInt x, GoInt y);
	void DargMose(GoInt x, GoInt y, char* btn);
	void MoveSmooth(GoInt x, GoInt y);
	GoRInt GetMousePos();
	void Click(char* btn, bool double_c);
	void MoseToggle(char* key, char* btn);
	void Scroll(GoInt x, GoInt y);

    char* KeyTap(char* key, char* vals);
    char* KeyToggle(char* key, char* vals);
    void TypeStr(char* str, double args);
	GoStr ReadAll();
    void WriteAll(char* str);
	void PasteStr(char* str);

	bool AddEvent(char* p0);
	void StopEvent();
	bool AddEvents(char* p0, char* p1);
	void End();
	bool AddMouse(char* p0, GoInt p1, GoInt p2);
	bool AddMousePos(GoInt p0, GoInt p1);

    GoStr FindIds(char* name);
	char* ActivePID(GoInt pid);
	char* ActiveName(char* name);
""")

lib = ffi.dlopen("../robotgo")


def ch(s):
    return s.encode('utf-8')


def getVersion():
    ver = lib.GetVersion()
    return ffi.string(ver)


def sleep(tm):
    lib.Sleep(tm)


def MSleep(tm):
    lib.MSleep(tm)

# /*
#       _______.  ______ .______       _______  _______ .__   __.
#     /       | /      ||   _  \     |   ____||   ____||  \ |  |
#    |   (----`|  ,----'|  |_)  |    |  |__   |  |__   |   \|  |
#     \   \    |  |     |      /     |   __|  |   __|  |  . `  |
# .----)   |   |  `----.|  |\  \----.|  |____ |  |____ |  |\   |
# |_______/     \______|| _| `._____||_______||_______||__| \__|
# */


def getPixelColor(x, y):
    color = lib.GetPixelColor(x, y)
    return ffi.string(color)


def getMouseColor():
    color = lib.GetMouseColor()
    return ffi.string(color)

# /*
# .___  ___.   ______    __    __       _______. _______
# |   \/   |  /  __  \  |  |  |  |     /       ||   ____|
# |  \  /  | |  |  |  | |  |  |  |    |   (----`|  |__
# |  |\/|  | |  |  |  | |  |  |  |     \   \    |   __|
# |  |  |  | |  `--'  | |  `--'  | .----)   |   |  |____
# |__|  |__|  \______/   \______/  |_______/    |_______|

# */

# /*
#  __  ___  ___________    ____ .______     ______        ___      .______       _______
# |  |/  / |   ____\   \  /   / |   _  \   /  __  \      /   \     |   _  \     |       \
# |  '  /  |  |__   \   \/   /  |  |_)  | |  |  |  |    /  ^  \    |  |_)  |    |  .--.  |
# |    <   |   __|   \_    _/   |   _  <  |  |  |  |   /  /_\  \   |      /     |  |  |  |
# |  .  \  |  |____    |  |     |  |_)  | |  `--'  |  /  _____  \  |  |\  \----.|  '--'  |
# |__|\__\ |_______|   |__|     |______/   \______/  /__/     \__\ | _| `._____||_______/

# */


def arr_add(args):
    arr = ""
    for i in range(len(args)):
        if i < len(args)-1:
            arr += args[i] + ","
        else:
            arr += args[i]

    return arr


# /*
# .______    __  .___________..___  ___.      ___      .______
# |   _  \  |  | |           ||   \/   |     /   \     |   _  \
# |  |_)  | |  | `---|  |----`|  \  /  |    /  ^  \    |  |_)  |
# |   _  <  |  |     |  |     |  |\/|  |   /  /_\  \   |   ___/
# |  |_)  | |  |     |  |     |  |  |  |  /  _____  \  |  |
# |______/  |__|     |__|     |__|  |__| /__/     \__\ | _|
# */


# /*
#  ___________    ____  _______ .__   __. .___________.
# |   ____\   \  /   / |   ____||  \ |  | |           |
# |  |__   \   \/   /  |  |__   |   \|  | `---|  |----`
# |   __|   \      /   |   __|  |  . `  |     |  |
# |  |____   \    /    |  |____ |  |\   |     |  |
# |_______|   \__/     |_______||__| \__|     |__|
# */

def addEvent(key):
    return lib.AddEvent(ch(key))


def end():
    lib.End()


def addEvents(key, *vals):
    arr = arr_add(vals)
    return lib.AddEvents(ch(key), ch(arr))


def end():
    lib.End()

# /*
# ____    __    ____  __  .__   __.  _______   ______   ____    __    ____
# \   \  /  \  /   / |  | |  \ |  | |       \ /  __  \  \   \  /  \  /   /
#  \   \/    \/   /  |  | |   \|  | |  .--.  |  |  |  |  \   \/    \/   /
#   \            /   |  | |  . `  | |  |  |  |  |  |  |   \            /
#    \    /\    /    |  | |  |\   | |  '--'  |  `--'  |    \    /\    /
#     \__/  \__/     |__| |__| \__| |_______/ \______/      \__/  \__/

# */


def activePID(pid):
    err = lib.ActivePID(pid)
    return ffi.string(err)


def activeName(name):
    err = lib.ActiveName(ch(name))
    return ffi.string(err)
