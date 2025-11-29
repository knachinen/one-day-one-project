import Realm from 'realm';
import { Goal, Action } from '../models';

export const realmConfig: Realm.Configuration = {
    schema: [Goal, Action],
    schemaVersion: 2, // Increment schema version
    migration: (oldRealm, newRealm) => {
        if (oldRealm.schemaVersion < 2) {
            // All existing Goal objects will automatically get the 'isActive' property
            // with its default value (false) when opened with the new schema.
            // No manual migration logic is strictly needed for simply adding a property with a default.
            // If you needed to set 'isActive' based on old data, you would do it here.
        }
    },
};

export const getRealm = async (): Promise<Realm> => {
    return await Realm.open(realmConfig);
};
