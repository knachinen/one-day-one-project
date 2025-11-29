import Realm from 'realm';
import { Goal, Action } from '../models';

export const realmConfig: Realm.Configuration = {
    schema: [Goal, Action],
    schemaVersion: 1,
};

export const getRealm = async (): Promise<Realm> => {
    return await Realm.open(realmConfig);
};
