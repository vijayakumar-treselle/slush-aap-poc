Readme for Slush AAP PoC details

We developed the Slush generator for AAP PoC to generate the web app and build the code using gulp.

Gulp task :
 1. build - Build the App code base and minify the css & js files, and build the 'dist' folder (gulp build).
 2. default - This will be run as default gulp task.
 3. clean - It will Remove the existing dist files once when we Build the code.
 4. browsersync - Its used to automatically load the browser once gulp command (i.e)gulp is given.
 5. sass - Sass process to convert the sass into css.
 6. watch - Watchers to watch the changes in files and to reload the browser.
 7. useref - In this Section optimisation of css and js takes place,(i.e) Minification of Code. 