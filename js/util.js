'use strict';
(function () {
  window.ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === window.ESC_KEY) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    }
  };
})();
