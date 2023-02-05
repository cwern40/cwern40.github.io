function onSubmit(token) {
    $.ajax({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        data: {
            secret: "6Ldee1MkAAAAAHUGBlDuH7Gm4R04Y_nQumkXsi1S",
            response: token
        }
    }).done((data) => {
        console.log('data',data)
        if (data.score > .4) {
            $.post('https://formspree.io/maypjoee', $('#contact-form').serialize());
        } 
    }).fail((error) => {
        console.error(error);
    })
}