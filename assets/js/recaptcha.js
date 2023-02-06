function onSubmit(token) {
    $('#email-success').hide();
    $('#email-fail').hide();
    let form = document.getElementById('contact-form');
    var $inputs = $('#contact-form :input');
    let fail = false;
    let failedInputs = [];
    $inputs.each(function() {
        if (($(this).attr('name') == 'name' || $(this).attr('name') == 'email' || $(this).attr('name') == 'message') && $(this).val() == '') {
            fail = true;
            failedInputs.push($(this).attr('name'));
        }
    })

    if (fail) {
        let failMessage = `Please fill out all required fields. One or more sections are blank: ${failedInputs.join(', ')}`;
        alert(failMessage);
    } else {
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
            if (data.score > .5) {
                $.post('https://formspree.io/maypjoee', $('#contact-form').serialize())
                .done(() => {
                    $('#email-success').show();
                    form.reset();
                }).fail(() => {
                    $('#email-fail').show();
                    form.reset();
                });
            }
        }).fail((error) => {
            console.error(error);
            $('#email-fail').show();
            form.reset();
        })
    }
}