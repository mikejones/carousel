(function($){
  $.fn.carousel = function(o) {
    return this.each(function() {
      $.carousel(this, o);
    });
  };

  $.carousel = function(element, settings) {
    settings = $.extend({
       index: 1,
    }, settings);
    this.index = 1;
    this.locked = 1;
    
    children = $(element).children();
    this.itemWidth = $(children[0]).width();
    totalSize = children.length * this.itemWidth;
    
    $(element).css("width", totalSize)
    
    this.list = $(element);
    this.container = this.list.wrap("<div></div>").parent();
    this.container.addClass("carousel");
    this.container.css("width", this.itemWidth);
    
    self = this;
    $(settings.nextButton).bind("click", function(e) {
      self.list.animate({left: '-='+self.itemWidth+'px'}, "swing");
    });
    $(settings.prevButton).bind("click", function(e) {
      self.list.animate({left: '+='+self.itemWidth+'px'}, "swing");
    });
  };
  
  $.fn.extend({
    next: function() {
      self.list.animate({left: '-='+self.itemWidth+'px'}, "swing");
      if(this.lock)
        return true;
      this.lock = true;
      this.index++;
      // if(this.index > this.size()) {
      //   $('#scroll').append("<div style='background-color:blue'>two</div>");
      //   $('#scroll').width($('#scroll').width() + 200);
      // }
      this.list.animate({left: '-=200px'}, 400, "swing", function() {
        this.lock=false;
      });
    }
  });
})(jQuery);

