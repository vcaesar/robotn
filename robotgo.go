package main

import "C"

import (
	// "fmt"

	"github.com/go-vgo/robotgo"
)

//export GetVersion
func GetVersion() *C.char {
	str := robotgo.GetVersion()
	ch := C.CString(str)

	return ch
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
	str := robotgo.GetPixelColor(x, y)
	ch := C.CString(str)
	return ch
}

//export GetScreenSize
func GetScreenSize() (int, int) {
	return robotgo.GetScreenSize()
}

//export GetScaleSize
func GetScaleSize() (int, int) {
	return robotgo.GetScaleSize()
}

func main() {} // Required but ignored
