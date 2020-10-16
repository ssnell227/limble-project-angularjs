function textInputController($scope, $element) {
    const ctrl = this;

    $scope.currentText = ''

    

    $scope.sendCurrentText = function (text, key) {
        $scope.$emit('sendCurrentText', text, key)
    }

    $element.on('keyup', function (e) {
        $scope.sendCurrentText($element[0].children[0].value, e.key)
    })

    $scope.$on('enterMatchedUser', function (events, user) {
        $scope.currentText = $scope.currentText.substring(0, $scope.currentText.lastIndexOf('@') + 1) + user.name
        $scope.$apply()
    })
}

angular.
    module('myApp').
    component('textInput', {
        template:
    `<textarea
    ng-model='currentText'
    value='currentText'
      class="textarea"
      cols='80'
    ></textarea>`,
        controller: textInputController
    })