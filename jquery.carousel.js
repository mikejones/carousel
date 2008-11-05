(function($){
  $.fn.carousel = function(options) {
    options = $.extend({
       index: 1,
    }, options);
    
    return this.each(function() {
      var list = $(this);
      var listItemWidth = $(list.children()[0]).width();
      list.css("width", list.children().length * listItemWidth);
      
      var container = container = list.wrap("<div></div>").parent().addClass("carousel").css("width", 200 );
      
      var index = 1;
      var lock = false;
      
      $(options.nextButton).bind("click", function(e) {
        if(!lock) {
          lock=true;
          index++;
          list.animate({left: '-='+listItemWidth+'px'}, 400, "swing", function() { lock=false;});
        }
        return false;
      });
      $(options.prevButton).bind("click", function(e) {
        if(!lock) {
          lock=true;
          index--;
          list.animate({left: '+='+listItemWidth+'px'}, 400, "swing", function() { lock=false;});
        }
        return false;
      });
    });
  };
})(jQuery);
