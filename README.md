# PlugPro [![Build Status](https://travis-ci.org/traviswimer/plugpro.png?branch=master)](https://travis-ci.org/traviswimer/plugpro)

> A more usable and professional layout for the [Plug.DJ](https://plug.dj/) music community

# !! THINGS ARE MESSY !!
About half a year ago, I was in the process of refactoring things in an attempt to clean things up before putting the code on Github. Then I stopped working on it. Now I'm finally putting it on Github (without the cleanup). So, for some reason a lot of unit tests are failing, and there is probably some code that makes absolutely no sense.

Anyway, the point is that any help is greatly appreciated. Have fun :-)


## How to contribute

### Get the code

First, you need to fork this repo.

Then clone it:
```
git clone https://github.com/YOUR-USERNAME/PlugPro
```

Then navigate into your new `PlugPro` directory and download the dependencies:
```
npm install
```
> If this didn't work, you need to [download Node and NPM](https://nodejs.org/).

### Do Work

This project uses [Gulp](https://github.com/gulpjs/gulp), so if neccessary, install it with:
```
npm install --g gulpjs
```

Now kick things off by simply running:
```
gulp
```
This will automatically build the project (into the `build` directory) and run unit tests when you make changes to the code.
>You can find additional gulp instructions in `gulpfile.js`

### Send in your code
When you've got your code nice and fancy, send a pull request. Try to keep the number of commits in a single pull request to a minimum. You can always make more pull requests.

### What should I work on?
If you're looking for how to help, check the current issues on the project. If there is something there you want to work on, just say so.

If there is a bug fix or a feature you would like to suggest, post it in the issues.

In general, you should probably leave a comment in the issues before working on something to make sure it is a desirable change. This may not be neccessary for everything, so use your best judgement.



