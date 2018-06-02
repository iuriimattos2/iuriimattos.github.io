(function($) {

    var access_token = '';
    var message = '';

    function initFacebookGraph() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '380087835831757',
                xfbml      : true,
                version    : 'v3.0'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    function promptAuth() {
        $('#welcomeADM').click(function() {
            var password = prompt('Insira sua senha administrador(a) :');
            if(password === '') {
                alert('Bem vindo(a)');
                $('#myModal').modal('show');

                FB.login(function(response)
                {
                    if (response.authResponse)
                    {
                        access_token = response.authResponse.accessToken;
                    }
                });

            }
            else {
                $('#myModal').modal('hide');
                alert('Senha inválida');
                return;
            }

        });
    }

    function postar() {
        $('#postMessage').click(function() {

            message = $('#c_message').val();

            if (message === '') return;
            if (access_token === '') return;

            FB.api('/1899663293390603/feed', 'post', {message: message, access_token: access_token},function (response){
                if (!response || response.error) {
                    alert('ocorreu um erro!');
                } else {
                    alert('sucesso!');
                }
            });
        });
    }

    initFacebookGraph();
    promptAuth();
    postar();

})(jQuery);
