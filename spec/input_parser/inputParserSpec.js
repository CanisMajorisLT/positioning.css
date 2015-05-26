/**
 * Created by vyt on 2015-04-09.
 */
var inputParser = require('../../dev/javascript/inputParser.js');
var levels = require('../../dev/javascript/levels');

describe('Validator of css input', function () {
        var cssInput = '.digimon {top: 50px; bottom: 2px}, #abul {margin-left: -30px}';

    it('should return false if there are not allowed words in input', function () {
        var notAllowed = ['margin'];
        var check = inputParser.isValidInput(cssInput, notAllowed);
        expect(check).toBeFalsy();
    });

    it('should return true if there are no not allowed words in input', function () {
        var notAllowed = ['fixed', 'absolute'];
        var check = inputParser.isValidInput(cssInput, notAllowed);
        expect(check).toBeTruthy();
    });
    it('should differentiate between left/right/top/bottom and *-left/right/top/bottom', function () {
        var notAllowed = ['left', 'top']; //as in left, top not allowed when position relative
        var cssInputLocal = '.niceclass {padding-left: 20px} #sauron {padding-top: 1px}';
        var check2 = inputParser.isValidInput(cssInputLocal, notAllowed);
        expect(check2).toBeTruthy()
    })

});

describe('Parser parts', function () {

    it('should be able to identify class and return selector', function () {
        var cls = inputParser.classOrId('.niceclass');
        expect(cls).toEqual(['class', 'niceclass'])
    });

    it('should be able to identify ID and return selector', function () {
        var id = inputParser.classOrId('#niceid');
        expect(id).toEqual(['id', 'niceid'])
    });

    it('should convert normal css variable names to react-like by removing "-" and capitalizing every word that was separated by it', function () {
        var normalAndExpectedPairs = [['padding-top', 'paddingTop'], ['background-color', 'backgroundColor'],
            ['margin-left', 'marginLeft'], ['color', 'color']];
        normalAndExpectedPairs.forEach(function (pair) {
            expect(inputParser.reactSyntaxify(pair[0])).toEqual(pair[1])
        })
    });

});

describe('Parser itself', function () {
    // FIXME yra buggas kai variable yra parasytas normaliai pvz: padding-top, tai neupdatinsi ji, bet sukurs nauja paddingTop

    beforeEach(function () {
        //todo cia kai jau bus tikrieji leveliai testavimai su jais atlikti
        var productionlevels = {}
    });

    var oldStyles = [{
        id: 'digimon',
        css: {
            height: '100px',
            width: '100px',
            backgroundColor: 'red'
        },
        objects: [{id: 'leon', css: {width: 205, height: 50, 'backgroundColor': 'red'}}]

    },
        {className: 'pokemon', css: {height: '100px', width: '100px', backgroundColor: 'yellow'}}];


    it('should match id and update that elements variables and return new updated object', function () {
        var stylesUpdate = '#digimon {height: 33px; background-color: black}';
        var updatedStyles = inputParser.updateStyleObj(oldStyles, stylesUpdate);

        expect(updatedStyles).not.toEqual(oldStyles);
        expect(updatedStyles[0].css.height).toBe('33px');
        expect(updatedStyles[0].css.backgroundColor).toBe('black')
    });

    it('should recursively match any inner objects as well', function () {
        var stylesUpdateInner = '#leon {width: 33px; background-color: black}';
        var updatedStyles = inputParser.updateStyleObj(oldStyles, stylesUpdateInner);

        expect(updatedStyles).not.toEqual(oldStyles);
        expect(updatedStyles[0].objects[0].css.width).toBe('33px');
        expect(updatedStyles[0].objects[0].css.backgroundColor).toBe('black');


    })
});
