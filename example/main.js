/* @flow */
import * as React from 'react';
import ReactDOM from 'react-dom';
import MathJax from '../src';

const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`;

class Example extends React.Component<*, *> {
    render() {
        return (
            <MathJax.Provider>
                <div>
                    This is an inline math formula:{' '}
                    <MathJax.Node inline formula={'a = b'} />
                    And a block one:
                    <MathJax.Node formula={tex} />
                </div>
            </MathJax.Provider>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('example'));
