const logEvents = (category, label) => {
    console.log(`gtag('event', 'click', {'event_category': ${category}, 'event_label': ${label}});`);
    gtag('event', 'click', {'event_category': category, 'event_label': label});
}

window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    const form = document.getElementById("my-form");
    const button = document.getElementById("my-form-button");
    const status = document.getElementById("my-form-status");

    // Success and Error functions for after the form is submitted
    
    const success = () => {
      form.reset();
      // button.style = "display: none ";
      status.innerHTML = "Thanks for connecting!";
      logEvents('formspree', 'success');
    }

    const error = () => {
      button.disabled = false;      
      status.innerHTML = "Oops! There was a problem";
      logEvents('formspree', 'failure');
    }

    // handle the form submission event

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();      
      button.disabled = true;
      const data = new FormData(form);      
      ajax(form.method, form.action, data, success, error);      
    });
  });
  
  // helper function for sending an AJAX request

const ajax = (method, url, data, success, error) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}