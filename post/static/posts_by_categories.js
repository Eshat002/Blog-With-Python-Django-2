const post_by_categories_posts_container = document.getElementById("posts-by-categories-posts-container")
const load_more_categories = document.getElementById("load-more-categories")
const spinner_for_posts_categories = document.getElementById("spinner-for-posts-categories")
const currentUrl = window.location.href


let dyna_visible_categories = 4

const get_posts_by_categories = () => {
    console.log("pi", dyna_visible_categories)
    $.ajax({
        type: "GET",
        url: `${currentUrl}${dyna_visible_categories}/`,
        dataType: 'json',

        success: function (response) {
            console.log("cate_response", response)
            setTimeout(() => {
                spinner_for_posts_categories.classList.add("d-none");
                datas = response.data
                datas.forEach(function (data) {
                    post_by_categories_posts_container.innerHTML += `
                    <div> 
                    
                    ${data.id}
                    
                    </div>`
                })
            }, 2000);

            if (response.size === 0) {
                load_more_categories.classList.add("d-none");
            } else if (response.size <= dyna_visible_categories) {
                load_more_categories.classList.add("d-none");
            }
        },
        error: function (error) {
            console.log(error)
        },

    });



}

$("#load-more-categories")
    .unbind("click")
    .bind("click", function (e) {
        e.stopImmediatePropagation();
        spinner_for_posts_categories.classList.remove("d-none");

        dyna_visible_categories += 4;

        get_posts_by_categories()
    });

get_posts_by_categories()