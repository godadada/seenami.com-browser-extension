# seenami

Browser Extension for [www.seenami.com](https://www.seenami.com), which enables you to:

* Browse and search aggregated websites of top search engines, portals, online libraries, archives, databases, 
journals, museums, e-commerce, social networks, etc.
	
* Hand pick from large pool of websites which ones are of interest to you and used as sources 
for you to browse and search.
	
* If any websites of your interest are not in the pool, recommend them 
[here](https://github.com/godadada/seenami.com-browser-extension/issues). It usually takes minutes 
to add a website to the pool.

## youtube
	
* [youtube show](https://www.youtube.com/watch?v=e3SOy7TCD6I)

## Install

	$ npm install

## Development

    npm run dev chrome
    npm run dev firefox
    npm run dev opera
    npm run dev edge (todo)

## Build

    npm run build chrome
    npm run build firefox
    npm run build opera
    npm run build edge (todo)

## Environment

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. 

## Docs

* [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)

This extension enables browser to ignore Same Origin restriction in HTTP headers when embedding
third party web application in an iframe of [www.seenami.com](https://www.seenami.com) as long as the it is under the [www.seenami.com](https://www.seenami.com)
browser tab. The extension does not impact any web applications under the tabs other than [www.seenami.com](https://www.seenami.com)
tab.
Also the extension relays traffic from [www.seenami.com](https://www.seenami.com) application to the web application embedded in the iframe
of the [www.seenami.com](https://www.seenami.com) web application and executes the scripts generated in [www.seenami.com](https://www.seenami.com) on the web
application embedded in the iframe and returns the results to [www.seenami.com](https://www.seenami.com) web application for further processing.

Emphasis: All of above functions have to be under the [www.seenami.com](https://www.seenami.com) tab, no other tabs on the same browser are affected.

## Files:

    README
    manifest.json
    relay.js
    frame.js
    content.js

# seenami.com-browser-extension
