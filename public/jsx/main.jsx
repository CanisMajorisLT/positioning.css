var React = require('react');
var Dashboard = require('./Dashboard.jsx');
var Infoboard = require('./infoBoard.jsx');
var inputParser = require('./inputParser.jsx');
var levels = require('./levels');
var MessageFlash = require('./messageFlasher.jsx');
var Navbarish = require('./navbarish.jsx');
var MainArea = require('./mainArea.jsx');

var _ = require('lodash');
require('../stylesheets/scss/main.scss');

// gal tai daryti?
var Controller = React.createClass({
    getInitialState: function () {
        return {level: 1}
    },
    render: function () {
        return (
            <div></div>
        )
    }
});

var GameWrap = React.createClass({
    getInitialState: function () {
        var startingLevel = 1;
        return {data: this.props.data[startingLevel], message: ''};
    },

    updateStyles: function (newStyles) {
        console.log('GameWrap is updating styles (updating state)');
        var currentLevel = this.state.data.level;
        var oldObjectsStyles = _.cloneDeep(this.props.data[currentLevel].objects);
        var updatedObjectsStyles = inputParser.updateStyleObj(oldObjectsStyles, newStyles);
        var state = _.cloneDeep(this.state.data);
        state.objects = updatedObjectsStyles;
        this.setState({data: state});
    },

    nextLevel: function () {
        console.log('GameWrap is calling nextLevel (updating state)');
        var nextLevel = this.state.data.level + 1;
        if (this.props.data.hasOwnProperty(nextLevel)) {
            this.setState({data: this.props.data[nextLevel]})
        }
        else {
            console.log('no next level');
            this.flashText('You have completed all levels!', 1500)
        }
    },

    flashText: function (text, duration) {
        // TODO implamentuot duration
        this.setState({message: text})
    },
    flashText2: function (duration) {
        var duration = 1000;
        var text = React.findDOMNode(this.refs.msg).value;
        console.log(text);
        // TODO implamentuot duration
        this.setState({message: text})
    },
    addSliderClass: function () {
      this.setState({sliderStyle: {left: '0%'}, mainStyle: {left: '100%'}});
    },

    render: function () {
        console.log('GameWrap is rendering');
        var sliderStyle = this.state.sliderStyle;
        var mainStyle = this.state.mainStyle;
        return (
            <div id="outside-wrap">
                <Navbarish/>
                <div id="ttt"></div>
                <MainArea data={this.state.data} nextLevel={this.nextLevel}/>
                <div className="right-side-panel">
                    <Infoboard data={this.state.data}/>
                    <Dashboard flashText={this.flashText} editor={this.props.codeMirror}
                        updateStyles={this.updateStyles} data={this.state.data}/>
                </div>
                <MessageFlash message={this.state.message}/>
            </div>
        )
    }
});
//                    <div id="footer">Made by Vytenis</div>

//<div id="flashmsg-contrl">
//                    <input name="msg" ref="msg"/>
//                    <button onClick={this.flashText2}>Msg display</button>
//                </div>

// cia toks dirty sprendimas, reiketu kazkaip graziua veliau padaryt
var myCodeMirror = {
    editor: {},
    editorMake: function () {
        this.editor = CodeMirror.fromTextArea(document.getElementById('editor-input'),
            {
                value: 'asdassad',
                lineNumbers: true,
                smartIdent: true
            });
    }
};


React.render(<GameWrap data={levels} codeMirror={myCodeMirror}/>, document.getElementById('react-div'));