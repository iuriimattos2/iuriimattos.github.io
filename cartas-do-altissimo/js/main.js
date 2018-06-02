(function($) {

    function initFacebookGraph() {
        window.fbAsyncInit = function() {
            FB.init({
                appId            : '1899663293390603',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.0'
            });
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
            if(password === 'Cristo') {
                alert('Bem vindo(a)');
                $('#myModal').modal('show')
            }
            else {
                $('#myModal').modal('hide')
                alert('Senha inválida');
            }

        });
    }

    function postar() {
        $('#postMensage').click(function() {

            // FB.login(function(response) {
            //     if (response.authResponse) {
            //         console.log('Welcome!  Fetching your information.... ');
            //         FB.api('/me', function(response) {
            //             console.log('Good to see you, ' + response.name + '.');
            //         });
            //     } else {
            //         console.log('User cancelled login or did not fully authorize.');
            //     }
            // });

            var message = $('#c_message').val();
            var picture = 'http://l.yimg.com/f/i/tw/ks/show/120604_mntl01.jpg';
            var link = 'https://www.youtube.com/watch?v=BIl8Px1ds3c';
            var name = 'great';
            var description = 'des';


            FB.api('/380087835831757/feed', 'post', {message: message, picture: picture, name: name, description: description },function (response){
                if (!response || response.error) {
                    alert('Error occured');
                } else {
                    alert('Post ID: ' + response.id);
                }
            });

            debugger;
            var a = 1;
            a = 2;
        });
    }

    initFacebookGraph();
    promptAuth();
    postar();

})(jQuery);
