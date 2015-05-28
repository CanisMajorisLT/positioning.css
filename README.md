All of the project code is located in **dev** folder, which is compiled by webpack into 1 .js file.

### Description
CSS Positioning is a small *one page application* that was developed as means to deepen my knowledge in front end development, especially
JavaScript, React framework from Facebook, SASS preprocessor, code and project structuring and web design.
I have taken inspiration from [CSS Diner](http://flukeout.github.io/) and [flexbox in  5 minutes](http://flexboxin5.com/).

Since the project has turned out to be more of an educational nature for myself, I haven't invested much time for content creation,
as a result there aren't many levels and some of the positioning theory is borrowed from www.codecademy.com and http://www.barelyfitz.com/screencast/html-training/css/positioning/

#### How it works
Information about levels is imported from [dev/javascripts/level.js](https://github.com/CanisMajorisLT/positioning.css/blob/master/dev/javascript/levels.js). Level are described in JSON format (and can be created easily).
Object containing levels is passed down to GameWrap component, which passes it down to all child components that need data about level.

GameWrap has the *main* controlling state - it takes data of the whole level as a state and updates it on *user input* or *when levels are changed
in navigation* or *when level is **won*** by user inputting correct answer.

#### What can be improved
* There is a lot of game logic placed directly into React components - it should be moved outside of them.
* Some of the code that is written in JSX/HTML could be made into React components.
* Variable naming consistency (rendered objects sometimes are referred as elements, sometimes as objects).
* More tests.
* There are a lot of TODOs laying around!
