var React = require('react');
var inputParser = require('./inputParser.jsx');
var debug = require('debug')('inputEditor');


/*After this component mounts, it initializes CodeMirror editor plugin.*/
module.exports = React.createClass({
    componentDidMount: function () {
        this.props.editor.editorMake()
    },
    /**
     * When submit button is clicked this method is invoked. It checks if input doesn't contain any
     * not allowed words. If it doesn't then it calls parent update styles method*/
    transferInput: function () {
        var input = this.props.editor.editor.getValue();
        var notAllowed = this.props.data.notAllowedInput;
        if (inputParser.isValidInput(input, notAllowed)) {
            debug('yay shit is valid', input);
            this.props.updateStyles(input)
        }
        else {
            //TODO: display to user that he used invalid stuff
            this.props.flashText('not allowed input')
        }

    },

    render: function () {
        return (
            <div id="editor">
                <button onClick={this.transferInput}>Submit</button>
                <textarea id="editor-input" defaultValue="#digimon {margin:60px 0 0 331px}
            .pokemon{margin: 40px 0 0 360px}"></textarea>
            </div>
        )
    }
});

