//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
google.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['sosstation']);
});

// Load the Visualization API and the piechart package.
google.load('visualization', '1', {'packages':['line']});

angular
.module('sosstation')
.controller('DashboardController', [
  '$state', '$rootScope', '$scope', 'dataService', 'applicationData', '$cookies',
    function($state, $rootScope, $scope, dataService, applicationData, $cookies) {
      $scope.$parent.carouselShow = false;
      //Get user details and permission details
      var getUserInfo = function() {
        $scope.user = JSON.parse(localStorage.getItem('User'));
      };

      //logout user
      $scope.logoutUser = function() {
        dataService.logoutUser().then(
          function(response){
            $rootScope.$broadcast('logout');
            $state.go('login');
          }
        );
      };

  }]);
