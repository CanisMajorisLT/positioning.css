var React = require('react');
var _ = require('lodash');
var inputParser = require('../../javascript/inputParser');
var debug = require('debug')('winConditionObjects');
var allObjects = require('../../javascript/helperFunctions').allObjects;
var navbarHeight = 0;

/**
 * Renders game objects win positions.
 * Render once per level when new level is loading*/
var WinConditionObjects = module.exports = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return nextProps.visible === 'info3'; // should be info2, but with disabled level transition animation is info3
    },

    render: function () {
        debug('iam rendering winObjs');
        var elements = [];
        var data = _.cloneDeep(this.props.data);
        var allObjs = allObjects(data.objects);
        data.winConditions.forEach(function (winObj, index) {
            _.forIn(winObj, function (value, key) {
                var selectorAndValue = inputParser.classOrId(key);
                var object = {};
                allObjs.forEach(function (obj) {
                    if (obj[selectorAndValue[0]] === selectorAndValue[1]) {
                        object = obj
                    }
                });
                var style = {};
                style['backgroundColor'] = '#fff';
                style['opacity'] = '0.3';
                style['top'] = value.top + navbarHeight;
                style['left'] = value.left;
                style['position'] = 'absolute';
                style['border'] = '1px dashed black';
                style['height'] = object.css.height;
                style['width'] = object.css.width;

                var selector = selectorAndValue[0] === 'id' ? '<div id=' : '<div class=';
                elements.push(<div id={key} key={index} style={style}>{selector + '"' + selectorAndValue[1] + '"' + '>'}</div>)


            });
        });

        return (
            <div className="win-objects">{elements}</div>
        )
    }
});

