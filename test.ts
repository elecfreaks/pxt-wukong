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
