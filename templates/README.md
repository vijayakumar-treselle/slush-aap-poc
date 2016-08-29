# Slush AAP PoC details

Developed the Slush generator for AAP PoC to generate the web app and build the code using gulp.

## Gulp build process:

1. Enter into working directory through command prompt or terminal
2. Enter 'gulp' to run the App (The App will be open in default browser and it's will live reload the page once we done any change in html view files)
3. Enter the comment 'gulp build' to build the App (minify the css & js files, and build 'dist' folder)

## Gulp task :

  * build - Build the App code base and minify the css & js files, and build the 'dist' folder (gulp build).
  * default - This will be run as default gulp task.
  * clean - It will Remove the existing dist files once when we Build the code.
  * browsersync - Its used to automatically load the browser once gulp command (i.e)gulp is given.
  * sass - Sass process to convert the sass into css.
  * watch - Watchers to watch the changes in files and to reload the browser.
  * useref - In this Section optimisation of css and js takes place,(i.e) Minification of Code.
