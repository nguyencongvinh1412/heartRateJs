
// tạo construcotr
// options <=> với object nhận vào từ bên file html
function validation(option) {
    var formElement = document.querySelector(option.form);
    var selectorrules = {};

    // hàm xử lý
    if (formElement) {

        // kiểm tra submit
        formElement.onsubmit = function (e) {

            // kiểm tra dữ liệu trong form có nhập đủ không
            var isFormValid = false;

            option.rules.forEach(rule => {
                getElements(rule).element.forEach(function (element) {
                    isFormValid = showMessageError(element,
                        getElements(rule).locate_errorMessage,
                        selectorrules[rule.selector], rule);

                    isFormValid = isFormValid && true;
                });
            });

            // nếu dữ liệu chưa đủ thì chặn ko cho submit
            if (!isFormValid) {
                e.preventDefault();
            }
        }

        // lặp qua từng rule trong mảng rules
        option.rules.forEach(rule => {

            var arrElements = getElements(rule).element;

            arrElements.forEach(function (element) {
                element.onblur = function (e) {
                    showMessageError(e.target, getElements(rule).locate_errorMessage,
                        selectorrules[rule.selector], rule);
                }

                // xử lý khi người dùng nhập vào
                element.oninput = function (e) {
                    e.target.style.border = '0.5px solid blue';
                    getElements(rule).locate_errorMessage.innerText = "";
                    getElements(rule).locate_errorMessage.style.color = 'black';
                }
            });
        });
    }

    /* ---------------------------------------------------------------------------------- */
    // cách method đi kèm

    // getParent for showing errorMessage 
    function getParent(element, selectorParent) {
        while (element.parentElement) { // nếu element có tồn tại thẻ cha
            if (element.parentElement.matches(selectorParent)) { // kiểm tra parent đó có tồn tại selectorParent ko
                return element.parentElement;  // nếu đúng thì return về parent đó
            }
            // nếu ko đúng thì gán element = parent 
            element = element.parentElement;
        }
    }

    // getdataa
    function getData(form) {
        var arrayInput =
            Array.from(form.querySelectorAll('[name]:not([disabled]):not(.btnregister)'));
        var result =
            arrayInput.reduce(function (values, input) {
                switch (input.type) {
                    case 'file':
                        if (!values[input.name]) {
                            values[input.name] = input.files;
                        }
                        break;
                    case 'checkbox':
                        if (!values[input.name]) {
                            if (input.matches(':checked')) {
                                values[input.name] = [input.value];
                            }
                        }
                        else {
                            if (input.matches(':checked')) {
                                values[input.name].push(input.value);
                            }
                        }
                        break;
                    case 'radio':
                        if (input.matches(':checked')) {
                            values[input.name] = input.value;
                        }
                        else {
                            if (values[input.name] == undefined) {
                                values[input.name] = '';
                            }
                        }
                        break;
                    default:
                        values[input.name] = input.value;
                }
                return values;
            }, {});
        return result;
    }

    // get nescessary element for show errorMessage
    function getElements(rule) {
        var elements = formElement.querySelectorAll(rule.selector);

        var arrElements = Array.from(elements);

        var locate_errorMessage = getParent(arrElements[0], option.selectorParent).querySelector(option.errorSelector);

        if (Array.isArray(selectorrules[rule.selector])) {
            selectorrules[rule.selector].push(rule.test);
        }
        else {
            selectorrules[rule.selector] = [rule.test];
        }

        return {
            element: arrElements,
            locate_errorMessage: locate_errorMessage,
        }
    }

    // show errorMessage
    function showMessageError(element, locate_errorMessage, arrayRule, rule) {
        var errorMessage;

        for (var itemError of arrayRule) {
            switch (element.type) {
                case 'checkbox':
                case 'radio':
                    errorMessage = errorMessage || itemError(
                        formElement.querySelector(rule.selector + ":checked")
                    );
                    break;
                default:
                    errorMessage = itemError(element.value);
                    break;
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            locate_errorMessage.innerText = errorMessage;
            element.style.border = '0.5px solid red';
            locate_errorMessage.style.color = 'red';
        }
        else {
            element.style.border = '0.5px solid blue';
            locate_errorMessage.innerText = "";
            locate_errorMessage.style.color = 'black';
        }

        return !errorMessage;
    }
}

/* -------------------------------------------------------------------------*/

// định nghĩa các hàm rules
validation.isRequired = function (selector, strInform) {
    return {
        selector: selector, // trả về id của selector nhập vào
        // trả về 1 function để kiểm tra là đúng điều kiện không
        test: function (value) {
            return value ? undefined : strInform || "Vui lòng nhập thông tin vào trường này";
        },
    };
}

validation.isEmail = function (selector, strInform) {
    return {
        selector: selector, // trả về id của selector nhập vào
        // trả về 1 function để kiểm tra là đúng điều kiện không
        test: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : strInform || "Vui lòng nhập thông tin vào trường này";
        },
    };
}

validation.isPassLength = function (selector, lengthMin, strInform) {
    return {
        selector: selector, // trả về id của selector nhập vào
        // trả về 1 function để kiểm tra là đúng điều kiện không
        test: function (value) {
            return value && value.length >= lengthMin ? undefined : strInform || "Vui lòng nhập thông tin vào trường này";
        },
    };
}

validation.isConfirmPass = function (selector, getConfirmValue, strInform) {
    return {
        selector: selector,
        test: function (value) {
            return value && value === getConfirmValue() ? undefined : strInform || "Nhập đúng thông tin vào trường này";
        }
    }
}