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
                                    <img class="re-post-author-image" alt="author-image" src="${post.author_image}">
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



function changeSocialShareButton() {
    // Target the anchor under the "facebook-this" class
    var facebookAnchor = document.querySelector('.share-on-social-media .facebook-this a');
    var TwitterAnchor = document.querySelector('.share-on-social-media .tweet-this a');
    var copyToClipBoard = document.querySelector('.share-on-social-media .copy-this button');
    var sendViaMail = document.querySelector('.share-on-social-media .mail-this a');
    console.log("twitter_anchor", TwitterAnchor)

    facebookAnchor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
        <path
            d="M21.6673 10.0609C21.6673 4.50304 17.005 0 11.2507 0C5.49628 0 0.833984 4.50304 0.833984 10.0609C0.833984 15.0824 4.64321 19.2446 9.62305 20V12.9692H6.97688V10.0609H9.62305V7.84422C9.62305 5.32292 11.1771 3.93022 13.5574 3.93022C14.6974 3.93022 15.8894 4.12657 15.8894 4.12657V6.60122H14.5756C13.2819 6.60122 12.8783 7.37688 12.8783 8.17241V10.0609H15.7672L15.3052 12.9692H12.8783V20C17.8581 19.2446 21.6673 15.0824 21.6673 10.0609Z"
            fill="#999999" />
    </svg>`;


    TwitterAnchor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
        <circle cx="10.834" cy="10" r="10" fill="#00AAA1" />
        <path
            d="M17.1971 7.44042C16.7622 7.62294 16.2949 7.74629 15.8045 7.80179C16.3051 7.51776 16.6896 7.06799 16.8706 6.5321C16.3946 6.79943 15.8739 6.98778 15.3309 7.08901C14.8886 6.643 14.2585 6.36426 13.5611 6.36426C12.222 6.36426 11.1364 7.39183 11.1364 8.6592C11.1364 8.8391 11.1579 9.01424 11.1992 9.18225C9.18408 9.08651 7.39751 8.17286 6.20161 6.78436C5.99294 7.12331 5.87338 7.51759 5.87338 7.93812C5.87338 8.73436 6.30146 9.43679 6.95202 9.84837C6.56698 9.83695 6.19041 9.73852 5.85376 9.56128C5.85362 9.57089 5.85362 9.5805 5.85362 9.59016C5.85362 10.7021 6.68939 11.6297 7.79854 11.8405C7.4415 11.9324 7.06698 11.9459 6.7036 11.8799C7.01212 12.7916 7.90758 13.4551 8.96854 13.4737C8.13873 14.0892 7.09324 14.4561 5.9573 14.4561C5.76157 14.4561 5.5686 14.4453 5.37891 14.4241C6.45191 15.0752 7.72639 15.4552 9.09563 15.4552C13.5555 15.4552 15.9942 11.9581 15.9942 8.92536C15.9942 8.82582 15.9919 8.72685 15.9872 8.62844C16.4619 8.30364 16.8716 7.90134 17.1971 7.44042Z"
            fill="white" />
    </svg>`


    copyToClipBoard.innerHTML = `<svg style="margin-top:-2px" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
    <path
        d="M8.45929 13.7499C7.72529 13.75 7.00776 13.5324 6.39745 13.1246C5.78713 12.7169 5.31144 12.1373 5.03054 11.4592C4.74965 10.781 4.67616 10.0349 4.81937 9.31497C4.96259 8.59508 5.31607 7.93383 5.83512 7.41485L9.6645 3.58697C10.3605 2.89099 11.3044 2.5 12.2887 2.5C13.2729 2.5 14.2169 2.89099 14.9128 3.58697C15.6088 4.28294 15.9998 5.22688 15.9998 6.21114C15.9998 7.19539 15.6088 8.13933 14.9128 8.83531L14.4981 9.24929L13.4369 8.18958L13.8546 7.77184C14.2678 7.35671 14.4995 6.7947 14.4989 6.20902C14.4983 5.62333 14.2656 5.06177 13.8516 4.64743C13.4303 4.24536 12.8703 4.02102 12.2879 4.02102C11.7055 4.02102 11.1455 4.24536 10.7242 4.64743L6.89634 8.47532C6.69084 8.68058 6.52782 8.92434 6.4166 9.19265C6.30537 9.46096 6.24812 9.74857 6.24812 10.039C6.24812 10.3295 6.30537 10.6171 6.4166 10.8854C6.52782 11.1537 6.69084 11.3975 6.89634 11.6027C7.31765 12.0048 7.87765 12.2291 8.46004 12.2291C9.04242 12.2291 9.60243 12.0048 10.0237 11.6027L11.0842 12.6632C10.7402 13.0089 10.3311 13.2829 9.88058 13.4694C9.43001 13.656 8.94693 13.7513 8.45929 13.7499Z"
        fill="#999999" stroke="#999999" stroke-width="0.3" />
    <path
        d="M14.4593 12.2499C13.7253 12.25 13.0078 12.0324 12.3974 11.6246C11.7871 11.2169 11.3114 10.6373 11.0305 9.95916C10.7496 9.28104 10.6762 8.53485 10.8194 7.81496C10.9626 7.09508 11.3161 6.43383 11.8351 5.91485L12.2499 5.50086L13.3103 6.56208L12.8963 6.97607C12.4817 7.3907 12.2488 7.95304 12.2488 8.53939C12.2488 9.12575 12.4817 9.6881 12.8963 10.1027C13.3177 10.5048 13.8777 10.7291 14.46 10.7291C15.0424 10.7291 15.6024 10.5048 16.0237 10.1027L19.8524 6.27409C20.2662 5.8592 20.4986 5.29713 20.4986 4.71114C20.4986 4.12515 20.2662 3.56307 19.8524 3.14818C19.4311 2.74611 18.8711 2.52177 18.2887 2.52177C17.7063 2.52177 17.1463 2.74611 16.725 3.14818L15.6645 2.08697C16.3605 1.39099 17.3044 1 18.2887 1C19.2729 1 20.2169 1.39099 20.9128 2.08697C21.6088 2.78294 21.9998 3.72688 21.9998 4.71114C21.9998 5.69539 21.6088 6.63933 20.9128 7.33531L17.085 11.1624C16.741 11.5082 16.3319 11.7823 15.8814 11.969C15.4308 12.1556 14.9477 12.2511 14.46 12.2499H14.4593Z"
        fill="#999999" stroke="#999999" stroke-width="0.3" />
    <path
        d="M17.4995 21.9995H2.49995C2.10226 21.9991 1.72097 21.8409 1.43976 21.5597C1.15856 21.2785 1.0004 20.8972 1 20.4995V5.49995C1.0004 5.10226 1.15856 4.72098 1.43976 4.43977C1.72097 4.15856 2.10226 4.0004 2.49995 4H5.49986V5.49995H2.49995V20.4995H17.4995V12.9997H18.9995V20.4995C18.9991 20.8972 18.8409 21.2785 18.5597 21.5597C18.2785 21.8409 17.8972 21.9991 17.4995 21.9995Z"
        fill="#999999" stroke="#999999" stroke-width="0.3" />
</svg>`

    sendViaMail.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="29" fill="#999" class="bi bi-envelope-fill"
        viewBox="0 0 16 16">
        <path
            d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
    </svg>`



}

changeSocialShareButton()













