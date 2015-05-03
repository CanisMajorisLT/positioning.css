var React = require('react');

var InfoBoard = module.exports = React.createClass({
    render: function () {
        var data = this.props.data;
        return (
            <div className="info-wrap">
                <div className="text-info" id="level-explanation"><i className="fa fa-check"></i> {data.levelExplanation}</div>
                <div className="text-info" id="not-allowed-input"><i className="fa fa-ban"></i> {data.notAllowedInput.join(', ')}</div>
                <div className="text-info" id="positioning-theory">{data.positioningTheory}</div>
            </div>
        )
    }
});