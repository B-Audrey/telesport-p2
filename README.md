# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.
This project uses Node v20.11.1, so before next step, think about using
```bash
nvm use
```
Then, you can install your node_modules before starting (`npm install`).


## Development server

Run `npm run start` for a dev server. The app will open on its onw woth "-o" option but otherwise, you can navigate to `http://localhost:4200/`. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Clean code
This project uses prettier, to keep code clean you can use (`npm run prettier:write`)

## Front-end
This project has now only the Front end, in src file, there is the app with 3 folders :
  - **core** : contains the basics of the app : app.ts, the main routing file and the global layout
  - **pages**: contains the main pages of the app
  - **shared**: contains folders that can be user in other files like
    - components that can be reused
    - models with interface
    - services that can be called from pages
    - utils will also be placed here

## Style
Global style is made in style.scss fil but responsive and page style is made into component style files for now
The user screen must be minimum 320px.
Style is made mobile first and there is for now only one breakpoint that is : 
- 768px


## Data
As there is no backend yet, the assets folder contains a mock file with olympic structure
