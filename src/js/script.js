
var Mocker = {
  init: function() {
    var self = Mocker;
    var component = $('.component');
    var draggable = $('.draggable');
    var resizable = $('.resizable'); 
    var mainpad = $('#mainpad'); 
    component.append('<div class="remove">x</div>');
    draggable.draggable({
      cursor: 'move',
    });
    mainpad.droppable({
      accept: '.draggable',
      // drop: function( event, ui ) {
      //   var comp = ui.draggable;
      //   comp.appendTo($(this));
      //   // $(this).find(comp).css('top', 0);
      // } 
    });
    resizable.resizable();

    // remove component
    $('body').on('click', '.remove', function() {
      self.removeParent($(this));
    }); 
  },
  buttons: function() {
    var mButtons = $('.mocker__buttons');

    function generateButton(style) {
      var classes = "btn-primary";
      var attr = "";
      var button;
      if (style === '2') {
        classes = "btn-secondary";
      } else if (style === '3') {
        classes = "btn-tertiary";
      } else if (style === '4') {
        classes = "btn-success";
      } else if (style === '5') {
        classes = "fin-btn-secondary";
      } else if (style === '6') {
        attr = "disabled";
      } 

      button = '<div class="btn '+ classes +' component draggable" '+ attr +'>Button<div class="remove">x</div></div>';
      return button;
    }

    mButtons.on('click', '.js-add', function() {
      var style = mButtons.find('.button--style').val();
      var generatedPad = $('.mainpad');
      generatedPad.append(generateButton(style));
      Mocker.init();
    });
  },
  didyouknow: function() {
    var mDidyouknow = $('.mocker__didyouknow');

    mDidyouknow.on('click', '.js-add', function() {
      var html = '<div class="did-you-know component draggable resizable">' +
        '<div class="info-box-special-header">Did you know?</div>' + 
        '<div class="info-box">' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu sem eget mauris commodo placerat. Pellentesque vestibulum diam eu orci laoreet in auctor est euismod. Nulla sed sagittis diam. Aliquam placerat, felis ac blandit commodo, nisi urna elementum urna, eget mattis massa.</p>' +
        '</div>' +
      '</div>';
      Mocker.generateHtml(html);
      Mocker.init();
    });

  },
  lists: function() {
    var mLists = $('.mocker__lists');

    mLists.on('click', '.js-add', function() {
      var list_style = mLists.find('.list--style').val();

      var html = '<div class="draggable component"><ul class="list-'+ list_style +'">' +
            '<li>List item 1</li>' +
            '<li>List item 2</li>' +
            '<li>List item 3</li>' +
          '</ul></div>';

      Mocker.generateHtml(html);
      Mocker.init();
    });
  },
  generateHtml: function(html) {
    var generatedPad = $('.mainpad');
    generatedPad.append(html);
  },
  removeParent: function(e) {
    e.parent().remove();
  },
  clearGenerated: function() {
    var generatedPad = $('.generated');
    generatedPad.html("");
  }
};

$(document).ready(function() {
  Mocker.init();
  Mocker.buttons();
  Mocker.didyouknow();
  Mocker.lists();
});
