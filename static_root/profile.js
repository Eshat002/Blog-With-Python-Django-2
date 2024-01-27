const profileUrl = window.location.href + "data/";
const profile_first_section_data_container = document.getElementById("profile-first-section-data-container")
const profile_sec_section_row = document.getElementById("profile-sec-section-row")
const profile_headline = document.getElementById("profile-headline")
const spinner_for_profile_data = document.getElementById("spinner-for-profile-data")
const spinner_for_profile_posts = document.getElementById("spinner-for-profile-posts")



console.log("profile_url", profileUrl)

function get_profile_data() {
    $.ajax({
        type: "GET",
        url: profileUrl,

        success: function (response) {

            spinner_for_profile_data.classList.add("d-none")
            spinner_for_profile_posts.classList.add("d-none")

            profile_first_section_data_container.innerHTML = `<div class='d-flex profile-first-section-single'>
  
         <div style="width:30%" class=''>
         <img class='profile-first-section-data-container-img' src='${response.data1.avatar_url}' alt='avatar' >
         
         </div>
         <div style="width:70%" class='profile-first-section-detail-container mt-3'>
         <h2 class='profile-first-section-name'>Hi! i’m  ${response.data1.username} </h2>
         <p class='profile-first-section-about-me'>${response.data1.about_me} </p>
         <h3 class='profile-first-section-social-headline'>Follow on social media:</h3>
         <div class="social-container">
                    <a style="background-color:#00AAA1; border:none; padding-left:6px;padding-right:2px" href="${response.data1.facebook_url}" class="facebook-url ">
                        <svg style="width:16px;height:16px;padding-bottom:2px" viewBox="0 0 56.693 56.693" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.43 21.739h-7.645v-5.014c0-1.883 1.248-2.322 2.127-2.322h5.395V6.125l-7.43-.029c-8.248 0-10.125 6.174-10.125 10.125v5.518h-4.77v8.53h4.77v24.137h10.033V30.269h6.77l.875-8.53z" fill="#ffffff" class="fill-000000"></path>
                        </svg>
                    </a>
                    <a href="null" class="twitter-url">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" class="bi bi-twitter" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15">
                            </path>
                        </svg>
                    </a>
                    <a style="padding-right:7px;padding-bottom:3px" href="null" class="insta-url">
                        <svg style='margin-top:-2px' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" class="bi bi-instagram" viewBox="0 0 16 16">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334">
                            </path>
                        </svg>
                    </a>


                </div>
         
         </div>
         </div>`


            profile_headline.innerHTML = "<span class='re-highlighted-span'>Read </span> author blogs"

            for (const post of response.data2) {
                profile_sec_section_row.innerHTML += `
                 <div class='col-lg-4 col-md-6 col-sm-6 mb-5'>
                 <div class='profile-sec-section-single-post-container'>
                 <div class='profile-sec-section-image-container'>
                <img class='re-featured-image' src="${post.featured_image_url}" alt="featured-image">
                 </div>
                 <p class='re-post-category'>
                 <span class="re-post-category-span">${post.category}</span>
                 
                </p>
                 <h2 class='re-post-title'> ${post.title} </h2>
                
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

                                <div class="d-flex px-2 re-post-time-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 0C2.6916 0 0 2.6916 0 6C0 9.3084 2.6916 12 6 12C9.3084 12 12 9.3084 12 6C12 2.6916 9.3084 0 6 0ZM6 10.8C3.3534 10.8 1.2 8.6466 1.2 6C1.2 3.3534 3.3534 1.2 6 1.2C8.6466 1.2 10.8 3.3534 10.8 6C10.8 8.6466 8.6466 10.8 6 10.8Z" fill="#555555"></path>
                                        <path d="M6.60002 3H5.40002V6.2484L7.37582 8.2242L8.22422 7.3758L6.60002 5.7516V3Z" fill="#555555"></path>
                                    </svg><span class="re-post-details-text"> ${post.readtime} Read </span>
                                </div>

                            </div>

                            <div class='re-post-content'>
                            ${post.content}
                            </div>                
                  </div>
                 </div>
                 
                 `

            }




        },
        error: function (error) {
            console.log(error);
        },
    })
}


get_profile_data()