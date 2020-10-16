'use strict';

function appController($scope, $element, $attrs) {
  const ctrl = this
  ctrl.showTagList = false;
  ctrl.currentText = 'test text';
  ctrl.users = [
    { 'userID': 1, 'name': 'Kevin' },
    { 'userID': 2, 'name': 'Jeff' },
    { 'userID': 3, 'name': 'Bryan' },
    { 'userID': 4, 'name': 'Gabbey' },
  ];
  ctrl.matchedUser = '';

  ctrl.toggleTagList = function (inputBool) {
    ctrl.showTagList = inputBool
  }
  ctrl.updateText = function (newText) {
    ctrl.currentText = newText
  }
  ctrl.updateMatchedUser = function (newMatchedUser) {
    ctrl.matchedUser = newMatchedUser
  }

  $scope.$on('updateCurrentText', function (events, args) {
    console.log(args)
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

