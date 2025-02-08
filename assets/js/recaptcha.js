function onSubmit(token) {
    const prod = true;
    const url = prod ? 'https://portfolio-backend-seven-bice.vercel.app/' : 'http://localhost:4000';
    let form = document.getElementById('contact-form');
    var $inputs = $('#contact-form :input');
    let fail = false;
    let failedInputs = [];

    $('#email-success').hide();
    $('#email-fail').hide();
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
        $('.lds-default').show();
        $('.actions').hide();
        
        $.ajax({
            url: `${url}/api/email/send`,
            type: 'POST',
            data: $('#contact-form').serialize(),
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            success: (data) => {
                if (data.success) {
                    $('#email-success').show();
                    form.reset();
                } else {
                    $('#email-fail').show();
                }
            },
            error: () => {
                $('#email-fail').show();
            },
            complete: () => {
                $('.lds-default').hide();
                $('.actions').show();
            }
        });
    }
}