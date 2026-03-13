# Wukong expansion board

![Wukong](https://raw.githubusercontent.com/elecfreaks/pxt-wukong/master/Wukong.jpg)

This library is designed to drive Wukong expansion board , You can get Wukong board here.

https://shop.elecfreaks.com/products/elecfreaks-micro-bit-wukong-expansion-board-adapter?_pos=1&_sid=733714545&_ss=r

## Code Example
```JavaScript
input.onButtonPressed(Button.A, function () {
    wuKong.setAllMotor(100, -100)
})
input.onButtonPressed(Button.AB, function () {
    wuKong.stopAllMotor()
})
input.onButtonPressed(Button.B, function () {
    wuKong.setServoAngle(wuKong.ServoTypeList._360,wuKong.ServoList.S0, 360)
    wuKong.setServoAngle(wuKong.ServoTypeList._180,wuKong.ServoList.S2, 180)
    wuKong.setServoAngle(wuKong.ServoTypeList._180,wuKong.ServoList.S4, 90)
    wuKong.setServoAngle(wuKong.ServoTypeList._180,wuKong.ServoList.S6, 0)
})
basic.showIcon(IconNames.Heart)
wuKong.setLightMode(wuKong.LightMode.BREATH)

```
## Supported targets
for PXT/microbit

## License
MIT
