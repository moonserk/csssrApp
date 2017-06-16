(function(){
  'use strict';
  angular.module('issuesList').
    component('issuesList', {
      templateUrl: 'app/components/issuesList/issuesList.template.html',
      controller: ['$http','dataHolder','toastr',
        function($http, dataHolder, toastr){
          var self = this;
          self.userName = dataHolder.getUser();
          self.reposName = dataHolder.getRepos();
          self.perPage = "30";
          self.page = 1;
          self.issues = null;
          self.repos = null;

          self.perPage2 = Array.from(Array(11).keys()).map(function (x){return x * 10;}).slice(1);

          self.showToastr = function() {
              toastr.info("LOADING");
          }

          if(self.userName !== null && self.reposName !== null){
            $http.get('https://api.github.com/repos/' + self.userName + '/' + self.reposName + '/issues?page=' + self.page + '&per_page=' + self.perPage).then(function(responce){
              self.issues = responce.data;
            },function(){
              self.issues = [];
            });
          }

          self.nextPage = function(){
            self.page++;
            self.getIssues(self.userName, self.reposName);
          };

          self.prevoiusPage = function(){
            if(self.page > 1){
              self.page--;
              self.getIssues(self.userName, self.reposName);
            }
          };

          self.setPerPage = function(num){
            self.perPage = num;
            if(self.userName !== null && self.reposName !== null){
              self.getIssues(self.userName, self.reposName);
            }
          };

          self.setUserName = function(user){
            self.userName = user;
            dataHolder.setUser(user);
          };

          self.setReposName = function(repos){
            self.reposName = repos;
            dataHolder.setRepos(repos);
          };

          self.getRepos = function(user){
            self.setUserName(user);
            $http.get('https://api.github.com/orgs/'+ user +'/repos?per_page=100').then(function(response){
                self.repos = response.data;

            }, function(){
              toastr.error('ERROR');
            });
          }

          self.getIssues = function(user, repos){
            self.setUserName(user);
            self.setReposName(repos);

            self.showToastr();

            $http.get('https://api.github.com/repos/' + self.userName + '/' + self.reposName + '/issues?page=' + self.page + '&per_page=' + self.perPage).then(function(responce){
              self.issues = responce.data;
              toastr.clear();
            },function(){
              self.issues = null;
              toastr.error('ERROR');
            });
          };
        }
      ]
    });
})();
