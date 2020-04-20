"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-specific-snapshot");
var isFunction = function (obj) { return !!(obj && obj.constructor && obj.call && obj.apply); };
var optionsOrCallOptions = function (opts, story) { return (isFunction(opts) ? opts(story) : opts); };
exports.snapshotWithOptions = function (options) {
    if (options === void 0) { options = {}; }
    return function (_a) {
        var story = _a.story, context = _a.context, renderTree = _a.renderTree, snapshotFileName = _a.snapshotFileName;
        var result = renderTree(story, context, optionsOrCallOptions(options, story));
        function match(tree) {
            if (snapshotFileName) {
                expect(tree).toMatchSpecificSnapshot(snapshotFileName);
            }
            else {
                expect(tree).toMatchSnapshot();
            }
            if (typeof tree.unmount === 'function') {
                tree.unmount();
            }
        }
        if (typeof result.then === 'function') {
            return result.then(match);
        }
        return match(result);
    };
};
exports.multiSnapshotWithOptions = function (options) {
    if (options === void 0) { options = {}; }
    return function (_a) {
        var story = _a.story, context = _a.context, renderTree = _a.renderTree, stories2snapsConverter = _a.stories2snapsConverter;
        return exports.snapshotWithOptions(options)({
            story: story,
            context: context,
            renderTree: renderTree,
            snapshotFileName: stories2snapsConverter.getSnapshotFileName(context),
        });
    };
};
function shallowSnapshot(_a) {
    var story = _a.story, context = _a.context, renderShallowTree = _a.renderShallowTree, _b = _a.options, options = _b === void 0 ? {} : _b;
    var result = renderShallowTree(story, context, options);
    expect(result).toMatchSnapshot();
}
exports.shallowSnapshot = shallowSnapshot;
exports.renderWithOptions = function (options) {
    if (options === void 0) { options = {}; }
    return function (_a) {
        var story = _a.story, context = _a.context, renderTree = _a.renderTree;
        var result = renderTree(story, context, options);
        if (typeof result.then === 'function') {
            return result;
        }
        return undefined;
    };
};
exports.renderOnly = exports.renderWithOptions();
exports.snapshot = exports.snapshotWithOptions();
