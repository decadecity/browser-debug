(function () {
  $(document).ready(function () {
    var touch = !!('ontouchstart' in window),
        query_selector = !!('querySelector' in document),
        event_listener = !!('addEventListener' in window),
        density = window.devicePixelRatio,
        load_interface = query_selector && event_listener;
    window.t_dom_ready = new Date();
    $('body').append(
      '<div class="debug"><h4 id="debug-toggle" style="color:black">Debug info &raquo;&nbsp;</h4><div id="debug-info"></div></div>'
    );
    function timers() {
      var timers = {
            'timer': null,
            'page_timer': null,
            'request_timer': null
          };
      if (window.t_head && window.t_dom_ready) {
        // Fall back on the timers.
        timers.timer = window.t_dom_ready - window.t_head;
        timers.page_timer = window.t_dom_ready - window.t_head;
      }
      if (typeof window.performance !== 'undefined' && typeof window.performance.timing !== 'undefined') {
        // We have the performance timing API so use it.
        timers.timer = window.performance.timing.domInteractive - window.performance.timing.requestStart;
        timers.timing_timer = window.performance.timing.domInteractive - window.performance.timing.requestStart;
      }
      return timers;
    }
    function debugInfo() {
      var timer = timers();
      $('#debug-info').html(
        '<dl id="debug-data" >' +
          '<dt>Touch:</dt><dd>' + touch + '</dd>' +
          '<dt>Event listener:</dt><dd>' + event_listener + '</dd>' +
          '<dt>Query selector:</dt><dd>' + query_selector + '</dd>' +
          '<dt>Width:</dt><dd>' + $(window).width() + '</dd>' +
          '<dt>Height:</dt><dd>' + $(window).height() + '</dd>' +
          '<dt>innerWidth:</dt><dd>' + window.innerWidth + '</dd>' +
          '<dt>innerHeight:</dt><dd>' + window.innerHeight + '</dd>' +
          '<dt>screen.width:</dt><dd>' + screen.width + '</dd>' +
          '<dt>screen.height:</dt><dd>' + screen.height + '</dd>' +
          '<dt>Pixel density:</dt><dd>' + density + '</dd>' +
          '<dt>viewport scale:</dt><dd>' + $('#viewport').attr('content') + '</dd>' +
          '<dt>Request timer:</dt><dd>' + Math.round(timer.timing_timer/100)/100 + '</dd>' +
          '<dt>DOM timer:</dt><dd>' + Math.round(timer.page_timer/100)/100 + '</dd>' +
        '</dl>'
      );
      $('#debug-data dt, #debug-data dd').css('float', 'left');
      $('#debug-data dd').after('<br/>');
    }
    $(window).resize(debugInfo).trigger('resize');
    window.setInterval(debugInfo, 1000);
    if (load_interface) {
      $('#debug-info').hide();
      $('#debug-toggle').on('click', function () {
        $('#debug-info').toggle();
      })
    }
    $('.debug').css({'font-fmaily': 'monospaced', 'background': 'green', 'float': 'left', 'color': 'black', 'clear': 'both'}).fadeTo(1, 0.75);
  });
}());
