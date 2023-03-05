let scale: number;
let max_x: number;
let max_y: number;
let pitch: number;
let roll: number;
let dot_brightness: number;
let dotx: number;
let doty: number;
let background: number;
//  A two-axis bubble level that uses the BBC microbit's accelerometer
led.setDisplayMode(DisplayMode.Greyscale)
let frame_bright = 10
let tgt_bright = 255
let bubble_bright = 100
//  draw a frame for the level 'bubble'
led.plotBrightness(2, 0, frame_bright)
led.plotBrightness(0, 2, frame_bright)
led.plotBrightness(4, 2, frame_bright)
led.plotBrightness(2, 4, frame_bright)
while (true) {
    scale = 30
    max_x = 2
    max_y = max_x
    pitch = input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    pitch = Math.trunc(pitch / scale)
    roll = Math.trunc(roll / scale)
    if (roll < -max_x) {
        roll = -max_x
    } else if (roll > max_x) {
        roll = max_x
    }
    
    if (pitch < -max_y) {
        pitch = -max_y
    } else if (pitch > max_y) {
        pitch = max_y
    }
    
    if (pitch == 0 && roll == 0) {
        dot_brightness = tgt_bright
        music.playTone(Note.C, music.beat(BeatFraction.Whole))
    } else {
        dot_brightness = bubble_bright
    }
    
    dotx = max_x - roll
    doty = max_y - pitch
    background = led.pointBrightness(dotx, doty)
    led.plotBrightness(dotx, doty, dot_brightness)
    if (dot_brightness == tgt_bright) {
        led.plotBrightness(dotx + 1, doty, dot_brightness)
        led.plotBrightness(dotx - 1, doty, dot_brightness)
        led.plotBrightness(dotx, doty + 1, dot_brightness)
        led.plotBrightness(dotx, doty - 1, dot_brightness)
    }
    
    pause(100)
    led.plotBrightness(dotx, doty, background)
    if (dot_brightness == tgt_bright) {
        led.plotBrightness(dotx + 1, doty, 0)
        led.plotBrightness(dotx - 1, doty, 0)
        led.plotBrightness(dotx, doty + 1, 0)
        led.plotBrightness(dotx, doty - 1, 0)
    }
    
}
