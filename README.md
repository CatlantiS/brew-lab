# brew-lab

This is going to be a web app for creating, sharing and improving beer recipes. 

---

If you want to get the app running, you will need **PostGreSQL** for the backend (we are also in the process of migrating away from **MongoDB** which we used for proof of concept), and **npm** and **bower** for managing packages.

You can get npm with Node.js <a href="https://nodejs.org/download/" target="_blank">here</a>.

Once you clone the source, run 

`npm install` 

in the app root directory.  If you don't have bower, you can install it with 

`npm install -g bower` 

to install it globally.  Then run 

`bower install`

You will need gulp for the task runner 

`npm install -g gulp`

Execute gulp in the app root directory by typing `gulp` at the command line.  It will watch the app for changes and compile the necessary files.

Once you've done all that, you should be good to go.




