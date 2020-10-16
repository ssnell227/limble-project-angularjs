'use strict';

function appController($scope, $element, $attrs) {
  const ctrl = this
  ctrl.showTagList = false;
  
  ctrl.matchedUser = '';

  ctrl.toggleTagList = function (inputBool) {
    ctrl.showTagList = inputBool
  }
  
  ctrl.updateMatchedUser = function (newMatchedUser) {
    ctrl.matchedUser = newMatchedUser
  }

  $scope.$on('sendCurrentText', function (events, text, key) {
    $scope.$broadcast('textToUserSelect', text, key)
  })

  $scope.$on('sendMatchedUser', function (events, user) {
    $scope.$broadcast('enterMatchedUser', user)
  })
}


angular.module('myApp', [
  'ngRoute'
]).component('app', {
  template:
    `<div class="container">
      <div class="form">
        <div class="level">
          <div class="field">
            <text-input ></text-input>
          </div>
          <div class='level-right'>
            <div class="field">
              <div class="control">
                <button class="button">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <user-select></user-select>
        </div>
      </div>
    </div>`,
  controller: appController
})

