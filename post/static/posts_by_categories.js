const post_by_categories_posts_container = document.getElementById("posts-by-categories-posts-container")
const load_more_categories = document.getElementById("load-more-categories")
const spinner_for_posts_categories = document.getElementById("spinner-for-posts-categories")
const currentUrl = window.location.href
const no_more_posts_div = document.getElementById("no-more-posts-div")
const footer_id = document.getElementById("footer_id")



let dyna_visible_categories = 8

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
                    <div style="margin-bottom:30px" class='row gx-4'> 
                    <div class='col-lg-3'>
                    <img  class='re-featured-image' alt='avatar' src="${data.featured_image_url}">
                    </div>
                    <div class='col-lg-9 ps-3'>
                        <p   class="re-post-category post-category-posts-by-category"><span class='re-post-category-span' >${data.category}</span></p>
                        <h2 class='re-post-title'>${data.title}</h2>
                        <div class="re-post-details d-flex">
                                <div class="d-flex pe-2">
                                    <img class="re-post-author-image" alt="author-image" src="/media/avatars/girl-748932_640.jpg">
                                    <span class="re-post-details-text">
                                       ${data.author_name}
                                        <span>
                                </span></span></div>
                                <div class="re-post-date-container d-flex px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                        <path d="M2.4 5.4H3.6V6.6H2.4V5.4ZM10.8 2.4V10.8C10.8 11.46 10.26 12 9.6 12H1.2C0.88174 12 0.576515 11.8736 0.351472 11.6485C0.126428 11.4235 0 11.1183 0 10.8L0.00599999 2.4C0.00599999 1.74 0.534 1.2 1.2 1.2H1.8V0H3V1.2H7.8V0H9V1.2H9.6C10.26 1.2 10.8 1.74 10.8 2.4ZM1.2 3.6H9.6V2.4H1.2V3.6ZM9.6 10.8V4.8H1.2V10.8H9.6ZM7.2 6.6H8.4V5.4H7.2V6.6ZM4.8 6.6H6V5.4H4.8V6.6Z" fill="#555555"></path>
                                    </svg>
                                    <span class="re-post-details-text">
                                         ${data.created_at}
                                    </span>
                                </div>

                                <div class="d-flex px-2 re-post-time-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 0C2.6916 0 0 2.6916 0 6C0 9.3084 2.6916 12 6 12C9.3084 12 12 9.3084 12 6C12 2.6916 9.3084 0 6 0ZM6 10.8C3.3534 10.8 1.2 8.6466 1.2 6C1.2 3.3534 3.3534 1.2 6 1.2C8.6466 1.2 10.8 3.3534 10.8 6C10.8 8.6466 8.6466 10.8 6 10.8Z" fill="#555555"></path>
                                        <path d="M6.60002 3H5.40002V6.2484L7.37582 8.2242L8.22422 7.3758L6.60002 5.7516V3Z" fill="#555555"></path>
                                    </svg><span class="re-post-details-text"> ${data.readtime} Read </span>
                                </div>

                            </div>
                            <div class="re-post-content">
                            ${data.content}
                             </div>
                    </div>                  
                    
                    </div>`
                })
                if (datas.length >= 8 && response.size > 8) {
                    load_more_categories.classList.remove("d-none")
                    console.log("oka")

                }
                // load_more_categories.classList.remove("d-none")

                else {
                    no_more_posts_div.classList.remove("d-none")
                    if (response.size == 0) {
                        no_more_posts_div.classList.add("zero-no-more-posts")
                        footer_id.classList.add("stick-footer-bottom")

                    }


                }
            },

                100);

            // if (response.size === 0) {
            //     load_more_categories.classList.add("d-none");
            // } else if (response.size <= dyna_visible_categories) {
            //     load_more_categories.classList.add("d-none");
            // }


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
        load_more_categories.classList.add("d-none")

        dyna_visible_categories += 8;

        get_posts_by_categories()
    });

get_posts_by_categories()