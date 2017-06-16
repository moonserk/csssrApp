(function() {
  'use strict';

  angular
    .module('csssrApp')
    .factory('dataHolder', function(){
      var user = null;
      var repos = null;
      return {
        setUser: function(newUser) {
          user = newUser;
        },
        getUser: function() {
          return user;
        },
        setRepos: function(newRepos) {
          repos = newRepos;
        },
        getRepos: function() {
          return repos;
        }
      }
    })
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 300;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = false;
  }

})();
