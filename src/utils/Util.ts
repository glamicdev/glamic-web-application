import _ from 'lodash'

function isNotEmpty(data:any) {
    return !_.isEmpty(data);
}

function isEmpty(data:any) {
    return _.isEmpty(data);
}

export default {
    isNotEmpty,
    isEmpty
};