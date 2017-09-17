angular.module('nodeTodo', [])
  .controller('UserController', function($scope, $http) {
  $scope.nameData = {};
  $scope.surnameData = {};
  $scope.emailData = {};
  $scope.loginData = {};
  $scope.passData = {};
  $scope.todoData = {};
  $scope.todoinfo = {};
  $scope.usernamefor = localStorage.getItem('username');
  $scope.roleuser = localStorage.getItem('role');
  console.log($scope.roleuser);
  $scope.info = {
    domain: $scope.domainVote,
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
  .success(function(data)  {
    $scope.todoData = data;
    console.log(data);
  })
  .error(function(error) {
    console.log('Error: ' + error);
  });
  // Create a new user
  $scope.createUser = function() {
    $http.post('/api/v1/regist', $scope.info)
    .success(function(data)  {
      $scope.info = {};
      $scope.todoData = data;
      var name = $scope.info.name;
      console.log($scope.info);
    })
    .error(function(error)  {
      console.log('Error: ' + error);
    });
  };
  //Сохранение данных о пользователе,которого мы хотим update
  $scope.Usersave = function(todoID) {
    $http.get('/api/v1/regist')
      .success(function(data) {
        $scope.todoinfo = data;
        var number = $scope.todoinfo.length;
        console.log(number);
        $scope.todoData = data.length;
        for (i = 0; i < $scope.todoData; i++) {
          if ($scope.todoinfo[i].id == todoID){
            var nameuser = $scope.todoinfo[i].name;
            var iduser = $scope.todoinfo[i].id;
            localStorage.setItem('idlist',iduser);
            localStorage.setItem('usernamelist', nameuser);
            console.log(nameuser);
            console.log($scope.todoinfo[i].image);
          }
          else
          {
            console.log('Ne sovpal');
          }
        }
      })
      .error(function(error) {
      console.log('Error: ' + error);
    });
  };
  //Выход из пользователя
  $scope.Logout = function(){
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };
  //Delete user
  $scope.deleteUser = function(todoID) {
    var AccesDelete = confirm('Вы уверены, что хотите удалить данного пользователя?');
    if (AccesDelete == true){
    $http.delete('/api/v1/regist/' + todoID)
      .success(function(data) {
        $scope.todoData = data;
        console.log(data);
    })
      .error(function(data)  {
        console.log('Error: ' + data);
    });
    }
  };
  //Обновление данных о пользователе
  $scope.updateUser = function(todoID) {
    $http.put('/api/v1/regist/' + todoID)
    .success(function(data) {
      $scope.todoData = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

});