'use strict';

function userSelectController($scope) {
  const ctrl = this

  ctrl.users = [
    { 'userID': 1, 'name': 'Kevin' },
    { 'userID': 2, 'name': 'Jeff' },
    { 'userID': 3, 'name': 'Bryan' },
    { 'userID': 4, 'name': 'Gabbey' },
  ];



  ctrl.filteredUsers = ctrl.users.map((item, index) => index === 0 ? { ...item, match: true } : { ...item, match: false })
  ctrl.showUserSelect = false
  ctrl.matchedUser = ctrl.users[0]


  //show/hide dropdown menu
  ctrl.toggleUserSelect = function (text) {
    if (
      (text.slice(-2) === ' @' || (text.length === 1 && text[0] === '@'))
    ) {
      ctrl.showUserSelect = true
    } else if (
      (text.slice(-1) === ' ' || !text.length)
    ) {
      ctrl.showUserSelect = false
    }
  }

  //filter users according to user input
  ctrl.filterUsers = function (text) {
    let nameSubStr = text.substring(text.lastIndexOf('@') + 1).toLowerCase()
    const filteredUsers = [...ctrl.users]
      .filter(user => user.name.toLowerCase().includes(nameSubStr))
      .map((item, index) => {
        return index === 0 ? { ...item, match: true } : { ...item, match: false }
      })
    if (filteredUsers.length) {
      ctrl.filteredUsers = filteredUsers
      ctrl.matchedUser = filteredUsers[0]
    } else {
      ctrl.filteredUsers = ctrl.users
      ctrl.matchedUser = ctrl.users[0]
    }
  }

  //set selected user in state
  ctrl.setMatchedUser = () => {
    ctrl.matchedUser = ctrl.filteredUsers[ctrl.filteredUsers.findIndex(user => user.match)]
  }

  //enter username into text when user clicks item in dropdown
  ctrl.handleClick = (user) => {
    const textWithUser = ctrl.currentText.substring(0, ctrl.currentText.lastIndexOf('@') + 1) + user.name
    ctrl.updateText({ text: textWithUser })
    ctrl.showUserSelect = false
    angular.element(document).find('text-input')[0].children[0].focus()
  }

  //watch for enter, down, and up keys while menu is open
  ctrl.watchKey = (e) => {
    const currentMatchIndex = ctrl.filteredUsers.findIndex(user => user.match)
    if (e.key === 'Enter' && ctrl.showUserSelect) {
      const textWithUser = ctrl.currentText.substring(0, ctrl.currentText.lastIndexOf('@') + 1) + ctrl.filteredUsers[currentMatchIndex].name
      ctrl.updateText({ text: textWithUser })
      ctrl.showUserSelect = false
    } else if (e.key === 'ArrowDown' && ctrl.showUserSelect) {
      ctrl.filteredUsers = ctrl.filteredUsers.map((item, index) => {
        if (
          currentMatchIndex === ctrl.filteredUsers.length - 1 &&
          currentMatchIndex === index
        ) {
          return { ...item, match: true }
        } else if (index === currentMatchIndex + 1) {
          return { ...item, match: true }
        } else {
          return { ...item, match: false }
        }
      })
    } else if (e.key === 'ArrowUp' && ctrl.showUserSelect) {
      ctrl.filteredUsers = ctrl.filteredUsers.map((item, index) => {
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
    }
    $scope.$apply()
  }

  //listen for up/down/enter
  angular.element(document).find('text-input')[0].children[0].addEventListener('keydown', ctrl.watchKey)

  //close menu on click outside
  angular.element(document)[0].addEventListener('click', (e) => {
    if (
      ctrl.showUserSelect &&
      e.target !== angular.element(document).find('text-input')[0].children[0]
      ) {
      ctrl.showUserSelect = false
    } else if (
      !ctrl.showUserSelect &&
      e.target === angular.element(document).find('text-input')[0].children[0] &&
      (ctrl.currentText.slice(-2) === ' @' || (ctrl.currentText.length === 1 && ctrl.currentText[0] === '@'))
      ) {
        ctrl.showUserSelect = true
    }
    $scope.$apply()
  })

  //listen for update to current text
  ctrl.$onChanges = (changes) => {
    ctrl.toggleUserSelect(changes.currentText.currentValue)
    ctrl.filterUsers(changes.currentText.currentValue)
    ctrl.setMatchedUser()
  }


  
}

angular.
  module('myApp').
  component('userSelect', {
    template:
      `<div ng-hide='!$ctrl.showUserSelect' class="dropdown is-active" >
        <div id='user-select' class='dropdown-menu'>
          <div class='dropdown-content'>
            <div  ng-repeat='user in $ctrl.filteredUsers'>
              <div ng-click='$ctrl.handleClick(user)' ng-class='{ "is-active" : user.match }' class='dropdown-item'>
                {{user.name}}
              </div>
            </div>
          </div>
        </div>
      </div>`,

    controller: userSelectController,
    bindings: {
      currentText: '<',
      updateText: '&'
    }
  })