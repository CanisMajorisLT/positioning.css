/**
 * Created by vyt on 2015-04-09.
 */

// better write variables react like
module.exports = {
    1: {
        level: 1,
        topic: 'static',
        ruler: 'true',
        levelExplanation: 'Change *__#leonidas__* height to move *__#messenger__* to the projected location',
        winConditions: [{'#messenger': {top: 450, left: 10}}],
        objects: [{
            id: 'leonidas',
            css: {
                height: '200px',
                width: '400px',
                margin: '10px 0 0 10px',
                backgroundColor: '#f1c40f'
            }
        },
            {
                id: 'messenger',
                css: {
                    height: '100px',
                    width: '200px',
                    margin: '0 0 0 10px',
                    backgroundColor: '#34495e'
                }
            }],
        notAllowedInput: ['color', 'margin', 'padding', 'width'],
        positioningTheory: "The *default* positioning for all elements is position: *static*, which means the element is not positioned and occurs where it normally would in the document. Normally you wouldn't specify this unless you needed to override a positioning that had been previously set."
    },
    2: {
        level: 2,
        topic: 'static',
        ruler: 'false',
        levelExplanation: 'Change *__#messenger__* margin to move it to the projected location',
        winConditions: [{'#messenger': {top: 350, left: 450}}],
        objects: [{
            id: 'leonidas',
            css: {
                height: '200px',
                width: '400px',
                backgroundColor: '#f1c40f'
            }
        },
            {
                id: 'messenger',
                css: {
                    height: '150px',
                    width: '300px',
                    backgroundColor: '#34495e'
                }
            },
            {
                id: 'peasant',
                css: {
                    height: '100px',
                    width: '200px',
                    backgroundColor: '#795548'
                }
            }],
        notAllowedInput: ['padding', 'height', 'width', 'position'],
        positioningTheory: "Changing statically positioned elements in DOM with margin also affects position of other dom elements (that are not positioned as absolute or fixed[width top/bot/left/right properties])"
    },
    3: {
        level: 3,
        topic: 'relative',
        ruler: 'true',
        levelExplanation: 'This time move *__#messenger__* to the shown position by using top, bottom, left, right',
        winConditions: [{'#messenger': {top: 350, left: 450}}],
        objects: [{
            id: 'leonidas',
            css: {
                height: '200px',
                width: '400px',
                backgroundColor: '#f1c40f'
            }
        },
            {
                id: 'messenger',
                css: {
                    position: 'relative',
                    left: '0',
                    height: '150px',
                    width: '300px',
                    backgroundColor: '#34495e'
                }
            },
            {
                id: 'peasant',
                css: {
                    height: '100px',
                    width: '200px',
                    backgroundColor: '#795548'
                }
            }],
        notAllowedInput: ['padding', 'height', 'width', 'position', 'margin'],
        positioningTheory: "Relative positioning allows top, bottom, left, right to be used on element. These properties tell the element to move *relative to where it would have landed* if it just had the default static positioning."
    },
    4: {
        level: 4,
        topic: 'relative',
        ruler: 'true',
        levelExplanation: 'Okay, now move *__#messenger__*  below *__#peasant__*',
        winConditions: [{'#messenger': {top: 500, left: 0}}],
        objects: [{
            id: 'leonidas',
            css: {
                height: '200px',
                width: '400px',
                backgroundColor: '#f1c40f'
            }
        },
            {
                id: 'messenger',
                css: {
                    position: 'relative',
                    left: '0',
                    height: '150px',
                    width: '300px',
                    backgroundColor: '#34495e'
                }
            },
            {
                id: 'peasant',
                css: {
                    height: '100px',
                    width: '200px',
                    backgroundColor: '#795548'
                }
            }],
        notAllowedInput: ['padding', 'height', 'width', 'position', 'margin'],
        positioningTheory: "Relative positioning allows top, bottom, left, right to be used on element. These properties tell the element to move *relative to where it would have landed* if it just had the default static positioning."
    },
    5: {
        level: 5,
        topic: 'absolute',
        ruler: 'false',
        levelExplanation: 'Move *__#absolute-child-1__* by using bottom and left properties. Move *__#absolute-child-2__* by using top and right properties.',
        winConditions: [{'#absolute-child-1': {top: 300, left: 100}}, {'#absolute-child-2': {top: 100, left: 750}}],
        objects: [{
            id: 'relative-parent',
            css: {
                margin: '25px 0 0 25px',
                position: 'relative',
                height: '600px',
                width: '700px',
                backgroundColor: '#f1c40f'
            },
            objects: [{
                id: 'absolute-child-1',
                css: {
                    left: 0,
                    bottom: '380px',
                    position: 'absolute',
                    height: '150px',
                    width: '150px',
                    backgroundColor: '#34495e'
                }
            },
                {
                    id: 'absolute-child-2',
                    css: {
                        right: 0,
                        top: '20px',
                        position: 'absolute',
                        height: '150px',
                        width: '150px',
                        backgroundColor: '#34495e'
                    }
                },
                {
                    id: 'static-child',
                    css: {
                        margin: '220px 0 0 160px',
                        height: '350px',
                        width: '350px',
                        backgroundColor: '#FF5722'
                    }
                }]
        }

        ],
        notAllowedInput: ['color', 'padding'],
        positioningTheory: "When an element is set to position: __absolute__, it's then *removed from natural DOM flow and positioned in relation to the first _parent_ element* it has that doesn't have position: static. If there's no such element, the element with position: absolute gets positioned relative to <html>."
    },
    /*6: {
        level: 6,
        topic: 'absolute',
        ruler: 'true',
        levelExplanation: 'Okay, now move #manager to below #developer',
        winConditions: [{'#manager': {top: 500, left: 0}}],
        objects: [{
            id: 'CEO',
            css: {

                height: '200px',
                width: '400px',
                backgroundColor: '#f1c40f'
            }
        },
            {
                id: 'manager',
                css: {
                    top: '0',
                    position: 'relative',
                    height: '150px',
                    width: '300px',
                    backgroundColor: '#34495e'
                }
            },
            {
                id: 'developer',
                css: {
                    height: '100px',
                    width: '200px',
                    backgroundColor: '#34495e'
                }
            }],
        notAllowedInput: ['color', 'padding'],
        positioningTheory: ""
    },*/
    //7: {
    //    level: 7,
    //    topic: 'absolute',
    //    levelExplanation: 'Okay, now move #manager to below #developer',
    //    winConditions: [{'#manager': {top: 500, left: 0}}],
    //    objects: [{
    //        id: 'CEO',
    //        css: {
    //
    //            height: '200px',
    //            width: '400px',
    //            backgroundColor: '#f1c40f'
    //        }
    //    },
    //        {
    //            id: 'manager',
    //            css: {
    //                position: 'relative',
    //                height: '150px',
    //                width: '300px',
    //                backgroundColor: '#34495e'
    //            }
    //        },
    //        {
    //            id: 'developer',
    //            css: {
    //                height: '100px',
    //                width: '200px',
    //                backgroundColor: '#34495e'
    //            }
    //        }],
    //    notAllowedInput: ['color', 'padding'],
    //    positioningTheory: "Relative positioning is more straightforward: it tells the element to move relative to where it would have landed if it just had the default static positioning."
    //},
    6: {
        level: 6,
        topic: 'fixed',
        ruler: 'false',
        levelExplanation: 'Scroll down to fly *__#bird__* to its location below and submit. Use top property to modify its position if needed.',
        winConditions: [{'#bird': {top: 3000, left: 10}}],
        objects: [{
            id: 'sky',
            css: {
                position: 'absolute',
                left: '5px',
                top: '5px',
                height: '4000px',
                width: '600px',
                backgroundColor: '#f1c40f'
            },
            objects: [{
                id: 'bird',
                css: {
                    position: 'fixed',
                    left: '10px',
                    top: '70px',
                    height: '100px',
                    width: '400px',
                    backgroundColor: '#F44336'
                }
            }, {
                class: 'cloud',
                css: {
                    position: 'absolute',
                    left: '30px',
                    top: '1000px',
                    height: '80px',
                    width: '105px',
                    backgroundColor: '#9E9E9E'
                }
            },
            {
                class: 'cloud',
                css: {
                    position: 'absolute',
                    left: '230px',
                    top: '1300px',
                    height: '80px',
                    width: '105px',
                    backgroundColor: '#9E9E9E'
                }
            },
                        {
                class: 'cloud',
                css: {
                    position: 'absolute',
                    left: '30px',
                    top: '1900px',
                    height: '120px',
                    width: '305px',
                    backgroundColor: '#9E9E9E'
                }
            },
                        {
                class: 'cloud',
                css: {
                    position: 'absolute',
                    left: '220px',
                    top: '1860px',
                    height: '80px',
                    width: '205px',
                    backgroundColor: '#9E9E9E'
                }
            }
            ]
        }],
        notAllowedInput: ['color', 'padding'],
        positioningTheory: "Elements positioned by fixed are placed in relation to browser window. You can think of them as being glued to the windows, because their position never changes even when user scrolls."
    },
    7: {
        level: 7,
        topic: 'fun',
        levelExplanation: 'Good luck.',
        winConditions: [{'#(☞ﾟヮﾟ)☞': {top: 200, left: 400}}, {'#༼ ºل͟º ༼ ºل͟º ༼ ºل͟º ༽ ºل͟º ༽ ºل͟º ༽': {top: 200, left: 580}}],
        objects: [{
            id: '(☞ﾟヮﾟ)☞',
            css: {
                position: 'static',
                height: '111px',
                width: '155px',
                display: 'none',
                backgroundColor: '#fff'
            }
        },
        {
            id: '༼ ºل͟º ༼ ºل͟º ༼ ºل͟º ༽ ºل͟º ༽ ºل͟º ༽',
            css: {
                position: 'absolute',
                left: '10px',
                top: '50px',
                height: '111px',
                width: '295px',
                backgroundColor: '#795548'
            }
        }],
        notAllowedInput: ['User all your powers'],
        positioningTheory: "Fun fact: until you got to this part 7 new javascript frameworks were created."
    }
/*    10: {
        level: 10,
        levelExplanation: 'Use everything',
        winConditions: [{'#toledo': {top: 200, left: 20}}],
        objects: [{
            id: 'toledo',
            css: {
                color: 'red',
                height: '123px',
                width: '145px',
                backgroundColor: 'black'
            }

        },
            {
                class: 'seat',
                css: {
                    height: '250px',
                    width: '300px',
                    backgroundColor: 'yellow'
                },
                objects: [{id: 'leon', css: {width: 205, height: 50, 'backgroundColor': 'red'}}]
            }],
        notAllowedInput: [],
        positioningTheory: 'Satori doesn’t harmoniously acquire any individual — but the seeker is what travels. All important lamas hear each other, only unbiased creators have a solitude.'
    },
    11: {
        level: 11,
        levelExplanation: 'Noice explananation',
        winConditions: [{'.third-level': {top: 23, left: 98}}],
        objects: [{class: 'third-level', css: {height: '500px', width: '400px', backgroundColor: 'black'}}],
        notAllowedInput: [],
        positioningTheory: 'Ubi est placidus onus?The tribble is more planet now than cosmonaut. collective and surprisingly brave.I accelerate this understanding, it called modern devastation.When the sun views for hyperspace, all hurqs influence evil, ship-wide cosmonauts.'
    },
    12: {
        level: 12,
        levelExplanation: 'When scraping hardened butters, be sure they are room temperature.',
        winConditions: [{'#fourth': {top: 23, left: 98}}],
        objects: [{id: 'fourth', css: {height: '20px', width: '600px', backgroundColor: 'white'}}],
        notAllowedInput: [],
        positioningTheory: 'Ubi est placidus onus?The tribble is more planet now than cosmonaut. collective and surprisingly brave.I accelerate this understanding, it called modern devastation.When the sun views for hyperspace, all hurqs influence evil, ship-wide cosmonauts.'
    }*/
};
