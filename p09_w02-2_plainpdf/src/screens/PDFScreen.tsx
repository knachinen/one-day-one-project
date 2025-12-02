import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import { PDFPage } from '../components/PDFPage';
import { Toolbar } from '../components/Toolbar';
import { TextInputModal } from '../components/TextInputModal';
import { Annotation, AnnotationType } from '../types';
import { initDatabase, getAnnotations, saveAnnotation, deleteAnnotation } from '../db';

interface PDFScreenProps {
    uri: string;
    onBack: () => void;
}

export const PDFScreen: React.FC<PDFScreenProps> = ({ uri, onBack }) => {
    const [totalPages, setTotalPages] = useState(0);
    const [pageWidth, setPageWidth] = useState(Dimensions.get('window').width);
    const [pageHeight, setPageHeight] = useState(Dimensions.get('window').height); // Initial guess
    const [isReady, setIsReady] = useState(false);
    const [activeTool, setActiveTool] = useState<AnnotationType | null>(null);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pendingTextAnnotation, setPendingTextAnnotation] = useState<{ page: number, x: number, y: number } | null>(null);

    React.useEffect(() => {
        initDatabase();
        const loaded = getAnnotations(uri);
        setAnnotations(loaded);
    }, [uri]);

    const handleAddAnnotation = (annotation: Annotation) => {
        if (annotation.type === 'text' && annotation.data === 'PENDING') {
            // This is a signal to open modal
            // But wait, we need coordinates.
            // Let's assume AnnotationLayer passes a special object or we handle it differently.
            // Actually, let's change onAddAnnotation signature or check data.
            return;
        }
        const newAnnotations = [...annotations, annotation];
        setAnnotations(newAnnotations);
        saveAnnotation(annotation);
    };

    const handleRequestText = (page: number, x: number, y: number) => {
        setPendingTextAnnotation({ page, x, y });
        setIsModalVisible(true);
    };

    const handleSaveText = (text: string) => {
        if (pendingTextAnnotation) {
            const newAnnotation: Annotation = {
                id: Date.now(),
                docId: uri, // Use URI as docId
                page: pendingTextAnnotation.page,
                type: 'text',
                data: JSON.stringify({
                    x: pendingTextAnnotation.x,
                    y: pendingTextAnnotation.y,
                    content: text,
                }),
                timestamp: Date.now(),
            };
            handleAddAnnotation(newAnnotation);
            setPendingTextAnnotation(null);
            setIsModalVisible(false);
            setActiveTool(null); // Reset tool after adding
        }
    };

    const renderItem = ({ item }: { item: number }) => {
        return (
            <PDFPage
                uri={uri}
                page={item}
                width={pageWidth}
                height={pageHeight}
                annotations={annotations.filter(a => a.page === item)}
                activeTool={activeTool}
                onAddAnnotation={handleAddAnnotation}
                onRequestText={(x, y) => handleRequestText(item, x, y)}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {!isReady && (
                <View style={{ height: 1, overflow: 'hidden' }}>
                    <Pdf
                        source={{ uri, cache: true }}
                        onLoadComplete={(numberOfPages, filePath, { width, height }) => {
                            setTotalPages(numberOfPages);
                            // Calculate height based on screen width to maintain aspect ratio
                            const scale = Dimensions.get('window').width / width;
                            setPageWidth(Dimensions.get('window').width);
                            setPageHeight(height * scale);
                            setIsReady(true);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                    />
                </View>
            )}

            {isReady && (
                <FlatList
                    data={Array.from({ length: totalPages }, (_, i) => i + 1)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.toString()}
                    windowSize={3}
                    initialNumToRender={2}
                    maxToRenderPerBatch={2}
                    scrollEnabled={activeTool === null}
                />
            )}
            <Toolbar activeTool={activeTool} onSelectTool={setActiveTool} />
            <TextInputModal
                visible={isModalVisible}
                onSave={handleSaveText}
                onCancel={() => setIsModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingTop: 10,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
