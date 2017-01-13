//HM-Popup v 2.5
//By: Harold E. Muñoz
var HMPOPUP = {
    delay: false,
    delay_option:false,
    initialized: false,
    yes: undefined,
    no: undefined,
    font: undefined,
    url: undefined,
    img: undefined,
    preload: undefined,
    current_container: undefined,
    message_error_1: 'Error: 0x001: HMPOPUP debe ser inicializada'
};

$(function(){
    $('head').append('<link rel="stylesheet" href="assets/css/hm-popup.css" type="text/css" />');
});

function initializePP(location,animate,font){
    HMPOPUP['img'] = location;
    HMPOPUP['preload'] = animate;
    HMPOPUP['font'] = font;
    HMPOPUP['initialized'] = true;
    
    preload(location,HMPOPUP['preload']+".gif");
}

//Simple Popup [spp_]
function openSPP(message){
    if(HMPOPUP['initialized']){
        if(!HMPOPUP['delay']){
            HMPOPUP['delay'] = true;
            var width = $(window).width();
            var height = $(window).height();
            
            //HTML Struct
            var html='';
            html = html+'<div class="pp_below">';
                html = html+'<button id="spp_close" class="pp_button">Cerrar</button>';
            html = html+'</div>';
            $('body').append(setStruct(html,message));

            HMPOPUP['current_container'] = '#spp_container'; 
            activatePP();
        }
    }else{
        console.log(HMPOPUP['message_error_1']);
    }
}

//Ok Popup [opp_]
function openOPP(message,redirect_url){
    if(HMPOPUP['initialized']){
        if(!HMPOPUP['delay']){
            HMPOPUP['url'] = redirect_url;
            HMPOPUP['delay'] = true;
            var width = $(window).width();
            var height = $(window).height();

            //HTML Struct
            var html='';
            html = html+'<div class="pp_below">';
                html = html+'<button id="opp_ok" class="pp_button">Continuar</button>';
            html = html+'</div>';
            $('body').append(setStruct(html,message));

            HMPOPUP['current_container'] = '#opp_container';
            activatePP();
            
            $('body').on('click',"#opp_ok",function(event){
                window.location.href = HMPOPUP['url'];
            });
        }
    }else{
        console.log(HMPOPUP['message_error_1']);
    }
}

//Option Popup [oop_]
function openOOP(message, yesCall, noCall){
    
    if(yesCall == undefined)
        yesCall = function(){
            closePP();
        }
    if(noCall == undefined)
        noCall = function(){
            closePP();
        }
        
    if(HMPOPUP['initialized']){
        if(!HMPOPUP['delay']){
            HMPOPUP['yes'] = yesCall;
            HMPOPUP['no_call'] = noCall;
            HMPOPUP['delay'] = true;
            HMPOPUP['delay_option'] = false;
            var width = $(window).width();
            var height = $(window).height();

            //HTML Struct
            var html='';
            html = html+'<div class="pp_below">';
                html = html+'<input type="submit" class="pp_button pp_dobleb" id="oop_si"value="SI"/>';
                html = html+'<input type="submit" class="pp_button pp_dobleb" id="oop_no" value="NO"/>';
            html = html+'</div>';
            $('body').append(setStruct(html,message));

            HMPOPUP['current_container'] = '#oop_container';
            activatePP();
            //Say No
            $('body').on('click',"#oop_no",function(event){
                if(!HMPOPUP['delay_option']){
                    HMPOPUP['delay_option'] = true;
                    HMPOPUP['no_call']();
                }
            });
            //Say Yes
            $('body').on('click',"#oop_si",function(event){
                if(!HMPOPUP['delay_option']){
                    HMPOPUP['delay_option'] = true;
                    HMPOPUP['yes']();
                }
            });
        }
    }else{

        console.log('Please initialize the "Popup", use the function "$.initializePP"');
    }
}

//Wait Popup [wpp_]
function openWPP(message){
    if(HMPOPUP['initialized']){
        if(!HMPOPUP['delay']){
            HMPOPUP['delay'] = true;
            var width = $(window).width();
            var height = $(window).height();

            //HTML Struct
            var html='';
            html = html+'<div class="pp_below">';
                html = html+'<img id="wpp_img" src="'+HMPOPUP['img']+HMPOPUP['preload']+'.gif"/>';
            html = html+'</div>';
            $('body').append(setStruct(html,message));
            
            HMPOPUP['current_container'] = '#wpp_container';
            activatePP();
        }
    }else{
        console.log(HMPOPUP['message_error_1']);
    }
}

//Simple Popup When is Open [wspp_]
function openWSPP(message){
    if(HMPOPUP['initialized']){
        $(".pp_container").remove();
        var width = $(window).width();
        var height = $(window).height();

        //HTML Struct
        var html='';
        html = html+'<div id="wspp_container" class="pp_container">';
            html = html+'<div class="pp_above">';
                html = html+'<span>'+message+'</span>';
            html = html+'</div>';
            html = html+'<div class="pp_below">';
                html = html+'<button id="spp_close" class="pp_button">Cerrar</button>';
            html = html+'</div>';
        html = html+'</div>';
        $('.pp_background').append(html);
        
        HMPOPUP['current_container'] = '#wspp_container';
        activatePP();
    }else{
        console.log(HMPOPUP['message_error_1']);
    }
}

//Wait Popup When is Open [wopp_]
function openWOPP(message){
    if(HMPOPUP['initialized']){
        $(".pp_container").remove();
        var width = $(window).width();
        var height = $(window).height();

        //HTML Struct
        var html='';
        html = html+'<div id="wopp_container" class="pp_container">';
            html = html+'<div class="pp_above">';
                html = html+'<span>'+message+'</span>';
            html = html+'</div>';
            html = html+'<div class="pp_below">';
                html = html+'<img id="wpp_img" src="'+HMPOPUP['img']+HMPOPUP['preload']+'.gif"/>';
            html = html+'</div>';
        html = html+'</div>';
        $('.pp_background').append(html);

        HMPOPUP['current_container'] = '#wopp_container';
        activatePP();
    }else{
        console.log(HMPOPUP['message_error_1']);
    }
}

//iFrame Popup [ipp_]
function openIPP(source){
    if(HMPOPUP['initialized']){
        if(!HMPOPUP['delay']){
            HMPOPUP['delay'] = true;
            var width = $(window).width();
            var height = $(window).height();

            //HTML
            var html='';
            html = html+'<div class="pp_background">';
                html = html+'<div id="ipp_container" class="pp_container">';
                    html = html+'<div class="ipp_iframe">';
                        html = html+'<iframe src="'+source+'" frameborder="0" allowfullscreen></iframe>';
                        html = html+'<button id="spp_close" class="close_b"><img src="'+HMPOPUP['img']+'close.png"></button>';
                    html = html+'</div>';
                html = html+'</div>';
            html = html+'</div>';
            $('body').append(html);

            HMPOPUP['current_container'] = '#ipp_container';
            $('#pp_background').css('visibility','visible').hide().fadeIn("fast",function(){
                $('.pp_container').css('visibility','visible').hide().fadeIn("fast");
            });
        }
    }else{
        console.log(HMPOPUP['message_error_1']);
    }
}

//Youtube Popup [ytpp_]
function openYTPP(source){
    if(HMPOPUP['initialized']){
        if(!HMPOPUP['delay']){
            HMPOPUP['delay'] = true;
            var width = $(window).width();
            var height = $(window).height();

            //HTML
            var html='';
            html = html+'<div class="pp_background">';
                html = html+'<div id="ipp_container" class="pp_container">';
                    html = html+'<div class="ipp_iframe">';
                        html = html+'<iframe src="https://www.youtube.com/embed/'+source+'" frameborder="0" allowfullscreen></iframe>';
                        html = html+'<button id="spp_close" class="close_b"><img src="'+HMPOPUP['img']+'close.png"/></button>';
                    html = html+'</div>';
                html = html+'</div>';
            html = html+'</div>';
            $('body').append(html);

            HMPOPUP['current_container'] = '#ipp_container';
            $('#pp_background').css('visibility','visible').hide().fadeIn("fast",function(){
                $('.pp_container').css('visibility','visible').hide().fadeIn("fast");
            });
        }
    }else{
        console.log(HMPOPUP['message_error_1']);
    }
}

//General Functions
$('body').on('click',"#spp_close",function(event){
	closePP();
});
function activatePP(){
    $('#pp_background').css('visibility','visible').hide().fadeIn("fast",function(){
        $('.pp_container').css('visibility','visible').hide().fadeIn("fast");
    });
}
function closePP(functions){
    $('.pp_container').fadeOut("fast");
    $('.pp_background').fadeOut("slow",function(){
        var timeoutID = setTimeout(function(){
            $('.pp_container').remove();
            $('.pp_background').remove();
            HMPOPUP['delay'] = false;
        }, 500);
    });
    HMPOPUP['yes'] = null;
    HMPOPUP['no_call'] = null;
}
function preload(location_image,name_image) {
    var img = new Image();
    img.src = location_image+name_image;
}
function setStruct(append,message){
    var html = '';
    html = html+'<div class="pp_background">';
        html = html+'<div class="pp_container">';
            html = html+'<div class="pp_above">';
                html = html+'<span>'+message+'</span>';
            html = html+'</div>';
            html = html+append;
        html = html+'</div>';
    html = html+'</div>';
    return html;
}