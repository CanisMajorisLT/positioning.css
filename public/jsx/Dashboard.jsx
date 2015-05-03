var React = require('react');
var inputParser = require('./inputParser.jsx');

module.exports = React.createClass({
    componentDidMount: function () {
      this.props.editor.editorMake()
    },
    transferInput: function() {
        var input = this.props.editor.editor.getValue();
        var notAllowed = this.props.data.notAllowedInput; // cia turetu buti is this.props.notAllowed
        if (inputParser.isValidInput(input, notAllowed)) {
            console.log('yay shit is valid', input);
            this.props.updateStyles(input)
        }
        else {
            //display to user that he used invalid stuff
            this.props.flashText('not allowed input')
        }

    },

    render: function () {
        return (
        <div id="editor">
        <button onClick={this.transferInput}>Submit</button>
            <textarea id="editor-input"></textarea>
        </div>
        )
    }
});