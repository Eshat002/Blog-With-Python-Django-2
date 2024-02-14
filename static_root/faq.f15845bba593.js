const faq_container = document.getElementById("faq-container")
const spinner_for_faq = document.getElementById("spinner-for-faq")
const faq_headline = document.getElementById("faq-headline")
const faq_sub_headline = document.getElementById("faq-sub-headline")
const faq_contact_info_container = document.getElementById("faq-contact-info-container")



function get_faqs() {
    $.ajax({
        type: "GET",
        url: "/faq/data/",
        dataType: "json",
        success: function (response) {
            setTimeout(() => {
                spinner_for_faq.classList.add("d-none")
                faq_headline.innerHTML = "<span class='re-highlighted-span pe-1'>Frequently</span> asked question"
                faq_sub_headline.innerHTML = "Did you come here for something in particular or just general Riker-bashing? And blowing"

                for (const faq of response.faq) {
                    let collapseId = `collapse-${faq.id}`
                    faq_container.innerHTML += `<div data-bs-toggle="collapse" data-bs-target="#${collapseId}" role="button" aria-expanded="false"  class='faq-question-container pe-3 mb-3'>
                <p class='faq-question-para' class="d-inline-flex  gap-1">
                   ${faq.question}
               </p>
               <p class="toggle-symbol-faq">+</p>
               </div>
              <div class="collapse faq-answer-container mb-3" id="${collapseId}">
                <div style="background:#F2F8F7;padding-left:20px" class="card border border-0 card-body">
                ${faq.answer}
                 </div>
              </div>`
                }

                document.querySelectorAll('.faq-question-container').forEach((questionContainer) => {
                    questionContainer.addEventListener('click', () => {
                        const symbol = questionContainer.querySelector('.toggle-symbol-faq');
                        symbol.innerText = symbol.innerText === '+' ? '-' : '+';
                        // if (symbol.innerText === '+') {
                        //     symbol.innerText = '-';
                        //     // symbol.style.fontSize = "37px"
                        // }
                        // else if (symbol.innerText === '-') {
                        //     symbol.innerText = '+'
                        //     // symbol.style.fontSize = "25px"

                        // }
                    });
                });
                faq_contact_info_container.classList.remove("d-none")


            }, 100);



        },
        error: function (error) {
            console.log("error", error)
        }

    })

}

get_faqs()


