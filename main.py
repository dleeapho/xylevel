# A two-axis bubble level that uses the BBC microbit's accelerometer
led.set_display_mode(DisplayMode.GREYSCALE)

frame_bright = 10
tgt_bright = 255
bubble_bright = 100

# draw a frame for the level 'bubble'
led.plot_brightness(2, 0, frame_bright)

led.plot_brightness(0, 2, frame_bright)

led.plot_brightness(4, 2, frame_bright)

led.plot_brightness(2, 4, frame_bright)

while True:
    scale = 30
    max_x = 2
    max_y = max_x
    
    pitch = input.rotation(Rotation.PITCH)
    roll = input.rotation(Rotation.ROLL)
    pitch = int(pitch / scale)
    roll = int(roll / scale)

    if roll < -max_x:
        roll = -max_x
    elif roll > max_x:
        roll = max_x
    
    if pitch < -max_y:
        pitch = -max_y
    elif pitch > max_y:
        pitch = max_y

    if pitch == 0 and roll == 0:
        dot_brightness = tgt_bright
        music.play_tone(Note.C, music.beat(BeatFraction.WHOLE))
    else:
        dot_brightness = bubble_bright

    dotx = max_x - roll
    doty = max_y - pitch

    background = led.point_brightness(dotx, doty)
    led.plot_brightness(dotx, doty, dot_brightness)
    if dot_brightness == tgt_bright:
        led.plot_brightness(dotx + 1, doty, dot_brightness)
        led.plot_brightness(dotx - 1, doty, dot_brightness)
        led.plot_brightness(dotx, doty + 1, dot_brightness)
        led.plot_brightness(dotx, doty - 1, dot_brightness)
        
    pause(100)
    
    led.plot_brightness(dotx, doty, background)
    if dot_brightness == tgt_bright:
        led.plot_brightness(dotx + 1, doty, 0)
        led.plot_brightness(dotx - 1, doty, 0)
        led.plot_brightness(dotx, doty + 1, 0)
        led.plot_brightness(dotx, doty - 1, 0)
    
    