var synaptic = require('synaptic');

var inputLayer = new Layer(10);
var hiddenLayer = new Layer (70);
var outputLayer = new Layer(53);

var learningRate = .3;

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var OneCareNeural = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  outputLayer: outputLayer
});




var testInputs = [1]
