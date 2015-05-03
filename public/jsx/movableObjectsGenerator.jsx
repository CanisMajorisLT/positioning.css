var React = require('react');
var _ = require('lodash');
var inputParser = require('./inputParser.jsx');
var Promise = require('promise');
var objectParser = require('./objectParser.jsx');
var navbarHeight = -30;

var MovableObjectsWrap = module.exports = React.createClass({
    getInitialState: function () {
        // tick is transitionign state. Start at 1, finish at defined, 0 means not in transition
        return {won: false}
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        if (this.state.won === true && nextState.won === true) {
            console.log('MovableObjectsWrap decing if update: false. becasuw won won');

            return false
        }
        /*New props means new cycle of updates*/
        if (nextProps.visible === 'info1' || nextProps.visible === 'info3' || nextProps.visible === 'info4') {
            console.log('MovableObjectsWrap decing if update: false. because info1 || info3 || info4');

            return false
        }
        console.log('MovableObjectsWrap decing if update: true');
        return true;

    },

    componentWillReceiveProps: function (nextProps) {
        // stating new transition
        this.setState({oldObjects: _.cloneDeep(nextProps.objects), won: false})

    },

    //container for storing transition promises
    promisesContainer: [],
    componentDidUpdate: function (prevProps, prevState) {
        if (!(prevState.won || this.state.won) && this.props.data.level === prevProps.data.level) {
            // don't check if won when won animation has been rendered as well as when new level data is received (because there is no
            // movement in objects from user input (this.props.data.level != prevState.data.level)
            console.log('MovableObjectsWrap componentDidUpdate prevWon - this Won:', prevState.won, this.state.won);
            console.log('MovableObjectsWrap componentDidUpdate prevLevel - thisLevel:', prevProps.data.level, this.props.data.level);
            var els = this.promisesContainer;
            console.log(els);
            Promise.all(els)
                .then(function (f, r) {
                    // FIXME neveikia kai klase yra su promise (3lvl)
                    console.log('MovableObjectsWrap promises resolved');
                    this.checkIfWon();
                    this.promisesContainer = []
                }.bind(this))
        }

    },
    checkIfWon: function () {
        console.log('MovableObjectsWrap checkIfWon');
        var won = true;
        var el;
        this.props.data.winConditions.forEach(function (winObj) {
            // since winConditions is a list need to iterate it. i.e: winConditions: [{'#digimon': {top: 60, left: 331}}, {'.pokemon': {top: 300, left: 360}}]
            _.forIn(winObj, function (winCoords, key) {
                var selectorAndValue = inputParser.classOrId(key);
                if (selectorAndValue[0] === 'id') {
                    el = document.getElementById(selectorAndValue[1]);
                    won = checkIfWonByCoords(el, winCoords);
                    [el].some(function (e) {
                        console.log('inside some', e);
                    })
                }
                else {
                    // when selector is class, then loop through all objects with that class if any of it matches win coords,
                    // return true. This means that if for each win coditions at least 1 object matches, then it is correct answer.
                    console.log('MovableObjectsWrap got a class selector');
                    el = document.getElementsByClassName(selectorAndValue[1]);
                    won = _.some(el, function (el) {
                        return checkIfWonByCoords(el, winCoords)
                    });
                }
            });
        });

        console.log('MovableObjectsWrap you won: ', won);
        if (won) {
            this.setState({won: true});
            setTimeout(function () {
                console.log('MovableObjectsWrap calling props.nextLevel');
                this.props.nextLevel();
            }.bind(this), 1000)
        }

    },

    render: function () {

        return (
            <div>
                <MovableObjects objects={this.props.data.objects} oldObjects={this.state.oldObjects} won={this.state.won} promisesContainer={this.promisesContainer}/>
            </div>
        )
    }
});

var MovableObjects = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return true
    },

    render: function () {
        var elementsGenerator = function (objects) {
            return objects.map(function (element) {
                // recursion if has objects inside
                var recursion;
                if (element.hasOwnProperty('objects')) {
                    recursion = elementsGenerator(element.objects)
                }
                if (element.hasOwnProperty('updated')) {
                    // if updated - add transition promise
                    if (element.updated === true) {
                        this.props.promisesContainer.push(getTransitionPromise(element))
                    }
                }

                var styles = {};

                _.forIn(element.css, function (value, key) {
                    styles[inputParser.reactSyntaxify(key)] = value;
                });

                var className = '';
                if (this.props.won) {
                    className += 'animated pulse '
                }

                if (element.hasOwnProperty('id')) {
                    var symbol = '#';
                    return <div className={className} id={element.id} style={styles}>
                        <span className='element-names'>{symbol + element.id}</span> {recursion}</div>
                }
                else {
                    className += element.class;
                    return <div className={className} style={styles}>
                        <span className="element-names">.{element.class}</span> {recursion}</div>
                }
            }.bind(this))
        }.bind(this);
        var oP = objectParser.bind(this);
        var elements = oP(this.props.objects, [updatedPromise.bind(this), addStyles.bind(this), addWonClass.bind(this)]);

        return (
            <div className='movable-objs-wrap'>
                {elements}
            </div>
        )
    }
});
var updatedPromise = function updatedPromise(obj) {
    if (obj.hasOwnProperty('updated')) {
        // if updated - add transition promise
        if (obj.updated === true) {
            this.props.promisesContainer.push(getTransitionPromise(obj))
        }
    }
};
var addStyles = function addStyles(obj, styles) {
    _.forIn(obj.css, function (value, key) {
        styles[inputParser.reactSyntaxify(key)] = value;
    });
};

var addWonClass = function addWonClass(obj, styles, className) {
    if (this.props.won) {
        className.className += ' animated pulse '
    }
};

var objectParser1 = function objectParser(objects, arrayOfMiddlewareFnc) {
    //console.log('this  b4 map', this);
    //console.log('array b4 map', arrayOfMiddlewareFnc);
    return objects.map(function (obj) {
        //console.log('this after map', this);
        var recursion;
        var styles = {};
        // make className and objName as objects so they can be passed to and modified by external functions in arrayOfMiddlewareFnc
        var className = {className:''};
        var objName = {objName:''};
        if (obj.hasOwnProperty('objects')) {
            // if object has a property objects, then do recursive call to his function.
            var oP = objectParser.bind(this);
            recursion = oP(obj.objects, arrayOfMiddlewareFnc)
        }

        arrayOfMiddlewareFnc.forEach(function (fnc) {
            // call any additional functions to apply to object or this
            fnc(obj, styles, className, objName)
        });


        if (obj.hasOwnProperty('id')) {
            objName.objName += '#' + obj.id + ' '
        }
        if (obj.hasOwnProperty('class')) {
            className.className += obj.class;
            objName.objName += '.' + obj.class + ' '
        }

        return <div className={className.className} id={obj.id} style={styles}>
            <span className='element-names'>{objName.objName}</span> {recursion}</div>


    }.bind(this))
};

var checkIfWonByCoords = function checkIfWonByCoords(el, winCoords) {
    var won = true;
    var elCoors = el.getBoundingClientRect();
    var topCoords = elCoors.top + navbarHeight;
    var leftCoords = elCoors.left;
    console.log('MovableObjectsWrap checkIfWon-coords', topCoords, leftCoords);
    if (winCoords.top != topCoords || winCoords.left != leftCoords) {
        won = false
    }
    return won
};

var getTransitionPromise = function getTransitionPromise(object) {
    var element;
    if (object.hasOwnProperty('id')) {
        element = document.getElementById(object['id']);

    }
    else {
        element = document.getElementsByClassName(object['class'])[0];
    }
    var transition = whichTransitionEvent(element);

    if (transition) {
        console.log('Element that iam putting transition promise on: ', element);
        return new Promise(function (resolve, reject) {
            element.addEventListener(transition, function action() {
                resolve(true);
                element.removeEventListener(transition, action)
            })

        })

    }
    else {
        return true
    }
};

var whichTransitionEvent = function whichTransitionEvent(el) {
    var t;
    var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
};