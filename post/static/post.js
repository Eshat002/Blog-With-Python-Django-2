const featured_posts_container = document.getElementById("featured_posts_container")
const featured_posts_headline = document.getElementById("featured_post_headline")
const slide_container_popular = document.getElementById("slide-container-popular")
const most_popular_slide = document.getElementById("most-popular-slide")
const most_popular_headline = document.getElementById("most-popular-headline")
const spinner_for_featured = document.getElementById("spinner-for-featured")
const spinner_for_most_popular = document.getElementById("spinner-for-most-popular")
const spinner_for_recent_post = document.getElementById("spinner-for-recent-post")




function get_featured_posts() {
    $(document).ready(function () {
        $.ajax({
            url: '/get-featured-posts/',  // URL to your Django endpoint
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                spinner_for_featured.classList.add("d-none")
                console.log("fe", response)
                if (response) {
                    featured_posts_headline.innerHTML = "<span class='featured-span'>Featured</span>  This month"
                }

                for (const post of response.featured_posts) {

                    featured_posts_container.innerHTML += `<div style="cursor:pointer" onclick="window.location.href='/posts/${post.slug}/'" class='single-featured-post'>  
                    <p class='featured-post-category'><span style='background:#00AAA1; border-radius:3px; padding:1px 5px'>${post.category}<span></p>
                    <h2 class="featured-post-title" >${post.title}</h2>
                    <img class='featured-image' src=${post.featured_image_url} alt='featured-image'>
                    <div class='featured-post-details d-flex'>
                       <div class='d-flex pe-2'>  
                       <img class='featured-post-author-image' alt="author-image" src=${post.author_image} />
                       <span class="post-details-text">
                         ${post.author_name}
                         <span>
                       </div>
                       <div class='date-container d-flex px-2'>  
                       <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                       <path d="M2.4 5.4H3.6V6.6H2.4V5.4ZM10.8 2.4V10.8C10.8 11.46 10.26 12 9.6 12H1.2C0.88174 12 0.576515 11.8736 0.351472 11.6485C0.126428 11.4235 0 11.1183 0 10.8L0.00599999 2.4C0.00599999 1.74 0.534 1.2 1.2 1.2H1.8V0H3V1.2H7.8V0H9V1.2H9.6C10.26 1.2 10.8 1.74 10.8 2.4ZM1.2 3.6H9.6V2.4H1.2V3.6ZM9.6 10.8V4.8H1.2V10.8H9.6ZM7.2 6.6H8.4V5.4H7.2V6.6ZM4.8 6.6H6V5.4H4.8V6.6Z" fill="#555555"/>
                     </svg>
                     <span class="post-details-text">
                     ${post.created_at}
                     </span>
                       </div>

                       <div class="d-flex fe-time-container px-2">  
                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 0C2.6916 0 0 2.6916 0 6C0 9.3084 2.6916 12 6 12C9.3084 12 12 9.3084 12 6C12 2.6916 9.3084 0 6 0ZM6 10.8C3.3534 10.8 1.2 8.6466 1.2 6C1.2 3.3534 3.3534 1.2 6 1.2C8.6466 1.2 10.8 3.3534 10.8 6C10.8 8.6466 8.6466 10.8 6 10.8Z" fill="#555555"/>
                        <path d="M6.60002 3H5.40002V6.2484L7.37582 8.2242L8.22422 7.3758L6.60002 5.7516V3Z" fill="#555555"/>
                        </svg><span class="post-details-text">  ${post.readtime} Read </span>
                       </div>

                    </div>
                        <div class='content'>
                        ${post.content}
                        </div>
                
                    </div>`;


                }
            },
            error: function (error) {
                console.log(':Error', error);
            }
        });
    });

}

get_featured_posts()


function get_most_viewed_posts() {

    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    fetch('/get-most-viewed-posts/')
        .then(response => response.json())
        .then(data => {
            console.log("duke", data)
            // Replace the static items array with the received data
            spinner_for_most_popular.classList.add("d-none")

            const items = data.most_viewed_posts;
            if (items) {
                most_popular_headline.innerHTML = "<span class='popular-span'>popular</span> Posted"
            }
            console.log("items", items)
            // Number of items to display in each slide
            const itemsPerSlide = 2;

            // Calculate the total number of slides
            const totalSlides = Math.ceil(items.length / itemsPerSlide);

            // Dynamically populate slides
            for (let i = 0; i < totalSlides; i++) {
                const startIndex = i * itemsPerSlide;
                const endIndex = startIndex + itemsPerSlide;
                const slideItems = items.slice(startIndex, endIndex);

                // Create a slide
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');

                // Populate the slide with items
                slideItems.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.innerHTML = `<div style="cursor:pointer" onclick="window.location.href='/posts/${item.slug}/'" class='item-element mb-4'>
                    <p class='post-category'> 
                    <span class='post-category-span'> ${item.category}</span> 
                   </p>
                   <h2 class="most-popular-title">${item.title}</h2>

                   <div class='most-popular-post-details d-flex'>
                   <div class='d-flex pe-2'>  
                   <img class='most-popular-author-image' alt="author-image" src=${item.author_image} />
                   <span class="post-details-text">
                     ${item.author_name}
                     <span>
                   </div>
                   <div class='most-popular-date-container d-flex px-2'>  
                   <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                   <path d="M2.4 5.4H3.6V6.6H2.4V5.4ZM10.8 2.4V10.8C10.8 11.46 10.26 12 9.6 12H1.2C0.88174 12 0.576515 11.8736 0.351472 11.6485C0.126428 11.4235 0 11.1183 0 10.8L0.00599999 2.4C0.00599999 1.74 0.534 1.2 1.2 1.2H1.8V0H3V1.2H7.8V0H9V1.2H9.6C10.26 1.2 10.8 1.74 10.8 2.4ZM1.2 3.6H9.6V2.4H1.2V3.6ZM9.6 10.8V4.8H1.2V10.8H9.6ZM7.2 6.6H8.4V5.4H7.2V6.6ZM4.8 6.6H6V5.4H4.8V6.6Z" fill="#555555"/>
                 </svg>
                 <span class="post-details-text">
                 ${item.created_at}
                 </span>
                   </div>

                   <div class="d-flex px-2 mo-time-container">  
                   <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 0C2.6916 0 0 2.6916 0 6C0 9.3084 2.6916 12 6 12C9.3084 12 12 9.3084 12 6C12 2.6916 9.3084 0 6 0ZM6 10.8C3.3534 10.8 1.2 8.6466 1.2 6C1.2 3.3534 3.3534 1.2 6 1.2C8.6466 1.2 10.8 3.3534 10.8 6C10.8 8.6466 8.6466 10.8 6 10.8Z" fill="#555555"/>
                    <path d="M6.60002 3H5.40002V6.2484L7.37582 8.2242L8.22422 7.3758L6.60002 5.7516V3Z" fill="#555555"/>
                    </svg><span class="post-details-text">  ${item.readtime} Read </span>
                   </div>

                </div>
                <p class="most-popular-content" >
                ${item.content}
                </p>
                                                       
                   </div>`;





                    slide.appendChild(itemElement);
                });

                // Add the slide to the Swiper wrapper
                document.getElementById('swiper-wrapper').appendChild(slide);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


}

get_most_viewed_posts()

function hideRecentPostSpinner() {
    setTimeout(function () {
        spinner_for_recent_post.classList.add("d-none");
    }, 1000);




}

hideRecentPostSpinner()











// function get_recent_posts() {
//     $(document).ready(function () {
//         $.ajax({
//             url: '/get-recent-posts/',
//             type: 'GET',
//             dataType: 'json',
//             success: function (response) {
//                 console.log("recent_post", response)
//             },

//             error: function (error) {
//                 console.log('Error', error);
//             }

//         })
//     })
// }


// get_recent_posts()