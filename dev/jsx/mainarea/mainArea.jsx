var React = require('react');
var MovableObjects = require('./movableObjectsGenerator.jsx');
var WinConditionObjects = require('./winConditionObjects.jsx');
var HTMLmapWrap = require('./HTMLmap.jsx');
var Ruler = require('../../javascript/rulerOnClick');
var GameTips = require('./gameTips.jsx');
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
    componentDidMount: function () {
        debug('MainAreaWrap is adding ruler');
        Ruler.initialize()
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.data.level !== this.props.data.level) {
            if (this.state.visible !== 'info1' && this.state.visible !== 'info2') {
            // if user changes level in middle of transition just let the props change without changing transition state so it goes smooth
            // TODO padaryta info3, kad nebutu animacijos. Ja reikia sutvarkyti ir padaryti kad transitionai butu grazesni.
                this.setState({visible: 'info3'})
            }
        }
    },
    shouldComponentUpdate: function (nextProps, nextState) {

        if ((nextProps.data.level !== this.props.data.level) && nextState.visible == 'info1') {
            // this is to prevent an extra rendering when in state: info1 and changing info2, because new props
            // are received before state is set to info2, and it would an unnecessary render, since it will render anyway when
            // state is set to info2.
            debug('MainAreaWrap you shall not update');
            debug(nextState);
            //return false
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
        debug('componentDidUpdate and state is ', this.state.visible);
        if (this.state.visible === 'info1') {
            setTimeout(function () {
                debug('MainAreaWrap is calling nextLevel on main and setting state to info2');
                this.setState({visible: 'info2'});
            }.bind(this), 700)
        }
        else if (this.state.visible === 'info2') {
            setTimeout(function () {
                debug('MainAreaWrap is setting state to info3');

                this.setState({visible: 'info3'});
            }.bind(this), 700)
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

    updateRuler: function (mouse) {
      Ruler.update(mouse)
    },

    render: function () {
        var sliderStyle;
        var objectsStyle;

        debug('MainAreaWrap info level', this.state.visible);

        if (this.state.visible === 'info1') {
            sliderStyle = {left: '0%', zIndex: '4'};
            objectsStyle = {left: '100%'};
        }
        else if (this.state.visible === 'info2') {
            sliderStyle = {left: '0%', zIndex: '4'};
            objectsStyle = {left: '-100%', display: 'hidden', transitionDuration: '0s'};
        }
        else if (this.state.visible === 'info3') {
            sliderStyle = {left: '100%'};
            objectsStyle = {left: '0', display: 'block', transitionDuration: '1s'};
        }
        else if (this.state.visible === 'info4') {
            sliderStyle = {left: '-100%', display: 'hidden'};
            objectsStyle = {left: '0', display: 'block'}
        }

        // display ruler if state is not in transition and ruler is set on setting to true
        //if ((this.state.visible === 'objects' || this.state.visible === 'info4') && this.props.data.ruler == 'true') Ruler.show();
        //else Ruler.hide();

        debug('Ruler display: ', Ruler.display);
        debug(this.props.data.ruler == 'true');
        return (
            <div className="main-area">
                <div style={sliderStyle} id="slider">LEVEL {this.props.data.level}</div>
                <div onClick={this.updateRuler} style={objectsStyle} id="level-data-area">
                    <MovableObjects data={this.props.data} nextLevel={this.props.nextLevel} visible={this.state.visible}/>
                    <WinConditionObjects data={this.props.data} visible={this.state.visible}/>
                    <HTMLmapWrap data={this.props.data}/>
                    <GameTips/>
                </div>
            </div>
        )
    }
});

