//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
angular
.module('sosstation')
.controller('EventController', [
  '$state', '$rootScope', '$scope', 'dataService','Upload', '$stateParams', '$timeout',
  function($state, $rootScope, $scope, dataService, Upload, $stateParams, $timeout) {
    $scope.$parent.carouselShow = false;
    //If user information is not in local storage prompt to login
    if(!localStorage.getItem('User')) {
      $state.go('login');
    }
    
    $scope.currentPage = 1;
    $scope.pageSize = 10;

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

    $scope.addEvent = function() {
      var title = $scope.title;
      var description = $scope.description;
      var file = $scope.file;
      dataService.addEvent(title, description, file);
      
      $timeout(function() {
          $state.go('event');
      }, 4000);
      
    };

    //Add role
    $scope.editEvent = function() {
      var id = $scope.event.id;
      var title = $scope.event.title;
      var description = $scope.event.description;
      var file = $scope.file;
      dataService.editEvent(id, title, description, file);
      $state.go('event');
    };

    
    $scope.setDeleteEventID = function(id) {
      $scope.EventsID = id;
    };

    //Delete events
    $scope.deleteEvent = function(EventsID) {
      dataService.deleteEvent(EventsID)
      .then(
        function(response) {
          getEvents();
        }, function(err) {
        }
      );
    };

    var updateEventScope = function() {
      $scope.events.forEach(function(event){
        if(event.id == $stateParams.id) {
          $scope.event = event;
        }
      });
    };

  getEvents();
}]);
