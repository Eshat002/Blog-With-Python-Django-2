const profileUrl = window.location.href + "data/";

console.log("profile_url", profileUrl)

function get_profile_data() {
    $.ajax({
        type: "GET",
        url: profileUrl,

        success: function (response) {


            console.log('profile_data', response)

        },
        error: function (error) {
            console.log(error);
        },
    })
}


get_profile_data()