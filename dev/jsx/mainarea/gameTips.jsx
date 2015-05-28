var React = require('react');
var cookieParser = require('../../javascript/mozileCookieLib');

var GameTipsWrap = module.exports = React.createClass({
    getInitialState: function () {
        return {render: true}
    },
    componentWillMount: function () {
        var showTip = cookieParser.getItem('showTips');
        if (showTip === 'false') {
            this.setState({render: false})
        }
    },
    componentDidMount: function () {
        // show tips only once, when user first time visits page
        cookieParser.setItem('showTips', 'false')
    },
    render: function () {
        var tips;
        if (this.state.render) tips = <GameTips/>;
        else tips = null;

        return (

            <div className="tips-wrap">
            {tips}
            </div>

        )
    }
});

var GameTips = React.createClass({
    getInitialState: function () {
        return {
            tips: [
                {
                    body: 'Click on anywhere in playground to get distance measurements in pixels. Click again to remove it.',
                    removeWhen: {target: '.main-area', action: 'click'},
                    display: true
                },
                {
                    body: 'Click on <html/> button in the upper right corner to see HTML layout.',
                    removeWhen: {target: '#html-map-btn', action: 'click'},
                    display: true
                }
            ]
        }
    },

    removeTip: function (tipIndex) {
        var updateTips = this.state.tips;
        updateTips[tipIndex].display = false;
        this.setState({tips: updateTips});
    },
    render: function () {
        return (
            <div className="tips">
                {this.state.tips.map(function (tipData, index) {
                    if (tipData.display) {
                        return <Tip removeTip={this.removeTip.bind(this, index)} tipData={tipData}/>
                    }
                }.bind(this))}
            </div>
        )
    }
});

var Tip = React.createClass({
    getInitialState: function () {
        return {bounceOut: false}
    },
    componentDidMount: function () {
        var action = this.props.tipData.removeWhen.action;
        var targetElement = document.querySelector(this.props.tipData.removeWhen.target);
        var tipRemover = function() {
            targetElement.removeEventListener(action, tipRemover, false);
            this.setState({bounceOut: true});
            setTimeout(this.props.removeTip, 500);
        }.bind(this);

        targetElement.addEventListener(action, tipRemover);

    },
    render: function () {
        var className = this.state.bounceOut ? 'animated bounceOutLeft' : '';
        return (
            <div className={className}>
                {this.props.tipData.body}
            </div>
        )
    }
});