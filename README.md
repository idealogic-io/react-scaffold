# Scaffold

![alt text](https://idealogic.dev/logo192.png)

## Description

This branch was forked from the basic web3 scaffold with the aim of creating a template for even faster creation and deployment of uncomplicated DApp applications. The project utilizes a set of libraries including Rainbow-kit, wagmi, and view, which "out-of-the-box" fully take over the management and handling of all issues related to connecting the application to the web3 network, reading and writing data in the web3 network, multicalls, and many other functions.

One downside of this approach is that it's quite challenging to customize the blockchain interaction logic if the project requires any non-standard solutions in this regard, as all the "under-the-hood" logic is handled by the libraries. Therefore, for creating large and complex DApps that require equally complex and non-standard solutions, using this scaffold is not recommended due to customization difficulties.

This scaffold is perfectly suited for small DApps with straightforward logic and allows for significantly reducing the time-to-market and the development time.

## Requirements

Node version >18.0.0

## Scripts

### Notes for scripts

`react-scripts` do not work correctly in this project because `webpack` has in issues with some npm packages. So we use `react-app-rewired` (https://github.com/timarney/react-app-rewired#readme). In addition with that package `config-overrides.js` is created in root directory. Define your own rules in that file to rewrite default webpack configuration.

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000)

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

To run build locally use:\
`npm install -g serve`\
`serve -s build`

### `npm run lint`

Starts linter to check code for warning and errors. You can't push into repository with linter warnings/errors.

### `npm run lint:fix`

Not recommended!!!\
Starts linter to check code for warning and errors and fix them automatically.

### `npm run format`

Runs prettier to format your code. Rules for prettier are defined in `.prettierrc.js`.

### `npm run storybook`

Runs storybook for all created components with `.stories.tsx` file extension. Please develop UIKit elements with storybook.
Open [http://localhost:6006](http://localhost:6006)

### `npm run typechain`

Generates types for abi files in `/src/configs/abi`. New types will be stored in `/src/configs/abi/types`. Now when creating a new contract with `useContract` pass generic which is imported from that folder. Example: `useContract<Erc20>`. Now all methods of the contract will be available and visible for typescript.

## Authors

[Idealogic.dev](https://idealogic.dev/)

## Project status

Development
