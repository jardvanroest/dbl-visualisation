# dbl-visualisation

## Prerequisites

- VSCode
  - This one is recommended, but not necessary. You can use whatever you like best, as long as it is supported by Prettier. For simplicity, this guide assumes you're using VSCode.
- Prettier
  - Prettier is a formatter. It can be used to automatically format your code in a nice way. By using it, we can make sure that code is formatted correctly and consistently throughout the project, which in the end will help with making the code easier to read.
  - Installation can be done via the VSCode marketplace, which you can find within VSCode in the left sidebar. After installation, go to some code file, do ctrl+shift+p -> format document. Click on okay and enable etc. Then do ctrl + , to go to settings, type in 'Format on save' and enable it. Now you're all set. Once you save a code file, it should be automatically formatted.
- NodeJS
  - NodeJS is a runtime environment for Javascript. It is needed for Vue.js. You can get it from their website. After downloading you can simply follow the installation wizard with the default settings.
- Vue syntax highlighting
  - Can be done using a VSCode plugin.. 'Vue' by Rahul Kadyan seems to be fine for this. You can get it from the VSCode marketplace.
- Git
  - Git is a version control system. You can get it from their website. For the installation you can just follow the installation wizard with default settings.
  - After installation you should connect your GitHub account to it. You can do so with the following guide https://docs.github.com/en/github/getting-started-with-github/set-up-git#connecting-over-https-recommended

## Running the project

First you need to clone the project. To do so, you can run `git clone https://github.com/jardvanroest/dbl-visualisation.git` in a terminal. This can be powershell, but it can also be the terminal within VSCode, that you can find by doing `ctrl + `\` while in VSCode. After this you run `npm install` in the project directory to install the dependencies. Finally, by running `npm run serve` you boot up the development server. Now you can view the project in your browser.

## Adding code to the project

Git allows for the creation of different branches. By using these you can keep the development of your feature seperate from the development of someone elses feature. Before you start adding code to the project, you should create your own branch and move to it. You can do this with `git checkout -b the-name-of-my-feature-branch`. You can then develop your feature here, regularly commiting your changes with `git commit -m "description of the small thing you added"` and regularly pushing these commits to GitHub with `git push`. When you're done with developing your feature, you can open a pull request inside GitHub and someone will review your work.

<!-- ## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/). -->
