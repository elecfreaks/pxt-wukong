input.onButtonPressed(Button.A, function () {
    wuKong.setAllMotor(100, -100)
})
input.onButtonPressed(Button.AB, function () {
    wuKong.stopAllMotor()
})
input.onButtonPressed(Button.B, function () {
    wuKong.setServoAngle(wuKong.ServoTypeList._180,wuKong.ServoList.S0, 360)
    wuKong.setServoAngle(wuKong.ServoTypeList._180,wuKong.ServoList.S2, 180)
    wuKong.setServoAngle(wuKong.ServoTypeList._180,wuKong.ServoList.S4, 90)
    wuKong.setServoAngle(wuKong.ServoTypeList._180,wuKong.ServoList.S6, 0)
})
basic.showIcon(IconNames.Heart)
wuKong.setLightMode(wuKong.LightMode.BREATH)
