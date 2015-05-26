var React = require('react');
var marked = require('marked');

var InfoBoard = module.exports = React.createClass({
    render: function () {
        var data = this.props.data;
        return (
            <div className="info-wrap">
                <div id="level-progress">
                    <div className="content">
                        <span onClick={this.props.previousLevel} className="level-control" id="prev-level">
                        <i className="fa fa-angle-double-left"></i>
                        </span>
                        Level {data.level} of {this.props.numberOfLevels}
                        <span onClick={this.props.nextLevel} className="level-control" id="next-level">
                        <i className="fa fa-angle-double-right"></i>
                        </span>

                    </div>
                </div>
                <div className="text-info" id="positioning-theory">
                                    <div className="title">Theory</div>
                    <div className="content">
                        <span dangerouslySetInnerHTML={{__html: marked(data.positioningTheory)}}></span>
                    </div>
                </div>
                <div className="text-info" id="level-explanation">
                    <div className="title">Instructions</div>
                    <div className="content">
                        <span dangerouslySetInnerHTML={{__html: marked(data.levelExplanation)}}></span>
                    </div>
                </div>
                <div className="text-info" id="not-allowed-input">
                        <div className="title">Not allowed to use</div>
                    <div className="content">
                        <span dangerouslySetInnerHTML={{__html: marked(data.notAllowedInput.join(', '))}}></span>
                    </div>
                </div>
            </div>
        )
    }
});