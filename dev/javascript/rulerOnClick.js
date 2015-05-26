/**
 * Created by vyt on 2015-05-23.
 */
/**
 * This module creates a ruler that is appended to level-data-area div that also contain all objects that are
 * displayed in each level.
 * The ruler displays distance in pixels between 2 DOM objects that are on different sides of the mouse (vertically and horizontally).
 * Ruler object itself is made of 2 absolutely positioned divs which have their top, left, height, width updated on click.*/

var rulerHideForEventListeners = function rulerHideForEventListeners() {
    if (this.display) {
        this.hide();
    }
};
var Ruler = module.exports = {
    initializeHideEvents: function () {
        document.addEventListener('scroll', rulerHideForEventListeners.bind(this));
        document.getElementById('level-data-area').addEventListener('scroll', rulerHideForEventListeners.bind(this));
        document.getElementsByClassName('level-nav')[0].addEventListener('click', rulerHideForEventListeners.bind(this));
        Array.prototype.slice.call(document.getElementsByClassName('level-control')).forEach(function (element) {

            element.addEventListener('click', rulerHideForEventListeners.bind(this))
        }.bind(this));
        document.querySelector('#editor button').addEventListener('click', rulerHideForEventListeners.bind(this));

    },

    initialize: function () {
        this.height = createRulerDimension('Height');
        this.width = createRulerDimension('Width');

        var movableObjectsElement = document.getElementById('level-data-area');
        movableObjectsElement.appendChild(Ruler.height);
        movableObjectsElement.appendChild(Ruler.width);

        this.initializeHideEvents();

    },

    display: false,

    hide: function () {
        this.display = false;
        this.height.style.display = 'none';
        this.width.style.display = 'none';
    },

    show: function () {
        this.display = true;
        this.height.style.display = 'block';
        this.width.style.display = 'block';
    },

    ignore: [],

    update: function (mouse) {
        if (mouse.target.id == 'html-map-btn') {
            // when click on map don't do anything
            return
        }
        if (this.display) {
            this.hide();

        }
        else {
            this.calculate(mouse);
            this.show()
        }
    },

    /** Updates height and width (divs) according to mouse location within #level-data-area'.
     * @param {object} mouse cursor object returned by mousemove event listener
     */
    calculate: function (mouse) {


        // make z index lower than the area that objects are in, so ruler is below them and doesn't calculate range to itself
        this.height.style.zIndex = 1;
        this.width.style.zIndex = 1;
        var nextElementAtLeft = getCoordinatesOfNewElement(mouse.clientX, mouse.clientY, 0, 'left', this.ignore);
        var nextElementAtRight = getCoordinatesOfNewElement(mouse.clientX, mouse.clientY, 0, 'right', this.ignore);
        var nextElementAtUp = getCoordinatesOfNewElement(mouse.clientX, mouse.clientY, 1, 'up', this.ignore);
        var nextElementAtDown = getCoordinatesOfNewElement(mouse.clientX, mouse.clientY, 1, 'down', this.ignore);

        var width = nextElementAtRight.x - nextElementAtLeft.x - 1;
        var height = nextElementAtDown.y - nextElementAtUp.y - 1;

        // height ruler positioning
        this.height.textContent = height + 'px';
        this.height.style.height = height + 'px';
        this.height.style.left = mouse.clientX + 'px';
        this.height.style.top = (nextElementAtUp.y - 0 + 1) + 'px';
        this.height.style.lineHeight = height + 'px';

        // width ruler positioning
        this.width.textContent = width + 'px';
        this.width.style.width = width + 'px';
        this.width.style.left = (nextElementAtLeft.x + 1) + 'px';
        this.width.style.top = (mouse.clientY - 0) + 'px';
        this.width.style.textAlign = 'center';

        // set z-index back to same as objects area so it is not displayed below them
        this.height.style.zIndex = 2;
        this.width.style.zIndex = 2;
    }
};

var createRulerDimension = function createRulerDimension(dimensionName) {
    var dimension = document.createElement('div');
    dimension.style.position = 'fixed';
    dimension.id = 'ruler' + dimensionName;
    dimension.className = 'ruler';
    return dimension
};


/**
 * Uses builtin method elementFromPoint to iterate one pixel at a time from given coordinates.
 * Iteration stops when a different DOM element is found than the one at staring coordinates.
 * @param {number} x cursor coordinate in DOM
 * @param {number} y cursor coordinate in DOM
 * @param {number} fluidElementIdentifier indicates which coordinate to modify. 0 for x, 1 for y
 * @param {string} side to which side function should iterate. valid: right, left, up, down
 * @param {array} elementsToIgnore DOM elements that will be ignored (not counted as new element)
 * @return {object} x and y coordinates of where the new object begins */
var getCoordinatesOfNewElement = function getCoordinatesOfNewElement(x, y, fluidElementIdentifier, side, elementsToIgnore) {
    var currentElement = document.elementFromPoint(x, y);
    var pixelLimit = 5000; // after 5000 loops break, to prevent infinite loop
    while (pixelLimit--) {
        if (side === 'right' || side === 'down') ++arguments[fluidElementIdentifier];
        else if (side === 'left' || side === 'up') --arguments[fluidElementIdentifier];

        var nextElement = document.elementFromPoint(x, y);
        if ((currentElement !== nextElement) && (elementsToIgnore.indexOf(nextElement) === -1)) {
            return {
                x: x,
                y: y
            }
        }
    }
};