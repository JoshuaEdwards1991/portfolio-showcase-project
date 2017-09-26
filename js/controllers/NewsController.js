//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
angular
.module('sosstation')
.controller('NewsController', [
  '$state', '$rootScope', '$scope', 'dataService','Upload', '$stateParams',
  function($state, $rootScope, $scope, dataService, Upload, $stateParams) {

    $scope.currentPage = 1;
    $scope.pageSize = 4;
    $scope.$parent.carouselShow = false;

    //Get events
    var getEvents = function() {
      dataService.getEvents().then(
        function(response) {
          $scope.events = response.data.ResultSet.Result;
         
          if ($stateParams.id) updateEventScope();

        }, function(err) {
          $scope.status = 'Unable to load data ' + err;
        }
      );
    };

  getEvents();
}]);
