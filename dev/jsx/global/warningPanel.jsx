var React = require('react');

var warningPanel = module.exports = React.createClass({
    getInitialState: function () {
        return {offset: {top: 0, left: 0}, display: '?'}
    },

    componentDidMount: function () {
        window.addEventListener('scroll', this.stateOffsetUpdate);
    },

    hide: function () {
        window.removeEventListener('scroll', this.stateOffsetUpdate, false);
        this.setState({display: 'none'})

    },

    stateOffsetUpdate: function () {
        var newOffsetTop = window.pageYOffset;
        var newOffsetLeft = window.pageXOffset;
        this.setState({offset: {top: newOffsetTop, left: newOffsetLeft}});
    },
    render: function () {
        var styles = {
            top: this.state.offset.top,
            left: this.state.offset.left
        };

        if (this.state.display === 'none') {
            styles.display = 'none'
        }

        return (
            <div style={styles} id="screen-size-warning">
                <div>
                    <h1>Be careful!</h1>
                    <p>This is best viewed on bigger displays than phones.</p>
                    <button onClick={this.hide}>Just show me the website</button>
                </div>
            </div>
        )
    }
});
