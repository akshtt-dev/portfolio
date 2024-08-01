document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const confirmDiv = document.getElementById("confirmDiv");
    const dismissLoading = document.getElementById("dismissLoading");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const formData = {
        name: form.name.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
        email: form.email.value.trim(),
      };
  
      console.log("Form Data:", formData);
  
      try {
        const response = await fetch("/contact/sendmessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
        if (response.ok) {
          confirmDiv.hidden = false;
          form.reset();
          const animation = dismissLoading.animate([{ width: "0%" }, { width: "100%" }], {
            duration: 5000,
            iterations: 1,
            easing: "ease-in-out",
          });
  
          function checkAnimationState() {
            if (animation.playState === 'finished') {
              confirmDiv.hidden = true;
              dismissLoading.style.width = "0%";
            } else {
              requestAnimationFrame(checkAnimationState);
            }
          }
  
          checkAnimationState();
        } else {
          alert(result);
          console.error("Error:", result);
        }
      } catch (error) {
        alert("There was an error submitting your message. Please try again.");
        console.error("Error:", error);
      }
    });
  });
  