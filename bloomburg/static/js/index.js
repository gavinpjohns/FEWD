$(window).load(function()
{
    initStaticAnimations();
});
$(document).ready(function()
{
    if ( isiPad() )
    {
        $('body').addClass('ipad');
    }
    if ( !isMobile() )
    {        
        var stickyTop;

        //window resize handler
        $(window).bind('resize', $.debounce( 250, function(event){
            stickyTop = $('header#header').height();
            $('#speaker').width($('#hashtag').width());

            $('a.marquee > div.marqueeContainer').each(function(i, obj){
                $(obj).width($(window).width()*2);
            });
        }));
        $(window).resize();

        //window scroll handler
        var _scrollTop;
        $(window).bind('scroll', function(event){
            _scrollTop = $(window).scrollTop();
            if ( _scrollTop >= stickyTop )
            {
                $('header#header').addClass("sticky");
            }
            else {
                $('header#header').removeClass("sticky");
            }
        });

        setTimeout(initEventAnimations, 500);
    }
    else
    {
        renderMobile();
    }

    //ajax mailchimp form
    $('form#mailChimp').ajaxChimp({
        url: 'http://bloombergbusinessweekdesign.us3.list-manage.com/subscribe/post?u=f00bc2551187afbf5ff85bf4a&id=313c6fc06d',
        callback: mailChimpCallback
    });

    //orientation handler
    window.onorientationchange = function(){
        onOrientation();
    }
    
    onOrientation();
    browserHacks();
    replaceDashes();
    addBigDots();
    listHandler();
    hijackLinks();
    initCountDownTimer();
});

function renderMobile()
{
    $('header').before($('nav'));
    $('nav').append( $('.marquee').first() );
    var div = $('<div id="buy">Buy Tickets</div>');
    $('header div#featuring').after(div);
    $(div).bind('click', function(event){
      //  window.open("https://www.regonline.com/register/login.aspx?eventID=1779240", "_blank");
    });
}

function browserHacks()
{
    if ( navigator.userAgent.match(/Windows/) ) {
        $('body').addClass('msie');
    }
    if ( navigator.userAgent.match(/Firefox/) ) {
        $('body').addClass('firefox');
    }
}

function replaceDashes()
{
    $('blockquote p, #schedule dl dl dt').each(function(i, obj){
        var str = $(obj).html()
        $(obj).html(str.split('-').join('&mdash;'));
    });
}

function logoEffectListener()
{
    $('header#header div#logo').unbind();
    $('header#header div#logo').bind('mouseenter', function(event){
        event.stopPropagation();
        TweenMax.to($('header#header div#logo'), 0.25, {rotationY:360, ease:Linear.easeNone, overwrite:false, onComplete:function(){
            $('header#header div#logo').bind('mouseleave', function(event){
                event.stopPropagation();
                TweenMax.to($('header#header div#logo'), 0.25, {rotationY:0, ease:Linear.easeNone, overwrite:false, onComplete:logoEffectListener});
            });
        }});
    });

    $('header#header div#logo').unbind('click').bind('click', function(event){
        $(window).scrollTop(0);
    });
}

function sectionHeaderEffectListener()
{
    $('section h2 div.copy span').each(function(i, obj){

        var splitText = new SplitText($(obj), {type:"chars"});
        var tl;
        var _chars;

        $(obj).bind('mouseenter', function(event){

            switch ( $(obj).parent().parent().parent().parent().attr('id') ){
                case "about":
                    tl = new TimelineMax({repeat:-1, repeatDelay:0});
                    tl.staggerTo(splitText.chars, 0.1, {y:-20, ease:Linear.easeNone, repeat:1, yoyo:true}, 0.1);
                    break;
                case "speakers":
                    tl = new TimelineMax({repeat:-1, repeatDelay:0});
                    tl.staggerTo(splitText.chars, 0.1, {rotationZ:-360, ease:Linear.easeNone, repeat:0, yoyo:false}, 0.1);
                    break;
                case "schedule":
                    _chars = [];
                    _chars = shuffle(splitText.chars);
                    var half_length = Math.ceil(_chars.length / 2);
                    var split = _chars.slice(0, half_length);
                    tl = new TimelineMax({repeat:-1, repeatDelay:0});
                    tl.staggerTo(split, 0.2, {y:-20, ease:Linear.easeNone, repeat:-1, repeatDelay:1, yoyo:false}, 0);
                    break;
                case "location":
                    _chars = [];
                    _chars = shuffle(splitText.chars);
                    tl = new TimelineMax({repeat:-1, repeatDelay:0});
                    tl.staggerTo(_chars, 0.1, {marginLeft:20, marginRight:20, ease:Linear.easeNone, repeat:1, yoyo:true}, 0.1);
                    break;
            }

            // tl.restart();
        });
        $(obj).bind('mouseleave', function(event){
            _chars = [];
            tl.seek(0);
            tl.stop();
        });
    });
}

function initEventAnimations()
{
    //header logo tracking
    logoEffectListener();

    //section h2 animations
    sectionHeaderEffectListener();

    //header event info shake
    var hTween = TweenMax;
    $('header#header div#datetime h2').each(function(i, obj){
        var splitText = new SplitText($(obj), {type:"chars"});
        $(splitText.chars).each(function(ii, character){
            $(character).bind('mouseover', function(event){
                event.stopPropagation();
                function Tween(){
                    hTween = TweenMax.to(character, 0.05, {x:R(-10, 10), y:R(-10, 10), scale:R(1.2, 0.8), rotation:R(-10, 10), ease:Linear.easeNone, onComplete:Tween});
                };
                Tween();
                function R(max,min){return Math.random()*(max-min)+min};
            });
            $(character).bind('mouseleave', function(event){
                event.stopPropagation();
                hTween = TweenMax.to(splitText.chars, 0, {x:0, y:0, scale:1, rotation:0, ease:Linear.easeNone, overwrite: true});
                hTween.kill();

            });
        });

        $(obj).each(function(iii, h2){
            $(h2).bind('mouseleave', function(event){
                hTween = TweenMax.to(splitText.chars, 0, {x:0, y:0, scale:1, rotation:0, ease:Linear.easeNone, overwrite: true});
                hTween.kill();
            });
        });
    });

    $('header#header div#datetime').bind('mouseleave', function(event){
        hTween.kill();
    });

    //image shake
    $('section#speakers img').each(function(i, obj){    
        var tween;
        $(obj).bind('mouseenter', function(event){
            function Tween(){
                tween = TweenLite.to(obj, 0.05, {x:R(-5, 5), y:R(-5, 5), scale:R(1.1, 0.9), rotation:R(-5, 5), ease:Linear.easeNone, onComplete:Tween});
            };

            Tween();

            function R(max,min){return Math.random()*(max-min)+min};
        });
        $(obj).bind('mouseleave', function(event){
            tween = TweenLite.to(obj, 0.0, {x:(0, 0), y:(0, 0), scale:(1, 1), rotation:(0, 0), ease:Linear.easeNone, overwrite: true});
            tween.kill();
        });
    });

    //magnetic balls
    $('section#about dl dt div.copy').each(function(i, obj){
        var splitText = new SplitText($(obj), {type:"chars"});
        var tl = new TimelineMax({repeat:-1, repeatDelay:0});
        $(obj).bind('mouseenter', function(event){
            var _chars = shuffle(splitText.chars);
            tl.staggerTo(_chars, 0.1, {scale:1.2, force3D:true, ease:Linear.easeNone, repeat:1, yoyo:true}, 0.2);
            tl.restart();
        });
        $(obj).bind('mouseleave', function(event){
            tl.seek(0);
            tl.stop();
        });
    });

    //paragraph side shake
    $('section#about dd div.copy blockquote p').each(function(i, obj){

        var splitText = new SplitText($(obj), {type:"lines"});
        var tl = new TimelineMax({repeat:-1, repeatDelay:0});

        $(obj).bind('mouseenter', function(event){
            var _chars = shuffle(splitText.lines);
            tl.staggerTo(_chars, 0.5, {x:20, ease:Linear.easeNone, repeat:1, yoyo:true}, 0.2);
            tl.restart();
        });
        $(obj).bind('mouseleave', function(event){
            tl.seek(0);
            tl.stop();
        });
    });

    //session title skew
    $('section#schedule dl dt.session div.copy').each(function(i, obj){
        var _skew;
        if ( i % 2 == 0 )
        {
            _skew = -20;
        }
        else
        {
            _skew = 20;
        }
        $(obj).bind('mouseenter', function(event){
            TweenLite.to(obj, 0.05, {skewX:_skew, ease:Linear.easeNone});
        });
        $(obj).bind('mouseleave', function(event){
            TweenLite.to(obj, 0.05, {skewX:0, ease:Linear.easeNone});
        });
    });

    //schedule time colon blink
    $('section#schedule dl dl dt div.copy').each(function(i, obj){
        var str = $(obj).html()
        $(obj).html(str.split(':').join('<div class="colon">:</div>'));
        var tween;
        $(obj).bind('mouseenter', function(event){    
            tween = TweenMax.to($(obj).find('.colon'), 0.01, {autoAlpha:0, ease:Linear.easeNone, repeat:-1, repeatDelay:0.2, yoyo:true});
        });
        $(obj).bind('mouseleave', function(event){
            TweenMax.to($(obj).find('.colon'), 0, {autoAlpha:1, ease:Linear.easeNone});
            tween.kill();
        });        
    });

    //schedule desc blinking
    $('section#schedule dl dl dd div.copy').each(function(i, obj){
        // var splitText = new SplitText($(obj), {type:"chars"});
        // var tl = new TimelineMax({repeat:-1, repeatDelay:0});
        // $(obj).bind('mouseenter', function(event){
        //     var _chars = shuffle(splitText.chars);
        //     var rand = Math.random();
        //     tl.staggerTo(_chars, 0.1, {autoAlpha:0, ease:Linear.easeNone, repeat:1, yoyo:true}, 0.1);
        //     // tl.staggerTo(_chars, 0.1, {delay:rand, autoAlpha:0, ease:Linear.easeNone, repeat:-1}, 0.1);
        //     tl.restart();
        // });
        // $(obj).bind('mouseleave', function(event){
        //     tl.seek(0);
        //     tl.stop();
        // });
    });

    //hyperlink blinking
    $('a').each(function(i, obj){
        var str = $(obj).html();
        if ( str.indexOf('img') > -1 || str.indexOf('iframe') > -1 || $(obj).hasClass('marquee')) {
            return;
        }
        var splitText = new SplitText($(obj), {type:"chars"});
        var tl = new TimelineMax({repeat:-1, repeatDelay:0});
        $(obj).bind('mouseenter', function(event){
            var _chars = shuffle(splitText.chars);
            tl.staggerTo(_chars, 0.1, {autoAlpha:0, ease:Linear.easeNone, repeat:1, yoyo:true}, 0.1);
            tl.restart();
        });
        $(obj).bind('mouseleave', function(event){
            tl.seek(0);
            tl.stop();
        });
    });    
}

function initStaticAnimations()
{
    if ( isMobile() )
    {
        //marquees
        $('.marquee').each(function(i, obj){
            $(obj).bind('click', function(event){
              //  window.open("https://www.regonline.com/register/login.aspx?eventID=1779240", "_blank");
            });
            $(obj).css({
                'opacity':1
            });
        });
    }
    else
    {
        //marquees
        $('.marquee').each(function(i, obj){
            var speed = Math.floor(Math.random()*20000+10000);
            var dir;
            var right = (Math.floor(Math.random()*10)) % 2 == 0;

            if (right) 
            {
                dir = 'right';
                // $(obj).css({
                //     'left': $(window).width()
                // });
            }
            else
            {
                dir = 'left';
                // $(obj).css({
                //     'left': -$(window).width()*2
                // });
            }

            $(obj).marquee({
                duration: speed,
                gap: 0,
                delayBeforeStart: 0,
                direction: dir,
                duplicated: true
            });

            $(obj).bind('click', function(event){
            //    window.open("https://www.regonline.com/register/login.aspx?eventID=1779240", "_blank");
            });

            $(obj).css({
                'opacity':1
            });
        });

        //hashtag
        var hashtagSplitText = new SplitText($('#hashtag'), {type:"chars"});
        var tl;
        tl = new TimelineMax({repeat:-1, repeatDelay:0});
        tl.staggerTo(hashtagSplitText.chars, 0.1, {y:-20, ease:Linear.easeNone, repeat:1, yoyo:true}, 0.1);

        //featuring
        var speakersArray = [];
        $('.speaker').each(function(i, obj){
            speakersArray.push($(obj).find('dt div.copy').html());
        });

        setInterval(function(){
            var speaker = speakersArray[Math.floor(Math.random()*speakersArray.length)];
            $('#speaker span').html(speaker);
            // $('#speaker').bigtext();
        }, 1000);
    }
}

function addBigDots()
{
    $('section h2').each(function(i, obj){
        var bigDot = $('<div class="bigDot">&bull;</div>');
        $(obj).wrapInner('<span>');
        $(obj).wrapInner('<div class="copy">');
        $(obj).prepend(bigDot);
    })

    $('section#about dt, section#about dd').each(function(i, obj){
        var bigDot = $('<div class="bigDot">&bull;</div>');
        $(obj).wrapInner('<div class="copy">');
        $(obj).prepend(bigDot);
    });

    $('section#speakers dt, section#speakers dd').each(function(i, obj){
        var bigDot = $('<div class="bigDot">&bull;</div>');
        $(obj).wrapInner('<div class="copy">');
        $(obj).prepend(bigDot);
    });

    $('section#schedule dt, section#schedule dd').each(function(i, obj){
        var bigDot = $('<div class="bigDot">&bull;</div>');
        $(obj).wrapInner('<div class="copy">');
        $(obj).prepend(bigDot);
    });

    $('section#location dt').each(function(i, obj){
        var bigDot = $('<div class="bigDot">&bull;</div>');
        $(obj).wrapInner('<div class="copy">');
        $(obj).prepend(bigDot);
    });

    $('nav li').each(function(i, obj){
        var bigDot = $('<div class="bigDot"></div>');
        $(obj).prepend(bigDot);

        $(obj).bind('mouseenter', function(event){
            bigDot.addClass('hover');
        });

        $(obj).bind('mouseleave', function(event){
            bigDot.removeClass('hover');
        });

        $(bigDot).bind('click', function(event){
            $(obj).find('a').trigger('click');
        });
    });
}

function listHandler() {

    $('h2').each(function(i, h2){
        $(h2).unbind().bind('click', function(event){

            $(h2).parent().parent().toggleClass('active');

            setTimeout(function(){
                if ( $(h2).parent().parent().hasClass('active') )
                {
                    highlightSectionNav($(h2).parent().parent().attr('id'));
                }
            }, 500);

            $(h2).parent().children('dl').each(function(ii, dl){
                if ( !$(dl).hasClass('active') )
                {
                    $(dl).addClass('active');
                    $(dl).css({
                        'margin': '2vw 0px 2vw 8vw',
                        'height': 'auto',
                        'display': 'block'
                    });
                }
                else
                {
                    $(dl).removeClass('active');
                    $(dl).css({
                        'margin': '0',
                        'height': '0',
                        'display': 'none'
                    });
                }
            });
        });
    });

    $('dt').each(function(i, dt){
        $(dt).unbind().bind('click', function(event){
            $(dt).parent().children('dd').each(function(ii, dd){
                if ( !$(dd).hasClass('active') )
                {
                    $(dd).addClass('active');
                    $(dd).css({
                        'margin': '2vw 0 2vw 16vw',
                        'height': 'auto',
                        'display': 'block'
                    });
                }
                else
                {
                    $(dd).removeClass('active');
                    $(dd).css({
                        'margin': '0',
                        'height': '0',
                        'display': 'none'
                    });
                }
            });
            $(dt).parent().children('dl').each(function(ii, dl){
                if ( !$(dl).hasClass('active') )
                {
                    $(dl).addClass('active');
                    $(dl).css({
                        'margin': '2vw 0px 2vw 8vw',
                        'height': 'auto',
                        'display': 'block'
                    });
                }
                else
                {
                    $(dl).removeClass('active');
                    $(dl).css({
                        'margin': '0',
                        'height': '0',
                        'display': 'none'
                    });
                }
            });
        });
    });
}

function mailChimpCallback(response) {

    //reset form
    $('form input#mce-FNAME').val("");
    $('form input#mce-EMAIL').val("");

    if ( isMobile() ) {
        return;
    }

    //animate explosion
    var splitText = new SplitText($('section#form > article > p'), {type:"chars"});
    $(splitText.chars).each(function(i, character){
        var time = R(0.5, 2);
        TweenMax.to(character, time, {x:R(10, 500), y:R(10, 100), rotation:R(-100, 100), ease: Elastic.easeOut.config(1, 0.5)});
        function R(max,min){return Math.random()*(max-min)+min};
    });

    //clear explosion
    $('form input#mce-FNAME').bind('focus', function(event){
        $(splitText.chars).each(function(i, character){
            var time = R(0.2, 0.5);
            TweenMax.to(character, time, {x:0, y:0, rotation:0});
            function R(max,min){return Math.random()*(max-min)+min};
            $('form label').html("");
        });
    });
}

function hijackLinks() {
    if ( isiPad() || isMobile() ){
        FastClick.attach(document.body);
        var ua = navigator.userAgent, event = (ua.match(/iPad/i)) ? "touchstart" : "click";
    }

    $('nav a').each(function(i, obj){
        $(this).bind('click', function(event){
            event.preventDefault();
        });

        var _target = $(this).attr('href').split("/")[1];

        $(this).parent().bind('click', function(event){
            if ( $(this).attr('id') == "tickets" )
            {
                //window.open("https://www.regonline.com/register/login.aspx?eventID=1779240", "_blank");
            }
            else 
            {
                goToSection(_target);    
            }
        });
    });
}

function goToSection(handle, mobile) {
    var stickyTop;
    if ( isMobile() )
    {
        stickyTop = $('body').height();
    }
    else {
        stickyTop = $('header#header').height();
    }

    if ( $(window).scrollTop() < stickyTop )
    {
        $(window).scrollTop(stickyTop);
    }

    $('section').each(function(i,section){
        //close sections
        if ( $(section).hasClass('active') )
        {
            $(section).find('h2').trigger('click');
            if ($(section).attr('id') == 'schedule') {
                $(section).find('dt').trigger('click');
            }
        }
        //open section
        if ( $(section).attr('id') == handle ) {
            $(section).find('h2').trigger('click');
            if ($(section).attr('id') == 'schedule') {
                $(section).find('dt').trigger('click');
            }
            if ( !isMobile() )
            {
                setTimeout(function(){
                    var _t = $(section).offset().top - $('header#header').height();
                    $(window).scrollTop(_t);    
                }, 100);
            }
        }            
    });

    highlightSectionNav(handle);
}

function highlightSectionNav(id)
{
    // console.log(id);
    $('nav div.bigDot').each(function(i,obj){
        $(obj).removeClass('active');
        if ($(obj).parent().attr('id') == id)
        {
            $(obj).addClass('active');
        }
    });
}

//mobile check
function isMobile() {
    if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
        return true;
    } else {
        return false;
    }
}

function isiPad() {
    return (
        (navigator.platform.indexOf("iPad") != -1)
    );
}

function onOrientation() {
    if( isiPad() ){
        var orientation = window.orientation;               
        if (orientation == 0 || orientation == 180){
            $('body').addClass('portrait');
            $('body').removeClass('landscape');
        } else if(orientation == 90 || orientation == -90){
            $('body').addClass('landscape');
            $('body').removeClass('portrait');
        }
    }
}

function initCountDownTimer()
{
    countDownTimer();
    setInterval(countDownTimer, 1000);
}

function countDownTimer() {
    var end = new Date('04/11/2016 9:00 AM');

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    var now = new Date();
    var distance = end - now;
    if (distance < 0) {

        clearInterval(timer);
        document.getElementById('countdown').innerHTML = 'EXPIRED!';

        return;
    }

    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);
    var months = Math.floor(days/30);
    var _days = days - (months*30);

    $('#countdown #months .val').html(months);
    $('#countdown #days .val').html(_days);
    $('#countdown #hours .val').html(hours);
    $('#countdown #minutes .val').html(minutes);
    $('#countdown #seconds .val').html(seconds);
}

function shuffle(array) {
    var currentIndex = array.length
    var temporaryValue;
    var randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//sortBy
(function(){
    if (typeof Object.defineProperty === 'function'){
        try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
    }
    if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

    function sb(f){
        for (var i=this.length;i;){
            var o = this[--i];
            this[i] = [].concat(f.call(o,o,i),o);
        }
        this.sort(function(a,b){
            for (var i=0,len=a.length;i<len;++i){
                if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
            }
            return 0;
        });
        for (var i=this.length;i;){
            this[--i]=this[i][this[i].length-1];
        }
        return this;
    }
})();