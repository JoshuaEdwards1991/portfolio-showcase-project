//all code is owned by Joshua Edwards @ quicksilver web ltd. please email Joshua@quicksilverweb.uk, re-use is prohibited
angular.module('sosstation', [
  'ngRoute', 'ngCookies', 'ui.router', 'ngFileUpload','angularUtils.directives.dirPagination','ngDragDrop'
])

/**
 * Configure the Routes
 */
.config(['$routeProvider', '$stateProvider', '$urlRouterProvider',
  function ($routeProvider, $stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('index', {
        url: '/',
        cache: false,
        templateUrl: 'index.html',
        controller: 'DashboardController'
      })

      .state('login', {
        url: '/login',
        cache: false,
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      })
      
      .state('quote', {
        url: '/quote',
        cache: false,
        templateUrl: 'partials/quote.html',
        controller: 'QuoteController'
      })

      .state('home-content', {
        url: '/home-content',
        cache: false,
        templateUrl: 'partials/home-content.html',
        controller: 'HomeController'
      })

      .state('news', {
        url: '/news',
        cache: false,
        templateUrl: 'partials/news.html',
        controller: 'NewsController'
      })
      
      .state('event', {
        url: '/event',
        cache: false,
        templateUrl: 'partials/event.html',
        controller: 'EventController'
      })

      .state('event/form', {
        url: '/event/form',
        cache: false,
        templateUrl: 'partials/event-form.html',
        controller: 'EventController'
      })

      .state('event/editform/id', {
        url: '/event/editform/:id',
        cache: false,
        templateUrl: 'partials/event-edit-form.html',
        controller: 'EventController'
      })

      .state('contact', {
        url: '/contact',
        cache: false,
        templateUrl: 'partials/contact-form.html',
        controller: 'ContactController'
      })


    $urlRouterProvider.otherwise('/home-content');

}]);
