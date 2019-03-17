(function ($) {

    // https://developers.facebook.com/apps/380087835831757/review-status/
    // Acessar o endereço web https://iurimatos.com.br/cartas-do-altissimo clicar em Administrador (mobile: botao menu depois Administrador) preencher o confirm com vazio (string vazia) logar no facebook, Preencher o campo "Mensagem" e clicar em Enviar

    var pageId;
    var access_token;
    var message;

    function initFacebookGraph() {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '380087835831757',
                xfbml: true,
                version: 'v3.0'
            });
            FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    document.onreadystatechange = function () {
        var documentReadyState = document.readyState;
        if (documentReadyState === "interactive") {
            if (location.protocol !== 'https:') {
                location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
            }
        } else if(documentReadyState === "complete") {
            FB.api('/my userid or pageid/feed?access_token=the acces token that I get from the Graph API Explorer', {limit:5} , function(response){
                if (response && response.data && response.data.length){
                    alert(response.message);
                    var ul = document.getElementById('feed');
                    for (var j=0; j<response.data.length; j++){
                        var feed = response.data[j],
                            li = document.createElement('li'),
                            a = document.createElement('a');
                        a.innerHTML = feed.message;
                        a.href = feed.link;
                        li.appendChild(a);
                        ul.appendChild(li);
                    }
                }
            });
        }
    }

    function facebookAuth() {
        FB.login(function (response) {
            if (response.authResponse) {
                access_token = response.authResponse.accessToken;
                FB.api(
                    "/debug_token?input_token=" + access_token,
                    function (response) {
                        if (response && !response.error) {
                            if (response.data.is_valid) {

                                FB.api(response.data.user_id + '/accounts', function (response) {
                                    if (response) {

                                        response.data.forEach(function (page) {

                                            if (page.name === 'Cartas Do Altissimo') {

                                                access_token = page.access_token;
                                                pageId = page.id;

                                            }

                                        });


                                    }
                                });
                            }
                        }
                    }
                );
            }
        });
    }

    function post() {

        $('#postMessage').click(function () {
            message = $('#c_message').val();


            FB.api(
                '/' + pageId + '/feed',
                'POST', {
                    "message": message,
                    "access_token": access_token
                },
                function (response) {

                }
            );

        });
    }

})(jQuery);