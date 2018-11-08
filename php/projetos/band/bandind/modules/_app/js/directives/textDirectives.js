angular.module('text')
    .directive('reduceDesc', function () {
        return function (scope, elm, attr) {
            console.log(scope, elm, attr);                
        };
    }).directive('numbers', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    }).directive('uppercase', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var uppercase = function (inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var uppercased = inputValue.toUpperCase();
                    if (uppercased !== inputValue) {
                        // see where the cursor is before the update so that we can set it back
                        var selection = element[0].selectionStart;
                        modelCtrl.$setViewValue(uppercased);
                        modelCtrl.$render();
                        // set back the cursor after rendering
                        element[0].selectionStart = selection;
                        element[0].selectionEnd = selection;
                    }
                    return uppercased;
                }
                modelCtrl.$parsers.push(uppercase);
                uppercase(scope[attrs.ngModel]); // uppercase initial value
            }
        };
    });