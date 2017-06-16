(function(){
  'use strict';
  angular.module('issuesDetail').
    component('issuesDetail', {
      templateUrl: 'app/components/issuesDetail/issuesDetail.template.html',
      controller: ['$http', '$routeParams','dataHolder',
      function issuesDetailController($http, $routeParams, dataHolder) {
        var self = this;
        self.user = dataHolder.getUser();
        self.repos = dataHolder.getRepos();
        //self.number = $routeParams.number;
        $http.get('https://api.github.com/repos/' + self.user + '/' + self.repos + '/issues/' + $routeParams.number).then(function(response) {
          self.issue = response.data;
        });
        // $http.get(self.issue.comments_url).then(function(response) {
        //   self.comments = response.data;
        // });
      }]
    });
})();
