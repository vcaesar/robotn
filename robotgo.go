// Copyright 2016 The go-vgo Project Developers. See the COPYRIGHT
// file at the top-level directory of this distribution and at
// https://github.com/go-vgo/robotgo/blob/master/LICENSE
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

package main

import "C"

import (
	"fmt"
	"strings"

	"github.com/go-vgo/robotgo"
)

func ch(str string) *C.char {
	return C.CString(str)
}

func str(ch *C.char) string {
	return C.GoString(ch)
}

func sf(err error) string {
	return fmt.Sprintf("%s", err)
}

func ech(err error) *C.char {
	return ch(sf(err))
}

func toStr(arr interface{}) string {
	return strings.Trim(fmt.Sprint(arr), "[]")
}

//export GetVersion
func GetVersion() *C.char {
	s := robotgo.GetVersion()
	return ch(s)
}

//export Sleep
func Sleep(tm int) {
	robotgo.Sleep(tm)
}

//export MSleep
func MSleep(tm float64) {
	robotgo.MicroSleep(tm)
}

/*
      _______.  ______ .______       _______  _______ .__   __.
    /       | /      ||   _  \     |   ____||   ____||  \ |  |
   |   (----`|  ,----'|  |_)  |    |  |__   |  |__   |   \|  |
    \   \    |  |     |      /     |   __|  |   __|  |  . `  |
.----)   |   |  `----.|  |\  \----.|  |____ |  |____ |  |\   |
|_______/     \______|| _| `._____||_______||_______||__| \__|
*/

//export GetPixelColor
func GetPixelColor(x, y int) *C.char {
	s := robotgo.GetPixelColor(x, y)
	return ch(s)
}

//export GetScreenSize
func GetScreenSize() (int, int) {
	return robotgo.GetScreenSize()
}

//export GetScaleSize
func GetScaleSize() (int, int) {
	return robotgo.GetScaleSize()
}

//export SaveCapture
func SaveCapture(path *C.char, x, y, w, h int) {
	robotgo.SaveCapture(str(path), x, y, w, h)
}

/*
.___  ___.   ______    __    __       _______. _______
|   \/   |  /  __  \  |  |  |  |     /       ||   ____|
|  \  /  | |  |  |  | |  |  |  |    |   (----`|  |__
|  |\/|  | |  |  |  | |  |  |  |     \   \    |   __|
|  |  |  | |  `--'  | |  `--'  | .----)   |   |  |____
|__|  |__|  \______/   \______/  |_______/    |_______|

*/

//export MoveMouse
func MoveMouse(x, y int) {
	robotgo.Move(x, y)
}

//export DragMouse
func DragMouse(x, y int, args *C.char) {
	robotgo.Drag(x, y, str(args))
}

//export MoveSmooth
func MoveSmooth(x, y int) bool {
	return robotgo.MoveSmooth(x, y)
}

//export GetMousePos
func GetMousePos() (int, int) {
	return robotgo.GetMousePos()
}

//export Click
func Click(btn *C.char, double bool) {
	robotgo.Click(str(btn), double)
}

//export MouseToggle
func MouseToggle(key, btn *C.char) {
	robotgo.MouseToggle(str(key), str(btn))
}

//export Scroll
func Scroll(x, y int) {
	robotgo.Scroll(x, y)
}

/*
 __  ___  ___________    ____ .______     ______        ___      .______       _______
|  |/  / |   ____\   \  /   / |   _  \   /  __  \      /   \     |   _  \     |       \
|  '  /  |  |__   \   \/   /  |  |_)  | |  |  |  |    /  ^  \    |  |_)  |    |  .--.  |
|    <   |   __|   \_    _/   |   _  <  |  |  |  |   /  /_\  \   |      /     |  |  |  |
|  .  \  |  |____    |  |     |  |_)  | |  `--'  |  /  _____  \  |  |\  \----.|  '--'  |
|__|\__\ |_______|   |__|     |______/   \______/  /__/     \__\ | _| `._____||_______/

*/

//export KeyTap
func KeyTap(key *C.char, vals *C.char) *C.char {
	arr := strings.Split(str(vals), ",")
	s := robotgo.KeyTap(str(key), arr)
	return ch(s)
}

//export KeyToggle
func KeyToggle(key *C.char, vals *C.char) *C.char {
	arr := strings.Split(str(vals), ",")
	s := robotgo.KeyToggle(str(key), arr...)
	return ch(s)
}

//export TypeStr
func TypeStr(c *C.char, args float64) {
	robotgo.TypeStr(str(c), args)
}

//export ReadAll
func ReadAll() (*C.char, *C.char) {
	s, err := robotgo.ReadAll()
	return ch(s), ech(err)
}

//export WriteAll
func WriteAll(text *C.char) {
	robotgo.WriteAll(str(text))
}

//export PasteStr
func PasteStr(text *C.char) {
	robotgo.PasteStr(str(text))
}

/*
.______    __  .___________..___  ___.      ___      .______
|   _  \  |  | |           ||   \/   |     /   \     |   _  \
|  |_)  | |  | `---|  |----`|  \  /  |    /  ^  \    |  |_)  |
|   _  <  |  |     |  |     |  |\/|  |   /  /_\  \   |   ___/
|  |_)  | |  |     |  |     |  |  |  |  /  _____  \  |  |
|______/  |__|     |__|     |__|  |__| /__/     \__\ | _|
*/

func toBitmap(imgBuf *uint8, width, height, bytewidth int,
	bitsPixel, bytesPerPixel uint8) robotgo.Bitmap {

	return robotgo.Bitmap{
		ImgBuf:        imgBuf,
		Width:         width,
		Height:        height,
		Bytewidth:     bytewidth,
		BitsPixel:     bitsPixel,
		BytesPerPixel: bytesPerPixel,
	}
}

//export GetText
func GetText(path *C.char) (*C.char, *C.char) {
	s, err := robotgo.GetText(str(path))
	return ch(s), ech(err)
}

//export OpenBitmapArgs
func OpenBitmapArgs(path *C.char) (*uint8, int, int, int,
	uint8, uint8) {
	cbit := robotgo.OpenBitmap(str(path))
	gbit := robotgo.ToBitmap(cbit)

	return gbit.ImgBuf, gbit.Width, gbit.Height, gbit.Bytewidth,
		gbit.BitsPixel, gbit.BytesPerPixel
}

//export FindBitmapArgs
func FindBitmapArgs(imgBuf *uint8, width, height, bytewidth int,
	bitsPixel, bytesPerPixel uint8) (int, int) {
	gbit := toBitmap(imgBuf, width, height, bytewidth, bitsPixel, bytesPerPixel)
	cbit := robotgo.ToCBitmap(gbit)

	return robotgo.FindBitmap(cbit)
}

//export SaveBitmapArgs
func SaveBitmapArgs(path *C.char, imgBuf *uint8, width, height, bytewidth int,
	bitsPixel, bytesPerPixel uint8) *C.char {

	gbit := toBitmap(imgBuf, width, height, bytewidth, bitsPixel, bytesPerPixel)
	cbit := robotgo.ToCBitmap(gbit)

	s := robotgo.SaveBitmap(cbit, str(path))
	return ch(s)
}

//export ToStrBitmap
func ToStrBitmap(imgBuf *uint8, width, height, bytewidth int,
	bitsPixel, bytesPerPixel uint8) *C.char {

	gbit := toBitmap(imgBuf, width, height, bytewidth, bitsPixel, bytesPerPixel)
	cbit := robotgo.ToCBitmap(gbit)
	b := robotgo.TostringBitmap(cbit)

	return ch(b)
}

//export BitmapFromStr
func BitmapFromStr(bit *C.char) (*uint8, int, int, int,
	uint8, uint8) {
	cbit := robotgo.BitmapFromStr(str(bit))
	gbit := robotgo.ToBitmap(cbit)

	return gbit.ImgBuf, gbit.Width, gbit.Height, gbit.Bytewidth,
		gbit.BitsPixel, gbit.BytesPerPixel
}

//export CaptureBitmapStr
func CaptureBitmapStr(x, y, w, h int) *C.char {
	bit := robotgo.CaptureScreen(x, y, w, h)
	str := robotgo.TostringBitmap(bit)

	return ch(str)
}

//export OpenBitmapStr
func OpenBitmapStr(path *C.char) *C.char {
	bit := robotgo.OpenBitmap(str(path))
	s := robotgo.TostringBitmap(bit)

	return ch(s)
}

//export SaveBitmapStr
func SaveBitmapStr(bit, path *C.char) *C.char {
	bitmap := robotgo.BitmapStr(str(bit))
	err := robotgo.SaveBitmap(bitmap, str(path))

	return ch(err)
}

//export FindBitmapStr
func FindBitmapStr(c *C.char) (int, int) {
	bit := robotgo.BitmapStr(str(c))
	return robotgo.FindBitmap(bit)
}

//export FindPic
func FindPic(path *C.char) (int, int) {
	return robotgo.FindPic(str(path))
}

//export GetImgSize
func GetImgSize(path *C.char) (int, int) {
	return robotgo.GetImgSize(str(path))
}

//export FindColor
func FindColor(color uint32) (int, int) {
	x, y := robotgo.FindColor(robotgo.UintToHex(color))

	return x, y
}

//export FindColorCS
func FindColorCS(color uint32, x, y, w, h int) (int, int) {
	fx, fy := robotgo.FindColorCS(robotgo.UintToHex(color), x, y, w, h)

	return fx, fy
}

/*
 ___________    ____  _______ .__   __. .___________.
|   ____\   \  /   / |   ____||  \ |  | |           |
|  |__   \   \/   /  |  |__   |   \|  | `---|  |----`
|   __|   \      /   |   __|  |  . `  |     |  |
|  |____   \    /    |  |____ |  |\   |     |  |
|_______|   \__/     |_______||__| \__|     |__|
*/

//export AddEvent
func AddEvent(key *C.char) bool {
	return robotgo.AddEvent(str(key))
}

//export StopEvent
func StopEvent() {
	robotgo.StopEvent()
}

//export AddEvents
func AddEvents(key, args *C.char) bool {
	arr := strings.Split(str(args), ",")
	return robotgo.AddEvents(str(key), arr...)
}

//export End
func End() {
	robotgo.End()
}

//export AddMouse
func AddMouse(btn *C.char, x, y int16) bool {
	if x == -1 {
		b := robotgo.AddMouse(str(btn))
		return b
	}

	b := robotgo.AddMouse(str(btn), x, y)
	return b
}

//export AddMousePos
func AddMousePos(x, y int16) bool {
	b := robotgo.AddMousePos(x, y)

	return b
}

/*
____    __    ____  __  .__   __.  _______   ______   ____    __    ____
\   \  /  \  /   / |  | |  \ |  | |       \ /  __  \  \   \  /  \  /   /
 \   \/    \/   /  |  | |   \|  | |  .--.  |  |  |  |  \   \/    \/   /
  \            /   |  | |  . `  | |  |  |  |  |  |  |   \            /
   \    /\    /    |  | |  |\   | |  '--'  |  `--'  |    \    /\    /
    \__/  \__/     |__| |__| \__| |_______/ \______/      \__/  \__/

*/

//export ShowAlert
func ShowAlert(title, msg *C.char) int {
	return robotgo.ShowAlert(str(title), str(msg))
}

//export GetTitle
func GetTitle(pid int32) *C.char {
	if pid == -1 {
		title := robotgo.GetTitle()
		return ch(title)
	}

	title := robotgo.GetTitle(pid)
	return ch(title)
}

//export GetBounds
func GetBounds(pid int32) (int, int, int, int) {
	return robotgo.GetBounds(pid)
}

//export PidExists
func PidExists(pid int32) (bool, *C.char) {
	b, err := robotgo.PidExists(pid)
	if err != nil {
		return b, ech(err)
	}

	return b, ch("")
}

//export FindIds
func FindIds(name *C.char) (*C.char, *C.char) {
	arr, err := robotgo.FindIds(str(name))
	sb := toStr(arr)

	if err != nil {
		return ch(sb), ech(err)
	}

	return ch(sb), ch("")
}

//export FindName
func FindName(pid int32) (*C.char, *C.char) {
	sb, err := robotgo.FindName(pid)

	if err != nil {
		return ch(sb), ech(err)
	}

	return ch(sb), ch("")
}

//export FindNames
func FindNames() (*C.char, *C.char) {
	arr, err := robotgo.FindNames()
	sb := toStr(arr)

	if err != nil {
		return ch(sb), ech(err)
	}

	return ch(sb), ch("")
}

//export ActivePID
func ActivePID(pid int32) (c *C.char) {
	err := robotgo.ActivePID(pid)
	if err != nil {
		c = ech(err)
	}

	return
}

//export ActiveName
func ActiveName(name *C.char) (c *C.char) {
	err := robotgo.ActiveName(str(name))
	if err != nil {
		c = ech(err)
	}

	return
}

//export Kill
func Kill(pid int32) *C.char {
	err := robotgo.Kill(pid)
	if err != nil {
		return ech(err)
	}

	return ch("")
}

func main() {} // Required but ignored
