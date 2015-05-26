/**There you can find functions used for parsing user input into code editor*/

var css = require('css');
var _ = require('lodash');


/**
 * Check if input string contains any of not allowed input string
 * @param {string} inputString taken from user inputed code into editor
 * @param {array} notAllowedInputArray contains string that are matched against input
 * */
var isValidInput = module.isValidInput = exports.isValidInput = function isValidInput(inputString, notAllowedInputArray) {
    return !notAllowedInputArray.some(function (notAllowed) {
        if (_.includes(['top', 'left', 'right', 'bottom'], notAllowed)) {
            // in case it has one of these keywords, see if input matches only when there is no '-' ahead
            // so it rates correctly such instances when top is not allowed, but input is padding-top
            var testRe = new RegExp('[^-]{1}(' + notAllowed + ')', 'g');
            return testRe.test(inputString)
        }
        else {
            return _.includes(inputString, notAllowed)
        }
    })
};

var classOrId = exports.classOrId = function classOrId(selector) {
    var classRe = /\./;
    var idRe = /#/;
    if (classRe.test(selector) && !idRe.test(selector)) {
        return ['class', selector.split('.').reverse()[0]]
    }
    else if (!classRe.test(selector) && idRe.test(selector)) {
        return ['id', selector.split('#').reverse()[0]]
    }
    else {
        throw Error('something wrong with selector matching')
    }
};
var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


/**
 * Takes a normal css property (i.e. padding-top) and turns it into react like (paddingTop)*/
var reactSyntaxify = exports.reactSyntaxify = function reactSyntaxify(property) {
    var newProperty = property.split('-');
    if (newProperty.length === 1) {
        return newProperty[0]
    }
    var words = newProperty.map(function (word, index) {
        if (index > 0) {
            return capitalizeFirstLetter(word)
        }
        return word
    });
    return words.join('')
};

/**
 * @param {array} oldStylesLi = [{id: '' css: {height: '', paddingTop: ''}}{class: '' css: {}}]
 * @param {string} newStyles is of new styles*/
var updateStyleObj = exports.updateStyleObj = function updateStyleObj(oldStylesLi, newStylesString) {
    //TODO kai buna value kazkokio kintamojo irasytas kabutes neveikia. pvz padding: '5px'
    // parse and return list of rules
    var newStyles = css.parse(newStylesString).stylesheet.rules;
    var newStylesLi = _.cloneDeep(oldStylesLi);
    newStyles.forEach(function (style) {
        newStylesLi = updateStyle(style, newStylesLi);
    });
    return newStylesLi
};

var updateStyle = function updateStyle(style, Objects) {
    var selector = classOrId(style.selectors[0]);
    Objects.forEach(function (element) {
        if (element.hasOwnProperty(selector[0]) && element[selector[0]] == selector[1]) {
            // when element that styles is meant to be applied to is found, apply style updates and return
            style.declarations.forEach(function (declrObj) {
                var reactLikeProperty = reactSyntaxify(declrObj.property);
                element.css[reactLikeProperty] = declrObj.value;
                element.updated = true;
            });

        }
        else if (element.hasOwnProperty('objects')) {
            // see maybe element is inside other element
            element.updated = false;
            return updateStyle(style, element.objects)
        }

    });

    return Objects


};

