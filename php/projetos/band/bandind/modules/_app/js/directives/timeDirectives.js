angular.module('timeService')
    .directive('hours', function () {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {                            
                modelCtrl.$parsers.push(function (number) {
                    document.onkeypress = function (e) {
                        var deleted = (e.keyCode == 8 || e.keyCode == 46) ? true : false;
                        if (number.length == 2 && !deleted) {
                            number = number + ':';
                        }
                        modelCtrl.$setViewValue(number);
                        modelCtrl.$render();
                    }  

                    number = number.replace(/[^\dh:]/, "");
                    number = number.replace(/^[^0-2]/, "");
                    number = number.replace(/^([2-9])[4-9]/, "$1");
                    number = number.replace(/^\d[:h]/, "");
                    number = number.replace(/^([01][0-9])[^:h]/, "$1");
                    number = number.replace(/^(2[0-3])[^:h]/, "$1");
                    number = number.replace(/^(\d{2}[:h])[^0-5]/, "$1");
                    number = number.replace(/^(\d{2}h)./, "$1");
                    number = number.replace(/^(\d{2}:[0-5])[^0-9]/, "$1");
                    number = number.replace(/^(\d{2}:\d[0-9])./, "$1");
                    transformedNumber = number;    
                                  
                    modelCtrl.$setViewValue(transformedNumber);
                    modelCtrl.$render();
                    return transformedNumber;
                });
            }
        };
    });