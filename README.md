# A virtual reality keyboard and text editor in Aframe... cause why not?

![Screenshot](/screenshot.png "A virtual reality keyboard and text editor in Aframe... cause why not?")

This is a demo of a VR keyboard and text editor built with [Aframe](https://aframi.io). My inspiration was in wanting a way to type and get visual feedback in 3D. While re-creating our 2D interfaces in VR worlds is probably an anti-pattern, I prefer typing over oral dictation, so I wanted a way to visualize typing in three dimensions.


I used [D3]() to set up the keyboard layout and Dmitriy Kubyshkin's [canvas-text-editor](https://github.com/grassator/canvas-text-editor) project for the text editor.

Going forward, there's a lot of work that needs to be done with the keyboard. It's very buggy and does not work on mobile yet - that's just a matter of me finding the time to debug it.

# Install

Use `npm install` or `yarn install` which will install all dependencies and automatically run `webpack` to build the project.

# Run

Use [Jekyll](https://jekyllrb.com/) or your preferred static file host to serve the files. Then navigate to `http://localhost:4000` (or wherever you have your files hosted). If you try to load index.html directly, you will likely see an error.

# To Dos

It's still super buggy because I'm not done with it yet! Here are the bugs that I'm aware of:

- [ ] The semi-colon key does not render which appears to be a bug with either Aframe or the `kframe/text` module
- [ ] The letters are not rendering on mobile browsers
- [ ] Mobile browsers are showing `undefinedundefinedundefined` in the editor before the user types anything
- [ ] I'd like to add some padding around the edges of the text editor
- [ ] The keys don't visually press when you are pressing shift
- [ ] Rewrite this without D3... it's not necessary and probably slows things down
- [ ] Add SHIFT, CMD, OPTION keys, numbers, etc...
- [ ] Allow some sort of more flexible keyboard layout so that we could support other languages and such
- [ ] Break the keyboard and text editor into their own proper Aframe components
- [ ] Rewrite the canvas text editor from scratch... it's not that hard and the way it's currently using a textarea isn't suited for VR
- [ ] Get Webpack working with static CSS/GLSL/etc assets so we can include Aframe from source

# License

[MIT Licensed](LICENSE)
