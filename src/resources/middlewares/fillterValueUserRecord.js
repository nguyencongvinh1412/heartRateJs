module.exports.filterValue = (data) => {
    let timeArr = [];
    let heartArr = [];
    let oxiArr = [];
    let preArr = [];
    data.forEach(async (user) => {
        timeArr.push(user.createdAt);
        heartArr.push(user.heartRate);
        oxiArr.push(user.oximeter);
        preArr.push(user.prediction);
    });
    return {
        time: timeArr,
        heart: heartArr,
        oxi: oxiArr,
        pre: preArr,
    }
}

module.exports.getMatrixTrain = (data) => {
    let matrixX = [];
    let matrixY = [];
    let col = 0;
    data.forEach(item => {
        matrixX[col] = new Array();
        matrixY[col] = new Array();

        matrixX[col].push(
            parseInt(item.male),
            parseInt(item.age),
            parseInt(item.currentSmoker),
            parseInt(item.BPMeds),
            parseInt(item.prevalentStroke),
            parseInt(item.prevalentHyp),
            parseInt(item.diabetes),
            parseFloat(item.BMI),
            parseFloat(item.heartRate)
        )
        matrixY[col].push(parseInt(item.TenYearCHD));

        col++;
    });

    return {matrixX, matrixY};
}

module.exports.getMatrixTest = (data, heartRate) => {
    const BMI = data.weight / (data.height * data.height);

    let matrixX = [
        parseInt(data.sex),
        parseInt(data.age),
        parseInt(data.currentSmoker),
        parseInt(data.BPMeds),
        parseInt(data.prevalentStroke),
        parseInt(data.prevalentHyp),
        parseInt(data.diabetes),
        parseFloat(BMI.toFixed(2)),
        parseFloat(heartRate)
    ]
    return matrixX;
}