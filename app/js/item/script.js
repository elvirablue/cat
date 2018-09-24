//*****************
$(document).ready(function() {
  $("input[name^='user-phone']").mask("+7 (999) 999 - 9999");

  $('.design .b-info').on('click', function() {
    $(this).toggleClass('active');
  });

// при открытии модального окна
  $('#Modal').on('show.bs.modal', function(event) {
    // получить кнопку, которая его открыло
    var button = $(event.relatedTarget)
    var buttonModal = $(this).find('.button');
    // извлечь информацию из атрибутов
    var title = button.data('title');
    var namebtn = button.data('namebtn');
    var checkbox = $(this).find('input:checkbox');
    //var mail = button.data('mail');
    //if (mail == true) $(this).find('.mail').removeClass('hidden')
    //else $(this).find('.mail').addClass('hidden');
    //вывести эту информацию в элемент, имеющий id="content"
    $(this).find('h2.title').text(title);
    buttonModal.text(namebtn);
    checkbox.change(function() {
      if (checkbox.is(':checked')) {
        buttonModal.prop('disabled',false);
      } else  buttonModal.prop('disabled',true);
    });

  })
});


var owl0 = $('#owl-0');

owl0.owlCarousel({
  loop: true,//Зацикливаем слайдер
  margin: 0,
  nav: true,
  dots: true,
  smartSpeed:1300, //Время движения слайда
  autoplayTimeout:80, //Время смены слайда
  responsiveClass:true,
  dotsEach: true,
  navigation : true,
  items: 1
});

var owl1 = $('#owl-1');

owl1.owlCarousel({
  loop: true,//Зацикливаем слайдер
  margin: 0,
  nav: true,
  dots: true,
  smartSpeed:1300, //Время движения слайда
  autoplayTimeout:80, //Время смены слайда
  responsiveClass:true,
  dotsEach: true,
  navigation : true,
  items: 1
});

var owl2 = $('#owl-2');

owl2.owlCarousel({
  loop: true,//Зацикливаем слайдер
  margin: 0,
  nav: true,
  dots: true,
  smartSpeed:1300, //Время движения слайда
  autoplayTimeout:80, //Время смены слайда
  responsiveClass:true,
  dotsEach: true,
  navigation : true,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    768: {
      items: 3
    }
  }
});


$( "#selector1" ).slider({
  range: "min",
  value: 75,
  min: 40,
  max: 120,
  create: function( event, ui ) {
    $(ui.handle).html('<b class="value">75</b>');
  },
  slide: function( event, ui ) {
    var str = ui.value.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
    $(ui.handle).html('<b class="value">' + str + '</b>');
    //$(ui.handle).find(".value").text(str);
  }
});
$( "#selector2" ).slider({
  range: "min",
  value: 40000,
  min: 8000,
  max: 50000,
  slide: function( event, ui ) {
    var str = ui.value.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
    $(ui.handle).html('<b class="value">' + str + '</b>');
  }
});
$( "#selector3" ).slider({
  range: "min",
  value: 550,
  min: 300,
  max: 2500,
  slide: function( event, ui ) {
    var str = ui.value.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1 ");
    $(ui.handle).html('<b class="value">' + str + '</b>');
  }
});

//*****************



