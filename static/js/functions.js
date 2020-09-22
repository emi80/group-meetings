var noNavBar = false;
// var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
// var date, dateString, locationDate;
// $(document).ready(function() {
//     baseUrl = window.location.origin + window.location.pathname.split("/").slice(0,-2).join("/");
//     $.get(baseUrl + "/versions.json", function(data) {
//         if (typeof(data) == 'string') data = JSON.parse(data);
//         $(data).each(function(i, val){
//             val.href = baseUrl + "/" + val.href
//             var text = '<dd><a href="' + val.href + '">' + date +'</a></dd>'
//             $('.rst-other-versions').append(text);
//         });
//         $('.rst-other-versions a').each(function() {
//             var version = $(this);
//             $.get(version.attr('href') + "/presentation.json", function(data) {
//                 if (typeof(data) == 'string') data = JSON.parse(data);
//                 var date = getPresentationDate(data.date);
//                 version.text(date);
//                 if (window.location.href.includes(version.attr('href'))) {
//                     var currentVersion = '<span class="fa fa-book"></span> ' + date + ' <span class="fa fa-caret-down"></span>';
//                     $('.rst-current-version').html(currentVersion);
//                     var titleSlideInfo = '<p><small>Emilio Palumbo<br>' + date + '</small></p>';
//                     $(Reveal.getSlide(0)).append(titleSlideInfo);
//                 }
//             });
//         });
//     });
// });

function getPresentationDate(dateString) {
    var d = new Date(dateString);
    return months[d.getMonth()] + " " + d.getDate()+ ", " + d.getFullYear();
}

function increaseFontWeight(element, ratio) {
    return Math.round(element * ratio / 100) * 100;
}

function toggleFonts() {
    fw = ($('body').css('font-weight') == 300) ? 400 : 300;
    $('body').css('font-weight', fw);
    $('.reveal strong').css('font-weight', increaseFontWeight($('body').css('font-weight'), 1.75));
}

function vslidedots(event, el){
    var totalslides = document.querySelectorAll( '.reveal .slides section:not(.stack)' ).length;
    var current_slide = 0;

    var horizontal_slides = document.querySelectorAll( '.reveal .slides>section' );
    var idxh = event.indexh;
    var idxv = event.indexv;
    if (el != null) {
    idxh = el;
    idxv = (el == event.indexh ? event.indexv : 0)
    }
    var subslides = horizontal_slides[idxh].querySelectorAll('section');

    // return current_slide.toString()+"/"+totalslides.toString();
    return Array(idxv+1).join('<i class="dot fa fa-dot-circle-o"></i>')+Array(subslides.length-idxv).join('<i class="dot fa fa-circle-o"></i>');
}

function renderPanel(element) {
    var panels = element.find('p');
    var re = /<!-- (panel)([^\(]+)?\(?([^\)]+)?\)? -->/gi
    panels.each(function() {
        var m = re.exec($(this).html())
        if (m) {
            var panelText = $(this).html().replace(re, '');
            var cls = m[1]=='panel' ? 'class="panel panel-default"' : '';
            var char = m[2] == '->' ? 'fa-arrow-circle-right' : 'fa-circle-o';
            var color = m[3];
            // var fa = m[2] && m[3] ? `<i class="fa ${char} ${color}"></i>` : '';
            var fa = m[2] && m[3] ? '<i class="fa ' + char + ' ' + color + '"></i>' : '';
            // $(this).html(`<div><span ${cls}>${fa} ${panelText} </span></div>`);
            // $(this).html(`<div ${cls}>${fa} ${panelText} </div>`);
            $(this).html('<div ' + cls + '>' + fa + ' ' + panelText + ' </div>');
        }
    });
}

function setSlideIds(element) {
    var section = element.find('h1').text();
    var slides = element.find('section[data-markdown]');
    slides.each(function() {
        var header = $(this).find('h2').text();
        if (header) {
            $(this).attr('id', (section + header).replace(/ /gi, ''));
        }
    });
}

function updateSlide(show) {
    var noNavState = $(Reveal.getCurrentSlide()).attr("data-state") == "no-nav-bar";
    if ( noNavState ) {
        show = false;
    }
    if (!noNavBar) {
        $(".navbar-fixed-top").css("display", show ? 'block' : "none");
        $('.slide-number').css("visibility", show ? "visible" : "hidden");
    }
    if (Reveal.isFirstSlide()) {
        $('.slide-number').css("visibility","hidden");
    }
    var slide = Reveal.getCurrentSlide();
    var extra = $(slide).hasClass("extra");
    if ((Reveal.isLastSlide() && !extra) || $(slide).hasClass("thanks")) {
        $('.slide-number').css("visibility","hidden");
        $(".navbar-fixed-top").css("display", "none");
    }
    if (extra) {
        $(".navbar-fixed-top").css("display", "none");
        var span = $(slide).find('span.extra');
        if (span.length == 0) {
            $(slide).append('<span class="rfooter extra">Additional slide</span>');
        }
        header = $(slide).find("h1");
        if (header.length > 0) {
            $('.slide-number').css("visibility","hidden");
        }
    }
}

Reveal.addEventListener( 'slidechanged', function( event ) {
    updateSlide(true);
    $("a[id*='nav-']").parent().removeClass("active");
    $("#nav-" + event.indexh).parent().addClass("active");
    $("a[id*='nav-']").each(function() {
        var text = $(this).html().split("<br>")[0];
        $(this).html(text+"<br>"+vslidedots(event,$(this).attr("id").split("-")[1]));
    })
});

Reveal.addEventListener( 'ready', function( event ) {
    updateSlide(true);
    $('a.extern').attr('target', '_blank');
    $('.rst-other-versions a').attr('target', '');
    document.title = $(Reveal.getSlide(0)).find('h1').text();
    $(".reveal .slides > section").each(function ( index ) {
        if (index>0) {
            var header = $("h1", this);
            var extra = $(this).hasClass('extra') || header.parent().hasClass('extra');
            // renderPanel($(this));
            //setSlideIds($(this));
            if (!extra) {
                $("#nav-sections").append('<li><a id="nav-'+(index)+'" href="#/'+(index)+'">'+$("h1", this).text()+'</a></li>')
            }
        }
    });
    $("a[id*='nav-']").parent().removeClass("active");
    $("#nav-" + event.indexh).parent().addClass("active");
    $("a[id*='nav-']").each(function() {
        var text = $(this).html().split("<br>")[0];
        $(this).html(text+"<br>"+vslidedots(event,$(this).attr("id").split("-")[1]));
    })
});

Reveal.addEventListener( 'no-nav-bar', function() {
    updateSlide(false)
}, false );


$("[data-toggle='rst-current-version']").click(function() {
$("[data-toggle='rst-versions']").toggleClass("shift-up")
});

$(document).keypress(function(e){
    if (e.which == 117) toggleFonts(); // 'u' pressed
    if (e.which == 116) toggleNavbar(); // 't' pressed
    if (e.which == 118) toggleVersions(); // 'v' pressed
    if (e.which == 48) Reveal.slide(0); // '0' pressed
});

function toggleNavbar() {
    var display = ($(".navbar-fixed-top").css("display") == 'block' ? 'none' : 'block');
    $(".navbar-fixed-top").css("display", display);
    noNavBar = (display == 'none')
}

function toggleVersions() {
    var display = ($(".rst-versions.rst-badge").css("display") == 'block' ? 'none' : 'block');
    $(".rst-versions.rst-badge").css("display", display)
}
