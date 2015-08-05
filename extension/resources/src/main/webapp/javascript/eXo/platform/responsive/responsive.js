(function($) {
  var tabManagerApp = {
    container : $('#UIToolbarContainer'),
    init : function() {
      if ($('.OfficeRightTDContainer').length != 0) {    
       $('.OfficeMiddleTDContainer').append($('<a href="javascript:void(0)" class="visible-tablet toggle-right-bar"><span></span><span></span><span></span></a>'));  
         var _h = $(window).height(); 
         console.log(_h);
         $('.toggle-right-bar').css('top',_h/2);    
      }
      this.toggleLeftBar();
      this.toggleRightBar();
      this.leftNavAccordion();
      this.displaySubMenu();
      // trigger back item when client lost focus on sub menu
      $('#UISetupPlatformToolBarPortlet').on('click', function(evt) {
        $('.back-item').trigger('click');
      });
      //
      $('#UIUserPlatformToolBarPortlet').on('click', function (evt) {
        tabManagerApp.showProfileMenu();
        $('.back-item').trigger('click');
      });
      //
      $('#ToolBarSearch > a').click(function(){
        tabManagerApp.searchOnTopNavivation();
      });
      // adapt dropdown menu with screen size if height too big
      $('.UIToolbarContainer .dropdown-toggle').on('click',  function(event) {  
        tabManagerApp.setHeightMenu();
      });
      //
      this.setPositionRightButton();
    },
    setPositionRightButton : function() {
      var _w = $(window).width();     
      if ( _w  < 1025 && _w > 767) {         
        var _h = $(window).height();
        tabManagerApp.container.find('.toggle-right-bar:first').css('top', function() {
           return (_h - $(this).height()) / 2
        });
      }
    },
    toggleLeftBar : function() {
       $('.toggle-left-bar').on('click',function() {
     
        if($('body').hasClass('open-left-bar')) {
          tabManagerApp.hideLeftPanel();  
        } else {
          tabManagerApp.showLeftPanel();  
        }
      });
    },
    toggleRightBar : function() {
      $('.toggle-right-bar').on('click',function() {
        if($('body').hasClass('hidden-right-bar')) {
          tabManagerApp.hideRightPanel();    
        } else {
          tabManagerApp.showRightPanel();
        }
      });
    },
    showLeftPanel : function() {
      var leftNavi= $('.LeftNavigationTDContainer:first');
      $('body').addClass('open-left-bar');    
      $('.mask-layer-right').remove();
      $('#RightBody').before('<div class="mask-layer-right"></div>');
      $('.RightBodyTDContainer:first').css('height', leftNavi.height());
      $('body,html').css('overflow-y',"hidden");
      $('.mask-layer-right').on('click',function(){
        tabManagerApp.hideLeftPanel();  
      });
      leftNavi.addClass('expanded');      
    },
    hideLeftPanel : function() {
      var leftNavi= $('.LeftNavigationTDContainer:first');
      $('body').removeClass('open-left-bar');  
      $('.mask-layer-right').remove();
      leftNavi.removeClass('expanded');    
    },
    showRightPanel : function() {
      var rightNavi= $('.OfficeRightTDContainer');
      $('body,html').css('overflow-y',"visible");
      $('body').addClass('hidden-right-bar');      
      rightNavi.addClass('expanded');      
    },
    hideRightPanel : function() {
      var rightNavi= $('.OfficeRightTDContainer');
      $('body').removeClass('hidden-right-bar');  
      rightNavi.removeClass('expanded');    
    },
    displaySubMenu : function () {
      tabManagerApp.container.find('.dropdown-submenu > a').on('click', function(evt) {
        var dropdownSub = $(this);
        
        var dropdown = dropdownSub.parents('.dropdown-menu');
        
        var _w = $(window).width();     
        if ( _w < 1025 ) {
        evt.stopPropagation();
           evt.preventDefault();
           var backButton = $('<li class="back-item"><a href="javascript:void(0)"><i class="uiIconArrowLeft" style="margin-right: 2px;"></i>Back</a></li>');
           backButton.on('click', function(evt) {
              evt.stopPropagation();
              parent.find('.current')
                    .removeClass('current')
                    .find('ul.dropdown-menu:first')
                    .append(parent.find('.current-child')
                    .removeClass('current-child'));
              $(this).remove();
              parent.find('>li').show();
              dropdown.removeClass('parent-current');
           });
           //
           var parent = dropdownSub.parent().addClass('current').parent('ul');
           dropdown.addClass('parent-current');
           parent.find('>li').hide();
           parent.append(backButton);
          //
          var sub = dropdownSub.parent().find('.dropdown-menu:first > li').addClass('current-child');
          parent.append(sub);
        }
      });
    },
    leftNavAccordion : function() {
      var aTitle = $('#LeftNavigation .accordionBar').find('a');
      if ( $(window).width() < 481 ) {
      var companyNav = $('.uiCompanyNavigationPortlet .title.accordionBar').addClass('active');  
      $('.title.accordionBar').prepend('<i class="uiIconArrowRight pull-right"></i>');  
      $('.uiCompanyNavigationPortlet .accordionCont').addClass('active').show();       
        $('.uiSpaceNavigationPortlet .joinSpace').insertBefore($('.uiSpaceNavigationPortlet .spaceNavigation'));
        $('#LeftNavigation .accordionBar').click(function(e){  
          var subContent = $(this).next();
          if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            subContent.slideUp().removeClass('active');
          } else {
            $('#LeftNavigation .accordionBar').removeClass('active');
            $('.accordionCont').removeClass('active').slideUp();
            $(this).addClass('active');
            subContent.slideDown().addClass('active');
          }
        });
        aTitle.data('link',  function() { return $(this).attr('href'); }).attr('href', 'javascript:void(0)');
      } else {
        aTitle.each(function(i) {
          if($(this).data('link')) {
            $(this).attr('href',  function() { return $(this).data('link'); });
          }
        });
      }
    },
    showProfileMenu : function() {
      var winWidth = $(window).width();
      var dropdow_menu = $('#UIUserPlatformToolBarPortlet .dropdown-menu');
      var avatar = $('.uiUserToolBarPortlet .dropdown-toggle').clone();
      var help_button = $('.uiHelpPLFToolbarPortlet .dropdown-toggle').clone().attr('class','help-link');
      
      if ( winWidth < 481 &&  $('.action_top').length == 0 ) {
        dropdow_menu.prepend(avatar);
        dropdow_menu.prepend($('<li class="divider top mobile-visible">&nbsp;</li>'));
        dropdow_menu.prepend($('<li class="clearfix avatar-help-action mobile-visible"></li>'));
        $('.avatar-help-action').append($('<div class="help-link-box"></div>'));
        $('.help-link-box').append(help_button);
        $('.avatar-help-action').append(avatar);
        if ($('#UISetupPlatformToolBarPortlet .uiIconPLF24x24Setup').length != 0) {
          dropdow_menu.prepend($('<li class="clearfix action_top mobile-visible"><span class="action-addon"> <span class="admin-setup"><i class="uiIconPLF24x24Setup"></i></span></span></li>'));
        }
        if (tabManagerApp.container.find('.uiNotifChatIcon').length != 0) {
          $('.action_top').prepend('<span class="action-addon"><span class="uiNotifChatIcon chat-button"><span id="chat-notification"></span></span></span>');
        }
         // show dropdown menu of administration menu
        $('.admin-setup').on('click', function(){
          $('.uiSetupPlatformToolBarPortlet .dropdown-toggle').trigger('click');
          return false;
        });
        // show dropdown menu of chat menu
        $('.chat-button').on('click',function(){
          $('.chatStatusPortlet  .dropdown-toggle').trigger('click');
          return false;
        });
      }
    },
    searchOnTopNavivation : function() {
      var _w = $(window).width();
      var bar = $('.UIToolbarContainer .ToolbarContainer');    
      var toolBar = $("#ToolBarSearch");
      var bar_input = toolBar.find("input[type='text']");
      $('#RightBody').prepend('<div class="uiMasklayer"></div>');
      //
      if(_w < 1025 && toolBar.find('span.action_close').length == 0) {
        bar.addClass('active');
        toolBar.append('<span class="action_close"><i class="uiIconClose uiIconWhite"></i></span>');
      }
      
      bar_input.off('blur');
      if(_w < 1025) {
        bar_input.blur(function(){
          $(this).hide();
          bar.removeClass('active');
          $('#ToolBarSearch .action_close').remove();
          $('#ToolBarSearch .uiQuickSearchResult').hide();
          if($(window).width() < 768) {
            $('#RightBody > .uiMasklayer').remove();  
          }
        });
        //
        if(_w < 768) {
          bar_input.css('width', _w - 120);
          $('.uiQuickSearchResult').css('width', _w - 120);
          //
          $('.uiMasklayer,.action_close').click(function(){
            $("#ToolBarSearch input[type='text']").trigger('blur');
          });
        }
      }
    },
    setHeightMenu : function(){
      var dropdow_toggle=$('.UIToolbarContainer .dropdown-toggle');
      var _w = $(window).width();
      if ( _w < 768 ) {
        var dropdowWidth =  dropdow_toggle.next().height();
        
        var max_height= Math.max($(window).height(), dropdowWidth) - 70 ;

        dropdow_toggle.next().css({
           'max-height' : max_height
        }).addClass('overflow-y');
      }
    }
  };
  //OnLoad
  $(document).ready(function(event) {
    tabManagerApp.init();
  /*$("body").on("swiperight",function(){
      $('.toggle-left-bar').trigger('click');
  });
  $("body").on("swipeleft",function(){
      $('.toggle-right-bar ').trigger('click');
  });
*/
  });
  //OnResize
  $(window).resize(function(event) {
    setTimeout(function() {
      if($('#ToolBarSearch').find('.action_close').length > 0) {
      tabManagerApp.searchOnTopNavivation();
    }
        tabManagerApp.setHeightMenu();
    }, 50);
  });
  
})($);
