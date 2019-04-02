var robot = require('../../robot');

robot.typeStr("Hello World, こんにちは世界.");

robot.keyTap("i", "alt", "cmd");

robot.writeAll("Test");
var text = robot.readAll();
console.log(text);