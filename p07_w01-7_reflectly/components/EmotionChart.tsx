import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { EmotionDataPoint } from '@/utils/emotionAnalytics';

interface Props {
    data: EmotionDataPoint[];
    period: 7 | 30;
}

export function EmotionChart({ data, period }: Props) {
    const screenWidth = Dimensions.get('window').width;

    // Filter out null values for the chart, but keep indices correct if possible
    // React Native Chart Kit doesn't handle nulls well in line charts usually, 
    // so we might need to interpolate or just show points.
    // For simplicity, we'll map null to 3 (neutral) but maybe style differently?
    // Or better, just filter valid points if we want a continuous line, 
    // but that distorts time.
    // Let's use 3 as neutral for missing days for now, or 0 and hide them.
    // A better approach for MVP is to just plot available data points.

    const chartData = {
        labels: data.filter((_, i) => i % (period === 30 ? 5 : 1) === 0).map(d => d.label),
        datasets: [{
            data: data.map(d => d.value ?? 3), // Default to neutral (3) for missing days
            strokeWidth: 2,
        }]
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>감정 흐름 ({period}일)</Text>
            <LineChart
                data={chartData}
                width={screenWidth - 40}
                height={220}
                chartConfig={{
                    backgroundColor: Colors.cardBackground,
                    backgroundGradientFrom: Colors.cardBackground,
                    backgroundGradientTo: Colors.cardBackground,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(168, 213, 186, ${opacity})`, // Primary color
                    labelColor: (opacity = 1) => `rgba(99, 110, 114, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: Colors.primary,
                    },
                }}
                bezier
                style={styles.chart}
                fromZero={false}
                yAxisInterval={1}
                segments={4}
                yAxisLabel=""
                yAxisSuffix=""
                formatYLabel={(y) => {
                    const val = Math.round(parseFloat(y));
                    if (val === 5) return '😊';
                    if (val === 4) return '🤩';
                    if (val === 3) return '😌';
                    if (val === 2) return '😰';
                    if (val === 1) return '😢';
                    return '';
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        ...Typography.heading,
        marginBottom: 16,
        color: Colors.text.primary,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});
