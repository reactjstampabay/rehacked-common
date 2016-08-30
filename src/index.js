/**
 * export contents of directories
 */
export const actions = require.context('./actions', true, /.*/);
export const constants = require.context('./constants', true, /.*/);
export const reducers = require.context('./reducers', true, /.*/);
export const services = require.context('./services', true, /.*/);
export const store = require.context('./store', true, /.*/);
