function textInputController($scope, $element) {
    const ctrl = this;
    console.log(ctrl.currentText)
    $scope.updateCurrentText = function (text) {
        $scope.$emit('updateCurrentText', text)
    }
    
    $element.on('keyup', function () {
        $scope.updateCurrentText($element[0].children[0].value)
    })
}

angular.
    module('myApp').
    component('textInput', {
        template:
    `<textarea
      #textBox
      class="textarea"
      cols='80'
    ></textarea>`,
        controller: textInputController,
        bindings: {
            currentText: '<'
        }
    })