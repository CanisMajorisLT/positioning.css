var React = require('react');
var MovableObjects = require('./movableObjectsGenerator.jsx');
var WinConditionObjects = require('./winConditionObjects.jsx');
var HTMLmapWrap = require('./HTMLmap.jsx');

var MainAreaWrap = module.exports = React.createClass({
    getInitialState: function () {
        return {visible: 'objects'};
        /*@visible: 'objects' - means levels is in progress,
         *           'info1' - levels are in trasition, info should from the left, while objects should slide to the right.
         *           'info2' - levels are in trasition, info is in main window, while objects outside. Objects should be hidden and moved
         *           to the left side.
         *           'info3' - levels are in transition, info should slide out to the right, and objects slide out from the left.
         *           'info4' - levels finished transition, info should be hidden and moved to the left, while objects stay in focus  */
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextProps.data.level !== this.props.data.level) {
            console.log('MainAreaWrap you shall not update');
            console.log(nextState);
            return false
        }
        else if (this.state.visible === 'info4' && nextState.visible === 'objects') {
            console.log('MainAreaWrap you shall not update: this state = info4, next state = objects');
            return false
        }
        console.log(' MainAreaWrap you shall update');

        return true


    },
    nextLevel: function () {
        console.log('MainAreaWrap is setting state to info1');

        this.setState({visible: 'info1'})

    },
    componentDidUpdate: function () {
        if (this.state.visible === 'info1') {
            setTimeout(function () {
                console.log('MainAreaWrap is calling nextLevel on main and setting state to info2');
                this.props.nextLevel();
                this.setState({visible: 'info2'});

            }.bind(this), 1000)
        }
        else if (this.state.visible === 'info2') {
            setTimeout(function () {
                console.log('MainAreaWrap is setting state to info3');

                this.setState({visible: 'info3'});
            }.bind(this), 1000)
        }
        else if (this.state.visible === 'info3') {
            setTimeout(function () {
                console.log('MainAreaWrap is setting state to info4');

                this.setState({visible: 'info4'});
            }.bind(this), 1000)
        }
        else if (this.state.visible === 'info4') {
            console.log('MainAreaWrap is setting state to objects');

            this.setState({visible: 'objects'});
        }
    },

    handleHTMLmapHover: function (identifier, active) {
        //pass
    },
    render: function () {
        var sliderStyle;
        var objectsStyle;
        var level;
        console.log('MainAreaWrap info level', this.state.visible);

        if (this.state.visible === 'info1') {
            sliderStyle = {left: '0%'};
            objectsStyle = {left: '100%'};
            level = this.props.data.level + 1
        }
        else if (this.state.visible === 'info2') {
            sliderStyle = {left: '0%'};
            objectsStyle = {left: '-100%', display: 'hidden', transitionDuration: '0s'};
            level = this.props.data.level
        }
        else if (this.state.visible === 'info3') {
            sliderStyle = {left: '100%'};
            objectsStyle = {left: '0', display: 'block', transitionDuration: '1s'};
            level = this.props.data.level
        }
        else if (this.state.visible === 'info4') {
            sliderStyle = {left: '-100%', display: 'hidden'};
            objectsStyle = {left: '0', display: 'block'}
        }

        return (
            <div className="main-area">
                <div style={sliderStyle} id="slider">LEVEL {level}</div>
                <div style={objectsStyle}id="movable-objects">
                    <MovableObjects data={this.props.data} nextLevel={this.nextLevel} visible={this.state.visible}/>
                    <WinConditionObjects data={this.props.data}/>
                    <HTMLmapWrap data={this.props.data}/>
                </div>
            </div>
        )
    }
});

