(function($) {

    function initFacebookGraph() {
        // window.fbAsyncInit = function() {
        //     FB.init({
        //         appId            : '1899663293390603',
        //         autoLogAppEvents : true,
        //         xfbml            : true,
        //         version          : 'v3.0'
        //     });
        // };
        //
        // (function(d, s, id){
        //     var js, fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) {return;}
        //     js = d.createElement(s); js.id = id;
        //     js.src = "https://connect.facebook.net/en_US/sdk.js";
        //     fjs.parentNode.insertBefore(js, fjs);
        // }(document, 'script', 'facebook-jssdk'));
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
        $('#postMessage').click(function() {

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

            if (message === '') return;

            var access_token = 'EAACEdEose0cBABGmfPS1eIjbG3IGYJjKk4rbNSU5CDYjugJIEl0yU16uL4pWFjoByiKpqhbxUK2uETae6q0fZBcY0ZB3WlkZCNoOGbFPNZAr4tfEH19ACctHFsj7ixQc7WR5k912HaRQXsdAevpuiZA49yUK3rNGZA0C931e4sYfSyRKQtOXWPCHhvfHs4sgljNbKym4H9RAZDZD';

            FB.api('/1899663293390603/feed', 'post', {message: message, access_token: access_token},function (response){
                if (!response || response.error) {
                    alert('Error occured');
                } else {
                    alert('Post ID: ' + response.id);
                }
            });
        });
    }

    initFacebookGraph();
    promptAuth();
    postar();

})(jQuery);
