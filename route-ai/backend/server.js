const express = require('express');
const tf = require('@tensorflow/tfjs');
const app = express();

app.use(express.json());

let model;

function createModel() {
    model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [2], units: 10, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 10, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError',
        metrics: ['accuracy']
    });
}

app.post('/train', (req, res) => {
    const { inputs, labels } = req.body;
    const inputTensor = tf.tensor2d(inputs);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    model.fit(inputTensor, labelTensor, {
        epochs: 10,
        shuffle: true
    }).then(() => res.send('Model trained!'));
});

app.post('/predict', (req, res) => {
    const input = tf.tensor2d([req.body.input], [1, req.body.input.length]);
    const prediction = model.predict(input);
    prediction.data().then(data => res.json({ prediction: data[0] }));
});

app.listen(3000, () => {
    createModel();
    console.log('Server running on port 3000');
});
