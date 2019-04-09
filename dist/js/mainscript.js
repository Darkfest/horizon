"use strict";

var $window = $(window),
    $wrapper = $(".wrapper"),
    $wrapperContainer = $(".wrapper__container"),
    $sections = $(".section"),
    $preloader = $(".preloader"),
    WHEEL_DELTA = 10,
    // %
imagesToLoad = ["abstract_girl.png", "big_cubs.png", "big_cubs_2.png", "big_star.png", "browsers.png", "butterfly.png", "chess.png", "deadpool.png", "fireworks.png", "horse.png", "main_bg.jpg", "middle_cubs.png", "middle_cubs_2.png", "nodes.png", "pink_brash.png", "rounded_water.png", "small_cubs.png", "small_cubs_2.png", "tall_girl.png", "technologies.png"],
    countResources = imagesToLoad.length;
var loadedResources = 0;

function calcResource() {
  loadedResources++;

  if (loadedResources >= countResources && !$preloader.hasClass("done")) {
    $preloader.addClass("done");
  }
}

function loadResource(name) {
  var image = new Image();
  image.src = "img/".concat(name);
  image.addEventListener("load", calcResource);
  image.addEventListener("error", calcResource);
}

imagesToLoad.forEach(function (img) {
  loadResource(img);
});
$wrapperContainer.on("wheel", onWheel);
$window.on("touchstart", onTouchStart);

function onTouchStart(e) {
  if (e.touches.length != 1) {
    return;
  }

  var x = e.changedTouches[0].pageX,
      delta,
      newX;
  $window.on("touchmove", onTouchMove);
  $window.on("touchend", onTouchEnd);

  function onTouchMove(e) {
    newX = e.changedTouches[0].pageX;
  }

  function onTouchEnd(e) {
    if (!newX) return;
    var absDel = Math.abs(x - newX),
        part = absDel / $window.width() * 100;

    if (part <= 20) {
      delta = 20;
    } else if (part > 20 && part <= 40) {
      delta = 40;
    } else if (part > 40 && part <= 60) {
      delta = 60;
    } else if (part > 60 && part <= 80) {
      delta = 80;
    } else {
      delta = 100;
    }

    if (x - newX < 0) {
      swipeTo("left", delta);
    } else {
      swipeTo("right", delta);
    }

    $window.off("touchmove", onTouchMove);
    $window.off("touchend", onTouchEnd);
  }
}

function onWheel(e) {
  var delta = e.originalEvent.deltaY || e.originalEvent.detail || e.originalEvent.wheelDelta,
      direction = delta < 0 ? 1 : -1,
      lastPosition = parseInt($wrapperContainer.get(0).style.marginLeft);
  if (!lastPosition) lastPosition = 0;
  scrolling(lastPosition, direction, WHEEL_DELTA);
  e.originalEvent.preventDefault ? e.originalEvent.preventDefault() : e.originalEvent.returnValue = false;
}

function swipeTo(direction, delta) {
  var lastPosition = parseInt($wrapperContainer.get(0).style.marginLeft);
  if (!lastPosition) lastPosition = 0;
  direction = direction === "left" ? 1 : -1;
  scrolling(lastPosition, direction, delta);
}

function scrolling(lastPosition, direction, delta) {
  var nextPosition = lastPosition + delta * direction;

  if (nextPosition < -400 && lastPosition != -400) {
    nextPosition = -400;
  } else if (nextPosition > 0 && lastPosition != 0) {
    nextPosition = 0;
  } else if (nextPosition < -400 || nextPosition > 0) {
    return;
  }

  $wrapperContainer.get(0).style.marginLeft = nextPosition + "%";
  globalParallax(nextPosition);
}

function parallax(parallaxParent, parentShift) {
  var $parallaxChildren = $(parallaxParent).children("[data-parallax-role='child']");
  $parallaxChildren.each(function () {
    $(this).css("transform", "translate3d(".concat(parentShift * $(this).attr("data-parallax-speed"), "%, 0, 0)"));
  });
}

function globalParallax(nextPosition) {
  if (nextPosition == null) return;
  parallax($wrapper, nextPosition);

  if (nextPosition > -100) {
    parallax($sections[0], nextPosition);
  }

  if (nextPosition < 0 && nextPosition > -200) {
    parallax($sections[1], nextPosition + 100);
  }

  if (nextPosition < -100 && nextPosition > -300) {
    parallax($sections[2], nextPosition + 200);
  }

  if (nextPosition < -200 && nextPosition > -400) {
    parallax($sections[3], nextPosition + 300);
  }

  if (nextPosition < -300) {
    parallax($sections[4], nextPosition + 400);
  }
}