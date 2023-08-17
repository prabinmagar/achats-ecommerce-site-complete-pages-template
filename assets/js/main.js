$(document).ready(function () {
  $(".hero-slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    prevArrow:
      "<button type='button' class='slick-prev'><i class='bi bi-chevron-left'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next'><i class='bi bi-chevron-right'></i></button>",
  });

  $(".arrival-slider").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    prevArrow:
      "<button type='button' class='slick-prev'><i class='bi bi-chevron-left'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next'><i class='bi bi-chevron-right'></i></button>",
  });

  $(".feedback-slider").slick({
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  let rangeMin = 100;
  const range = $(".range-selected");
  const rangeInput = $(".range-input input");
  const rangePrice = $(".range-price input");

  rangeInput.each(function(index, input) {
    $(input).on("input", function(e) {
      let minRange = parseInt(rangeInput.eq(0).val());
      let maxRange = parseInt(rangeInput.eq(1).val());
      if (maxRange - minRange < rangeMin) {
        if ($(e.target).hasClass("min")) {
          rangeInput.eq(0).val(maxRange - rangeMin);
        } else {
          rangeInput.eq(1).val(minRange + rangeMin);
        }
      } else {
        rangePrice.eq(0).val(minRange);
        rangePrice.eq(1).val(maxRange);
        range.css("left", (minRange / rangeInput.eq(0).attr("max")) * 100 + "%");
        range.css("right", 100 - (maxRange / rangeInput.eq(1).attr("max")) * 100 + "%");
      }
    });
  });

  rangePrice.each(function(index, input) {
    $(input).on("input", function(e) {
      let minPrice = parseInt(rangePrice.eq(0).val());
      let maxPrice = parseInt(rangePrice.eq(1).val());
      if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput.eq(1).attr("max")) {
        if ($(e.target).hasClass("min")) {
          rangeInput.eq(0).val(minPrice);
          range.css("left", (minPrice / rangeInput.eq(0).attr("max")) * 100 + "%");
        } else {
          rangeInput.eq(1).val(maxPrice);
          range.css("right", 100 - (maxPrice / rangeInput.eq(1).attr("max")) * 100 + "%");
        }
      }
    });
  });

  $('.preview-items').slick({
    slidesToScroll: 1,
    slidesToShow: 3,
    arrows: true,
    dots: false,
    vertical: true,
    verticalSwiping: true
  });

  // product zoom
  $('.preview-display img')
  .css('display', 'block')
  .parent()
  .zoom();

  // product image change
  const previewItems = $('.preview-item');
  const previewDisplay = $('.preview-display');

  $(previewItems).each(function(index, previewItem){
    $(previewItem).click(function(){
      const srcImage = $(this).find('img').attr('src');
      $(previewDisplay).find('img').attr('src', srcImage);
    });
  })

  // product description tabs
  const tabsHeads = $('.tabs-head');
  const tabsContents = $('.tabs-content');
  const currentActiveTab = "tabDescription";

  const tabsInit = () => {
    $(tabsHeads).each(function(index, tabsHead){
      if($(tabsHead).data('id') == currentActiveTab){
        $(tabsHead).addClass('tabs-head-active');
      }
    });
    showActiveTab(currentActiveTab);
  }

  const showActiveTab = (tabId) => {
    $(tabsContents).each(function(index, tabContent){
      if(tabId == tabContent.id){
        $('.tabs-content').removeClass('show');
        $(tabContent).addClass('show');
      }
    })
  }

  $(tabsHeads).each(function(index, tabsHead){
    $(tabsHead).click(function(){
      $('.tabs-head').removeClass('tabs-head-active');
      $(tabsHead).addClass('tabs-head-active');
      const tabId = $(this).data('id');
      showActiveTab(tabId);
    });
  });

  tabsInit();

  // video play/pause
  let playing = false;
  const mediaVideo = $('#media-desc-video');
  $('#media-play-btn').click(function(){
    if(!playing){
      mediaVideo.trigger('play');
      playing = true;
    } else {
      mediaVideo.trigger('pause');
      playing = false;
    }
  });
});
