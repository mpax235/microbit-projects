/*
MIT License

Copyright (c) 2025 mpax235

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

let item = neopixel.create(DigitalPin.P1, 8, NeoPixelMode.RGB);
let fanTestActive = false;
let buttonTestActive = false;
let ledBrightness = 0;
let version = '1.0';

serial.writeLine('micro:bit V2 Test Mode running!');
serial.writeLine('------------------------------------');
serial.writeLine(`Made by mpax235. Version ${version}`);

music.ringTone(1000);
pins.digitalWritePin(DigitalPin.P0, 0);

function continueTest() {
    input.onButtonPressed(Button.A, function() {
        buttonTestActive = true;
        music.stopAllSounds();
        buttonTest();
        return;
    });

    input.onButtonPressed(Button.B, function() {
        buttonTestActive = true;
        music.stopAllSounds();
        buttonTest();
        return;
    });
}

continueTest();

// test 1
function buttonTest() {
    if (!(buttonTestActive)) return;

    serial.writeLine('Test 1: Button Test');
    serial.writeLine('Press A or B, A+B to continue.');
    input.onButtonPressed(Button.A, function() {
        serial.writeLine('Button A pressed');
        music.ringTone(1000);
        basic.pause(200);
        music.stopAllSounds();
    });

    input.onButtonPressed(Button.B, function() {
        serial.writeLine('Button B pressed');
        music.ringTone(1000);
        basic.pause(200);
        music.stopAllSounds();
    });

    input.onButtonPressed(Button.AB, function() {
        serial.writeLine('Moving on to the next test. Button A + B pressed.');
        music.ringTone(1050);
        basic.pause(500);
        music.stopAllSounds();
        buttonTestActive = false;
        stopButtonTest();
        soundTest();
    });
}

function stopButtonTest() {
    input.onButtonPressed(Button.A, function() {});
    input.onButtonPressed(Button.B, function() {});
    input.onButtonPressed(Button.AB, function() {});
}

// test 2
function soundTest() {
    serial.writeLine('Test 2: Sound Test');
    music.play(music.stringPlayable('C C C C C C C C', 500), music.PlaybackMode.UntilDone);
    music.play(music.stringPlayable('D D D D D D D D', 500), music.PlaybackMode.UntilDone);
    music.play(music.stringPlayable('E E E E E E E E', 500), music.PlaybackMode.UntilDone);
    music.play(music.stringPlayable('F F F F F F F F', 500), music.PlaybackMode.UntilDone);
    music.play(music.stringPlayable('G G G G G G G G', 500), music.PlaybackMode.UntilDone);
    music.play(music.stringPlayable('A A A A A A A A', 500), music.PlaybackMode.UntilDone);
    music.play(music.stringPlayable('B B B B B B B B', 500), music.PlaybackMode.UntilDone);
    music.play(music.stringPlayable('C5 C5 C5 C5 C5 C5 C5 C5', 500), music.PlaybackMode.UntilDone);
    initFanTest();
}

// test 3
function initFanTest() {
    fanTestActive = true;
    fanTest();
}

function fanTest() {
    if (!(fanTestActive)) return;

    serial.writeLine('Test 3: Motor Test. Press A or B to spin the fan. A+B to move to the next test.');
    input.onButtonPressed(Button.A, function() {
        if (pins.digitalReadPin(DigitalPin.P0) === 0) {
            serial.writeLine('Starting Motor because Button A was pressed');
            pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
            serial.writeLine('Stopping Motor because Button A was pressed');
            pins.digitalWritePin(DigitalPin.P0, 0);
        }
    });
    input.onButtonPressed(Button.B, function() {
        if (pins.digitalReadPin(DigitalPin.P0) === 0) {
            serial.writeLine('Starting Motor because Button B was pressed');
            pins.digitalWritePin(DigitalPin.P0, 1);
        } else {
            serial.writeLine('Stopping Motor because Button B was pressed');
            pins.digitalWritePin(DigitalPin.P0, 0);
        }
    });
    input.onButtonPressed(Button.AB, function() {
        serial.writeLine('Moving on to the next test. Button A + B pressed.');
        music.ringTone(1050);
        basic.pause(500);
        music.stopAllSounds();
        fanTestActive = false;
        stopFanTest();
        rainbowLEDTest();
    });
}

function stopFanTest() {
    input.onButtonPressed(Button.A, function() {});
    input.onButtonPressed(Button.B, function() {});
    input.onButtonPressed(Button.AB, function() {});
}

// test 4
function rainbowLEDTest() {
    serial.writeLine('Test 4: Rainbow LED');

    item.showRainbow(1, 360);
    serial.writeLine('Rainbow LED\'s has been turned on!');

    for (let i = 0; i < 100; i++) {
        item.show();
        item.rotate(1);
        basic.pause(100);
    }

    serial.writeLine('Moving on to the next test!');
    music.ringTone(1050);
    basic.pause(500);
    music.stopAllSounds();
    item.clear();
    item.show();
    screenTest();
}

// test 5
function screenTest() {
    serial.writeLine('Test 5: Screen Test')
    basic.showLeds(`
        #####
        #####
        #####
        #####
        #####
    `);

    serial.writeLine('Contrast test!');
    for (let i = 0; i < 255; i++) {
        ledBrightness++;
        led.setBrightness(ledBrightness);
        basic.pause(50);
    }
    serial.writeLine('The Screen\'s LED\'s will be all red for 20 seconds.');
    basic.pause(20000);
    serial.writeLine('Moving on to the next test!');
    music.ringTone(1050);
    basic.pause(500);
    music.stopAllSounds();

    basic.showLeds(`
        .....
        .....
        .....
        .....
        .....
    `);

    logoTest();
}

// test 6
function logoTest() {
    serial.writeLine('Test 6: Logo Test');
    serial.writeLine('Touch the logo to get beeps. Press A+B to complete the micro:bit V2 Test!');

    input.onLogoEvent(TouchButtonEvent.Pressed, function() {
        music.ringTone(1050);
        basic.pause(500);
        music.stopAllSounds();
    });

    input.onButtonPressed(Button.AB, function() {
        music.ringTone(1050);
        basic.pause(500);
        music.stopAllSounds();
        stopLogoTest();
        fontTest();
    });
}

function stopLogoTest() {
    input.onLogoEvent(TouchButtonEvent.Pressed, function() {});
    input.onButtonPressed(Button.AB, function() {});
}

// test 7 (final test)
function fontTest() {
    serial.writeLine('Final Test: Font Test');

    for (let charCode = 32; charCode < 126; charCode++) {
        basic.showString(String.fromCharCode(charCode), 0);
        basic.pause(150);
    }
    music.ringTone(1050);
    basic.pause(500);
    music.stopAllSounds();

    basic.showLeds(`
        .....
        .....
        .....
        .....
        .....
    `);

    testCompleted();
}

// tell the user that the test is completed
function testCompleted() {
    serial.writeLine('micro:bit V2 Test completed!');
    basic.showString('Test completed!');
    basic.showLeds(`
        .....
        .#.#.
        .....
        #...#
        .###.
    `);
    basic.pause(2000);
    control.reset();
}