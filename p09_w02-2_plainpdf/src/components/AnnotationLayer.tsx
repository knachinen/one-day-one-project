import React, { useRef, useState } from 'react';
import { StyleSheet, View, PanResponder, GestureResponderEvent } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { Annotation, AnnotationType, HighlightData, DrawData, TextData } from '../types';

interface AnnotationLayerProps {
    annotations: Annotation[];
    width: number;
    height: number;
    page: number;
    activeTool: AnnotationType | null;
    onAddAnnotation: (annotation: Annotation) => void;
    onRequestText: (x: number, y: number) => void;
}

export const AnnotationLayer: React.FC<AnnotationLayerProps> = ({ annotations, width, height, page, activeTool, onAddAnnotation, onRequestText }) => {
    const [currentPath, setCurrentPath] = useState<string>('');
    const [currentRect, setCurrentRect] = useState<HighlightData | null>(null);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => activeTool !== null,
            onMoveShouldSetPanResponder: () => activeTool !== null,
            onPanResponderGrant: (evt, gestureState) => {
                const { locationX, locationY } = evt.nativeEvent;
                const x = locationX / width;
                const y = locationY / height;

                if (activeTool === 'draw') {
                    setCurrentPath(`M ${locationX} ${locationY}`);
                } else if (activeTool === 'highlight') {
                    setCurrentRect({
                        x,
                        y,
                        width: 0,
                        height: 0,
                        color: 'yellow',
                        opacity: 0.3,
                    });
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                const { locationX, locationY } = evt.nativeEvent;

                if (activeTool === 'draw') {
                    setCurrentPath((prev) => `${prev} L ${locationX} ${locationY}`);
                } else if (activeTool === 'highlight' && currentRect) {
                    const currentX = locationX / width;
                    const currentY = locationY / height;
                    setCurrentRect((prev) => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            width: currentX - prev.x,
                            height: currentY - prev.y,
                        };
                    });
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (activeTool === 'draw') {
                    const newAnnotation: Annotation = {
                        id: Date.now(),
                        docId: 'temp', // TODO: Pass docId
                        page,
                        type: 'draw',
                        data: JSON.stringify({
                            path: currentPath, // Note: Storing absolute path for MVP. Should normalize.
                            color: 'red',
                            strokeWidth: 2,
                        }),
                        timestamp: Date.now(),
                    };
                    onAddAnnotation(newAnnotation);
                    setCurrentPath('');
                } else if (activeTool === 'highlight' && currentRect) {
                    // Normalize rect (handle negative width/height)
                    const normalizedRect = {
                        x: currentRect.width < 0 ? currentRect.x + currentRect.width : currentRect.x,
                        y: currentRect.height < 0 ? currentRect.y + currentRect.height : currentRect.y,
                        width: Math.abs(currentRect.width),
                        height: Math.abs(currentRect.height),
                        color: 'yellow',
                        opacity: 0.3,
                    };

                    const newAnnotation: Annotation = {
                        id: Date.now(),
                        docId: 'temp',
                        page,
                        type: 'highlight',
                        data: JSON.stringify(normalizedRect),
                        timestamp: Date.now(),
                    };
                    onAddAnnotation(newAnnotation);
                    setCurrentRect(null);
                } else if (activeTool === 'text') {
                    const { locationX, locationY } = evt.nativeEvent;
                    onRequestText(locationX / width, locationY / height);
                }
            },
        })
    ).current;

    return (
        <View
            style={[styles.container, { width, height }]}
            pointerEvents={activeTool ? 'auto' : 'none'}
            {...panResponder.panHandlers}
        >
            <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
                {annotations.map((annotation) => {
                    if (annotation.type === 'highlight') {
                        const data = JSON.parse(annotation.data) as HighlightData;
                        return (
                            <Rect
                                key={annotation.id}
                                x={data.x * width}
                                y={data.y * height}
                                width={data.width * width}
                                height={data.height * height}
                                fill={data.color}
                                opacity={data.opacity}
                            />
                        );
                    } else if (annotation.type === 'draw') {
                        const data = JSON.parse(annotation.data) as DrawData;
                        return (
                            <Path
                                key={annotation.id}
                                d={data.path} // Assuming path is absolute for now
                                stroke={data.color}
                                strokeWidth={data.strokeWidth}
                                fill="none"
                            />
                        );
                    }
                    return null;
                })}
                {/* Render current drawing/highlighting */}
                {currentPath ? (
                    <Path
                        d={currentPath}
                        stroke="red"
                        strokeWidth={2}
                        fill="none"
                    />
                ) : null}
                {currentRect ? (
                    <Rect
                        x={currentRect.x * width}
                        y={currentRect.y * height}
                        width={currentRect.width * width}
                        height={currentRect.height * height}
                        fill={currentRect.color}
                        opacity={currentRect.opacity}
                    />
                ) : null}
            </Svg>
            {annotations.map((annotation) => {
                if (annotation.type === 'text') {
                    // Render text icon or content
                    return null;
                }
                return null;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
});
