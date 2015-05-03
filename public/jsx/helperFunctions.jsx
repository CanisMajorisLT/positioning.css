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