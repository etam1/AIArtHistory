### Hello Online Friend!

Thanks for taking interest in our research project in AI Art History! This should get you all set up with the scaffolding for a website that runs on a local server using JavaScript(with Node.js and Express), HTML + CSS.

Here are some instructions for running this starter code.
We're going to be using a command-line interface. (I'm writing this from the perspective of a Mac user using Terminal (zsh).

- If you're a Windows user, you might use Powershell.
- If you use Visual Studio Code, you might find [this page](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-beginners-tutorial) helpful.)

### 1. [Clone this repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to your computer.

'$ git clone https://github.com/etam1/AIArtHistory.git'

Once you've got it, [navigate to the directory](https://www.macworld.com/article/221277/command-line-navigating-files-folders-mac-terminal.html)
(ex: `$ cd AIArtHistory`)

### 2. [Make sure you have Node and npm installed.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Check to see if you can run `$ node -v` and `$ npm -v` (My versions are v20.15.1 for node and 10.7.0 for npm.)

### 3. Install the Express module using npm.

ex: `$ npm install express`

### 4. Run the example app using Node:

ex: `$ cd client` then `$ npm start`

You should see the message `Server is running on http://localhost:3000`

If you instead see an error message like `Error: Cannot find module 'express'` -- see step 3.

### 5. View your website

Open a web browser (e.g. Google Chrome) to this URL: `http://localhost:3000/`

You should see a delicious and fabulously designed website! Nice!

### 6. Make it your own!

Here's the file directory of this repository.

Edit the **HTML files** and the **CSS stylesheet** to make them your own!

Edit **App.js** if you want to add new pages, change how pages route to one another, if you've renamed your HTML files, etc.

```
AIArtHistory
└───client      // This where all of our content is stored
│  │
│  └───public
│  │  │
│  |  index.html        // The initial view for our webpage
│  │
│  └───src
│  │  │
│  │  └───components
│  │  │  │
│  |  │  InfiniteCanvasComponent.js     // This is the implementation of the infinite canvas
│  │  │  PostItNote.js      // This is the implementation of the post-it notes
│  │  │
│  │  App.js        // This is the main JavaScript file
│  │  App.css
│  │  index.js
│  │  index.css
│  │
│  └───...
│  package-lock.json
│  package.json
│  README.md
│
```

Alternatively: Delete everything and start over if you want to learn how to set this up on your own, or in your own way. Here are the pages I referenced, from which you can learn everything you need to set up this code on your own:

https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module"
https://expressjs.com/en/starter/hello-world.html
https://codeforgeek.com/render-html-file-expressjs/
https://stackoverflow.com/questions/32257736/app-use-express-serve-multiple-html
