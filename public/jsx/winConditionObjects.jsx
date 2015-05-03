var React = require('react');
var _ = require('lodash');
var inputParser = require('./inputParser.jsx');
var objectParser = require('./objectParser.jsx');

var navbarHeight = 0;

var WinConditionObjects = module.exports = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return nextProps.data.level !== this.props.data.level
    },

    render: function () {
        console.log('iam rending winObjs');
        var elements = [];
        var data = _.cloneDeep(this.props.data);
        var allObjs = allObjects(data.objects);
        data.winConditions.forEach(function (winObj) {
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

                var selector = selectorAndValue[0] === 'id' ? '#' : '.';
                elements.push(<div style={style}>{selector + selectorAndValue[1]}</div>)


            });
        });

        return (
            <div>{elements}</div>
        )
    }
});

/*@objects: levels[level].objects
* takes a list containing all objects to display and recursively flattens it
*/
var allObjects = function allObjects(objects) {
    var allObjs = [];
    var rec = function rec(objs) {
        objs.forEach(function (obj) {
            allObjs.push(obj);
            if (obj.hasOwnProperty('objects')) {
                rec(obj.objects)
            }
        })
    };
    rec(objects);
    return allObjs
};