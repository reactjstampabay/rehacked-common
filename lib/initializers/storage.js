'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactNativeStorage = require('react-native-storage');

var _reactNativeStorage2 = _interopRequireDefault(_reactNativeStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * initializes a storage system
 *
 *  react-native (AsyncStorage) and browser (localStorage)
 *
 *  expects the appropriate binding_context (window or global)
 *
 *  https://www.npmjs.com/package/react-native-storage
 */
exports.default = function (binding_context, storage_backend) {

  if (binding_context) {

    binding_context.storage = new _reactNativeStorage2.default({
      // maximum capacity, default 1000
      size: 1000,

      // Use AsyncStorage for RN, or window.localStorage for web.
      // If not set, data would be lost after reload.
      storageBackend: storage_backend,

      // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
      // can be null, which means never expire.
      defaultExpires: 1000 * 3600 * 24,

      // cache data in the memory. default is true.
      enableCache: true,

      // if data was not found in storage or expired,
      // the corresponding sync method will be invoked and return
      // the latest data.
      sync: {
        // we'll talk about the details later.
      }
    });
  }
};
//# sourceMappingURL=storage.js.map