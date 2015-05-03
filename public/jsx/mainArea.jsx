var React = require('react');
var MovableObjects = require('./movableObjectsGenerator.jsx');
var WinConditionObjects = require('./winConditionObjects.jsx');
var HTMLmapWrap = require('./HTMLmap.jsx');
var debug = require('debug')('mainArea');

/**
 *  1. Passes on updated objects.
 *  2. Controls transitions between levels.*/
var MainAreaWrap = module.exports = React.createClass({
    getInitialState: function () {
        return {visible: 'objects'};
        /**@visible: 'objects' - means levels is in progress,
         *           'info1' - levels are in transition, info should slide from the left, while objects should slide to the right.
         *           'info2' - levels are in transition, info is in main window, while objects outside. Objects should be hidden and moved
         *           to the left side.
         *           'info3' - levels are in transition, info should slide out to the right, and objects slide out from the left.
         *           'info4' - levels finished transition, info should be hidden and moved to the left, while objects stay in focus
         *             */
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        if (nextProps.data.level !== this.props.data.level) {
            debug('MainAreaWrap you shall not update');
            debug(nextState);
            return false
        }
        else if (this.state.visible === 'info4' && nextState.visible === 'objects') {
            debug('MainAreaWrap you shall not update: this state = info4, next state = objects');
            return false
        }
        debug(' MainAreaWrap you shall update');

        return true


    },
    /**
     * Passed to MovableObjects and invoked from there.
     * */
    nextLevel: function () {
        // Actual nextLevel from parent is invoked only after info1 stage (when message about next level is displayed)
        debug('MainAreaWrap is setting state to info1');

        this.setState({visible: 'info1'})

    },
    /**
     * Controls transition between levels. After info1 stage nextLevel is called on parent.
     * */
    componentDidUpdate: function () {
        if (this.state.visible === 'info1') {
            setTimeout(function () {
                debug('MainAreaWrap is calling nextLevel on main and setting state to info2');
                this.props.nextLevel();
                this.setState({visible: 'info2'});

            }.bind(this), 1000)
        }
        else if (this.state.visible === 'info2') {
            setTimeout(function () {
                debug('MainAreaWrap is setting state to info3');

                this.setState({visible: 'info3'});
            }.bind(this), 1000)
        }
        else if (this.state.visible === 'info3') {
            setTimeout(function () {
                debug('MainAreaWrap is setting state to info4');

                this.setState({visible: 'info4'});
            }.bind(this), 1000)
        }
        else if (this.state.visible === 'info4') {
            debug('MainAreaWrap is setting state to objects');

            this.setState({visible: 'objects'});
        }
    },

    render: function () {
        var sliderStyle;
        var objectsStyle;
        var level;
        debug('MainAreaWrap info level', this.state.visible);

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

