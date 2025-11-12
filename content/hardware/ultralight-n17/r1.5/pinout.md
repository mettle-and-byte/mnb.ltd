---
date: 2025-09-21
title: "Ultralight N17 R1.5 - Pinout Reference"
author: "Ben @ Mettle & Byte"
description: "Complete pinout and wiring reference for the MnB Ultralight N17 r1.5."
---

[← Back to Ultralight N17 R1.5](../)

---

## Pinout Diagram

<a href="../images/mnb-ultralight-n17-r1.5-pinout.png">
<img src="../images/mnb-ultralight-n17-r1.5-pinout-transparent.png"
  style="display: block; margin: 0 auto"
/></a>

Click the image above for a high-resolution version.

---

## Interactive Bill of Materials

We also maintain an interactive [bill of materials](../bom/bom.html) that has most pins and jumpers marked as per the board design. 

Click a component on the front or back of the board to learn more about it. Some components have a description for further information.

---

## Essential Connections

There are only 2 necessary connections to use the board:

1. **`INPUT` connector** - for your VIN and CAN(-FD)
2. **`MOTOR` connector** - for your NEMA17 stepper motor

{{< notice warning >}}
**CRITICAL**: Double and triple check the polarity of your `INPUT` connector before plugging it in. Reversing the polarity will damage the board instantly.
{{< /notice >}}

### INPUT Connector (XT30 2+2)

- **CAN-H**: Yellow wire
- **CAN-L**: White wire
- **VIN**: Red wire (typically 14-32V DC)
- **GND**: Black wire

### MOTOR Connector (XH 2.5, 4-pin)

A standard 4-wire bipolar stepper motor connection. Use the included cable and PH 2.0 connectors to adapt to your motor's PH 2.0 connector. Most NEMA17 motors will have a 6 pin PH 2.0 connector with only the two outer and two inner pins connected.

The 2 inner pins are usually flipped, so the `A,A,B,B` pattern (Black, Green, Blue, Red) from the Ultralight N17 will end up as `A,NC,B,A,NC,B` or Black, Red, Green, Blue

---

## RP2350 GPIO Assignment

For reference, the following lists the GPIO pins on the RP2350 MCU and their assigned function:

| GPIO Pin      | Function       |
| :------------ | :------------- |
| `GPIO0`       | `DRV_EN`       |
| `GPIO1`       | `DRV_UART`     |
| `GPIO2`       | `DRV_DIR`      |
| `GPIO3`       | `DRV_STEP`     |
| `GPIO4`       | `DRV_MISO`     |
| `GPIO5`       | `DRV_CS`       |
| `GPIO6`       | `DRV_SCK`      |
| `GPIO7`       | `DRV_MOSI`     |
| `GPIO8`       | `CAN_MISO`     |
| `GPIO9`       | `CAN_CS`       |
| `GPIO10`      | `CAN_SCK`      |
| `GPIO11`      | `CAN_MOSI`     |
| `GPIO12`      | `DRV_DIAG`     |
| `GPIO13`      | `CAN_INT`      |
| `GPIO14`      | `CAN_MCU_RX`   |
| `GPIO15`      | `CAN_MCU_TX`   |
| `GPIO16`      | `AUX`          |
| `GPIO18`      | `STOP`         |
| `GPIO19`      | `EXT1`         |
| `GPIO20`      | `EXT2`         |
| `GPIO21`      | `EXT3`         |
| `GPIO22`      | `EXT4`         |
| `GPIO23`      | `STATUS`       |
| `GPIO26_ADC0` | `PVIN_REF`     |
| `GPIO29_ADC3` | `DRV_UART_ENA` |

---

[← Back to Ultralight N17 R1.5](../)
