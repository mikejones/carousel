/**
 * carousel - hackable jquery plugin
 
 * Copyright (c) 2008 Michael Jones (http://neophiliac.net)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * A jQuery plugn
 *   http://neophiliac.net
 */
(function($){
  $.fn.carousel = function(options) {
    options = $.extend({
      index: 0,
      disabledClass: "disabled",
      animateDuration: 400,
    }, options);
    
    return this.each(function() {
      this.unlockButtons = function() {
        self.lock=false;
        checkButtonClasses();
      };
      this.lockButtons = function() { self.lock=true; }
      this.size = function () { return list.children().length; }
            
      this.appendItem = function(item) {
        list.append(item);
        list.css("width", list.children().length * listItemWidth);
      };
      
      this.prependItem = function(item) {
        list.prepend(item);
        options.index+=1;
        list.
          css("width", list.children().length * listItemWidth).
          css("left", "-" + (listItemWidth * options.index) +"px");
      };
      
      this.onLastItem = function() { return options.index == list.children().length-1; };
      this.onFirstItem = function() { return options.index == 0; };
      
      this.moveToItem = function(index, animation_finished) {
        var direction = index > options.index ? "-" : "+";
        var distance = listItemWidth * Math.abs(options.index - index);
        list.animate({left: direction +'='+distance+'px'}, options.animateDuration, "swing", animation_finished);
        options.index=index;
      }
      this.moveToNextItem = function(animation_finished) { self.moveToItem(options.index+1, animation_finished); }
      this.moveToPrevItem = function(animation_finished) { self.moveToItem(options.index-1, animation_finished); }
      this.moveToFirstItem = function(animation_finished) { self.moveToItem(0, animation_finished); };
      this.moveToLastItem = function(animation_finished) { self.moveToItem(self.size()-1, animation_finished); };
      
      function previousButtonClick(e) {
        if(!self.lock) {
          self.lockButtons();
          if(options.prevButtonClick != undefined) {
            options.prevButtonClick(self, options);
          } else {
            if(!self.onFirstItem()) {
              self.moveToPrevItem(self.unlockButtons);
            } else {
              self.unlockButtons();
            }
          }
        }
        return false;
      };

      function nextButtonClick(e) {
        if(!self.lock) {
          self.lockButtons();
          if(options.nextButtonClick != undefined) {
            options.nextButtonClick(self, options);
          } else {
            if(!self.onLastItem()) {
              self.moveToNextItem(self.unlockButtons);
            } else {
              self.unlockButtons();
            } 
          }
        } 
        return false;
      };

      function checkButtonClasses() {
        self.onFirstItem() ? prevButton.addClass(options.disabledClass) : prevButton.removeClass(options.disabledClass);
        self.onLastItem() ? nextButton.addClass(options.disabledClass) : nextButton.removeClass(options.disabledClass);
      };
      
      this.lock = false;
      var self = this;
      var list = $(this);

      var container = list.wrap("<div></div>").parent()
      var listItemWidth = $(list.children()[0]).width();
      var nextButton = $(options.nextButton);
      var prevButton = $(options.prevButton);
      
      list.css("position", "relative");
      list.css("width", list.children().length * listItemWidth);
      list.css("left", "-" + (listItemWidth * options.index) +"px");
      container.addClass("carousel").css("width", listItemWidth).css("overflow", "hidden");;

      nextButton.bind("click", nextButtonClick);
      prevButton.bind("click", previousButtonClick);
      checkButtonClasses();
    });
  };   
})(jQuery);
