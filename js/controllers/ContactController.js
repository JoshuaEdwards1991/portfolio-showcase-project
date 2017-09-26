//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
angular
        .module('sosstation')
        .controller('ContactController', [
            '$state', '$rootScope', '$scope', 'dataService', 'Upload', '$stateParams',
            function ($state, $rootScope, $scope, dataService, Upload, $stateParams) {
                $scope.$parent.carouselShow = false;
                $scope.submit = function () {
                    var name = $scope.name;
                    var business = $scope.business;
                    var email = $scope.email;
                    var message = $scope.message;                    
                    dataService.insertCustomerContact(name, business, email, message).then(
                            function (response) {
                                $scope.status = response.status;
                                if (response == 1) {
                                    alert('Thank you for your message, you will receive a response shortly!');
                                    
                                } else {
                                    alert('Message not sent please contact admin!');
                                }
                            }, function (err) {
                        $scope.status = 'Unable to load data ' + err;
                    }
                    );
                };
            }]);