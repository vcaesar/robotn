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
func KeyToggle(key *C.char) *C.char {
	s := robotgo.KeyToggle(str(key))
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

//export GetText
func GetText(path *C.char) (*C.char, *C.char) {
	s, err := robotgo.GetText(str(path))
	return ch(s), ech(err)
}

//export FindPic
func FindPic(path *C.char) (int, int) {
	return robotgo.FindPic(str(path))
}

//export GetImgSize
func GetImgSize(path *C.char) (int, int) {
	return robotgo.GetImgSize(str(path))
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

//export End
func End() {
	robotgo.End()
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

//export FindIds
func FindIds(name *C.char) (*C.char, *C.char) {
	arr, err := robotgo.FindIds(str(name))
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

func main() {} // Required but ignored
