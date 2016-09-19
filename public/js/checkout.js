Stripe.setPublishableKey('pk_test_Ao0Gicilnkte3Niy36Mldb5r');

 var $form = $('#payment-form');

$form.submit( function (event){

    $form.find('button').prop('disabled', true);

    Stripe.card.createToken({

        name : $('#cName').val(),
        number  :$('#cNumber').val(),
        exp_month : $('#exp_month').val(),
        exp_year : $('#exp_year').val(),
        cvc : $('#cvc').val()
    },stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {

    if (response.error) {
        $('.payment-errors').text(response.error.message);
        $form.find('.submit').prop('disabled', false);

    } else {
        var token = response.id;
        $form.append($('<input type="hidden" name="stripeToken">').val(token));
        $form.get(0).submit();
    }
};