---
date: 2025-09-21
title: "Ultralight N17 R1.5 - Wiring & Jumpers"
author: "Ben @ Mettle & Byte"
description: "Pinout reference and jumper configuration for the MnB Ultralight N17 r1.5."
---

[← Back to Ultralight N17 R1.5](../)

---

## Contents

- [What's Included](#whats-included)
- [What You'll Need](#what-youll-need)
- [Jumper Configuration](#jumper-configuration)

---

## What's Included

```
1  x Mettle & Byte Ultralight N17, R1.5
1  x 70mm Motor Cable XH 2.5 to PH 2.0 (crimped, install correct connector for your motor)
1  x Valcon PH 2.0 connector, 6 pin
1  x Valcon PH 2.0 connector, 4 pin
1  x Valcon PH 2.0 connector, 3 pin
1  x Valcon PH 2.0 connector, 2 pin
1  x Valcon XH 2.5 connector, 4 pin
5  x Jumpers, 2.0 pitch, 2 pin
10 x Valcon PH 2.0 crimps 
```

## What You'll Need

3D Printed parts shown in product images are not included, but the models are available for free on Printables (see [Mounting](../mounting)).

**Required:**
- NEMA17 bipolar stepper motor (4 wire)
- XT30 2+2 cable - we recommend the [Mellow Fly CAN Cable](https://www.aliexpress.com/item/1005007527109751.html)

**Optional:**
- Fan for active cooling at higher current limits (must match your chosen IO voltage: 5v, 12v or 24v)
- Endstop switch (must match your chosen IO voltage)
- [Gdstime 3010, 24v fan with PH 2.0 connector](https://www.aliexpress.com/item/4000256787938.html) is perfect for active cooling

{{< notice note >}}
Right angle XT30 2+2 cables are probably not compatible with our fan mount due to insufficient clearance for the cable lip.
{{< /notice >}}

---

## Jumper Configuration

Properly configuring your jumpers is essential for correct operation.

| Header | Function                   | Configuration                                                                                                                                                                                    |
| :----- | :------------------------  | :--------------------                                                                                                                                                                                            |
| `NPN`  | **Endstop Input Type**    | Install a jumper to configure the `STOP` input for NPN-style (sinking) endstops. Leave the jumper off for PNP (sourcing) endstops.                                                         |
| `VIO`  | **IO Output Voltage**     | Install a jumper between 5v, 12v or VIN and one of the output pins to set the IO voltage. Applies to `STOP` and `AUX`. **ONE JUMPER ONLY!**                                                         |
| `CAN`  | **CAN Bus Source**        | Switches between hardware (RRF) or software (Klipper / custom) CAN control. Install two horizontal jumpers facing inwards from the **H** mark for RRF, or two jumpers facing inwards from the **S** mark for Klipper / custom. |
| `TERM` | **CAN Bus Termination**   | Install jumper to terminate the CAN bus with 2 x 60Ω resistors if this device is the end of the bus.                                                                                       |

### Driver Communication Mode (UART vs. SPI)

The TMC2240 driver can be controlled via UART or SPI.

*   **Default Mode (UART):** For maximum compatibility, the board defaults to **UART mode**. In your firmware, you only need to define the UART pin for the TMC2240, which is connected to `GPIO1` of the RP2350.
*   **Enabling SPI Mode:** To use the faster SPI interface, you must configure `GPIO29` in your firmware. During your firmware's startup sequence, drive `GPIO29` **LOW**. This will switch the TMC2240 into SPI mode before any communication attempts are made.

---

For detailed pinout information, see the [Pinout Reference](../pinout).

[← Back to Ultralight N17 R1.5](../)
