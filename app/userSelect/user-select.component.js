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
    if (key !== 'Enter' && key !== 'ArrowUp' && key !== 'ArrowDown') {
      $scope.filterUsers(text)
    }
    $scope.toggleUserSelect(text)
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
    const filteredUsers = [...ctrl.users]
      .filter(user => user.name.toLowerCase().includes(nameSubStr))
      .map((item, index) => {
        return index === 0 ? {...item, match: true} : {...item, match: false}
      })
    if (filteredUsers.length) {
      $scope.filteredUsers = filteredUsers
      $scope.matchedUser = filteredUsers[0]
    } else {
      $scope.filteredUsers = ctrl.users
      $scope.matchedUser = ctrl.users[0]
    }
    $scope.$apply()
  }

  $scope.watchKey = function (key) {
    const currentMatchIndex = $scope.filteredUsers.findIndex(user => user.match)
    if (key === 'Enter' && $scope.showUserSelect) {
      $scope.$emit('sendMatchedUser', $scope.matchedUser)
      $scope.showUserSelect = false
      $scope.$apply()
    } else if (key === 'ArrowDown') {
      //change the class to the next item in the list and change matched user to the next item in the list
      $scope.filteredUsers = $scope.filteredUsers.map((item, index) => {
        return index === currentMatchIndex +1 ? {...item, match: true} : {...item, match: false}
      })
    } else if (key === 'ArrowUp') {
      $scope.filteredUsers = $scope.filteredUsers.map((item, index) => {
        return index === currentMatchIndex - 1 ? {...item, match: true} : {...item, match: false}
      })
    }
  }


}

angular.
  module('myApp').
  component('userSelect', {
    template:
      `<div ng-hide='!showUserSelect' class="dropdown is-active" >
        <div class='dropdown-menu'>
          <div class='dropdown-content'>
            <div class='dropdown-item' ng-repeat='user in filteredUsers'>
              {{user.name}}
            </div>
          </div>
        </div>
      </div>`,
    controller: userSelectController
  })