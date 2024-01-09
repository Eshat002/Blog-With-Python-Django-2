const footer_input = document.querySelector('.footer-input-email')

const subscribe_response_text = document.querySelector('.response-text-subscribe')



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
const csrftoken = getCookie('csrftoken');



$(document).ready(function () {
    $('.footer-subscribe-btn').click(function () {
        var footer_email = footer_input.value

        $.ajax({
            type: 'POST',
            url: '/subscribe/',
            data: {
                "email": footer_email,
                "csrfmiddlewaretoken": csrftoken,

            },
            success: function (response) {
                console.log("res", response.data)
                footer_input.value = ''

                if (response.data == "Email cannot be empty.") {
                    subscribe_response_text.innerHTML = `<p class="response-para-subscribe-warning">${response.data}</p>`
                }

                else if (response.data == "Email is not valid.") {
                    subscribe_response_text.innerHTML = `<p class="response-para-subscribe-warning">${response.data}</p>`
                }

                else if (response.data == "You already subscribed.") {
                    subscribe_response_text.innerHTML = `<p class="response-para-subscribe-warning">${response.data}</p>`
                }

                else if (response.data == "You are subscribed.") {
                    subscribe_response_text.innerHTML = `<p class="response-para-subscribe">${response.data}</p>`
                }

                else {
                    console.log("something bad happened.")
                }
                // subscribe_response_text.innerHTML = `<p class="response-para-subscribe">hell</p>`

            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});


document.getElementById('currentYearFooter').textContent = new Date().getFullYear();
