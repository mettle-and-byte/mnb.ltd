---
date: 2025-09-21
title: "Ultralight N17 R1.5 - Extensions"
author: "Ben @ Mettle & Byte"
description: "Information about extensions / expansions for the Ultralight N17"
---

[← Back to Ultralight N17 R1.5](../)

---

## Extensions

The Ultralight N17 was designed to accept additional, directly connected PCBs or flexible cables that can connect into the 20 pin `HC-PBB40C-20DP-0.4V-02` connector on the back of the board.

This connector exposes `PVIN` at **~1.3A Max**, `+12v`, `+5v` and `+3.3v` each at **0.3A Max**, 4 x GPIO directly connected to the RP2350 (**UNPROTECTED**) and 3 x encoder pins directly connected to the TMC2240 (**UNPROTECTED**).

### Undercarriage - Closed Loop

**Status:** Work in Progress - boards exist, encoders need soldering and then testing with PIO-based SPI.

The Closed Loop Undercarriage is an extension board for the Ultralight N17 which attaches a magnetic encoder (AS5047P or D) to the 4 x GPIO pins on the RP2350, and 3 x encoder pins on the TMC2240.

With further software work on the RRF side, this means the Ultralight N17 will be able to run in closed-loop mode, using direct phase stepping just like the Duet3D M23CLs!

My target for this is a rough price of £15-20, which will allow upgrading existing open-loop-only Ultralight N17s to closed loop mode.

### Undercarriage - IO

**Status:** Idea stage.

The IO Undercarriage will be an extension board that adds further inputs and outputs to the Ultralight N17, connecting them to the 4 x GPIO pins exposed via the expansion connector on the RP2350.

This could expose a mix of endstop style inputs, thermistor inputs or similar, and PWM outputs.


## Ideas

If you have any ideas for new extensions or are interested in the extensions above then please do get in touch via email - [undercarriage@mnb.ltd](mailto:undercarriage@mnb.ltd).
