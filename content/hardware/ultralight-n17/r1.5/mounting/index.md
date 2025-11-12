---
date: 2025-09-21
title: "Ultralight N17 R1.5 - Mounting"
author: "Ben @ Mettle & Byte"
description: "Physical installation and mounting instructions for the MnB Ultralight N17 r1.5."
---

[← Back to Ultralight N17 R1.5](../)

---

## Mounting

The Ultralight N17 can be bolted to the back of a NEMA17 motor using our [3D-printable spacer and 3010 fan mount](https://www.printables.com/model/1467100-mnb-ultralight-n17-open-frame-3010-fan-mount-pcb-s). This mounting system looks the part, enables active cooling and helps to organise your cabling.

{{< notice note >}}
**IMPORTANT**: ALL DIRECTIONS REFERENCE THE MOTOR AND PCB WITH THE MOTOR CONNECTOR AT 12 O'CLOCK.
{{< /notice >}}

### Hardware Required

- 2 x M3 Socket-head Cap Screws (SHCS) 5mm longer than the body-length of your motor
- 2 x M3x12mm SHCS
- 1 x 3010 Fan with PH 2.0 connector
- 1 x Printed PCB Mount with Encoder Hole (ASA or ABS)
- 1 x Printed Open Frame Fan Mount (ASA or ABS)

### Installation Steps

1. When looking at the back of your motor, remove the top right and bottom left bolts.

{{< notice warning >}}
**NEVER** remove more than 2 bolts at once as it may cause alignment issues with your motor.
{{< /notice >}}

2. Set up the jumpers on the Ultralight N17 (see [Wiring & Jumpers](../wiring)).

3. Bolt your fan into the mount using the 2 x M3x12mm SHCS. Ideally, use the top right and bottom left holes of the fan (when looking at the underside of the fan / fan mount) as the top left hole may interfere with the endstop connector.

   {{< notice note >}}
   Do not overtighten these bolts. They just need to thread into the printed part with very little torque required to hold the fan in effectively.
   {{< /notice >}}

4. Push any excess fan cable down the 2 sides of the fan that have a slight gap.

5. Place the Ultralight N17 onto the spacer board, then plug the endstop and fan connectors in. Plug the motor connector in on both ends.

6. Put the fan mount on top of the Ultralight N17, aligning the cut-out towards the left hand side to make room for your INPUT (XT30 2+2) cable.

7. Push your remaining M3 SHCS through the two mounting holes, using them to hold the 3d printed parts and the board together. Then position the board on the back of your motor, placing the long screws into the empty holes.

8. Push them in with an allen key until they bottom out and then tighten them into the front plate of the motor.

   {{< notice note >}}
   Again, you do not need much torque here. Too much will snap the fan mount.
   {{< /notice >}}

9. Plug in your INPUT connector and use the cable-tie channels in the spacer and fan mount to secure all of the wires.

---

## Important Warnings

### PH 2.0 Connector Strength

Be careful when removing connectors from the PH 2.0 receptacles. These have a rather high locking force and pulling on the connector only can sometimes separate the receptacle from the board. 

It is best to try and hold the receptacle and then pull the connector away from it while pushing slightly backwards, away from the locking tabs at the 'front' of the connector.

If you do find the receptacle comes away from the board when you remove the connector, you can simply push it back on to the pins. Adding a tiny dab of superglue on the underside of the receptacle between the pin holes will help to keep it in place next time.

---

[← Back to Ultralight N17 R1.5](../)
