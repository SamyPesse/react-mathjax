const React = require('react');
const process = require('./process');

/**
 * React component to render maths using mathjax
 * @type {ReactClass}
 */
const MathJaxNode = React.createClass({
    propTypes: {
        inline:   React.PropTypes.bool,
        children: React.PropTypes.node.isRequired,
        onRender: React.PropTypes.func
    },

    contextTypes: {
        MathJax: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            inline:   false,
            onRender: () => {}
        };
    },

    /**
     * Render the math once the node is mounted
     */
    componentDidMount() {
        this.typeset();
    },

    /**
     * Update the jax, force update if the display mode changed
     */
    componentDidUpdate(prevProps) {
        const forceUpdate = prevProps.inline != this.props.inline;
        this.typeset(forceUpdate);
    },

    /**
     * Prevent update when the tex has not changed
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextProps.children != this.props.children
            || nextProps.inline != this.props.inline
            || nextContext.MathJax != this.context.MathJax
        );
    },

    /**
     * Clear the math when unmounting the node
     */
    componentWillUnmount() {
        this.clear();
    },

    /**
     * Clear the jax
     */
    clear() {
        const { MathJax } = this.context;

        if (!this.script || !MathJax) {
            return;
        }

        const jax = MathJax.Hub.getJaxFor(this.script);
        if (jax) {
            jax.Remove();
        }
    },

    /**
     * Update math in the node.
     * @param {Boolean} forceUpdate
     */
    typeset(forceUpdate) {
        const { MathJax } = this.context;
        const { children, onRender } = this.props;

        if (!MathJax) {
            return;
        }

        const text = children;

        if (forceUpdate) {
            this.clear();
        }

        if (!forceUpdate && this.script) {
            MathJax.Hub.Queue(() => {
                const jax = MathJax.Hub.getJaxFor(this.script);

                if (jax) jax.Text(text, onRender);
                else {
                    const script = this.setScriptText(text);
                    process(MathJax, script, onRender);
                }
            });


        } else {
            const script = this.setScriptText(text);
            process(MathJax, script, onRender);
        }
    },

    /**
     * Create a script
     * @param  {String} text
     * @return {DOMNode} script
     */
    setScriptText(text) {
        const { inline } = this.props;

        if (!this.script) {
            this.script = document.createElement('script');
            this.script.type = 'math/tex; ' + (inline ? '' : 'mode=display');
            this.refs.node.appendChild(this.script);
        }

        if ('text' in this.script) {
            // IE8, etc
            this.script.text = text;
        } else {
            this.script.textContent = text;
        }

        return this.script;
    },

    render() {
        return <span ref="node" />;
    }
});

module.exports = MathJaxNode;
