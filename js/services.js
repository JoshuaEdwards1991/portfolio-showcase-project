//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
(function() {
  'use strict';

  //Service to return the data
  angular
    .module('sosstation')
    .service('applicationData',
      function($rootScope) {
        var sharedService = {};
        sharedService.info = {};
        sharedService.publishInfo = function(key, obj) {
          this.info[key] = obj;
          $rootScope.$broadcast('systemInfo_' + key, obj);
        };
        return sharedService;
      })

  .service('dataService', [
    '$q', '$http', 'Upload',
    function($q, $http, Upload) {
      var urlBase = 'server/index.php';

      //user log in 
      this.userLogin = function(email, password) {
        var defer = $q.defer(),
          data = {
            action: 'login',
            subject: 'user',
            email: email,
            password: password,
          };

        $http.get(urlBase, {
            params: data,
            cache: true
          })
          .success(function(response) {
            defer.resolve({
              data: response.ResultSet.Result,
              rowCount: response.ResultSet.RowCount
            });
          })
          .error(function(err) {
            defer.reject(err);
          });
        return defer.promise;
      };

      this.logoutUser = function() {
        var defer = $q.defer(),
          data = {
            action: 'logout',
            subject: 'user'
          };

        $http.get(urlBase, {
            params: data,
            cache: true
          })
          .then(
            function success(response) {
              defer.resolve({
                data: response
              });
            }
          );

        return defer.promise;
      };


      this.insertCustomerContact = function(name, business, email, message) {
        var defer = $q.defer(),
          data = {
            action: 'insert',
            subject: 'Customercontact',
            name: name,
            business: business,
            email: email,
            message: message,
          };
          
        $http.get(urlBase, {
            params: data,
            cache: false
          })
          .success(function(response) {
            defer.resolve(response);
          })
          .error(function(err) {
            defer.reject(err);
          });
        return defer.promise;
      };
      
      this.getEvents = function() {
        var defer = $q.defer(),
          data = {
            action: 'list',
            subject: 'news',
          };
        $http.get(urlBase, {
            params: data,
            cache: false
          })
          .then(
            function success(response) {
              defer.resolve({
                data: response.data,
              });
            },
            function error(err){
               defer.reject(err);
            }
          );

        return defer.promise;
      };
      
      this.deleteEvent = function(EventsID) {

        var defer = $q.defer(),
          data = {
            action: 'delete',
            subject: 'news',
            newsid: EventsID,
          };

        $http.get(urlBase, {
            params: data, cache: false
          })
          .success(function(response) {
            defer.resolve(response);
          })
          .error(function(err) {
          defer.reject(err);
        });
        return defer.promise;
      };
      
      this.addEvent = function(title, description, file) {      
        Upload.upload({
            url: urlBase,
            data: {
              action: 'insert',
              subject: 'news',
              title: title,
              description: description,
              file: file,
            }
        }).then(
          function(response){
          },
          function(err){
          });
          
          return 1;
      };
      
      this.editEvent = function(id, title, description, file) {      
        Upload.upload({
            url: urlBase,
            data: {
              action: 'edit',
              subject: 'news',
              newsid: id,
              title: title,
              description: description,
              file: file,
            }
        }).then(
          function(response){
          },
          function(err){
          });
          
          return 1;
      };
           
      this.signupNewsletter = function(name, email, number, business) {
        var defer = $q.defer(),
          data = {
            action: 'insert',
            subject: 'customer',
            name: name,
            email: email,
            businessname: business,
            number: number,
          };
          
        $http.get(urlBase, {
            params: data,
            cache: false
          })
          .success(function(response) {
            defer.resolve(response);
          })
          .error(function(err) {
            defer.reject(err);
          });
        return defer.promise;
      };
      
      
      this.insertQuote = function(name, email, number, business, message, quote, config) {
        var defer = $q.defer(),
          data = {
            action: 'insert',
            subject: 'Quote',
            name: name,
            business: business,
            email: email,
            number: number,
            message: message,
            quote: quote,
            config: config,
          };
          
        $http.get(urlBase, {
            params: data,
            cache: false
          })
          .success(function(response) {
            defer.resolve(response);
          })
          .error(function(err) {
            defer.reject(err);
          });
        return defer.promise;
      };
      
    }
  ]);
}());
