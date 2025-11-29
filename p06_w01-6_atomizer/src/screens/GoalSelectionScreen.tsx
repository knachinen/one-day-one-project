import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'; // Import Alert
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import { useRealm, useQuery } from '@realm/react';
import { Goal } from '../models';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useGoalLogic } from '../hooks'; // Import useGoalLogic
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

type GoalSelectionScreenProps = StackScreenProps<RootStackParamList, 'GoalSelection'>;

export const GoalSelectionScreen: React.FC<GoalSelectionScreenProps> = ({ navigation }) => {
    const realm = useRealm();
    const goals = useQuery(Goal);
    const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
    const { deleteGoal } = useGoalLogic(); // Use deleteGoal

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
        // Navigate to ActionCreateScreen after selecting a goal
        navigation.navigate('ActionCreate', { goalId: goalToActivate._id.toHexString() });
    };

    const handleDeleteGoal = (goalId: string) => {
        Alert.alert(
            "목표 삭제",
            "정말로 이 목표를 삭제하시겠습니까? 이 목표에 연결된 모든 10초 행동도 함께 삭제됩니다.",
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {
                    text: "삭제",
                    onPress: () => deleteGoal(goalId, () => {
                        // After successful deletion, refresh goals or navigate
                        navigation.navigate('GoalSelection'); // Refresh the list
                    }),
                    style: "destructive"
                }
            ]
        );
    };

    const renderGoalItem = ({ item }: { item: Goal }) => (
        <View style={styles.goalItem}>
            <Text style={styles.goalTitle}>{item.title}</Text>
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('GoalInput', { goalId: item._id.toHexString() })}
                >
                    <Ionicons name="create-outline" size={24} color="#6C63FF" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteGoal(item._id.toHexString())}
                >
                    <Ionicons name="trash-outline" size={24} color="#FF6347" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.selectButton, item.isActive && styles.activeButton]}
                    onPress={() => handleSelectGoal(item)}
                >
                    <Text style={styles.selectButtonText}>
                        {item.isActive ? 'Active' : 'Select'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        // paddingTop: 50, // Removed as SafeAreaView handles it
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
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        marginRight: 10,
        padding: 5,
    },
    deleteButton: {
        marginRight: 10,
        padding: 5,
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