/**
* Functions to WuKong multifunctional expansion board by ELECFREAKS Co.,Ltd.
*/
//% color=#ff7f24  icon="\uf0c2" block="wuKong" blockId="wuKong"
namespace wuKong {
    const board_address = 0x10
	/**
	* LightMode
	*/
    export enum LightMode {
        //% block="BREATH"
        BREATH,
        //% block="OFF"
        OFF
    }
	/**
	* MotorList
	*/
    export enum MotorList {
        //% block="M1"
        M1,
        //% block="M2"
        M2
    }
	/**
	* ServoList
	*/
    export enum ServoList {
        //% block="S0" enumval=0
        S0,
        //% block="S1" enumval=1
        S1,
        //% block="S2" enumval=2
        S2,
        //% block="S3" enumval=3
        S3,
        //% block="S4" enumval=4
        S4,
        //% block="S5" enumval=5
        S5,
        //% block="S6" enumval=6
        S6,
        //% block="S7" enumval=7
        S7
    }
    /**
     * TODO: Set the on-board LED display mode. 
     * @param mode breath or off , eg: LightMode.BREATH
     */
    //% weight=90
    //% blockId="setLightMode" block="Set light mode to %mode"
    export function setLightMode(mode: LightMode): void {
        let buff = pins.createBuffer(4);
        switch (mode) {
            case LightMode.BREATH:
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
            case LightMode.OFF:
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
    //% blockId=lightIntensity block="Set light intensity to %light"
    //% light.min=0 light.max=100
    export function lightIntensity(light: number): void {
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
     * @param motor M1 or M2 motor , eg: MotorList.M1
     * @param speed motor speed, eg: 100
     */
    //% weight=88
    //% blockId=setMotorSpeed block="Set motor %motor speed to %speed"
    //% speed.min=-100 speed.max=100
    export function setMotorSpeed(motor: MotorList, speed: number): void {
        let buf = pins.createBuffer(4);
        switch (motor) {
            case MotorList.M1:
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
            case MotorList.M2:
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
    //% blockId=setAllMotor block="set motor M1 speed %m1speed M2 speed %m2speed"
    //% m1speed.min=-100 m1speed.max=100
    //% m2speed.min=-100 m2speed.max=100
    export function setAllMotor(m1speed: number, m2speed: number): void {
        setMotorSpeed(MotorList.M1, m1speed)
        setMotorSpeed(MotorList.M2, m2speed)
    }

	/*
     * TODO: Stop one of the motors. 
     * @param motor A motor in the MotorList , eg: MotorList.M1
     */
    //% weight=86
    //% blockId=stopMotor block="Stop motor %motor"
    export function stopMotor(motor: MotorList): void {
        setMotorSpeed(motor, 0)
    }
	/*
     * TODO: Stop all motors, including M1 and M2.
     */
    //% weight=85
    //% blockId=stopAllMotor  block="Stop all motor"
    export function stopAllMotor(): void {
        setMotorSpeed(MotorList.M1, 0)
        setMotorSpeed(MotorList.M2, 0)
    }

	/*
     * TODO: Setting the angle of a servo motor. 
     * @param servo A servo in the ServoList , eg: ServoList.S1
     * @param angel Angle of servo motor , eg: 90
     */
    //% weight=84
    //% blockId=setServoAngel block="Set servo %servo angel to %angle"
    //% angle.shadow="protractorPicker"
    export function setServoAngel(servo: ServoList, angel: number): void {
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
    /***************************************************Mecanum wheel car******************************************/
    let LeftFront_def = ServoList.S0
    let LeftRear_def = ServoList.S1
    let RightFront_def = ServoList.S2
    let RightRear_def = ServoList.S3
    /**
    * ServoList
    */
    export enum WheelList {
        //% block="Left Front" 
        LeftFront_def,
        //% block="Left Rear"
        LeftRear_def,
        //% block="Right Front"
        RightFront_def,
        //% block="Right Rear"
        RightRear_def
    }
    /**
     * SideList
     */
    export enum SideList {
        //% block="Left Side"
        Left_Side,
        //% block="Right Side"
        Right_Side
    }
    /**
     * 8 run
     */
    export enum RunList {
        //% block="↖" 
        LeftFront,
        //% block="↑"
        Front,
        //% block="↗"
        RightFront,
        //% block="←"
        left,
        //% block="P" 
        stop,
        //% block="→"
        right,
        //% block="↙"
        LeftRear,
        //% block="↓"
        rear,
        //% block="↘"
        RightRear
    }
    export enum TurnList {
        //% block="Left" 
        Left,
        //% block="Right"
        Right
    }
    /**
    * TODO: Set Mecanum wheel car 
    * @param LeftFront A servo in the ServoList , eg: wuKong.ServoList.S1
    * @param LeftRear A servo in the ServoList , eg: wuKong.ServoList.S2
    * @param RightFront A servo in the ServoList , eg: wuKong.ServoList.S3
    * @param RightRear A servo in the ServoList , eg: wuKong.ServoList.S4
    */
    //% block="Set Mecanum wheel|Left Front %LeftFront|Left Rear %LeftRear|Right Front %RightFront|Right Rear %RightRear"
    //% subcategory=Mecanum
    export function mecanumWheel(LeftFront: ServoList, LeftRear: ServoList, RightFront: ServoList, RightRear: ServoList): void {
        LeftFront_def = LeftFront
        LeftRear_def = LeftRear
        RightFront_def = RightFront
        RightRear_def = RightRear
    }

    /**
    * TODO: Set servo speed
    */
    //% block="Set %wheel wheel speed to %speed"
    //% subcategory=Mecanum
    export function mecanumSpeed(wheel: WheelList, speed: number): void {
        let buf = pins.createBuffer(4)
        if (wheel < 2) {
            if (speed == 0) {
                speed = 89
            }
            else {
                if (speed > 0) {
                    speed = Math.map(speed, 1, 100, 90, 180)
                }
                if (speed < 0) {
                    speed = speed * -1
                    speed = Math.map(speed, 1, 100, 90, 0)
                }
            }
        }
        else {
            if (speed == 0) {
                speed = 89
            }
            else {
                if (speed > 0) {
                    speed = Math.map(speed, 1, 100, 90, 0)
                }
                if (speed < 0) {
                    speed = speed * -1
                    speed = Math.map(speed, 1, 100, 90, 180)
                }
            }
        }

        switch (wheel) {
            case 0:
                if (LeftFront_def == 0) {
                    buf[0] = 0x03;
                    break;
                }
                if (LeftFront_def == 1) {
                    buf[0] = 0x04;
                    break;
                }
                if (LeftFront_def == 2) {
                    buf[0] = 0x05;
                    break;
                }
                if (LeftFront_def == 3) {
                    buf[0] = 0x06;
                    break;
                }
                if (LeftFront_def == 4) {
                    buf[0] = 0x07;
                    break;
                }
                if (LeftFront_def == 5) {
                    buf[0] = 0x08;
                    break;
                }
                if (LeftFront_def == 6) {
                    buf[0] = 0x09;
                    break;
                }
                if (LeftFront_def == 7) {
                    buf[0] = 0x10;
                    break;
                }
            case 1:
                if (LeftRear_def == 0) {
                    buf[0] = 0x03;
                    break;
                }
                if (LeftRear_def == 1) {
                    buf[0] = 0x04;
                    break;
                }
                if (LeftRear_def == 2) {
                    buf[0] = 0x05;
                    break;
                }
                if (LeftRear_def == 3) {
                    buf[0] = 0x06;
                    break;
                }
                if (LeftRear_def == 4) {
                    buf[0] = 0x07;
                    break;
                }
                if (LeftRear_def == 5) {
                    buf[0] = 0x08;
                    break;
                }
                if (LeftRear_def == 6) {
                    buf[0] = 0x09;
                    break;
                }
                if (LeftRear_def == 7) {
                    buf[0] = 0x10;
                    break;
                }
            case 2:
                if (RightFront_def == 0) {
                    buf[0] = 0x03;
                    break;
                }
                if (RightFront_def == 1) {
                    buf[0] = 0x04;
                    break;
                }
                if (RightFront_def == 2) {
                    buf[0] = 0x05;
                    break;
                }
                if (RightFront_def == 3) {
                    buf[0] = 0x06;
                    break;
                }
                if (RightFront_def == 4) {
                    buf[0] = 0x07;
                    break;
                }
                if (RightFront_def == 5) {
                    buf[0] = 0x08;
                    break;
                }
                if (RightFront_def == 6) {
                    buf[0] = 0x09;
                    break;
                }
                if (RightFront_def == 7) {
                    buf[0] = 0x10;
                    break;
                }
            case 3:
                if (RightRear_def == 0) {
                    buf[0] = 0x03;
                    break;
                }
                if (RightRear_def == 1) {
                    buf[0] = 0x04;
                    break;
                }
                if (RightRear_def == 2) {
                    buf[0] = 0x05;
                    break;
                }
                if (RightRear_def == 3) {
                    buf[0] = 0x06;
                    break;
                }
                if (RightRear_def == 4) {
                    buf[0] = 0x07;
                    break;
                }
                if (RightRear_def == 5) {
                    buf[0] = 0x08;
                    break;
                }
                if (RightRear_def == 6) {
                    buf[0] = 0x09;
                    break;
                }
                if (RightRear_def == 7) {
                    buf[0] = 0x10;
                    break;
                }
        }
        buf[1] = speed;
        buf[2] = 0;
        buf[3] = 0;
        pins.i2cWriteBuffer(board_address, buf);
    }
    /**
    * TODO: Set side servo speed
    */
    //% block="Set %wheelside wheel speed to %speed"
    //% subcategory=Mecanum
    export function mecanumSideRun(wheelside: SideList, speed: number): void {
        switch (wheelside) {
            case 0:
                mecanumSpeed(WheelList.LeftFront_def, speed)
                mecanumSpeed(WheelList.LeftRear_def, speed)
                break;
            case 1:
                mecanumSpeed(WheelList.RightFront_def, speed)
                mecanumSpeed(WheelList.RightRear_def, speed)
                break;
        }
    }
    /**
   * TODO: Set car runs direction
   */
    //% block="Set Mecanum car runs direction %type with speed %speed"
    //% subcategory=Mecanum
    //% type.fieldEditor="gridpicker"
    //% type.fieldOptions.columns=3
    //% speed.min=0 speed.max=100
    export function mecanumRun(type: RunList, speed: number): void {
        let servospeed: number = 0;
        if (speed < 0) {
            speed = 0;
        }
        servospeed = Math.map(speed, 0, 100, 90, 0)
        Math.floor(servospeed)
        switch (type) {
            case 0:
                setServoAngel(LeftFront_def, 90)
                setServoAngel(LeftRear_def, 180 - servospeed)
                setServoAngel(RightFront_def, servospeed + 0)
                setServoAngel(RightRear_def, 90)
                break;
            case 1:
                setServoAngel(LeftFront_def, 180 - servospeed)
                setServoAngel(LeftRear_def, 180 - servospeed)
                setServoAngel(RightFront_def, servospeed + 0)
                setServoAngel(RightRear_def, servospeed + 0)
                break;
            case 2:
                setServoAngel(LeftFront_def, 180 - servospeed)
                setServoAngel(LeftRear_def, 90)
                setServoAngel(RightFront_def, 90)
                setServoAngel(RightRear_def, servospeed + 0)
                break;
            case 3:
                setServoAngel(LeftFront_def, servospeed + 0)
                setServoAngel(LeftRear_def, 180 - servospeed)
                setServoAngel(RightFront_def, servospeed + 0)
                setServoAngel(RightRear_def, 180 - servospeed)
                break;
            case 4:
                setServoAngel(LeftFront_def, 90)
                setServoAngel(LeftRear_def, 90)
                setServoAngel(RightFront_def, 90)
                setServoAngel(RightRear_def, 90)
                break;
            case 5:
                setServoAngel(LeftFront_def, 180 - servospeed)
                setServoAngel(LeftRear_def, servospeed + 0)
                setServoAngel(RightFront_def, 180 - servospeed)
                setServoAngel(RightRear_def, servospeed + 0)
                break;
            case 6:
                setServoAngel(LeftFront_def, servospeed + 0)
                setServoAngel(LeftRear_def, 90)
                setServoAngel(RightFront_def, 90)
                setServoAngel(RightRear_def, 180 - servospeed)
                break;
            case 7:
                setServoAngel(LeftFront_def, servospeed + 0)
                setServoAngel(LeftRear_def, servospeed + 0)
                setServoAngel(RightFront_def, 180 - servospeed)
                setServoAngel(RightRear_def, 180 - servospeed)
                break;
            case 8:
                setServoAngel(LeftFront_def, 90)
                setServoAngel(LeftRear_def, servospeed + 0)
                setServoAngel(RightFront_def, 180 - servospeed)
                setServoAngel(RightRear_def, 90)
                break;
        }
    }
    /**
    * TODO: Set Mecanum car Stop
    */
    //% block="Set Mecanum car Stop"
    //% subcategory=Mecanum
    export function mecanumStop(): void {
        setServoAngel(LeftFront_def, 90)
        setServoAngel(LeftRear_def, 90)
        setServoAngel(RightFront_def, 90)
        setServoAngel(RightRear_def, 90)
    }
    /**
   * TODO: Set car spin 
   */
    //% block="Set Mecanum car spin %Turn with speed %speed"
    //% subcategory=Mecanum
    //% Turn.fieldEditor="gridpicker"
    //% Turn.fieldOptions.columns=2
    //% speed.min=0 speed.max=100
    export function mecanumSpin(Turn: TurnList, speed: number): void {
        let servospeed: number = 0;
        if (speed < 0) {
            speed = 0;
        }
        servospeed = Math.map(speed, 0, 100, 90, 0)
        Math.floor(servospeed)
        switch (Turn) {
            case 0:
                setServoAngel(LeftFront_def, 0 + servospeed)
                setServoAngel(LeftRear_def, 0 + servospeed)
                setServoAngel(RightFront_def, 0 + servospeed)
                setServoAngel(RightRear_def, 0 + servospeed)
                break;
            case 1:
                setServoAngel(LeftFront_def, 180 - servospeed)
                setServoAngel(LeftRear_def, 180 - servospeed)
                setServoAngel(RightFront_def, 180 - servospeed)
                setServoAngel(RightRear_def, 180 - servospeed)
                break;
        }
    }
    /**
   * TODO: Set car drift
   */
    //% block="Set Mecanum car drift %Turn"
    //% subcategory=Mecanum
    //% Turn.fieldEditor="gridpicker"
    //% Turn.fieldOptions.columns=2
    export function mecanumDrift(Turn: TurnList): void {
        switch (Turn) {
            case 0:
                setServoAngel(LeftFront_def, 70)
                setServoAngel(LeftRear_def, 180)
                setServoAngel(RightFront_def, 70)
                setServoAngel(RightRear_def, 180)
                break;
            case 1:
                setServoAngel(LeftFront_def, 110)
                setServoAngel(LeftRear_def, 0)
                setServoAngel(RightFront_def, 110)
                setServoAngel(RightRear_def, 0)
                break;
        }
    }
}
 