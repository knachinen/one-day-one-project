import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRealm, useQuery } from '@realm/react';
import { Goal } from '../models';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type GoalSelectionScreenProps = StackScreenProps<RootStackParamList, 'GoalSelection'>;

export const GoalSelectionScreen: React.FC<GoalSelectionScreenProps> = ({ navigation }) => {
    const realm = useRealm();
    const goals = useQuery(Goal);
    const [activeGoalId, setActiveGoalId] = useState<string | null>(null);

    useEffect(() => {
        const currentActiveGoal = goals.find(goal => goal.isActive);
        if (currentActiveGoal) {
            setActiveGoalId(currentActiveGoal._id.toHexString());
        }
    }, [goals]);

    const handleSelectGoal = (goalToActivate: Goal) => {
        realm.write(() => {
            // Deactivate all other goals
            goals.forEach(goal => {
                if (goal._id.toHexString() !== goalToActivate._id.toHexString() && goal.isActive) {
                    goal.isActive = false;
                }
            });
            // Activate the selected goal
            goalToActivate.isActive = true;
            setActiveGoalId(goalToActivate._id.toHexString());
        });
    };

    const renderGoalItem = ({ item }: { item: Goal }) => (
        <View style={styles.goalItem}>
            <Text style={styles.goalTitle}>{item.title}</Text>
            <TouchableOpacity
                style={[styles.selectButton, item.isActive && styles.activeButton]}
                onPress={() => handleSelectGoal(item)}
            >
                <Text style={styles.selectButtonText}>
                    {item.isActive ? 'Active' : 'Select'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select Your Goal</Text>
            <FlatList
                data={goals}
                renderItem={renderGoalItem}
                keyExtractor={item => item._id.toHexString()}
                ListEmptyComponent={<Text style={styles.emptyText}>No goals found. Create one!</Text>}
            />
            <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate('GoalInput')}
            >
                <Text style={styles.createButtonText}>Create New Goal</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        paddingTop: 50, // To avoid status bar overlap
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    goalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    goalTitle: {
        fontSize: 18,
        color: '#555',
        flex: 1,
        marginRight: 10,
    },
    selectButton: {
        backgroundColor: '#6C63FF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    activeButton: {
        backgroundColor: '#28A745', // Green for active
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    createButton: {
        backgroundColor: '#FFC107',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
});