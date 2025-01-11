// src/machineLearning.js

import * as tf from '@tensorflow/tfjs'; // TensorFlow.js for model training and prediction
import fs from 'fs';
import path from 'path';
import logger from './utils/logger'; // Assuming you have a logger utility

class MachineLearning {
    private model: tf.LayersModel | null = null;

    // Method to train a model
    public async trainModel(trainingData: tf.Tensor, labels: tf.Tensor, epochs: number = 100): Promise<void> {
        this.model = this.createModel();
        try {
            await this.model.fit(trainingData, labels, {
                epochs,
                callbacks: {
                    onEpochEnd: (epoch, logs) => {
                        logger.info(`Epoch ${epoch + 1}: loss = ${logs.loss}`);
                    },
                },
            });
            logger.info('Model training completed successfully.');
        } catch (error) {
            logger.error(`Error during model training: ${error.message}`);
            throw new Error('Model training failed');
        }
    }

    // Method to create a model
    private createModel(): tf.LayersModel {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] })); // Example input shape
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' })); // Example output layer
        model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
        return model;
    }

    // Method to make predictions
    public async predict(inputData: tf.Tensor): Promise<tf.Tensor> {
        if (!this.model) {
            throw new Error('Model is not trained yet.');
        }
        const predictions = this.model.predict(inputData) as tf.Tensor;
        return predictions;
    }

    // Method to evaluate the model
    public async evaluateModel(testData: tf.Tensor, testLabels: tf.Tensor): Promise<void> {
        if (!this.model) {
            throw new Error('Model is not trained yet.');
        }
        const evalResult = await this.model.evaluate(testData, testLabels);
        logger.info(`Model evaluation results: loss = ${evalResult[0].dataSync()[0]}, accuracy = ${evalResult[1].dataSync()[0]}`);
    }

    // Method to save the model
    public async saveModel(modelName: string): Promise<void> {
        if (!this.model) {
            throw new Error('Model is not trained yet.');
        }
        const modelPath = path.join(__dirname, 'models', modelName);
        await this.model.save(`file://${modelPath}`);
        logger.info(`Model saved to ${modelPath}`);
    }

    // Method to load a model
    public async loadModel(modelName: string): Promise<void> {
        const modelPath = path.join(__dirname, 'models', modelName);
        this.model = await tf.loadLayersModel(`file://${modelPath}/model.json`);
        logger.info(`Model loaded from ${modelPath}`);
    }
}

export default new MachineLearning();
