function userSelectController($scope, $element) {
  const ctrl = this
  ctrl.users = [
    { 'userID': 1, 'name': 'Kevin' },
    { 'userID': 2, 'name': 'Jeff' },
    { 'userID': 3, 'name': 'Bryan' },
    { 'userID': 4, 'name': 'Gabbey' },
  ];

  $scope.filteredUsers = ctrl.users
  $scope.showUserSelect = false
  $scope.matchedUser = $scope.filteredUsers[0]

  $scope.$on('textToUserSelect', (events, text, key) => {
    $scope.toggleUserSelect(text)
    $scope.filterUsers(text)
    $scope.watchKey(key)
  })

  $scope.toggleUserSelect = function (text) {
    if (
      (text.slice(-2) === ' @' || (text.length === 1 && text[0] === '@'))
    ) {
      $scope.showUserSelect = true
    } else if (
      (text.slice(-1) === ' ' || !text.length)
    ) {
      $scope.showUserSelect = false
    }
    $scope.$apply()
  }

  $scope.filterUsers = function (text) {
    let nameSubStr = text.substring(text.lastIndexOf('@') + 1).toLowerCase()
    const filteredUsers = [...ctrl.users].filter(user => user.name.toLowerCase().includes(nameSubStr))
    if (filteredUsers.length) {
      $scope.filteredUsers = filteredUsers
    } else {
      $scope.filteredUsers = ctrl.users
    }
    $scope.$apply()
    console.log($scope.filteredUsers)
  }

  $scope.watchKey = function (key) {
    if (key === 'Enter' && $scope.showUserSelect) {
      console.log($scope.filteredUsers)
      $scope.$emit('sendMatchedUser', $scope.matchedUser)
    }
  }


}

angular.
  module('myApp').
  component('userSelect', {
    template:
      `<div class="control">
    <div ng-hide='!showUserSelect' class="select is-mulitple" >
      <select multiple size="4">
        <option ng-repeat='user in filteredUsers'>
            {{user.name}}
        </option>
      </select>
    </div>
  </div>`,
    controller: userSelectController
  })