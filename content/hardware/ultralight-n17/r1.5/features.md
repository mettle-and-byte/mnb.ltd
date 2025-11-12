---
date: 2025-09-21
title: "Ultralight N17 R1.5 - Features & Specifications"
author: "Ben @ Mettle & Byte"
description: "Detailed features and technical specifications for the MnB Ultralight N17 r1.5."
---

[← Back to Ultralight N17 R1.5](../)

---

## Features

### Core Components

* **High Power Microcontroller:** The brains of the operation is a **Raspberry Pi RP2350A**, providing a significant performance uplift over the RP2040 commonly used for RRF / Klipper expansion boards. On RRF, this opens up the possibility of closed-loop control (software dependent and requires a small daughter board, implementation ongoing).
* **Silent & Precise Motor Driver:** Features the **Trinamic TMC2240**, renowned for its silent StealthChop2™ technology, SPI connectivity and precise control at up to 256 microsteps.
* **High-Current Capability:** Up to **3.0A peak motor current**[^1], providing ample power for a wide range of demanding NEMA17 stepper motors.

[^1]: Active cooling required. Drive a 3010 fan using the onboard AUX header and our 3D printed fan mounts!

### Connectivity

* **CAN-FD:** A dedicated CAN-FD interface based on the reliable Microchip **MCP2518FD** controller and **MCP2542WFD** transceiver. All communication is handled via the RP2350's high-speed SPI bus for maximum throughput.
* **Selectable CAN Source:** For software CAN implementations, the **MCP2542WFD** can be jumpered directly to the RP2350. This can be used in combination with Klipper!
* **Dual-Mode Driver Communication:** The TMC2240 can be controlled via **UART** (for drop-in compatibility with existing RRF firmware), but also exposes **SPI** connectivity for more advanced configuration and diagnostics. This will allow SPI compatible drivers to be written in future.
* **Jumper-Selectable Bus Termination:** A simple jumper allows you to add a split 20Ω termination resistor if the board is the last device on the CAN bus.

### Onboard I/O

* **Optically Isolated Inputs/Outputs:** Both the endstop input and auxiliary output are optically isolated using **PC3H7B** optocouplers.
* **1 x Endstop Input:** A 3-pin JST-PH connector for endstops, with jumper-selectable support for both NPN and PNP sensor types.
* **1 x Auxiliary Switched Output:** A 2-pin JST-PH connector providing a ground-switched output, capable of handling up to **1.5A**. Ideal for controlling servos or small fans.
* **1 x Expansion Port:** Exposes TMC2240 encoder pins, 4 x GPIO pins from the RP2350 and 3.3v, 5v, 12v and VIN for ultimate flexibility.
* **Encoder Ready:** Header pins are available to connect an external encoder for future closed-loop operation.

### Power & Usability

* **Wide Input Voltage:** Designed to operate on a wide DC input range, from **~14V to 36V**[^2].
* **High-Efficiency Power Delivery:** A multi-stage power system featuring Texas Instruments components throughout ensures stable and efficient power for the MCU, driver, and onboard logic.
* **Onboard Diagnostics:** Status LEDs for main power (`VIN`), MCU activity, endstop (`STOP`), and auxiliary output (`AUX`) provide at-a-glance diagnostics.
* **User Serviceability:** Onboard push buttons for `BOOT` and `RESET`, along with an exposed SWD header for advanced debugging.

[^2]: 36v is the absolute maximum voltage tolerated by the TMC2240 driver. Back EMF from running the motor at this voltage will cause overvoltage events!

---

[← Back to Ultralight N17 R1.5](../)
