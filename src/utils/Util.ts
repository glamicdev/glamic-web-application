import _ from 'lodash'

function isNotEmpty(data:any) {
    return !_.isEmpty(data);
}

function isEmpty(data:any) {
    return _.isEmpty(data);
}

function compareDeep(previous:any, next:any) {
    return !_.isEqual(previous, next);
}

export default {
    isNotEmpty,
    isEmpty,
    compareDeep
};