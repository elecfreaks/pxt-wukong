# Wukong expansion board

![Wukong](https://raw.githubusercontent.com/elecfreaks/pxt-wukong/master/Wukong.jpg)

This library is designed to drive Wukong expansion board , You can get Wukong board here.

[https://www.elecfreaks.com/store/elecfreaks-wukong-breakout-board-for-micro-bit.html](https://www.elecfreaks.com/store/elecfreaks-wukong-breakout-board-for-micro-bit.html)

## Code Example
```JavaScript
input.onButtonPressed(Button.A, function () {
    wuKong.setAllMotor(100, -100)
})
input.onButtonPressed(Button.AB, function () {
    wuKong.stopAllMotor()
})
input.onButtonPressed(Button.B, function () {
    wuKong.setServoAngel(wuKong.ServoList.S0, 360)
    wuKong.setServoAngel(wuKong.ServoList.S2, 180)
    wuKong.setServoAngel(wuKong.ServoList.S4, 90)
    wuKong.setServoAngel(wuKong.ServoList.S6, 0)
})
basic.showIcon(IconNames.Heart)
wuKong.setLightMode(wuKong.LightMode.BREATH)

```
## Supported targets
for PXT/microbit

## License
MIT
