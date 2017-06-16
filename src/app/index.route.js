(function() {
  'use strict';

  angular
    .module('csssrApp')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/issues', {
        template: '<issues-list></issues-list>'
      })
      .when('/issues/:number', {
        template: '<issues-detail></issues-detail>'
      })
      .otherwise({
        redirectTo: '/issues'
      });
  }

})();
