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
  $scope.matchedUser = $scope.filteredUsers[$scope.filteredUsers.indexOf(item => item.match === true)]
  $scope.active = 'is-active'

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
        return index === 0 ? { ...item, match: true } : { ...item, match: false }
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

  $scope.setMatchedUser = function () {
    $scope.matchedUser = $scope.filteredUsers[$scope.filteredUsers.findIndex(user => user.match)]
  }

  $scope.handleClick = function (userId) {
    $scope.matchedUser = $scope.filteredUsers[$scope.filteredUsers.findIndex(user => user.userID === userId)]
    $scope.matchedUser.match = true
    $scope.showUserSelect = false
    $scope.$emit('sendMatchedUser', $scope.matchedUser)
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
        if (
          currentMatchIndex === $scope.filteredUsers.length - 1 &&
          currentMatchIndex === index
        ) {
          return { ...item, match: true }
        } else if (index === currentMatchIndex + 1) {
          return { ...item, match: true }
        } else {
          return { ...item, match: false }
        }
      })
      $scope.setMatchedUser()
    } else if (key === 'ArrowUp') {
      $scope.filteredUsers = $scope.filteredUsers.map((item, index) => {
        if (
          index === 0 &&
          currentMatchIndex === index
        ) {
          return { ...item, match: true }
        } else if (index === currentMatchIndex - 1) {
          return { ...item, match: true }
        } else {
          return { ...item, match: false }
        }
      })
      $scope.setMatchedUser()
    }
    $scope.$apply()
  }


}

angular.
  module('myApp').
  component('userSelect', {
    template:
      `<div ng-hide='!showUserSelect' class="dropdown is-active" >
        <div class='dropdown-menu'>
          <div class='dropdown-content'>
            <div  ng-repeat='user in filteredUsers'>
            <div ng-click='handleClick(user.userID)' ng-class='{ "is-active": user.match }' class='dropdown-item'>
            {{user.name}}
            </div>
            </div>
          </div>
        </div>
      </div>`,
    controller: userSelectController
  })