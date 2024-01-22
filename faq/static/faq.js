const faq_container = document.getElementById("faq-container")


function get_faqs() {
    $.ajax({
        type: "GET",
        url: "/faq/data/",
        dataType: "json",
        success: function (response) {
            for (const faq of response.faq) {
                let collapseId = `collapse-${faq.id}`
                faq_container.innerHTML += `<div data-bs-toggle="collapse" data-bs-target="#${collapseId}" role="button" aria-expanded="false"  class='faq-question-container pe-3 mb-3'>
                <p class='faq-question-para' class="d-inline-flex  gap-1">
                   ${faq.question}
               </p>
               <p class="toggle-symbol-faq">+</p>
               </div>
              <div class="collapse faq-answer-container mb-3" id="${collapseId}">
                <div style="background:#F2F8F7" class="card border border-0 card-body">
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



        },
        error: function (error) {
            console.log("error", error)
        }

    })

}

get_faqs()


