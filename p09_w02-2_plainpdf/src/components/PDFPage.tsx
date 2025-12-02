import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import { AnnotationLayer } from './AnnotationLayer';
import { Annotation, AnnotationType } from '../types';

interface PDFPageProps {
    uri: string;
    page: number;
    width: number;
    height: number;
    annotations: Annotation[];
    activeTool: AnnotationType | null;
    onAddAnnotation: (annotation: Annotation) => void;
    onRequestText: (x: number, y: number) => void;
}

export const PDFPage: React.FC<PDFPageProps> = ({ uri, page, width, height, annotations, activeTool, onAddAnnotation, onRequestText }) => {
    return (
        <View style={[styles.container, { width, height }]}>
            <Pdf
                source={{ uri, cache: true }}
                page={page}
                singlePage={true}
                style={styles.pdf}
                fitPolicy={0} // Width
            />
            <AnnotationLayer
                annotations={annotations}
                width={width}
                height={height}
                page={page}
                activeTool={activeTool}
                onAddAnnotation={onAddAnnotation}
                onRequestText={onRequestText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    pdf: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
