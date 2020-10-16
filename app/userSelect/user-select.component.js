function userSelectController($scope) {
  const ctrl = this
  
}

angular.
  module('myApp').
  component('userSelect', {
    template:
      `<div class="control">
    <div class="select is-mulitple" >
      <select multiple size="4">
        <option>
            blah
        </option>
      </select>
    </div>
  </div>`,
    controller: userSelectController,
    bindings: {
      users: '<'
    }
  })