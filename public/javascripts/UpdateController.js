angular.module('nodeTodo', [])
  .controller('UpdateController', function($scope, $http) {
  $scope.nameData = {};
  $scope.surnameData = {};
  $scope.emailData = {};
  $scope.loginData = {};
  $scope.passData = {};
  $scope.todoData = {};
  $scope.domainVote = null;
  $scope.roleVote = null;
  console.log($scope.domainVote);
  $scope.username = localStorage.getItem('usernamelist');
  $scope.userid = localStorage.getItem('idlist');
  $scope.roleuser = localStorage.getItem('role');

  // Get all information
  $http.get('/api/v1/regist')
  .success(function(data)  {
    $scope.todoData = data;
    console.log(data);
  })
  .error(function(error) {
    console.log('Error: ' + error);
  });
  //Update user in database
  $scope.updateUser = function(userid)  {
      localStorage.removeItem('idlist');
      localStorage.removeItem('usernamelist');
      if ($scope.nameData.text == undefined || $scope.surnameData.text == undefined || $scope.emailData.text == undefined || $scope.loginData.text == undefined || $scope.passData.text == undefined || $scope.domainVote == null || $scope.roleVote == null )
      {
          alert('Вам следует заполнить пустые поля!');
      }
      else
      {    $scope.nameImage = document.getElementById('oop').files[0].name;
          console.log($scope.info);
          $scope.info = {
              domain: $scope.domainVote,
              email: $scope.emailData,
              image: $scope.nameImage,
              login: $scope.loginData,
              name: $scope.nameData,
              password: $scope.passData,
              role: $scope.roleVote,
              surname: $scope.surnameData
          };
          $http.put('/api/v1/regist/' + $scope.userid, $scope.info)
              .success(function(data) {
                $scope.todoData = data;
                console.log(data);
                 })
                .error(function(data) {
                console.log('Error: ' + data);
                });
      }

  };

});