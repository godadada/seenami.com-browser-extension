# seenami

Browser Extension for seenami.com

## Install

	$ npm install

## Development

    npm run dev chrome
    npm run dev firefox
    npm run dev opera
    npm run dev edge

## Build

    npm run build chrome
    npm run build firefox
    npm run build opera
    npm run build edge

## Environment

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. 

## Docs

* [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)

This extension enables browser to ignore Same Origin restriction in HTTP headers when embedding
third party web application in an iframe of www.seenami.com as long as the it is under the www.seenami.com
browser tab. The extension does not impact any web applications under the tabs other than www.seenami.com
tab.
Also the extension relays traffic from www.seenami.com application to the web application embedded in the iframe
of the www.seenami.com web application and executes the scripts generated in www.seenami.com on the web
application embedded in the iframe and returns the results to www.seenami.com web application for further processing.

Emphasis: All of above functions have to be under the www.seenami.com tab, no other tabs on the same browser are affected.
Files:
 README
 manifest.json
 relay.js
 frame.js
 content.js

# seenami.com-browser-extension
