import React from 'react';
import { RealmProvider as RealmReactProvider } from '@realm/react';
import { Goal, Action } from '../models';

interface RealmProviderProps {
    children: React.ReactNode;
}

export const RealmProvider: React.FC<RealmProviderProps> = ({ children }) => {
    return (
        <RealmReactProvider schema={[Goal, Action]} schemaVersion={2}>
            {children}
        </RealmReactProvider>
    );
};
