import chai from 'chai';
const common = require('../lib');

describe('rehacked common', () => {

  it('must return an object', () => {
    chai.assert.isObject(common);
  });

  it('must return an object for actions', () => {
    const actions = common.actions;
    chai.assert.isObject(actions);
  });

  it('must return an object for constants', () => {
    const constants = common.constants;
    chai.assert.isObject(constants);
  });

  it('must return an object for store', () => {
    const store = common.store;
    chai.assert.isObject(store);
  });
});

describe('rehacked common store', () => {

  it('must return a default function', () => {
    const store = common.store;
    chai.assert.isFunction(store.default);
  });
});
