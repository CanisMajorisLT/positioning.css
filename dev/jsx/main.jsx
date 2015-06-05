var React = require('react');
var InputEditor = require('./right-side-area/inputEditor.jsx');
var Infoboard = require('./right-side-area/infoBoard.jsx');
var inputParser = require('../javascript/inputParser');
var levels = require('../javascript/levels');
var Header = require('./header/header.jsx');
var MainArea = require('./mainarea/mainArea.jsx');
var WarningPanel = require('./global/warningPanel.jsx');
var debug = require('debug')('main');
var _ = require('lodash');
var firstLevelOfTopic = require('../javascript/helperFunctions').firstLevelOfTopic;
require('../styles/scss/main.scss');

// load the code mirror plugin
window.CodeMirror = require('../cm/lib/codemirror');
require('../cm/lib/codemirror.scss');
require('../cm/mode/css/css');
// load the code mirror plugin


//window.myDebug = require('debug'); // importing as global object for browser logging

/**
 * Starting point of the program.
 *   1. It takes input from InputEditor, applies css changes to data object
 * and sends it to MainArea component, which controls level/game logic rendering.
 *   2. It also has passes on nextLevel method, which is called when player advances to next level.   */
var GameWrap = React.createClass({
    getInitialState: function () {
        var startingLevel = 1;
        return {data: this.props.data[startingLevel]};
    },

    updateStyles: function (newStyles) {
        debug('GameWrap is updating styles (updating state)');
        var currentLevel = this.state.data.level;
        var oldObjectsStyles = _.cloneDeep(this.props.data[currentLevel].objects);
        var updatedObjectsStyles = inputParser.updateStyleObj(oldObjectsStyles, newStyles);
        var state = _.cloneDeep(this.state.data);
        state.objects = updatedObjectsStyles;
        this.setState({data: state});
    },

    /**
     * @param {string} topic is optional parameter that when passed is evaluated to number value
     * of level where that topic starts i.e. topic static always starts at 1.
     * */

    changeTopic: function (topic) {
        var level = firstLevelOfTopic(topic, this.props.data);
        this.switchLevel(level)
    },
    nextLevel: function () {
        var nextLevel = this.state.data.level + 1;
        this.switchLevel(nextLevel)
    },
    previousLevel: function () {
        var prevLevel = this.state.data.level - 1;
        this.switchLevel(prevLevel)
    },
    switchLevel: function (level) {
        debug('GameWrap is calling switchLevel (updating state), which is: ', level);
        if (this.props.data.hasOwnProperty(level)) {
            this.setState({data: this.props.data[level]})
        }
        else {
            debug('no such level level');
        }
    },

    render: function () {
        debug('GameWrap is rendering');
        return (
            <div id="outside-wrap">
                <WarningPanel/>
                <Header topic={this.state.data.topic} changeLevelTopic={this.changeTopic}/>
                <MainArea data={this.state.data} nextLevel={this.nextLevel}/>
                <div className="right-side-panel">
                    <Infoboard data={this.state.data} numberOfLevels={Object.keys(this.props.data).pop()}
                        nextLevel={this.nextLevel} previousLevel={this.previousLevel}/>
                    <InputEditor flashText={this.flashText} editor={this.props.codeMirror}
                        updateStyles={this.updateStyles} data={this.state.data}/>
                </div>
            </div>
        )
    }
});

/*CodeMirror plugin is passed as an object so it can be initialised later. After textarea DOM element is created*/
//FIXME su default props galima ten vietoje paduot
var myCodeMirror = {
    editor: {},
    editorMake: function () {
        this.editor = CodeMirror.fromTextArea(document.getElementById('editor-input'),
            {
                value: 'why you no work?',
                lineNumbers: true,
                smartIdent: true
            });
    }
};


React.render(<GameWrap data={levels} codeMirror={myCodeMirror}/>, document.getElementById('react-div'));