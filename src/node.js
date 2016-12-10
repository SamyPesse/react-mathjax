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

    componentDidMount() {
        this.typeset();
    },

    componentDidUpdate() {
        this.typeset();
    },

    /**
     * Prevent update when the tex has not changed
     */
    shouldComponentUpdate(nextProps) {
        return (nextProps.children != this.props.children);
    },

    /**
     * Clear the math when unmounting the node
     */
    componentWillUnmount() {
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
     * Update math in the node
     */
    typeset() {
        const { MathJax } = this.context;
        const { children, onRender } = this.props;

        const text = React.Children.only(children);

        if (!MathJax) {
            return;
        }

        if (this.script) {
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
        if (!this.script) {
            this.script = document.createElement('script');
            this.script.type = 'math/tex';
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
