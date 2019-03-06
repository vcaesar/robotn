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
