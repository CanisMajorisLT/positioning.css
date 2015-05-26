var React = require('react');
var _ = require('lodash');
var debug = require('debug')('navbarish');

module.exports = React.createClass({
    render: function () {
        return (
            <div id="header">
                <a href="/" className="logo">CSS Positioning</a>
                <LevelNav changeLevelTopic={this.props.changeLevelTopic} topic={this.props.topic}/>
            </div>
        )
    }
});


var LevelNav = React.createClass({
    changeLevelTopic: function (topic) {
        debug('changeLevelTopic: ', topic);
        this.props.changeLevelTopic(topic)
    },
    render: function () {
        var topicNames = {static: 'Static', relative: 'Relative', absolute: 'Absolute', fixed: 'Fixed', fun: 'Random'};
        var topics = [];
        _.forIn(topicNames, function (value, key) {
            var className = key == this.props.topic ? 'active' : '';
            topics.push(<div><a onClick={this.changeLevelTopic.bind(this, key)} className={className} href="#">{value}</a></div>)
        }.bind(this));
        return (
            <div className="level-nav">
            {topics}
            </div>
        )
    }
});