# <img height="250" alt="portfolio_view" src="https://raw.githubusercontent.com/undernotic/readery/master/img/readery.png">

[![Build Status](https://travis-ci.org/UnderNotic/readery.svg?branch=master)](https://travis-ci.org/UnderNotic/readery)
[![BCH compliance](https://bettercodehub.com/edge/badge/UnderNotic/readery?branch=master)](https://bettercodehub.com/)
[![dependencies Status](https://david-dm.org/undernotic/readery/status.svg)](https://david-dm.org/undernotic/readery)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![NPM](https://nodei.co/npm/readery.png)](https://nodei.co/npm/readery/)

Big file loader in chunks for browser


# Installing

Package is available in npm. 
It's in umd,es and iife format so it will work correctly with all popular bundlers(webpack) and also nodejs.

```bash
npm install readery --save
```

Using yarn

```bash
yarn add readery --save
```

For direct usage without bundler, use iife format and import file directly:

```html
<script src="dist/readery.iife.min.js"></script>
```

# API
```javascript
import {readFromFile} from "readery"

readFromFile(readFromFile(
  file,
  dataCb,
  loadingProgressCb = progress => {},
  finishedCb = () => {},
  config = { splitBy: /\r?\n/, encoding: "UTF-8" },
  chunkSize = 256 * 1024
)
```
If splitBy is undefined then there is no splitting.


# Example usage
```html
<body>
    <input type="file" id="file-input" name="file" />
    <script>
        function handleFileSelect(evt) {
            var file = evt.target.files[0];
           
            readery.readFromFile(file, d => {
                console.log("Chunk = ", d);
                }, 
                p => { console.log("Progress: " + p) }, 
                () => {  console.log("finished") 
            });
        }
        document.getElementById('file-input').addEventListener('change', handleFileSelect, false);
    </script>
</body>
```
# Compatibility
* browser with FileReader compatibility IE11 => 11, for details see https://caniuse.com/#search=FileReader

# Licensing
The code in this project is licensed under MIT license.