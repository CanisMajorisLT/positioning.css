var React = require('react');
var helpers = require('./helperFunctions.jsx');

var HTMLmapWrap = module.exports = React.createClass({
    getInitialState: function () {
        return {displayMap: false}
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return (this.props.data.level !== nextProps.data.level) || (this.state.displayMap !== nextState.displayMap)
    },
    mapDisplayControl: function () {
        this.setState({displayMap: !this.state.displayMap})
    },
    render: function () {
        var toString = React.renderToStaticMarkup(<HTMLmap data={this.props.data} />);
        var tag = '<html/>';
        return (
            <div>
                <div id="html-map-btn" onClick={this.mapDisplayControl}>{tag}</div>
                <HTMLmap data={this.props.data} display={this.state.displayMap}/>
            </div>

        )
    }
});

var HTMLmap = React.createClass({
    render: function () {
        var style = {
            transform: 'scale(0)',
            transitionDuration: '250ms',
            transformOrigin: 'right'
        };
        if (this.props.display) {
            style.transform = 'scale(1)';
        }
        return (
            <div style={style} id="html-map-body">
                <HTMLmapGutters ammount={helpers.allObjects(this.props.data.objects).length * 2}/>
                <HTMLmapTree data={this.props.data}/>
            </div>
        )
    }
});

var HTMLmapTree = React.createClass({
    handleHover: function (identifier, active) {
        var el = document.querySelector(identifier);
        if (active) {
            if (el.classList)
                el.classList.add('mapHover');
            else
                el.className += ' ' + 'mapHover';
        }
        else {
            if (el.classList)
                el.classList.remove('mapHover');
        }
        console.log(el);
    },
    render: function () {
        var uniqueKeyProp = 1;
        var elementToString = function (element) {
            var div = '<div';
            if (element.hasOwnProperty('id')) {
                div += ' id=' + '"' + element.id + '"'
            }
            if (element.hasOwnProperty('class')) {
                div += ' class=' + '"' + element.class + '"'
            }
            div += '>';
            return div
        };
        var elementsGenerator = function (objects) {
            return objects.map(function (element) {
                var key = uniqueKeyProp;
                ++uniqueKeyProp;
                // recursion if has objects inside
                var recursion;
                if (element.hasOwnProperty('objects')) {
                    recursion = elementsGenerator(element.objects)
                }
                var elementString = elementToString(element);
                var divString = '</div>';
                if (element.hasOwnProperty('id')) {
                    return <div key={key} id={element.id}>
                        <div onMouseOver={this.handleHover.bind(null, '#' + element.id, true)}
                            onMouseOut={this.handleHover.bind(null, '#' + element.id, false)}>{elementString}</div>
                        {recursion}
                        <div onMouseOver={this.handleHover.bind(null, '#' + element.id, true)}
                            onMouseOut={this.handleHover.bind(null, '#' + element.id, false)}>{divString}</div>
                    </div>

                }
                else {
                    var className = element.class;
                    return <div key={key} className={className}>
                        <div onMouseOver={this.handleHover.bind(null, '.' + element.class, true)}
                            onMouseOut={this.handleHover.bind(null, '.' + element.class, false)}>{elementString}</div>
                        {recursion}
                        <div onMouseOver={this.handleHover.bind(null, '.' + element.class, true)}
                            onMouseOut={this.handleHover.bind(null, '.' + element.class, false)}>{divString}</div>
                    </div>
                }
            }.bind(this))
        }.bind(this);

        var elements = elementsGenerator(this.props.data.objects);


        return (
            <div className="tree">{elements}</div>
        )
    }
});

var HTMLmapGutters = React.createClass({
    render: function () {
        var numbers = [];

        for(var i = 1; i <= this.props.ammount; i++){
            numbers.push(<div key={i}>{i}</div>)
        }
        return (
            <div className="gutters">{numbers}</div>

        )
    }
});