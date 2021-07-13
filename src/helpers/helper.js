module.exports.index = (a, b) => {
    return a + b;
}

module.exports.checkedRadio = (oriValue, checkValue) => {
    if(oriValue == checkValue)
        return 'checked';
}

module.exports.checkedValue = (value) => {
    if(value == 1) {
        return "Có";
    }
    else {
        return "Không";
    }
}