# Slush AAP PoC details

We developed the Slush generator for AAP PoC to generate the web app and build the code using gulp.

## Gulp task :

  * build - Build the App code base and minify the css & js files, and build the 'dist' folder (gulp build).
  * default - This will be run as default gulp task.
  * clean - It will Remove the existing dist files once when we Build the code.
  * browsersync - Its used to automatically load the browser once gulp command (i.e)gulp is given.
  * sass - Sass process to convert the sass into css.
  * watch - Watchers to watch the changes in files and to reload the browser.
  * useref - In this Section optimisation of css and js takes place,(i.e) Minification of Code.