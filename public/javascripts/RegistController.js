angular.module('nodeTodo', [])
.controller('RegistController', function($scope, $http)  {
  $scope.nameData = {};
  $scope.surnameData = {};
  $scope.emailData = {};
  $scope.loginData = {};
  $scope.passData = {};
  $scope.todoData = {};
  $scope.info = {
    domain: null,
    email: $scope.emailData,
    login: $scope.loginData,
    name: $scope.nameData,
    password: $scope.passData,
    role: 'user',
    surname: $scope.surnameData
  };
  console.log($scope.info);
  // Get all todos
  $http.get('/api/v1/regist')
  .success((data) => {
    $scope.todoData = data;
    console.log(data);
  })
  .error(function(error)  {
    console.log('Error: ' + error);
  });
  // Create a new user
  $scope.createUser = function() {
    console.log($scope.info);
    if ($scope.nameData.text == undefined || $scope.surnameData.text == undefined || $scope.emailData.text == undefined || $scope.loginData.text == undefined || $scope.passData.text == undefined || $scope.info.domain == null)
    {
      alert('Заполните все поля!');
    }
    else
    {
     $http.post('/api/v1/regist', $scope.info)
      .success(function(data)  {
        $scope.info = {};
        $scope.todoData = data;
        var name = $scope.info.name;
        console.log($scope.info);
    })
      .error(function(error) {
        console.log('Error: ' + error);
      }); 
    }
  };
});