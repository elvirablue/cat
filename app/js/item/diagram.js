$(document).ready(function() {
  function diagramBar() {
    var $diargams = $('.diagram');
    var MaxWidth = 6051604;

    $diargams.each(function(i, item) {
      var width = $(item).data('size')*52/MaxWidth + '%';
      $(item).css('width', width);
    });
  }

  diagramBar();
});