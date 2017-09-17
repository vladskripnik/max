angular.module('nodeTodo', [])
.controller('mainController', function($scope, $http) {
  $scope.loginData = {};
  $scope.passData = {};
  $scope.todoData = {};
  $scope.info = {
    login: $scope.loginData,
    password: $scope.passData
  };
  // Login
  $scope.login = function() {
    $http.get('/api/v1/regist')
    .success((data) => {
      $scope.todoinfo = data;
      console.log(data);
      console.log($scope.loginData);
      $scope.todoData = data.length;
      for (i = 0; i < $scope.todoData; i++) {
          console.log($scope.todoinfo[i].login);
          if ($scope.todoinfo[i].login == $scope.loginData.text){
            console.log('Pozdravlyau');
            if($scope.todoinfo[i].password == $scope.passData.text)
            {
              alert('Поздравляю!');
              $scope.roleuser = $scope.todoinfo[i].role;
              $scope.username = $scope.todoinfo[i].name;
              $scope.userid = $scope.todoinfo[i].id;
              localStorage.setItem('role',$scope.roleuser);
              localStorage.setItem('username',$scope.username);
              localStorage.setItem('id',$scope.userid);
            }
            else
            {
              alert('Вам следует зарегистрироваться!');
            }
          }
          else
          {
            console.log('Ne polychilos');
          }
    }
  })
    .error(function(error) {
      console.log('Error: ' + error);
    });
  };
});