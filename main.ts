/**
 * Functions to WuKong multifunctional expansion board by ELECFREAKS Co.,Ltd.
 */
//% color=#ff7f24  icon="\uf0c2" block="WuKong"
namespace WuKong {
    const board_address = 0x10

    export enum lightMode {
    //% block="breath"
    breath,
    //% block="off"
    off
    }

    export enum motorList {
    //% block="M1"
    M1,
    //% block="M2"
    M2
    }

    export enum servoList {
    //% block="S0" enumval=0
    s0,
    //% block="S1" enumval=1
    s1,
    //% block="S2" enumval=2
    s2,
    //% block="S3" enumval=3
    s3,
    //% block="S4" enumval=4
    s4,
    //% block="S5" enumval=5
    s5,
    //% block="S6" enumval=6
    s6,
    //% block="S7" enumval=7
    s7
    }

    //% weight=90
    //% blockId="setlightMode" block="Set light mode to %mode"
    export function setlightMode(mode: lightMode): void {
        let buff = pins.createBuffer(4);
        switch (mode) {
            case lightMode.breath:
                buff[0] = 0x11;
                buff[1] = 0x00;
                buff[2] = 0;
                buff[3] = 0;
                pins.i2cWriteBuffer(board_address, buff);
                buff[0] = 0x12;
                buff[1] = 150;
                basic.pause(100);
                pins.i2cWriteBuffer(board_address, buff);
                break;
            case lightMode.off:
                buff[0] = 0x12;
                buff[1] = 0;
                buff[2] = 0;
                buff[3] = 0;
                pins.i2cWriteBuffer(board_address, buff);
                buff[0] = 0x11;
                buff[1] = 160;
                basic.pause(100);
                pins.i2cWriteBuffer(board_address, buff);
                break;
            default:
                break;
        }
    }
    //% weight=80
    //% blockId=lightintensity block="Set light intensity to %light"
    //% light.min=0 light.max=100
    export function lightintensity(light: number): void {
        let buff = pins.createBuffer(4);
        buff[0] = 0x12;
        buff[1] = light;
        buff[2] = 0;
        buff[3] = 0;
        pins.i2cWriteBuffer(board_address, buff);
        basic.pause(100);
        buff[0] = 0x11;
        buff[1] = 160;
        pins.i2cWriteBuffer(board_address, buff);
    }
    //% blockId=setmotorSpeed block="Set motor %motor speed to %speed"
    //% speed.min=-100 speed.max=100
    export function setmotorSpeed(motor: motorList, speed: number): void {
        let buf = pins.createBuffer(4);
        switch (motor) {
            case motorList.M1:
                buf[0] = 0x01;
                buf[1] = 0x01;
                if (speed < 0) {
                    buf[1] = 0x02;
                    speed = speed * -1
                }
                buf[2] = speed;
                buf[3] = 0;
                pins.i2cWriteBuffer(board_address, buf);
                break;
            case motorList.M2:
                buf[0] = 0x02;
                buf[1] = 0x01;
                if (speed < 0) {
                    buf[1] = 0x02;
                    speed = speed * -1
                }
                buf[2] = speed;
                buf[3] = 0;
                pins.i2cWriteBuffer(board_address, buf);
                break;
            default:
                break;
        }
    }
    //% blockId=setservoangel block="Set servo %servo angel to %angle"
    //% angle.shadow="protractorPicker"
    export function setservoangel(servo: servoList, angel: number): void {
        let buf = pins.createBuffer(4);
        if (servo == 0) {
            buf[0] = 0x03;
        }
        if (servo == 1) {
            buf[0] = 0x04;
        }
        if (servo == 2) {
            buf[0] = 0x05;
        }
        if (servo == 3) {
            buf[0] = 0x06;
        }
        if (servo == 4) {
            buf[0] = 0x07;
        }
        if (servo == 5) {
            buf[0] = 0x08;
        }
        if (servo == 6) {
            buf[0] = 0x09;
        }
        if (servo == 7) {
            buf[0] = 0x10;
        }
        buf[1] = angel;
        buf[2] = 0;
        buf[3] = 0;
        pins.i2cWriteBuffer(board_address, buf);
    }

}
