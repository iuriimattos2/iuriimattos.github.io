(function ($) {

    // https://developers.facebook.com/apps/380087835831757/review-status/
    // Acessar o endereço web https://iurimatos.com.br/cartas-do-altissimo clicar em Administrador (mobile: botao menu depois Administrador) preencher o confirm com vazio (string vazia) logar no facebook, Preencher o campo "Mensagem" e clicar em Enviar

    var pageId;
    var access_token;
    var message;
    var logged = false;

    function initFacebookGraph() {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '380087835831757',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.3'
            });
            FB.AppEvents.logPageView();
        };

        //https://connect.facebook.net/pt_BR/sdk.js

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/pt_BR/sdk/debug.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    function getLoginStatusCallback(response) {
        if (response.status === "unknown") return;
        else if (response.status === "connected") {
            if ($('#myModal').css('display') == 'none') {
                $('#welcomeADM').remove();                
                facebookAuth();
            }
        } else {
            if ($('#myModal').css('display') == 'block') {
                alert('Erro! contate iuri valença matos')
                debugger;
                $('#myModal').modal('hide');
            }
        }
    }

    function documentStatusChange() {
        document.onreadystatechange = function () {
            var documentReadyState = document.readyState;
            if (documentReadyState === "interactive") {
                if (location.protocol !== 'https:') {
                    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
                }
            } else if (documentReadyState === "complete") {
                setInterval(function () {
                    FB.getLoginStatus(function (response) {
                        getLoginStatusCallback(response);
                    });
                }, 250);
                // FB.api('/my userid or pageid/feed?access_token=the acces token that I get from the Graph API Explorer', {limit:5} , function(response){
                //     if (response && response.data && response.data.length){
                //         alert(response.message);
                //         var ul = document.getElementById('feed');
                //         for (var j=0; j<response.data.length; j++){
                //             var feed = response.data[j],
                //                 li = document.createElement('li'),
                //                 a = document.createElement('a');
                //             a.innerHTML = feed.message;
                //             a.href = feed.link;
                //             li.appendChild(a);
                //             ul.appendChild(li);
                //         }
                //     }
                // });
            }
        }
    }

    function facebookAuth() {
        FB.login(function (response) {
            if (response.authResponse) {
                access_token = response.authResponse.accessToken;
                FB.api(
                    "/debug_token?input_token=" + access_token,
                    function (response) {
                        if (response.data.is_valid) {

                            FB.api(response.data.user_id + '/accounts', function (response) {
                                if (response) {

                                    response.data.forEach(function (page) {

                                        if (page.name === 'Cartas Do Altissimo') {

                                            access_token = page.access_token;
                                            pageId = page.id;
                                            logged = true;
                                            $('#myModal').modal();
                                        }

                                    });


                                }
                            });
                        }
                    }
                );
            }
        });
    }

    function postButtonEventListener() {        

        $('#postMessage').click(function (e) {            
            e.preventDefault();                        
            
            if (logged === false) {
                alert("estamos conectando com o facebook, tente novavamente");
            } else {
                message = $('#c_message').val();
                FB.api(
                    '/' + pageId + '/feed',
                    'POST', {
                        "message": message,
                        "access_token": access_token
                    },
                    function (response) {
                        debugger;
                    });
            }


        });

    }

    documentStatusChange();
    initFacebookGraph();
    postButtonEventListener();

})(jQuery);