'use strict';

function appController($scope, $element) {
  const ctrl = this

  $scope.currentText = ''

  $scope.submitComment = function (comment) {
    $scope.$broadcast('updateComments', comment)
    $scope.$broadcast('clearText')
  }

  $scope.handleClick = function (e) {
    e.preventDefault()
    console.log($scope.currentText)
    $scope.submitComment($scope.currentText)
  }

  $scope.$on('sendCurrentText', function (events, text, key) {
    $scope.$broadcast('textToUserSelect', text, key)
    $scope.currentText = text
    $scope.$apply()
  })

  $scope.$on('sendMatchedUser', function (events, user) {
    $scope.$broadcast('enterMatchedUser', user)
    $scope.currentText = $scope.currentText.substring(0, $scope.currentText.lastIndexOf('@') + 1) + user.name
    $scope.$apply()
  })

  $scope.$on('submitComment', function (events, comment) {
    $scope.submitComment(comment)
  })


}


angular.module('myApp', [
  'ngRoute'
]).component('app', {
  template:
    `<div class="container">
    <comments></comments>
      <div class="form">
        <div class="level">
          <div class="field">
            <text-input ></text-input>
          </div>
          <div class='level-right'>
            <div class="field">
              <div class="control">
                <button ng-click='submitComment(currentText)' id='submitButton' class="button">Submit</button>
              </div>
            </div>
          </div>
          </div>
          <user-select></user-select>
      </div>
    </div>`,
  controller: appController
})

