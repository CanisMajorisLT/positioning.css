var React = require('react');
var InputEditor = require('./inputEditor.jsx');
var Infoboard = require('./infoBoard.jsx');
var inputParser = require('./inputParser.jsx');
var levels = require('./levels');
var Navbarish = require('./navbarish.jsx');
var MainArea = require('./mainArea.jsx');
var debug = require('debug')('main');
var _ = require('lodash');
require('../stylesheets/scss/main.scss');
window.myDebug = require('debug'); // importing as global object

/*Starting point of the program.
    1. It takes input from InputEditor, applies css changes to data object
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

    nextLevel: function () {
        debug('GameWrap is calling nextLevel (updating state)');
        var nextLevel = this.state.data.level + 1;
        if (this.props.data.hasOwnProperty(nextLevel)) {
            this.setState({data: this.props.data[nextLevel]})
        }
        else {
            debug('no next level');
            this.flashText('You have completed all levels!', 1500)
        }
    },

    render: function () {
        debug('GameWrap is rendering');
        return (
            <div id="outside-wrap">
                <Navbarish/>
                <div id="ttt"></div>
                <MainArea data={this.state.data} nextLevel={this.nextLevel}/>
                <div className="right-side-panel">
                    <Infoboard data={this.state.data}/>
                    <InputEditor flashText={this.flashText} editor={this.props.codeMirror}
                        updateStyles={this.updateStyles} data={this.state.data}/>
                </div>
            </div>
        )
    }
});

/*CodeMirror plugin is passed as an object so it can be initialised later. After textarea is created*/
var myCodeMirror = {
    editor: {},
    editorMake: function () {
        this.editor = CodeMirror.fromTextArea(document.getElementById('editor-input'),
            {   value: 'why you no work?',
                lineNumbers: true,
                smartIdent: true
            });
    }
};


React.render(<GameWrap data={levels} codeMirror={myCodeMirror}/>, document.getElementById('react-div'));