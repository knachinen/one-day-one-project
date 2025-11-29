import Realm, { BSON } from 'realm';

// Action 스키마
export class Action extends Realm.Object<Action> {
    _id!: BSON.ObjectId;
    description!: string;
    status!: string; // "pending" | "completed"
    createdAt!: Date;
    completedAt?: Date;
    reminderTime?: Date;

    static schema: Realm.ObjectSchema = {
        name: 'Action',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            description: 'string',
            status: 'string',
            createdAt: 'date',
            completedAt: 'date?',
            reminderTime: 'date?',
        },
    };
}

// Goal 스키마
export class Goal extends Realm.Object<Goal> {
    _id!: BSON.ObjectId;
    title!: string;
    createdAt!: Date;
    status!: string; // "active" | "completed"
    isActive!: boolean; // Added isActive property
    actions!: Realm.List<Action>;

    static schema: Realm.ObjectSchema = {
        name: 'Goal',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            title: 'string',
            createdAt: 'date',
            status: 'string',
            isActive: { type: 'bool', default: false }, // Added isActive to schema
            actions: 'Action[]',
        },
    };
}
