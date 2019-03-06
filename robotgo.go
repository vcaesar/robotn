package main

import "C"

import (
	"fmt"

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

//export MoveMouse
func MoveMouse(x, y int) {
	robotgo.Move(x, y)
}

//export DragMouse
func DragMouse(x, y int, args string) {
	robotgo.Drag(x, y, args)
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

//export TypeStr
func TypeStr(c *C.char, args float64) {
	robotgo.TypeStr(str(c), args)
}

//export FindPic
func FindPic(path *C.char) (int, int) {
	return robotgo.FindPic(str(path))
}

//export GetImgSize
func GetImgSize(path *C.char) (int, int) {
	return robotgo.GetImgSize(str(path))
}

//export AddEvent
func AddEvent(key *C.char) bool {
	return robotgo.AddEvent(str(key))
}

//export StopEvent
func StopEvent() {
	robotgo.StopEvent()
}

//export End
func End() {
	robotgo.End()
}

//export ShowAlert
func ShowAlert(title, msg *C.char) int {
	return robotgo.ShowAlert(str(title), str(msg))
}

//export ActivePID
func ActivePID(pid int32) (c *C.char) {
	err := robotgo.ActivePID(pid)
	if err != nil {
		c = ch(sf(err))
	}

	return
}

//export ActiveName
func ActiveName(name *C.char) (c *C.char) {
	err := robotgo.ActiveName(str(name))
	if err != nil {
		c = ch(sf(err))
	}

	return
}

func main() {} // Required but ignored
