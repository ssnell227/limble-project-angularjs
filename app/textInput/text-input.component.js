function textInputController($scope, $element) {
    const ctrl = this;

    $scope.currentText = ''

    $element.on('keypress', function (e) {
        if ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey && $scope.currentText.length)
        {
            $scope.$emit('submitComment', $scope.currentText)
            $scope.currentText = ''
            $scope.$apply()
        }
    })

    $scope.sendCurrentText = function (text, key) {
        $scope.$emit('sendCurrentText', text, key)
    }

    $element.on('keyup', function (e) {
        $scope.sendCurrentText($scope.currentText, e.key)
    })

    $scope.$on('enterMatchedUser', function (events, user) {
        $scope.currentText = $scope.currentText.substring(0, $scope.currentText.lastIndexOf('@') + 1) + user.name
        $scope.$apply()
    })

    $scope.$on('clearText', () => {
        $scope.currentText = ''
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