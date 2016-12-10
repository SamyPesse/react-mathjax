const React = require('react');
const ReactDOM = require('react-dom');
const MathJax = require('../src');

const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`;

const Example = React.createClass({
    render() {
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
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
