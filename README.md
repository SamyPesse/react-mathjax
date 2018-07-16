# `react-mathjax`

[![NPM version](https://badge.fury.io/js/react-mathjax.svg)](http://badge.fury.io/js/react-mathjax)

React component to display math formulas.

### Installation

```
$ npm i react-mathjax --save
```

### Usage

Use `Stirng.raw` to avoid escaping javascript strings manually.

You could render it at https://www.codecogs.com/latex/eqneditor.php.
 
```js
const MathJax = require('react-mathjax')
const tex = String.raw`f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi`

module.exports = () => {
    return (
        <MathJax.Provider>
            <div>
                This is an inline math formula: <MathJax.Node inline formula={'a = b'} />
                And a block one:

                <MathJax.Node formula={tex} />
            </div>
        </MathJax.Provider>
    );
}
```
