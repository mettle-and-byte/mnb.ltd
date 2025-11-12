---
date: 2025-09-21
title: "Ultralight N17 R1.5 - Firmware Configuration"
author: "Ben @ Mettle & Byte"
description: "RepRapFirmware and Klipper configuration for the MnB Ultralight N17 r1.5."
---

[← Back to Ultralight N17 R1.5](../)

---

## Contents

- [RepRapFirmware Setup](#reprapfirmware-setup)
- [Klipper Setup](#klipper-setup)

---

## RepRapFirmware Setup

The Ultralight N17 comes with RepRapFirmware installed (the latest stable at time of packaging), so you can get up and running with RRF very quickly.

### Hardware Configuration

1. On the header marked `CAN`, place 2 jumpers horizontally from the `H` symbol, connecting the two left-most pins to the middle pins.
2. On the header marked `TERM`, place a jumper if this is the last device on the CAN-bus.
3. On the header marked `VIO` (on the back), place a single jumper vertically to select the IO voltage. Placing the jumper in the left-most column selects 5v, in the right-most column selects 12v, and the middle column selects VIN.
4. Connect optional endstop and aux output.
5. Insert XT30 2+2 on connector marked `INPUT`. 

{{< notice warning >}}
**QUADRUPLE CHECK** your `INPUT` polarity. Getting this back to front has a very real chance of killing your board instantly.
{{< /notice >}}

6. CAN-H is Yellow and CAN-L is White. Connect these into your mainboard or as a (short) spur off your CAN-bus.

### Firmware Configuration

All expansion boards connected to a single RRF instance must each have a unique CAN address. The Ultralight N17 defaults to address 124. 

If you are configuring multiple boards, power up the unconfigured CAN expansion boards one at a time, leaving all other unconfigured boards unpowered. 

You can then reconfigure the powered on board with a unique address, which allows the next expansion boards to be brought up on address 124.

1. Power up the Ultralight N17.
2. Observe the VIN and MCU LEDs on the board. The VIN LED should be solidly on and the MCU LED should flash twice a second until it synchronises with the mainboard. When synchronised, it will blink once a second at the same time as the mainboard.
3. If the MCU LED does not slow down after a couple of seconds, check your CAN wiring.
4. If the MCU LED slows down, congratulations - your Ultralight N17 has connected to your mainboard.
5. Run `M122 B124` via the console. It should report something similar to the below output:

```gcode
M122 B124
Diagnostics for board 124:
Duet MNBN17R1_5 firmware version 3.6.1+1 (2025-10-19 23:26:22) Clock 150.0MHz
Bootloader ID: RP2350
Never used RAM 472212, free system stack 0 words
Tasks: Move(3,nWait 7,0.0%,136) TMC(2,delaying,1.9%,0) HEAT(2,nWait 6,0.1%,130) CanAsync(5,nWait 4,0.0%,58) CanRecv(3,nWait 1,0.0%,354) CanClock(5,nWait 1,0.0%,336) MAIN(1,running,94.4%,426) IDLE(0,ready,1.4%,24) USBD(2,blocked,0.0%,146) AIN(2,delaying,2.2%,262), total 100.0%
Owned mutexes:
Last reset 00:00:14 ago, cause: unknown not implemented
Last software reset data not available
Moves scheduled 0, hiccups 0 (0.00/0.00ms), segs 0, step errors 0 (types 0x0), maxLate 0 maxPrep 0, ebfmin 0.00 max 0.00
Sync err accum 502, peak jitter -4/26, peak Rx delay 269, resyncs 0/0, no timer interrupt scheduled
VIN voltage: min 23.0, current 23.1, max 23.1
MCU temperature: min 35.4C, current 36.8C, max 37.3C
Driver 0: pos 0, 80.0 steps/mm, standstill, SG min 0, temp 21.4C, read errors 0, write errors 0, ifcnt 10, reads 7051, writes 10, timeouts 0, DMA errors 0
Last sensors broadcast 0x00000000 found 0 135 ticks ago, 0 ordering errs, loop time 0
CAN messages queued 292, send timeouts 0, received 132, lost 0, ignored 0, errs 0, boc 1, free buffers 38, min 38, error reg 0
dup 0, oos 0/0/0/0, rxMotionDelay 0
```

6. Run `M952 B124 A20` to assign the Ultralight N17 to address 20. Teamgloomy and Duet suggest using addresses starting at 20 for expansion boards.
7. Run `M999 B124` to force the Ultralight N17 to reboot onto the new address.
8. Wait for the MCU LED to slow down indicating synchronisation, then run `M122 B20` and verify the diagnostic output looks correct.
9. Congratulations! Your Ultralight N17 is ready for configuration!
10. If you have more than one expansion board, run through these steps again for each board, powering on only one unconfigured board at a time.
11. Once all of your boards are configured on their own addresses, you can configure them as axes in RRF:

```gcode
; Wait for expansion boards to sync with mainboard
G4 S2 

; Physical drive 20.0 (Ultralight N17 #1) goes forwards with default timings
M569 P20.0 S1

; Physical drive 21.0 (Ultralight N17 #2) goes forwards with default timings
M569 P21.0 S1

; Assign Ultralight N17 #1 to X-axis and #2 to Y-axis
M584 X20.0 Y21.0

; Configure microstepping, no interpolation
M350 X32 Y32 I0

; Set steps per mm
M92 X800 Y800

; Set motor currents (mA)
M906 X2000 Y2000

; Set standstill current reduction to 10%
M917 X10 Y10

; Set up NC endstops
; After wiring run M119 to check status of endstops.
; Place a ! before the pin name (!20.stop, !21.stop ...)
; if endstop shows activated when physically deactivated.
M574 X1 S1 P"20.stop"
M574 Y1 S1 P"21.stop"

; Configure fans
; Change F param if you already have more than one fan configured.
M950 F1 C"20.aux"
M950 F2 C"21.aux"

; Configure driver temperature sensors
M308 S12 Y"drivertemp" P"20.dummy" A"X Axis Stepper Temp"
M308 S13 Y"drivertemp" P"21.dummy" A"Y Axis Stepper Temp"

; Enable thermostatic control - start fan at 50c at 10%, rising to 100% at 70c.
; Boost for half a second when starting up.
M106 P1 H12 T50:70 L0.10 X1.0 B0.5 C"X Axis Stepper Fan"
M106 P1 H13 T50:70 L0.10 X1.0 B0.5 C"Y Axis Stepper Fan"
```

---

## Klipper Setup

TBD

---

[← Back to Ultralight N17 R1.5](../)
