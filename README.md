# `react-mathjax`

[![NPM version](https://badge.fury.io/js/react-mathjax.svg)](http://badge.fury.io/js/react-mathjax)

React component to display math formulas.

### Installation

```
$ npm i react-mathjax --save
```

### Basic Usage

```js
const MathJax = require('react-mathjax')
const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`

module.exports = () => {
    return (
        <MathJax.Context>
            <div>
                This is an inline math formula: <MathJax.Node inline>{'a = b'}</MathJax.Node>
                And a block one:

                <MathJax.Node>{tex}</MathJax.Node>
            </div>
        </MathJax.Context>
    );
}
```

### Text and equations

If you want to render TeX with text + equations in line, you can simply pass in `tex2jax` options to MathJax and use the `Context` component:

```js
const options = {
  showProcessingMessages: false,
  messageStyle: 'none',
  showMathMenu: false,
  tex2jax: {
    processEnvironments: true,
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    preview: 'none',
    processEscapes: true
  }
};

module.exports = () => {
    return (
      <MathJax.Context options={options}>
        <div>
          Here is a $r_2(n) = \\{ (a,b) \\in \\mathbb{Z} | a^2 + b^2 = n \\}$, which counts the number of representations of $n$ as a number of 2 squares.
        </div>
      </MathJax.Context>
    );
};
```
