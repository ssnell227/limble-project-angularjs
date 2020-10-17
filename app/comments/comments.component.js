
function commentsController($scope) {
    $scope.comments = [
    ]

    $scope.$on('updateComments', function (events, comment) {
        $scope.comments = [...$scope.comments, { text: comment, time: Date.now() }]
        $scope.$apply()
    })
}

angular.
    module('myApp').
    component('comments', {
        template:
            `<div>
                <h2 class='title'>Comments</h2>
                <div ng-repeat='item in comments'>
                {{item.text}}
                </div>
            </div>`,
        controller: commentsController
    })