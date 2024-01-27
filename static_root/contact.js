function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrfToken = getCookie('csrftoken');



document.getElementById('send-msg-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(this);
    const show_msg = document.getElementById("contact-form-container-msg")


    $.ajax({
        type: 'POST',
        url: '/send-message-form/',  // Replace with your actual URL
        data: JSON.stringify(Object.fromEntries(formData)),
        contentType: 'application/json; charset=utf-8',
        headers: {
            'X-CSRFToken': csrfToken
        },
        success: function (response) {
            document.getElementById('send-msg-form').reset()

            console.log("res", response)
            if (response.data == "Email and Message can not be empty.") {

                show_msg.innerHTML = `<div class="alert alert-danger" role="alert">
                ${response.data}
              </div>`

            }

            else if (response.data == "Email is not valid.") {


                show_msg.innerHTML = `<div class="alert alert-warning" role="alert">
                ${response.data}

              </div>`

            }

            else if (response.data == "Form has been submitted.") {
                // document.getElementById('send-msg-form').reset()

                show_msg.innerHTML = `<div class="alert alert-primary" role="alert">
                ${response.data}

              </div>`

            }
        },
        error: function (error) {
            console.error('Error:', error);
            // Handle error
        }
    });

});


