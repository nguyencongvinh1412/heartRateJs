// ml-naivebayes
const mlnaivebayes = require('ml-naivebayes');

const filterValue = require('./fillterValueUserRecord');

module.exports.prediction = (dataTrain , dataTest, heart) => { 

    const matrixs = filterValue.getMatrixTrain(dataTrain);
    const matrixTest = filterValue.getMatrixTest(dataTest, heart);

    var model = new mlnaivebayes.GaussianNB();
    model.train(matrixs.matrixX, matrixs.matrixY);

    var prediction = model.predict([matrixTest])

    return prediction;
}