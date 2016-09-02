import Storage from 'react-native-storage';

/**
 * initializes a storage system
 *
 *  react-native (AsyncStorage) and browser (localStorage)
 *
 *  expects the appropriate binding_context (window or global)
 *
 *  https://www.npmjs.com/package/react-native-storage
 */
export default (binding_context) => {

  if (binding_context) {

    binding_context.storage = new Storage({
      // maximum capacity, default 1000
      size: 1000,

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
