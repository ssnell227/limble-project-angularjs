'use strict';

function appController($scope, $element) {
  const ctrl = this

  ctrl.currentText = ''

  ctrl.commentsArray = [{text: 'test comment', time: Date.now()}]

  ctrl.updateCurrentText = (text) => {
    ctrl.currentText = text
  }

  ctrl.updateCommentsArray = (comment) => {
    ctrl.commentsArray = [...ctrl.commentsArray, {text: comment, time: Date.now()}]
    ctrl.currentText = ''
  }

  ctrl.handleCtrlEnter = (e) => {
    if ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) {
      ctrl.updateCommentsArray(ctrl.currentText)
    }
  }

  


  // old code
  // $scope.currentText = ''

  // $scope.submitComment = function (comment) {
  //   $scope.$broadcast('updateComments', comment)
  //   $scope.$broadcast('clearText')
  // }

  // $scope.handleClick = function (e) {
  //   e.preventDefault()
  //   console.log($scope.currentText)
  //   $scope.submitComment($scope.currentText)
  // }

  // $scope.$on('sendCurrentText', function (events, text, key) {
  //   $scope.$broadcast('textToUserSelect', text, key)
  //   $scope.currentText = text
  //   $scope.$apply()
  // })

  // $scope.$on('sendMatchedUser', function (events, user) {
  //   $scope.$broadcast('enterMatchedUser', user)
  //   $scope.currentText = $scope.currentText.substring(0, $scope.currentText.lastIndexOf('@') + 1) + user.name
  //   $scope.$apply()
  // })

  // $scope.$on('submitComment', function (events, comment) {
  //   $scope.submitComment(comment)
  // })


}


angular.module('myApp', [
  'ngRoute'
]).component('app', {
  template:
    `<div class="container">
    <comments comments-array='$ctrl.commentsArray'></comments>
      <div ng-submit='$ctrl.updateCommentsArray($ctrl.currentText)'class="form">
        <div class="level">
          <div class="field">
            <text-input ng-keypress='$ctrl.handleCtrlEnter($event)' current-text='$ctrl.currentText' update-text='$ctrl.updateCurrentText(text)' ></text-input>
          </div>
          <div class='level-right'>
            <div class="field">
              <div class="control">
                <button ng-click='$ctrl.updateCommentsArray($ctrl.currentText)' id='submitButton' class="button">Submit</button>
              </div>
            </div>
          </div>
          </div>
          <user-select current-text='$ctrl.currentText' update-text='$ctrl.updateCurrentText(text)' ></user-select>
      </div>
    </div>`,
  controller: appController
})

