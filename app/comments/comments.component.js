'use strict';

angular.
    module('myApp').
    component('comments', {
        template:
            `<div>
                <h2 class='title'>Comments</h2>
                <div ng-repeat='item in $ctrl.commentsArray'>
                {{item.text}}
                </div>
            </div>`,
        bindings: {
            commentsArray: '<'
        }
    })