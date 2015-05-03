var React = require('react');
var _ = require('lodash');

var objectParser = module.exports = function objectParser(objects, arrayOfMiddlewareFnc) {
    //console.log('this  b4 map', this);
    //console.log('array b4 map', arrayOfMiddlewareFnc);
    return objects.map(function (obj) {
        //console.log('this after map', this);
        var recursion;
        var styles = {};
        // make className and objName as objects so they can be passed to and modified by external functions in arrayOfMiddlewareFnc
        var className = {className: ''};
        var objName = {objName: ''};
        if (obj.hasOwnProperty('objects')) {
            // if object has a property objects, then do recursive call to his function.
            var oP = objectParser.bind(this);
            recursion = oP(obj.objects, arrayOfMiddlewareFnc)
        }


        if (obj.hasOwnProperty('id')) {
            objName.objName += '#' + obj.id + ' '
        }
        if (obj.hasOwnProperty('class')) {
            className.className += obj.class;
            objName.objName += '.' + obj.class + ' '
        }

        arrayOfMiddlewareFnc.forEach(function (fnc) {
            // call any additional functions to apply to object or this
            fnc(obj, styles, className, objName)
        });

        return <div className={className.className} id={obj.id} style={styles}>
            <span className='element-names'>{objName.objName}</span> {recursion}</div>


    }.bind(this))
};