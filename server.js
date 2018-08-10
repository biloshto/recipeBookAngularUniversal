'use strict';

// require is a node.js import syntax
require('zone.js/dist/zone-node');
require('reflect-metadata');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist-server/main.bundle');

function angularRouter(req, res) {
  res.render('index', {req, res});
}
// we're on the server side and we obviously get requests and can send responses

const app = express();

app.engine('html', ngUniversal.ngExpressEngine({
  boostrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
app.set('view engine', 'html');
app.set('views', 'dist');

app.get('/', angularRouter);
// we render our root page through angularRouter at all times so that we don't accidentally try to serve the index.html file as a static file

app.use(express.static(`${__dirname}/dist`));
// but then anything else that's not our root page generally gets handled as a static file, so if we target some .jpg file we want to serve that statically

app.get('*', angularRouter);
// and any other route, which is our domain/something then again gets handled through the angularRouter

app.listen(3000, () => {
  console.log('Listening on port 3000');
})


// a simple node express server for prerendering Angular front-end
// we need to install the following packages:

// $ npm install --save express
// express is a popular node.js framework

// $ npm install --save @nguniversal/express-engine
// this is a rendering engine for an express project which allows us to render our template, our JavaScript/Angular template to HTML we can serve in the end

// $ npm install --save @nguniversal/module-map-ngfactory-loader
// this is basically a package which allows the server side, the code there, to correctly handle all the modules we have in our project, and correctly load them all through a special factory where we basically create them here

// to execute our server.js file we use node with the following command:
// $ node server.js