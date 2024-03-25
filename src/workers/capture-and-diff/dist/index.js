"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capture_screen_1 = require("./capture-screen");
// Using settimeout for demo but i want to use setinterval later
setTimeout(() => {
    (0, capture_screen_1.captureScreen)();
}, 1000);
