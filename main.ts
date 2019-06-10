/**
 * Functions to WuKong multifunctional expansion board by ELECFREAKS Co.,Ltd.
 */
//% color=#ff7f24  icon="\uf0c2" block="WuKong"
namespace WuKong {
    const board_address = 0x10
	/**
	* Select the breathing lamp status
	*/
    export enum lightMode {
        //% block="breath"
        breath,
        //% block="off"
        off
    }
	/**
	* Select the motor on the M1 or M2
	*/
    export enum motorList {
        //% block="M1"
        M1,
        //% block="M2"
        M2
    }
	/**
	* servo list
	*/
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
    /**
     * TODO: Set the on-board LED display mode. 
     * @param mode breath or off , eg: lightMode.breath
     */
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



	/**
    * TODO: Set the brightness of on-board LED lamp.
    * @param light brightness, eg: 100
    */
    //% weight=89
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


	/**
     * TODO: Set the speed of M1 or M2 motor. 
     * @param motor M1 or M2 motor , eg: motorList.M1
     * @param speed motor speed, eg: 100
     */
    //% weight=88
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
	/*
     * TODO: Set both of M1 and M2 motors speed. 
     * @param m1speed M1 motor speed , eg: 100
     * @param m2speed M2 motor speed, eg: -100
     */
    //% weight=87
    //% blockId=setallmotor block="set motor M1 speed %m1speed M2 speed %m2speed"
    //% m1speed.min=-100 m1speed.max=100
    //% m2speed.min=-100 m2speed.max=100
    export function set_all_motor(m1speed: number, m2speed: number): void {
        setmotorSpeed(motorList.M1, m1speed)
        setmotorSpeed(motorList.M2, m2speed)
    }

	/*
     * TODO: Stop one of the motors. 
     * @param motor A motor in the motorlist , eg: motorList.M1
     */
    //% weight=86
    //% blockId=stoponemotor block="Stop motor %motor"
    export function stop_motor(motor: motorList): void {
        setmotorSpeed(motor, 0)
    }
	/*
     * TODO: Stop all motors, including M1 and M2.
     */
    //% weight=85
    //% blockId=stopallmotor  block="Stop all motor"
    export function stop_all_motor(): void {
        setmotorSpeed(motorList.M1, 0)
        setmotorSpeed(motorList.M2, 0)
    }

	/*
     * TODO: Setting the angle of a servo motor. 
     * @param servo A servo in the servoList , eg: servoList.S1
     * @param angel Angle of servo motor , eg: 90
     */
    //% weight=84
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
