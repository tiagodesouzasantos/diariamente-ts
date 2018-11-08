angular.module('bandEdi')
    .filter('split', [function() {
        return function(input, char, index) {
            return input.split(char)[index];
        }
    }]);