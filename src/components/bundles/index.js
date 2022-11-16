import { composeBundles, createCacheBundle  } from 'redux-bundler';
//import cache from '../utils/cache';

// import our application bundles
//import equipmentBundle from './equipment-bundle'
import userBundle from './user-bundle'

// compose the bundles into a redux store and export our new store
export default composeBundles(
    //createCacheBundle(cache.set),
    userBundle,
    // createCacheBundle({
    //     cacheFn: cache.put
    //   }),
    //equipmentBundle
);