import React, { useRef, useState } from 'react';
import { StyleSheet, View, PanResponder, GestureResponderEvent } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { Annotation, AnnotationType, HighlightData, DrawData, TextData } from '../types';

interface AnnotationLayerProps {
    annotations: Annotation[];
    width: number;
    height: number;
    page: number;
    docId: string;
    activeTool: AnnotationType | null;
    onAddAnnotation: (annotation: Annotation) => void;
    onRequestText: (x: number, y: number) => void;
}

export const AnnotationLayer: React.FC<AnnotationLayerProps> = ({ annotations, width, height, page, docId, activeTool, onAddAnnotation, onRequestText }) => {
    const [currentPath, setCurrentPath] = useState<string>('');
    const [currentRect, setCurrentRect] = useState<HighlightData | null>(null);

    const activeToolRef = useRef(activeTool);
    activeToolRef.current = activeTool;

    // Refs to track gesture state without stale closures
    const currentPathRef = useRef<string>('');
    const startPointRef = useRef<{ x: number, y: number } | null>(null);

    // Refs for callbacks to avoid stale closures in PanResponder
    const onAddAnnotationRef = useRef(onAddAnnotation);
    onAddAnnotationRef.current = onAddAnnotation;
    const onRequestTextRef = useRef(onRequestText);
    onRequestTextRef.current = onRequestText;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => {
                return activeToolRef.current !== null;
            },
            onStartShouldSetPanResponderCapture: () => {
                return activeToolRef.current !== null;
            },
            onMoveShouldSetPanResponder: () => activeToolRef.current !== null,
            onMoveShouldSetPanResponderCapture: () => activeToolRef.current !== null,
            onPanResponderGrant: (evt, gestureState) => {
                const tool = activeToolRef.current;
                const { locationX, locationY } = evt.nativeEvent;
                const x = locationX / width;
                const y = locationY / height;

                if (tool === 'draw') {
                    const initialPath = `M ${locationX} ${locationY}`;
                    currentPathRef.current = initialPath;
                    setCurrentPath(initialPath);
                } else if (tool === 'highlight') {
                    startPointRef.current = { x, y };
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
                // console.log('PanResponder: Move');
                const tool = activeToolRef.current;
                const { locationX, locationY } = evt.nativeEvent;

                if (tool === 'draw') {
                    const newPath = `${currentPathRef.current} L ${locationX} ${locationY}`;
                    currentPathRef.current = newPath;
                    setCurrentPath(newPath);
                } else if (tool === 'highlight' && startPointRef.current) {
                    const currentX = locationX / width;
                    const currentY = locationY / height;
                    const startX = startPointRef.current.x;
                    const startY = startPointRef.current.y;

                    setCurrentRect({
                        x: startX,
                        y: startY,
                        width: currentX - startX,
                        height: currentY - startY,
                        color: 'yellow',
                        opacity: 0.3,
                    });
                }
            },
            onPanResponderTerminationRequest: () => false,
            onShouldBlockNativeResponder: () => true,
            onPanResponderRelease: (evt, gestureState) => {
                const tool = activeToolRef.current;
                if (tool === 'draw') {
                    const newAnnotation: Annotation = {
                        id: Date.now(),
                        docId,
                        page,
                        type: 'draw',
                        data: JSON.stringify({
                            path: currentPathRef.current,
                            color: 'red',
                            strokeWidth: 2,
                        }),
                        timestamp: Date.now(),
                    };
                    onAddAnnotationRef.current(newAnnotation);
                    setCurrentPath('');
                    currentPathRef.current = '';
                } else if (tool === 'highlight' && startPointRef.current) {
                    const { locationX, locationY } = evt.nativeEvent;
                    const currentX = locationX / width;
                    const currentY = locationY / height;
                    const startX = startPointRef.current.x;
                    const startY = startPointRef.current.y;
                    const widthVal = currentX - startX;
                    const heightVal = currentY - startY;

                    // Normalize rect (handle negative width/height)
                    const normalizedRect = {
                        x: widthVal < 0 ? startX + widthVal : startX,
                        y: heightVal < 0 ? startY + heightVal : startY,
                        width: Math.abs(widthVal),
                        height: Math.abs(heightVal),
                        color: 'yellow',
                        opacity: 0.3,
                    };

                    const newAnnotation: Annotation = {
                        id: Date.now(),
                        docId,
                        page,
                        type: 'highlight',
                        data: JSON.stringify(normalizedRect),
                        timestamp: Date.now(),
                    };
                    onAddAnnotationRef.current(newAnnotation);
                    setCurrentRect(null);
                    startPointRef.current = null;
                } else if (tool === 'text') {
                    const { locationX, locationY } = evt.nativeEvent;
                    onRequestTextRef.current(locationX / width, locationY / height);
                }
            },
        })
    ).current;

    return (
        <View
            style={[styles.container, { width, height }]}
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
        elevation: 10, // Required for Android to receive touches over native views
    },
});
