/* global MathJax */
const React = require('react');
const createReactClass = require('create-react-class');
const PropTypes = require('prop-types');
const loadScript = require('load-script');

const DEFAULT_SCRIPT =
    'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML';

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
const MathJaxContext = createReactClass({
    
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


MathJaxContext.propTypes = {
    children: PropTypes.node.isRequired,
    script:   PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([false])
    ]),
    options:  PropTypes.object
};

MathJaxContext.childContextTypes = {
    MathJax: PropTypes.object
};

module.exports = MathJaxContext;
