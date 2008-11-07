(function($){
  $.fn.carousel = function(options) {
    options = $.extend({
       index: 0,
    }, options);
    
    return this.each(function() {
      var lock = false;
      var list = $(this);
      // setup
      var container = list.wrap("<div></div>").parent()
      var listItemWidth = $(list.children()[0]).width();
      list.css("width", list.children().length * listItemWidth);
      list.css("left", "-" + (listItemWidth * options.index) +"px");
      container.addClass("carousel").css("width", listItemWidth);
      
      $(options.nextButton).bind("click", nextButtonClick);
      $(options.prevButton).bind("click", previousButtonClick);
      
      function removeLock() { lock=false; };
      
      function previousButtonClick(e) {
        if(!lock && options.index > 0) {
          lock=true;
          options.index--;
          list.animate({left: '+='+listItemWidth+'px'}, 400, "swing", removeLock);
        }
        return false;
      };
      
      function nextButtonClick(e) {
        if(!lock && options.index < (list.children().length-1)) {
          lock=true;
          options.index++;
          list.animate({left: '-='+listItemWidth+'px'}, 400, "swing", removeLock);
        } 
        return false;
      };
    });
  };   
})(jQuery);
