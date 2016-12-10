/* global MathJax */
const React = require('react');
const loadScript = require('load-script');

const DEFAULT_SCRIPT = 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML';

const DEFAULT_OPTIONS = {
    tex2jax: {
        inlineMath: []
    },
    showMathMenu: false,
    showMathMenuMSIE: false
};

/**
 * Context for loading mathjax
 * @type {[type]}
 */
const MathJaxContext = React.createClass({
    propTypes: {
        children: React.PropTypes.node.isRequired,
        script:   React.PropTypes.string,
        options:  React.PropTypes.object
    },

    childContextTypes: {
        mathJax: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            script: DEFAULT_SCRIPT,
            options: DEFAULT_OPTIONS
        };
    },

    getInitialState() {
        return {
            loaded: false
        };
    },

    getChildContext() {
        return {

        };
    },

    componentDidMount() {
        const { script, options } = this.props;

        loadScript(script, (err) => {
            MathJax.Hub.Config(options);

            this.setState({
                loaded: true
            });
        });
    },

    render() {
        const { children } = this.props;
        return React.Children.only(children);
    }
});

module.exports = MathJaxContext;
