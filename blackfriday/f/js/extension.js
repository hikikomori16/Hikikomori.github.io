jQuery.extend({
  ajaxWithWaiter: function(params) {
    var waiterAction = function(selector, action) {
      var $waiterElement = null;
      	  $form = $('.f-box__form');
      if (typeof(selector) == 'string') {
        $waiterElement = $(selector);
      }
      if ($waiterElement != null && $waiterElement.length > 0) {
        action = action || 'toggle';
        switch (action) {
          case 'show':
            $waiterElement.show();
            $form.addClass('loading');
            break;
          case 'toggle':
            $waiterElement.toggle();
            $form.toggleClass('loading');
            break;
          case 'hide':
          default:
            $waiterElement.hide();
            $form.removeClass('loading');
            break;
        }
      }
    }
    params = params || {};
    var fComplete = null;
    if (typeof(params.complete) == 'function') {
      fComplete = params.complete;
    }
    params.complete = function(jqXHR, status) {
      waiterAction(params.waiter, 'hide');
      if (fComplete != null) {
        fComplete(jqXHR, status);
      }
    }
    waiterAction(params.waiter, 'show');
    $.ajax(params);
  }
});