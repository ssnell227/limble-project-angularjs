'use strict';

function textInputController() {
    const ctrl = this;

    //state text to send to parent component
    ctrl.inputText = ''
   
}

angular.
    module('myApp').
    component('textInput', {
        template:
    `<input
    id='text-input'
    class="input"
    ng-model='$ctrl.inputText'
    ng-value='$ctrl.currentText'
    ng-change='$ctrl.updateText({text: $ctrl.inputText})'
    ng-trim='false'
    ></input>`,
        controller: textInputController,
        bindings: {
            currentText: '<',
            updateText: '&'
        }
    })