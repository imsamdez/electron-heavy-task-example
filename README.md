The purpose of this eletronjs is to learn how to handle heavy tasks.
From the doc, it says that heavy stuff shouldn't be run in the main process to prevent blocking the UI.
In fact, in my use case, i need to save images and compare them to find differences and it actually freeze the UI.

In this minimalist app, I try to capture a screen of a browser, save it as a file and then try to compare it using Jimp.
To do so, I created a worker named screen-and-capture responsible of doing the heavy stuff. In the main process, i'm spawning an utility process that execute the worker.

### Issues
1. Desktop Capturer is undefined in the utility process, why ?
2. I had to create a second tsconfig file in the worker folder and handle the compilation separatly in order to use typescript and deliver a .js file for the main process, is it the right way to do so ?
