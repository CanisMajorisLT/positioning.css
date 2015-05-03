var React = require('react');


// TODO cia sita tai tikrai reikia perdaryti
var MessageFlash = module.exports = React.createClass({
    getInitialState: function () {
        return {display: 'block'}
    },

    shouldComponentUpdate: function (nextProps, nextState) {

        // update only if got new props or going from display: block to display: none
        return this.props.message !== nextProps.message ||
               (nextState.display === 'none' && this.state.display !== 'none')
    },
    componentWillReceiveProps: function () {
        // make display: block so when rendering new props text will be visible
        this.setState({display: 'block'});
    },

    componentDidUpdate: function (prevProps) {
        setTimeout(function () {
            this.setState({display: 'none'})
        }.bind(this), 2000)
    },

    render: function () {
        console.log('iam displayign da message');
        var styles = {display: this.state.display};
        return (
            <div style={styles} id="message-flash">{this.props.message}</div>
        )
    }
});