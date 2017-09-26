//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibbited
angular
.module('sosstation')
.controller('HomeController', [
  '$state', '$rootScope', '$scope', 'dataService', 'applicationData', '$cookies', 'Upload',
    function($state, $rootScope, $scope, dataService, applicationData, $cookies, Upload) {
          $scope.$parent.carouselShow = true;
          $scope.quoteLink = function () {
              $state.go('quote');
          };
          
          $scope.submitNewsletter = function () {
            var name = $scope.newslettername;
            var email = $scope.newsletteremail;
            var number = $scope.newsletternumber;
            var business = $scope.newsletterbusiness;                    
            dataService.signupNewsletter(name, email, number, business).then(
                function (response) {
                    $scope.status = response.status;
                    if (response == 1) {
                        alert('Thank you for signing up!');
                        $scope.newslettername = null;
                        $scope.newsletteremail = null;
                        $scope.newsletternumber = null;
                        $scope.newsletterbusiness = null;    

                    } else {
                        alert('Sign up failed, please contact admin!');
                    }
                }, function (err) {
                    $scope.status = 'Unable to load data ' + err;
                }   
            );
        };

  }]);
