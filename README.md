

# Pix

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.5.

## Nodejs express

1. npm install express
2. create pix/ directory at the same level as the server.js
3. copy pictures folder into pix directory
4. inside each directory pix/a pix/b -- generate json files with the same name as directories: pix/a/a.json pix/b/b.json 
5. for f in `ls pix/*`; do echo  {\"id\" : \""$f"\", \"txt\": \"pix of anna\" }, ; done > delete.json


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
