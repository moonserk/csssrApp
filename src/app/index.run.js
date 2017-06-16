(function() {
  'use strict';

  angular
    .module('csssrApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
