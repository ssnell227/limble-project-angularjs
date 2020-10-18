'use strict';

function appController() {
  const ctrl = this

  ctrl.currentText = ''

  ctrl.commentsArray = [{text: 'test comment', time: Date.now()}]

  //functions to pass to children to update app state
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

