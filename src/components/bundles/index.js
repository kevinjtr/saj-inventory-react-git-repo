import { composeBundles } from 'redux-bundler';

// import our application bundles
import equipmentBundle from './equipment-bundle'

// compose the bundles into a redux store and export our new store
export default composeBundles(
    equipmentBundle
);