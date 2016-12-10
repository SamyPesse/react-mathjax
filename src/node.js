const React = require('react');

/**
 * React component to render maths using mathjax
 * @type {ReactClass}
 */
const MathJaxNode = React.createClass({
    propTypes: {
        children: React.PropTypes.node.isRequired
    },

    componentDidMount() {

    },

    render() {
        return <div></div>;
    }
});

module.exports = MathJaxNode;
