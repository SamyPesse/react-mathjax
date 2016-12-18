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
        script:   React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.oneOf([false])
        ]),
        options:  React.PropTypes.object
    },

    childContextTypes: {
        MathJax: React.PropTypes.object
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
            MathJax: typeof MathJax == 'undefined' ? undefined : MathJax
        };
    },

    componentDidMount() {
        const { script } = this.props;

        if (!script) {
            return this.onLoad();
        }

        loadScript(script, this.onLoad);
    },

    onLoad(err) {
        const { options } = this.props;
        MathJax.Hub.Config(options);

        this.setState({
            loaded: true
        });
    },

    render() {
        const { children } = this.props;
        return React.Children.only(children);
    }
});

module.exports = MathJaxContext;
