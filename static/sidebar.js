const top_authors_container = document.getElementById("top-authors-container")
const top_authors_headline = document.getElementById("top-authors-headline")
const ad_container = document.getElementById("ad-container")
const category_container = document.getElementById("category-container")
const todays_update_container = document.getElementById("todays-update-container")
const insta_posts_container = document.getElementById("insta-posts-container")
const tags_container = document.getElementById("tags-container")
const spinner_for_top_authors = document.getElementById("spinner-for-top-authors")
const spinner_for_ad = document.getElementById("spinner-for-ad")
const spinner_for_category = document.getElementById("spinner-for-category")
const category_headline_sidebar = document.getElementById("category-headline-sidebar")
const spinner_for_todays_update = document.getElementById("spinner-for-todays-update")
const todays_update_headline_sidebar = document.getElementById("todays-update-headline-sidebar")
const spinner_for_insta_posts = document.getElementById("spinner-for-insta-posts")
const insta_posts_headline_sidebar = document.getElementById("insta-posts-headline-sidebar")
const spinner_for_tags_sidebar = document.getElementById("spinner-for-tags-sidebar")
const tags_headline_sidebar_id = document.getElementById("tags-headline-sidebar-id")




function get_top_authors() {
    $(document).ready(function () {
        $.ajax({
            url: '/get-top-authors/',
            type: 'GET',
            dataType: 'json',
            success: function (response) {


                spinner_for_top_authors.classList.add('d-none')
                top_authors_headline.innerHTML = `<span class="top-authors-span">top</span> authors`


                // console.log("top_container", top_authors_container)
                for (const data of response.data) {

                    top_authors_container.innerHTML += `<div style='margin-bottom:30px' class='d-flex'>  
                    <div style="width:20%" class='top-author-image-container'>
                    <img class='top-author-image' src="${data.author_image}" alt="author-image">
                    </div>

                    <div style="width:80%" class='top-author-detail-container ms-2'>
                    <a style="text-decoration:none" href="/profiles/${data.username}/">
                    <h3 class='top-author-name'> ${data.username}  </h3></a>
                    <p class='top-author-profession'>${data.profession} </p>
                    <div class='social-container'>
                    <a style="background-color:#00AAA1; border:none; padding-left:6px;padding-right:2px" href='${data.facebook_url}' class='facebook-url'>
                    <svg style="width:16px;height:16px;padding-bottom:2px" viewBox="0 0 56.693 56.693" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M40.43 21.739h-7.645v-5.014c0-1.883 1.248-2.322 2.127-2.322h5.395V6.125l-7.43-.029c-8.248 0-10.125 6.174-10.125 10.125v5.518h-4.77v8.53h4.77v24.137h10.033V30.269h6.77l.875-8.53z" fill="#ffffff" class="fill-000000"></path></svg>
                    </a>
                    <a href='${data.twitter_url}' class='twitter-url'>  
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" class="bi bi-twitter" viewBox="0 0 16 16">
                   <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15"/>
                     </svg>
                    </a>
                    <a style="padding-right:7px;padding-bottom:3px" href='${data.insta_url}' class='insta-url'> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" class="bi bi-instagram" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                     </svg>
                    </a>


                    </div>
                 
                    </div>
                

                    </div>`;

                }


            },

            error: function (error) {
                console.log('Error', error);
            }

        })
    })
}



get_top_authors()


function get_ad() {
    $(document).ready(function () {
        $.ajax({
            url: '/ad/',
            type: 'GET',
            dataType: 'json',
            success: function (response) {

                spinner_for_ad.classList.add('d-none')

                if (response.data.show == true) {
                    ad_container.innerHTML = `<div class='single-ad'>  
                <p  class='text-end ad-sticker'>Ad</p>              
                 <h2 class='sidebar-ad-title'>${response.data.title}</h2>
                 <p class='sidebar-ad-des'>${response.data.des} </p>
                 <a target="_blank" href='${response.data.ad_url}' class='sidebar-ad-link'>Visit Us </a>
                    </div>`;
                }




            },

            error: function (error) {
                console.log('Error', error);
            }

        })
    })
}

get_ad()



function get_all_categories() {

    $(document).ready(function () {
        $.ajax({
            url: '/get-all-categories/',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                spinner_for_category.classList.add('d-none')
                category_headline_sidebar.innerHTML = `<span class="category-span-sidebar">Categories</span>`
                for (const category of response.categories) {
                    // console.log("categoris", response.categories)
                    category_container.innerHTML += `<div class='d-flex single-category mt-2 justify-content-between'>  
                     <h3  ><a class='category-name-count' href='/category/${category.name}/posts/'>${category.name} </a> </h3>
                     <h3 class='category-name-count'>${category.posts_on_categories} </h3>
                    </div>`;

                }
            },

            error: function (error) {
                console.log('Error', error);
            }

        })
    })
}

get_all_categories()



function get_todays_update() {
    $(document).ready(function () {
        $.ajax({
            url: '/todays_update/',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                spinner_for_todays_update.classList.add('d-none')
                todays_update_headline_sidebar.innerHTML = `<span class="todays-span">Today’s</span>
                update`
                console.log("response_today", response.data)
                todays_update_container.innerHTML = `<div class='mb-3 todays-update-single'>             
                <div class='d-flex todays-update-first-row mb-3'>
                <div class='todays-update-box me-3'>
                <p class='todays_update_data'>
                ${response.data.todays_posts}
                </P>
                <p class='todays_update_text'>
                New posts
                </p>
 
                </div>

                <div class='todays-update-box'>
                <p class='todays_update_data'>
                ${response.data.total_visitors}
                </p>
                <p class='todays_update_text'>
                total visitors
                </p>
                </div>
                
                </div>
                <div class='d-flex todays-update-sec-row'>
                <div class='todays-update-box me-3'>
                <p class='todays_update_data'> 
                 ${response.data.new_subscribers}
                </p>
              
                <p class='todays_update_text'>
                New  subscribers
                </p>
                </div>
                <div class='todays-update-box'>
                <p class='todays_update_data'>
                ${response.data.blog_read}
                </p>
                <p class='todays_update_text'>
                blog read(min)
                </p>
                </div>
                
                
                </div>

                </div>`

            },

            error: function (error) {
                console.log('Error', error);
            }

        })
    })
}

get_todays_update()



function get_insta_posts() {
    $(document).ready(function () {
        $.ajax({
            url: '/insta_posts/',
            type: 'GET',
            dataType: 'json',
            success: function (response) {

                spinner_for_insta_posts.classList.add("d-none")
                insta_posts_headline_sidebar.innerHTML = `<span class="insta-span-sidebar">Instagram</span>
                posts`

                for (const post of response.insta_posts) {
                    insta_posts_container.innerHTML += `<div class='single-insta-post-container col-6 col-md-4 col-lg-4 mb-3'>  
                    <a href='${post.insta_url}'>
                    <img style="width:100%; object-fit:cover; border-radius:5px" src="${post.insta_image}" alt="insta-image" >
                    </a>
                    
                    </div>`;
                }
            },

            error: function (error) {
                console.log('Error', error);
            }

        })
    })
}

get_insta_posts()



function get_all_tags() {
    $(document).ready(function () {
        $.ajax({
            url: '/get-all-tags/',
            type: 'GET',
            dataType: 'json',
            success: function (response) {

                spinner_for_tags_sidebar.classList.add('d-none')
                tags_headline_sidebar_id.innerHTML = `<span class="search-span-sidebar">search</span>
                with
                tags`


                for (const tag of response.tags) {
                    tags_container.innerHTML += `  
                    <a class='sidebar-tag-button me-2' href='/tag/${tag.name}/posts/'>${tag.name}</a>

                     `;
                }


            },

            error: function (error) {
                console.log('Error', error);
            }

        })
    })
}

get_all_tags()
