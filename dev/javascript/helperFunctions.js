var _ = require('lodash');
var debug = require('debug')('helperFunctions');
/**
 * Takes a list containing all objects to display and recursively flattens it.
 * @param {array} objects - levels[level].objects.
 * @return {array} containing all objects/elements */
var allObjects = exports.allObjects = function allObjects(objects) {
    var allObjs = [];
    var rec = function rec(objs) {
        objs.forEach(function (obj) {
            allObjs.push(obj);
            if (obj.hasOwnProperty('objects')) {
                rec(obj.objects)
            }
        })
    };
    rec(objects);
    return allObjs
};
/**
 * @param {string} topic valid topic name such as absolute, relative, static
 * @param {object} data contains all information about level, the one given to initial React object in main.jsx
 * @return {number} where is the first level of given topic, if topic doesn't exist returns 1*/
var firstLevelOfTopic = exports.firstLevelOfTopic = function firstLevelOfTopic(topic, data) {
    var topicStartsAt;
    _.forIn(data, function (value, key) {
        if (value.topic == topic && !topicStartsAt) {
            topicStartsAt = value.level
        }
    });

    if (!topicStartsAt) topicStartsAt = 1;
    debug('returning', topicStartsAt);
    return topicStartsAt
};

