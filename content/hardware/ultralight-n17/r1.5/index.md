---
date: 2025-09-21
title: "Ultralight N17 CAN-FD Motor Driver - Rev 1.5"
author: "Ben @ Mettle & Byte"
description: "The official documentation for the MnB Ultralight N17, a high-performance CAN-FD stepper motor driver for modern 3D motion systems."
aliases:
  - "/h/ul-n17-r1.5"
---


[Features](#features) [Installation](#installation) [Pinout](#pinout) [Configuration](#configuration) 

## Introduction

The Ultralight N17 is the first RepRapFirmware and Klipper compatible expansion board from Mettle & Byte (MnB), a small business developing software, hardware, and firmware for the open-source / hobby CNC space.

Developed in collaboration with *Millennium Machines*, the Ultralight N17 is a CAN-FD connected motor driver designed to fit onto the back of any NEMA17 (42mm) size motor, providing enough IO to run a single axis.

Initially designed for use on the Millennium Machines rotary toolchanger, the Ultralight N17 aims to be a highly versatile expansion option, bypassing mainboard driver limitations and allowing control of remote motors with only a 4-wire CAN-FD + Power connection.

It is suitable for use in 3D printers, Laser cutters and any other CNC controlled machine that requires a NEMA17 motor at up to 3A of current.

The Ultralight N17 takes inspiration from many open-source hardware projects, and as such, the schematic will be available as well. This page covers the production-ready **R1.5** version of the board.

---

## Features

### Core Components

* **High Power Microcontroller:** The brain of the operation is a **Raspberry Pi RP2350A**, providing a significant performance uplift over the RP2040 commonly used for RRF / Klipper expansion boards. On RRF, this opens up the possibility of closed-loop control (software dependent, not possible yet).
* **Silent & Precise Motor Driver:** Features the **Trinamic TMC2240**, renowned for its silent StealthChop2™ technology and precise control. It is capable of up to 256 microsteps.
* **High-Current Capability:** Configured for a **3.0A peak motor current**[^1], providing ample power for a wide range of demanding NEMA17 stepper motors.

[^1]: Active cooling required

### Connectivity

* **CAN-FD:** A dedicated CAN-FD interface based on the reliable Microchip **MCP2518FD** controller and **MCP2542WFD** transceiver. All communication is handled via the RP2350's high-speed SPI bus for maximum throughput.
* **Selectable CAN Source:** For software CAN implementations, the **MCP2542WFD** can be jumpered directly to the RP2350. This can be used in combination with Klipper!
* **Dual-Mode Driver Communication:** The TMC2240 can be controlled via **UART** (for drop-in compatibility with existing RRF firmware), but also exposes **SPI** connectivity for more advanced configuration and diagnostics. This will allow SPI compatible drivers to be written in future.
* **Jumper-Selectable Bus Termination:** A simple jumper allows you to add a 120Ω termination resistor if the board is the last device on the CAN bus.

### Onboard I/O

* **Optically Isolated Inputs/Outputs:** Both the endstop input and auxiliary output are optically isolated using **PC3H7B** optocouplers.
* **1 x Endstop Input:** A 3-pin JST-PH connector for endstops, with jumper-selectable support for both NPN and PNP sensor types.
* **1 x Auxiliary Switched Output:** A 2-pin JST-PH connector providing a ground-switched output, capable of handling up to **1.5A**. Ideal for controlling servos or small fans.
* **1 x Expansion Port:** Exposes TMC2240 encoder pins, 4 x GPIO pins from the RP2350 and 3.3v, 5v, 12v and VIN for ultimate flexibility.
* **Encoder Ready:** Header pins are available to connect an external encoder for future closed-loop operation.

### Power & Usability

* **Wide Input Voltage:** Designed to operate on a wide DC input range, from **12V to 36V**[^2].
* **High-Efficiency Power Delivery:** A multi-stage power system featuring Texas Instruments components throughout ensures stable and efficient power for the MCU, driver, and onboard logic.
* **Onboard Diagnostics:** Status LEDs for main power (`VIN`), MCU activity, endstop (`STOP`), and auxiliary output (`AUX`) provide at-a-glance diagnostics.
* **User Serviceability:** Onboard push buttons for `BOOT` and `RESET`, along with an exposed SWD header for advanced debugging.

[^2]: 36v is the absolute maximum voltage tolerated by the TMC2240 driver. Back EMF from running the motor at this voltage will likely cause overvoltage events!
---

## Installation
The Ultralight N17 comes with RepRapFirmware installed (the latest stable at time of packaging), so you can get up and running with RRF very quickly.

1. On the header marked 'CAN', place 2 jumpers horizontally from the 'R' symbol, connecting the two left-most pins to the middle pins.
2. On the header marked 'TERM', place a jumper if this is the last device on the CAN-bus.
3. On the header marked 'VIO' (on the back), place a single jumper vertically to select the IO voltage. Placing the jumper in the left-most column selects 5v, in the right-most column selects 12v, and the middle column selects VIN.
4. Connect optional endstop and aux output.
5. Insert XT30 2+2 on connector marked 'INPUT'. Double and triple check the polarity of your wiring as reversing this will damage the board.

## Pinout
We maintain an interactive [Bill of materials](bom/bom.html) that has most pins and jumpers marked as per the board design. 

Click a component on the front or back of the board to learn more about it. Some components have a description for further information.

There are only 2 necessary connections to use the board. The INPUT connector for your VIN and CAN(-FD), and the MOTOR connector.

## Configuration

Properly configuring your Ultralight N17 is essential for reliable operation.

### Jumpers

| Header | Function                   | Comment                                                                                                                                                                                    |
| :----- | :------------------------  | :--------------------                                                                                                                                                                                            |
| `NPN`  | **Endstop Input Type.**    | Install a jumper to configure the `STOP` input for NPN-style (sinking) endstops. Leave the jumper off for PNP (sourcing) endstops.                                                         |
| `VIO`  | **IO Output Voltage.**     | Install a jumper between 5v, 12 or VIN and one of the output pins to set the IO voltage. Applies to STOP and AUX. ONE JUMPER ONLY!                                                         |
| `CAN`  | **CAN Bus Source.**        | Switches between software (RRF) or software CAN control. Install two horizontal jumpers facing inwards from the H mark for RRF, or two jumpers facing inwards from the S mark for Klipper. |
| `TERM` | **CAN Bus Termination.**   | Install jumper to terminate the CAN bus with 2 x 60Ω resistors if this device is the end of the bus.                                                                                       |

### Driver Communication Mode (UART vs. SPI)

The TMC2240 driver can be controlled via UART or SPI.

*   **Default Mode (UART):** For maximum compatibility, the board defaults to **UART mode**. In your firmware, you only need to define the UART pin for the TMC2240, which is connected to `GPIO1` of the RP2350.
*   **Enabling SPI Mode:** To use the faster SPI interface, you must configure `GPIO29` in your firmware. During your firmware's startup sequence, drive `GPIO29` **LOW**. This will switch the TMC2240 into SPI mode before any communication attempts are made.

<!--
## Issues
(You can fill this section in with any known issues or errata for the R1.5 board)
-->

<!--
## Motivations
(You can fill this section in with the story behind the project)
-->

<!--
## Thanks
(You can fill this section in to thank collaborators)
-->