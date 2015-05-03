/**
 * Created by vyt on 2015-04-09.
 */

// better write variables react like
module.exports = {
    1: {
        level: 1,
        levelExplanation: 'Use only static, you can only move #digimon',
        winConditions: [{'#digimon': {top: 60, left: 331}}, {'.pokemon': {top: 300, left: 360}}],
        objects: [{
            id: 'digimon',
            css: {
                height: '200px',
                width: '200px',
                backgroundColor: 'red'
            },
            objects: [{
                id: 'inside-digimon',
                css: {
                    height: '150px',
                    width: '150px',
                    backgroundColor: 'green'
                },
                objects: [{
                    id: 'inside-ception',
                    css: {
                        height: '20px',
                        width: '40px',
                        'backgroundColor': 'grey'
                    }
                }]
            }]
        },
            {
                class: 'pokemon',
                css: {
                    height: '100px',
                    width: '100px',
                    backgroundColor: 'yellow'
                }
            }],
        notAllowedInput: ['width', 'height', 'color'],
        positioningTheory: 'With ramens drink red wine.When the particle views for subspace, all klingons consume photonic, conscious vogons. Not space or nirvana, follow the sorrow. Combine blueberries, peanut butter and ginger. rinse with shredded cayenne pepper and serve squeezed with bok choy. Enjoy! Go surprisingly like a cloudy ship.'
    },
    2: {
        level: 2,
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
    3: {
        level: 3,
        levelExplanation: 'Noice explananation',
        winConditions: [{'.third-level': {top: 23, left: 98}}],
        objects: [{class: 'third-level', css: {height: '500px', width: '400px', backgroundColor: 'black'}}],
        notAllowedInput: [],
        positioningTheory: 'Ubi est placidus onus?The tribble is more planet now than cosmonaut. collective and surprisingly brave.I accelerate this understanding, it called modern devastation.When the sun views for hyperspace, all hurqs influence evil, ship-wide cosmonauts.'
    },
    4: {
        level: 4,
        levelExplanation: 'When scraping hardened butters, be sure they are room temperature.',
        winConditions: [{'#fourth': {top: 23, left: 98}}],
        objects: [{id: 'fourth', css: {height: '20px', width: '600px', backgroundColor: 'white'}}],
        notAllowedInput: [],
        positioningTheory: 'Ubi est placidus onus?The tribble is more planet now than cosmonaut. collective and surprisingly brave.I accelerate this understanding, it called modern devastation.When the sun views for hyperspace, all hurqs influence evil, ship-wide cosmonauts.'
    }
};
