function onSubmit(token) {
    const prod = true;
    const url = prod ? 'https://cwern-portfolio-backend.cyclic.app' : 'http://localhost:4000';
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
        let failMessage = `Please fill out all required fields. The follow section(s) are blank: ${failedInputs.join(', ')}`;
        alert(failMessage);
    } else {
        $.post(`${url}/api/recaptcha/verify`, { token: token }).done((data) => {
            if (data.success && !data.bot) {
                $.post(`${url}/api/email/send`, $('#contact-form').serialize())
                .done((data) => {
                    if (data.success) {
                        $('#email-success').show();
                        form.reset();
                    } else {
                        $('#email-fail').show();
                    }
                }).fail(() => {
                    $('#email-fail').show();
                });
            } else {
                $('#email-fail').show();
            }
        }).fail((error) => {
            console.error(error);
            $('#email-fail').show();
            form.reset();
        })
    }
}