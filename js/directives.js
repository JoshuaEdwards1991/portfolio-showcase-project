//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
angular
  .module('sosstation')
  .directive('noSpecialChars', function(){
     return {
       require: 'ngModel',
       link: function(scope, element, attrs, modelCtrl) {
         modelCtrl.$parsers.push(function (inputValue) {
             // this next if is necessary for when using ng-required on your input.
             // In such cases, when a letter is typed first, this parser will be called
             // again, and the 2nd time, the value will be undefined
             if (inputValue == undefined) return ''
             var transformedInput = inputValue.replace(/[^0-9a-zA-Z@ ._/-]/g, '');
             //transformedInput = inputValue.replace(/[^a-zA-Z]/g, '');
             if (transformedInput!=inputValue) {
                modelCtrl.$setViewValue(transformedInput);
                modelCtrl.$render();
             }
             return transformedInput;
         });
       }
     };
  })
  .directive('noLetters', function(){
     return {
       require: 'ngModel',
       link: function(scope, element, attrs, modelCtrl) {
         modelCtrl.$parsers.push(function (inputValue) {
             // this next if is necessary for when using ng-required on your input.
             // In such cases, when a letter is typed first, this parser will be called
             // again, and the 2nd time, the value will be undefined
             if (inputValue == undefined) return ''
             var transformedInput = inputValue.replace(/[^0-9.-]/g, '');
             //transformedInput = inputValue.replace(/[^a-zA-Z]/g, '');
             if (transformedInput!=inputValue) {
                modelCtrl.$setViewValue(transformedInput);
                modelCtrl.$render();
             }
             return transformedInput;
         });
       }
     };
  })
