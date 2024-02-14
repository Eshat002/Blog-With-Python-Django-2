const post_container_post_detail = document.getElementById("post-container-post-detail")
const related_tags_post_detail = document.getElementById("related-tags-post-detail")
const related_tags_headline_post_detail = document.getElementById("related-tags-headline-post-detail")
const related_posts_container_post_detail = document.getElementById("related-posts-container-post-detail")
const related_posts_headline_post_detail = document.getElementById("related-posts-headline-post-detail")
const spinner_for_post_detail = document.getElementById("spinner-for-post-detail")


currentUrl = window.location.href



function get_post_detail_data() {
    $.ajax({
        url: `${currentUrl}data/`,
        method: "GET",
        dataType: "json",
        success: function (response) {

            spinner_for_post_detail.classList.add('d-none')

            console.log("detail", response)
            for (const post of response.data1) {
                post_container_post_detail.innerHTML += `<div>
            <p class="re-post-category "><span class='re-post-category-span' >${post.category}</span></p>
            <h2 class='re-post-title'>${post.title}</h2>

                <div class="re-post-details d-flex">
                                <div class="d-flex pe-2">
                                    <img class="re-post-author-image" alt="author-image" src="/media/avatars/girl-748932_640.jpg">
                                    <span class="re-post-details-text">
                                       ${post.author_name}
                                        <span>
                                </span></span></div>
                                <div class="re-post-date-container d-flex px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                        <path d="M2.4 5.4H3.6V6.6H2.4V5.4ZM10.8 2.4V10.8C10.8 11.46 10.26 12 9.6 12H1.2C0.88174 12 0.576515 11.8736 0.351472 11.6485C0.126428 11.4235 0 11.1183 0 10.8L0.00599999 2.4C0.00599999 1.74 0.534 1.2 1.2 1.2H1.8V0H3V1.2H7.8V0H9V1.2H9.6C10.26 1.2 10.8 1.74 10.8 2.4ZM1.2 3.6H9.6V2.4H1.2V3.6ZM9.6 10.8V4.8H1.2V10.8H9.6ZM7.2 6.6H8.4V5.4H7.2V6.6ZM4.8 6.6H6V5.4H4.8V6.6Z" fill="#555555"></path>
                                    </svg>
                                    <span class="re-post-details-text">
                                         ${post.created_at}
                                    </span>
                                </div>

                              

                            </div>
                            <img  class='twitter-featured-image  mt-4 mb-2' alt='featured-image' src="${post.featured_image_url}">
                            <div class="d-flex px-2 re-post-time-container og-post-time-container-post-detail">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6 0C2.6916 0 0 2.6916 0 6C0 9.3084 2.6916 12 6 12C9.3084 12 12 9.3084 12 6C12 2.6916 9.3084 0 6 0ZM6 10.8C3.3534 10.8 1.2 8.6466 1.2 6C1.2 3.3534 3.3534 1.2 6 1.2C8.6466 1.2 10.8 3.3534 10.8 6C10.8 8.6466 8.6466 10.8 6 10.8Z" fill="#555555"></path>
                                <path d="M6.60002 3H5.40002V6.2484L7.37582 8.2242L8.22422 7.3758L6.60002 5.7516V3Z" fill="#555555"></path>
                            </svg><span class="re-post-details-text"> ${post.readtime} Read </span>
                        </div>

                            <div class="re-post-content">
                            ${post.content}
                             </div>
                             
                </div>`
                if (post.tags != 0) {
                    related_tags_headline_post_detail.innerHTML = '<b>Related Tags</b>'

                    for (const tag of post.tags) {
                        related_tags_post_detail.innerHTML += `<a class='me-2 related-tags-link-post-detail' href='/tag/${tag}/posts/' >${tag}</a>`
                    }

                }

            }
            if (response.data2 != 0) {

                related_posts_headline_post_detail.innerHTML = "<span class='re-highlighted-span'>See related  </span>posts"


                for (const related_post of response.data2) {
                    related_posts_container_post_detail.innerHTML += `<div style="cursor:pointer" onclick="window.location.href='/posts/${related_post.slug}/'" class='col-lg-6 col-md-6 mb-2'>   
                <div class='related-single-post-container'>
                <div class='related-posts-image-container'>
               <img class='re-featured-image' src="${related_post.featured_image_url}" alt="featured-image">
                </div>
                <p class='re-post-category'>
                <span class="re-post-category-span">${related_post.category}</span>
                
               </p>
                <h2 style="margin-bottom:15px" class='re-post-title'> ${related_post.title} </h2>
               
                <div class="re-post-details d-flex">
                               <div class="d-flex pe-2">
                                   <img class="re-post-author-image" alt="author-image" src="${related_post.author_image}">
                                   <span class="re-post-details-text">
                                       ${related_post.author_name}
                                       <span>
                               </span></span></div>
                               <div class="re-post-date-container d-flex px-2">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                                       <path d="M2.4 5.4H3.6V6.6H2.4V5.4ZM10.8 2.4V10.8C10.8 11.46 10.26 12 9.6 12H1.2C0.88174 12 0.576515 11.8736 0.351472 11.6485C0.126428 11.4235 0 11.1183 0 10.8L0.00599999 2.4C0.00599999 1.74 0.534 1.2 1.2 1.2H1.8V0H3V1.2H7.8V0H9V1.2H9.6C10.26 1.2 10.8 1.74 10.8 2.4ZM1.2 3.6H9.6V2.4H1.2V3.6ZM9.6 10.8V4.8H1.2V10.8H9.6ZM7.2 6.6H8.4V5.4H7.2V6.6ZM4.8 6.6H6V5.4H4.8V6.6Z" fill="#555555"></path>
                                   </svg>
                                   <span class="re-post-details-text">
                                        ${related_post.created_at}
                                   </span>
                               </div>

                               <div class="d-flex px-2 re-post-time-container">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                       <path d="M6 0C2.6916 0 0 2.6916 0 6C0 9.3084 2.6916 12 6 12C9.3084 12 12 9.3084 12 6C12 2.6916 9.3084 0 6 0ZM6 10.8C3.3534 10.8 1.2 8.6466 1.2 6C1.2 3.3534 3.3534 1.2 6 1.2C8.6466 1.2 10.8 3.3534 10.8 6C10.8 8.6466 8.6466 10.8 6 10.8Z" fill="#555555"></path>
                                       <path d="M6.60002 3H5.40002V6.2484L7.37582 8.2242L8.22422 7.3758L6.60002 5.7516V3Z" fill="#555555"></path>
                                   </svg><span class="re-post-details-text"> ${related_post.readtime} Read </span>
                               </div>

                           </div>

                           <div class='re-post-content'>
                           ${related_post.content}
                           </div>                
                 </div>
              
                 
                 </div>`
                }

            }





        },
        error: function (error) {
            console.log(error)
        }

    })

}

get_post_detail_data()

















