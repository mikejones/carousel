(function($){
  $.fn.carousel = function(options) {
    options = $.extend({
       index: 0,
    }, options);
    
    return this.each(function() {
      var list = $(this);
      var listItemWidth = $(list.children()[0]).width();
      var lock = false;
      
      list.css("width", list.children().length * listItemWidth);
      var container = container = list.wrap("<div></div>").parent().addClass("carousel").css("width", 200 );
      
      $(options.nextButton).bind("click", nextButtonClick);
      $(options.prevButton).bind("click", previousButtonClick);
      
      function removeLock() { lock=false };
      
      function previousButtonClick(e) {
        if(!lock && index > 0) {
          lock=true;
          index--;
          list.animate({left: '+='+listItemWidth+'px'}, 400, "swing", removeLock);
        }
        return false;
      }
      
      function nextButtonClick(e) {
        if(!lock) {
          lock=true;
          if (index == (list.children().length-1)) {
            list.append(options.nextMissingItem(index));
            list.css("width", list.children().length * listItemWidth);
          }
          index++;
          list.animate({left: '-='+listItemWidth+'px'}, 400, "swing", removeLock);
        }
        return false;
      }
    });
  };
})(jQuery);
