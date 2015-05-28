### Description
CSS Positioning is a small *one page application* that was developed as means to deepen my knowledge in front end development, especially
JavaScript, React framework from Facebook, SASS preprocessor, code and project structuring and web design.
I have taken inspiration from [CSS Diner](http://flukeout.github.io/) and [flexbox in  5 minutes](http://flexboxin5.com/).

All of the project code is located in **dev** folder, which is complied by webpack into 1 .js file.

#### How it works
Information about levels is imported from dev/javascripts/level.js. Level are described in JSON formatas follows:


{"6":
{
        "level": 6,
        "topic": "absolute",
        "ruler": "false",
        "levelExplanation": "Move *__#absolute-child-1__* by using bottom and left properties. Move *__#absolute-child-2__* by using top and right properties.",
        "winConditions": [{"#absolute-child-1": {"top": 300, "left": 100}}, {
            "#absolute-child-2": {
                "top": 100,
                "left": 750
            }
        }],
        "objects": [{
            "id": "relative-parent",
            "css": {
                "margin": "25px 0 0 25px",
                "position": "relative",
                "height": "600px",
                "width": "700px",
                "backgroundColor": "#f1c40f"
            },
            "objects": [{
                "id": "absolute-child-1",
                "css": {
                    "left": 0,
                    "bottom": "380px",
                    "position": "absolute",
                    "height": "150px",
                    "width": "150px",
                    "backgroundColor": "#34495e"
                }
            }, {
                "id": "absolute-child-2",
                "css": {
                    "right": 0,
                    "top": "20px",
                    "position": "absolute",
                    "height": "150px",
                    "width": "150px",
                    "backgroundColor": "#34495e"
                }
            }, {
                "id": "static-child",
                "css": {"margin": "220px 0 0 160px", "height": "350px", "width": "350px", "backgroundColor": "#FF5722"}
            }]
        }],
        "notAllowedInput": ["color", "padding"],
        "positioningTheory": "When an element is set to position: __absolute__, it's then *removed from natural DOM flow and positioned in relation to the first _parent_ element* it has that doesn't have position: static. If there's no such element, the element with position: absolute gets positioned relative to <html>."
    },
    }
