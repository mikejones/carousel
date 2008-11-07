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
      var nextButton = $(options.nextButton);
      var prevButton = $(options.prevButton);
      
      list.css("width", list.children().length * listItemWidth);
      list.css("left", "-" + (listItemWidth * options.index) +"px");
      container.addClass("carousel").css("width", listItemWidth);
      
      nextButton.bind("click", nextButtonClick);
      prevButton.bind("click", previousButtonClick);
      checkButtonClasses();
      
      function previousButtonClick(e) {
        if(!lock && options.index > 0) {
          lockButton(prevButton);
          options.index--;
          list.animate({left: '+='+listItemWidth+'px'}, 400, "swing", releaseButton);
        }
        return false;
      };
      
      function nextButtonClick(e) {
        if(!lock && options.index < (list.children().length-1)) {
          lockButton(nextButton);
          options.index++;
          list.animate({left: '-='+listItemWidth+'px'}, 400, "swing", releaseButton);
        } 
        return false;
      };
      
      function lockButton(button) {
        lock=true;
        button.addClass('disabled');
      }
      
      function releaseButton() {
        lock=false;
        checkButtonClasses();
      }
      
      function checkButtonClasses() {
        options.index==0 ? prevButton.addClass('disabled') : prevButton.removeClass('disabled') ;
        options.index==(list.children().length-1) ? nextButton.addClass('disabled') : nextButton.removeClass('disabled');
      }
    });
  };   
})(jQuery);
