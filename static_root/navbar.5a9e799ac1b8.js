const custom_navbar_dropdown = document.getElementById("custom-navbar-dropdown")


function get_all_categories() {

    $(document).ready(function () {
        $.ajax({
            url: '/get-all-categories/',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                for (const category of response.categories) {

                    custom_navbar_dropdown.innerHTML += `<li style="margin-left:-20px; margin-bottom:10px; display:block"><a class="dropdown-item" href="/category/${category.name}/posts/">${category.name}</a></li>`;
                }
            },

            error: function (error) {
                console.log('Error', error);
            }

        })
    })
}

get_all_categories()