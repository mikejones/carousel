(function($){
  $.fn.carousel = function(options) {
    options = $.extend({
       index: 0,
       disabledClass: "disabled",
    }, options);
    
    return this.each(function() {
      var lock = false;
      var list = $(this);
      // setup
      var container = list.wrap("<div></div>").parent()
      var listItemWidth = $(list.children()[0]).width();
      var nextButton = $(options.nextButton);
      var prevButton = $(options.prevButton);
      
      list.css("width", list.children().length * listItemWidth);
      list.css("left", "-" + (listItemWidth * options.index) +"px");
      container.addClass("carousel").css("width", listItemWidth);
      
      nextButton.bind("click", nextButtonClick);
      prevButton.bind("click", previousButtonClick);
      checkButtonClasses();
      
      function lockButtons() { lock=true; }
      
      function releaseButtons() {
        lock=false;
        checkButtonClasses();
      }

      function previousButtonClick(e) {
        if(!lock && options.index > 0) {
          lockButtons();
          options.index--;
          list.animate({left: '+='+listItemWidth+'px'}, 400, "swing", releaseButtons);
        }
        return false;
      };
      
      function nextButtonClick(e) {
        if(!lock && options.index < (list.children().length-1)) {
          lockButtons()
          options.index++;
          list.animate({left: '-='+listItemWidth+'px'}, 400, "swing", releaseButtons);
        } 
        this.blur();
        return false;
      };
      
      function checkButtonClasses() {
        options.index==0 ? prevButton.addClass(options.disabledClass) : prevButton.removeClass(options.disabledClass) ;
        options.index==(list.children().length-1) ? nextButton.addClass(options.disabledClass) : nextButton.removeClass(options.disabledClass);
      }
    });
  };   
})(jQuery);
