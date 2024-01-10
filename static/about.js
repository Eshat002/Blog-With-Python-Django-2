const about_us_author_container = document.getElementById("author-container-about-us")



function get_all_authors() {
    $(document).ready(function () {
        $.ajax({
            url: '/profiles/author-with-most-posts/',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log("log", response)
                for (const author of response.authors) {
                    about_us_author_container.innerHTML += `  
                   <div class='col-lg-6 d-flex mb-4'>
                   <div style="width:25%">
                    <img src="${author.avatar_url}" class='about-us-author-image' alt="avatar">
                   </div>
                   <div class=' ' style="width:75%; margin-left:45px">
                  <h5 class='about-us-name'>${author.name}</h5>
                   <p class='about-us-total-posts'>${author.total_posts} posts</p>
                   <a class='about-us-author-link' href=''>
                   See details about author
                   <svg class='ms-2' xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                   <path d="M10.3536 4.35355C10.5488 4.15829 10.5488 3.84171 10.3536 3.64645L7.17157 0.464467C6.97631 0.269205 6.65973 0.269204 6.46447 0.464467C6.2692 0.659729 6.2692 0.976311 6.46447 1.17157L9.29289 4L6.46447 6.82843C6.2692 7.02369 6.2692 7.34027 6.46447 7.53553C6.65973 7.7308 6.97631 7.7308 7.17157 7.53553L10.3536 4.35355ZM-4.37114e-08 4.5L10 4.5L10 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" fill="#00AAA1"/>
                 </svg>
                 </a>  
                   </div>
                  
                   
                   </div>

                     `;
                }


            },

            error: function (error) {
                console.log('Error', error);
            }

        })
    })
}

get_all_authors()
