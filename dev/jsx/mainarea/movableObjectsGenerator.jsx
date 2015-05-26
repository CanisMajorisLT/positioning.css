var React = require('react');
var _ = require('lodash');
var inputParser = require('../../javascript/inputParser');
var Promise = require('promise');
var navbarHeight = -30;
var debug = require('debug')('movableObjectGenerator');

var MovableObjectsWrap = module.exports = React.createClass({
    getInitialState: function () {
        return {won: false}
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        if (this.state.won === true && nextState.won === true) {
            debug('MovableObjectsWrap decing if update: false. becasuw won won');

            return false
        }
        /*New props means new cycle of updates*/
        if (nextProps.visible === 'info1' || nextProps.visible === 'info4') {
            debug('MovableObjectsWrap decing if update: false. because info1 || info4');

            return false
        }
        debug('MovableObjectsWrap decing if update: true');
        return true;

    },

    componentWillReceiveProps: function (nextProps) {
        // stating new transition
        this.setState({oldObjects: _.cloneDeep(nextProps.objects), won: false})

    },

    //container for storing transition promises
    promisesContainer: [],
    componentDidUpdate: function (prevProps, prevState) {
        if (!(prevState.won || this.state.won) && (this.props.data.level === prevProps.data.level) && this.props.visible === 'objects') {
            // don't check if won when won animation has been rendered as well as when new level data is received (because there is no
            // movement in objects from user input (this.props.data.level != prevState.data.level)
            debug('MovableObjectsWrap componentDidUpdate prevWon - this Won:', prevState.won, this.state.won);
            debug('MovableObjectsWrap componentDidUpdate prevLevel - thisLevel:', prevProps.data.level, this.props.data.level);
            var els = this.promisesContainer;
            debug(els);
            Promise.all(els)
                .then(function (f, r) {
                    // FIXME neveikia kai klase yra su promise (3lvl)
                    debug('MovableObjectsWrap promises resolved');
                    this.checkIfWon();
                    this.promisesContainer = []
                }.bind(this))
        }

    },
    /**
     * Check if user won by comparing win objects x and y coordinates relative to browser winndow to
     *  movable objects x and y coordinates*/
    checkIfWon: function () {
        debug('MovableObjectsWrap checkIfWon');
        var won = true;
        var el;
        this.props.data.winConditions.forEach(function (winObj) {
            // since winConditions is a list need to iterate it. i.e: winConditions: [{'#digimon': {top: 60, left: 331}}, {'.pokemon': {top: 300, left: 360}}]
            _.forIn(winObj, function (winCoords, key) {
                var winEl = document.getElementById(key);
                var winElCoords = getRelativeElementCoordantes(winEl);
                var moveElCoords;
                var selectorAndValue = inputParser.classOrId(key);
                if (selectorAndValue[0] === 'id') {
                    el = document.getElementById(selectorAndValue[1]);

                    //new
                    moveElCoords = getRelativeElementCoordantes(el);
                    //new
                    if (won) {
                        // check only if it is still true
                        /* --this is now deprecated-- won = checkIfWonByCoords(el, winCoords);*/
                        won = (winElCoords.top === moveElCoords.top) && (winElCoords.left === moveElCoords.left)
                    }
                }
                else {
                    // when selector is class, then loop through all objects with that class if any of it matches win coords,
                    // return true. This means that if for each win coditions at least 1 object matches, then it is correct answer.
                    debug('MovableObjectsWrap got a class selector');
                    el = document.getElementsByClassName(selectorAndValue[1]);
                    if (won) {
                        won = _.some(el, function (classEl) {
                            moveElCoords = getRelativeElementCoordantes(classEl);
                            return (winElCoords.top === moveElCoords.top) && (winElCoords.left === moveElCoords.left)
                        });
                    }
                }
            });
        });

        debug('MovableObjectsWrap you won: ', won);
        if (won) {
            this.setState({won: true});
            setTimeout(function () {
                debug('MovableObjectsWrap calling props.nextLevel');
                this.props.nextLevel();
            }.bind(this), 1000)
        }

    },

    render: function () {
        debug('MovableObjectsWrap Rendering movable objects');

        return (
            <MovableObjects objects={this.props.data.objects} oldObjects={this.state.oldObjects} won={this.state.won}
                promisesContainer={this.promisesContainer} visible={this.props.visible}/>
        )
    }
});

var MovableObjects = React.createClass({
    shouldComponentUpdate: function (nextProps, nextState) {
        return true
    },

    render: function () {
        var objectParserBind = objectParser.bind(this);
        var elements = objectParserBind(this.props.objects, [updatedPromise.bind(this), addStyles.bind(this), addWonClass.bind(this)]);
        var styles = {display: 'block'};
        if (this.props.visible === 'info2') {
            // hide when this dive is out of screen, because it main contain fixed elements, which would overlay transition animation
            styles.display = 'none';
        }


        return (
            <div style={styles} className='movable-objects'>
                {elements}
            </div>
        )
    }
});

/**
 * Recursively loops through objects {array} and renders all objects inside it.
 * Return an {array} of all objects to render.
 * */
var objectParser = function objectParser(objects, arrayOfMiddlewareFnc) {
    return objects.map(function (obj) {
        var recursion;
        var styles = {};
        // make className and objName as objects so they can be passed to and modified by external functions in arrayOfMiddlewareFnc.
        var className = {className: ''};
        var objName = {objName: ''};
        if (obj.hasOwnProperty('objects')) {
            // if object has a property objects, then do recursive call to his function.
            var objectParserBind = objectParser.bind(this);
            recursion = objectParserBind(obj.objects, arrayOfMiddlewareFnc)
        }


        if (obj.hasOwnProperty('id')) {
            objName.objName += '<div id=' + '"' + obj.id + '"';
        }
        if (obj.hasOwnProperty('class')) {
            className.className += obj.class;
            objName.objName += ' class=' + '"' + obj.class + '"';
        }
        objName.objName += '>';

        arrayOfMiddlewareFnc.forEach(function (fnc) {
            // call any additional functions to apply to object or this.
            fnc(obj, styles, className, objName)
        });

        return <div className={className.className} id={obj.id} style={styles}>
            <label>{objName.objName}</label> {recursion}</div>


    }.bind(this))
};

/**
 * Middleware function passed to objectParser that adds a promise object to parents container promisesContainer*/
var updatedPromise = function updatedPromise(obj) {
    if (obj.hasOwnProperty('updated')) {
        // if updated - add transition promise
        if (obj.updated === true) {
            this.props.promisesContainer.push(getTransitionPromise(obj))
        }
    }
};

/**
 * Middleware function passed to objectParser that adds styles to style object */
var addStyles = function addStyles(obj, styles) {
    _.forIn(obj.css, function (value, key) {
        styles[inputParser.reactSyntaxify(key)] = value;
    });
};


/**
 * Middleware function passed to objectParser that adds a class for displaying won notification-animation if
 * won was passed by props */
var addWonClass = function addWonClass(obj, styles, className) {
    if (this.props.won) {
        className.className += ' animated pulse '
    }
};


/**
 * Fuction that takes and DOM element and calculated its top and left coordinates.
 * If those coordinates match winCoords (provided by user) then it returns true*/
var checkIfWonByCoords = function checkIfWonByCoords(el, winCoords) {
    var won = true;
    var elCoors = el.getBoundingClientRect();
    var topCoords = elCoors.top + navbarHeight;
    var leftCoords = elCoors.left;
    if (winCoords.top != topCoords || winCoords.left != leftCoords) {
        won = false
    }
    debug('MovableObjectsWrap checkIfWon-coords', topCoords, leftCoords);

    return won
};

var getRelativeElementCoordantes = function getRelativeElementCoordantes(el) {
    var elCoors = el.getBoundingClientRect();
    var topCoords = elCoors.top + navbarHeight;
    var leftCoords = elCoors.left;
    return {top: topCoords, left: leftCoords}
};


/**
 * Returns a promise for DOM element that is changing it position.
 * This promise is used so that element coords to see if player won  are calculated only
 *  after all elements finished their transitions.*/
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
        debug('Element that iam putting transition promise on: ', element);
        return new Promise(function (resolve, reject) {
            var action = function action() {
                resolve(true);
                element.removeEventListener(transition, action)
            };
            element.addEventListener(transition, action);

            // in case event listener does not fire (might be attached to element that doesn't move)
            setTimeout(action, 1100)

        })

    }
    else {
        return true
    }
};

/**
 * Decides which transition name to use for event listener*/
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