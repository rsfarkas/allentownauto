/* ---------------------------------------------- /*
     * E-mail validation
    /* ---------------------------------------------- */

    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
    };



/* ---------------------------------------------- /*
     * Contact form ajax
    /* ---------------------------------------------- */

    $('#contactForm').submit(function(e) {

      e.preventDefault();

      var c_name = $('#name').val();
      var c_email = $('#email').val();
      var c_message = $('#message ').val();
      var c_number = $('#number ').val();
      var c_company = $('#company ').val();
      var responseMessage = $('#contactForm .ajax-response');

      if (( c_name== '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email) )) {
        responseMessage.fadeIn(500);
        responseMessage.html('<i class="fa fa-warning"></i> Please fix the errors and try again.');
      }

      else {
        $.ajax({
          type: 'POST',
          url: '//formspree.io/info@allentownae.com',
          dataType: 'json',
          data: {
            c_email: c_email,
            c_name: c_name,
            c_message: c_message,
            c_number: c_number,
            c_company: c_company
          },
          beforeSend: function(result) {
            $('#contactForm button').empty();
            $('#contactForm button').append('<i class="fa fa-cog fa-spin"></i> Wait...');
          },
          success: function(result) {
            if(result.success == "email sent") {
              $('#contactForm .ajax-hidden').fadeOut(500);
              responseMessage.html(result.message).fadeIn(500);
            } else {
              $('#contactForm button').empty();
              $('#contactForm button').append('<i class="fa fa-retweet"></i> Try again.');
              responseMessage.html(result.message).fadeIn(1000);
            }
          }
        });
      }

      return false;

    });
