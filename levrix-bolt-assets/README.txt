LEVRIX MARK ASSETS

levrix-mark-original.svg: Original two-color vector from the website. 42 x 47; white outline and red middle bar. This SVG by itself does not include chrome shading or motion.
levrix-mark-chrome.png: Original transparent silver/chrome raster image from the website. 128 x 128; ready to use as a static image.
levrix-logo-gradient.frag: Original fragment shader from the site's Logo Gradient component. This needs Framer's shader runtime, heightmap generation, vertex shader, and uniforms. It is reference source, not a standalone React component.
levrix-shader-settings.json: The logo's uniform values from the published component. The uniform palette uses white, near-black, red, white.

To scale the SVG responsively, add viewBox="0 0 42 47" to its root SVG element. The original file is preserved unchanged.
For the silver version, place the PNG in your project's public folder and render it with an img or Next Image component. Its background is transparent.

Sources:
https://levrix.framer.website/
https://framerusercontent.com/images/6HAKw8xX2ztkOBsKkBP8AFOluk.svg
https://framerusercontent.com/images/b2xkpGrYvkjqvkVsb2OlLXIKebg.png
https://framerusercontent.com/sites/4Z7cEeSSIs2Fk84VZZkJig/LogoGradient.BQG5fE_e.mjs
