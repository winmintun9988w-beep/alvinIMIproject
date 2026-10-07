// HOME PAGE - READ MORE BUTTON

const readMoreBtn = document.getElementById("readMoreBtn");
const extraInfo = document.getElementById("extra-info");

if (readMoreBtn && extraInfo) {

    readMoreBtn.addEventListener("click", function () {

        if (extraInfo.style.display === "block") {

            extraInfo.style.display = "none";
            readMoreBtn.textContent = "Read More";

        } else {

            extraInfo.style.display = "block";
            readMoreBtn.textContent = "Read Less";

        }

    });

}


// ROOMS AND DINING - VIEW DETAILS BUTTON

const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const details = button.nextElementSibling;

        if (details) {

            details.classList.toggle("show");

            if (details.classList.contains("show")) {

                button.textContent = "Hide Details";

            } else {

                button.textContent = "View Details";

            }

        }

    });

});


// DINING PAGE - CUISINE FILTER

const filterButtons = document.querySelectorAll(".filter-btn");
const restaurantCards = document.querySelectorAll(".restaurant-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const category = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        restaurantCards.forEach(function (card) {

            if (
                category === "all" ||
                card.dataset.category.includes(category)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// HERO IMAGE SLIDESHOW

const slides = document.querySelectorAll(".hero-slide");

if (slides.length > 0) {

    let current = 0;

    setInterval(function () {

        slides[current].classList.remove("active");

        current = (current + 1) % slides.length;

        slides[current].classList.add("active");

    }, 4000);

}

// LEARN MORE BUTTON

const learnButtons = document.querySelectorAll(".learn-btn");

learnButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const details = button.nextElementSibling;

        if (details) {

            details.classList.toggle("show");

            if (details.classList.contains("show")) {

                button.textContent = "Show Less";

            } else {

                button.textContent = "Learn More";

            }

        }

    });

});


// PLANSTAY - BOOKING FORM


const bookingForm = document.getElementById("bookingForm");


// Only run booking code on PlanStay page
if (bookingForm) {

    const successMessage =
        document.getElementById("successMessage");

    const checkInInput =
        document.getElementById("checkin");


    // GET TODAY'S DATE

    function getToday() {

        const now = new Date();

        const month = String(
            now.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            now.getDate()
        ).padStart(2, "0");

        return (
            now.getFullYear() +
            "-" +
            month +
            "-" +
            day
        );

    }


    // Do not allow past check-in dates
    if (checkInInput) {

        checkInInput.min = getToday();

    }


    // SHOW ERROR

    function showError(fieldId, message) {

        const errorElement =
            document.getElementById(fieldId + "Error");

        const field =
            document.getElementById(fieldId);

        if (errorElement) {
            errorElement.textContent = message;
        }

        if (field) {
            field.classList.add("invalid");
        }

    }


    // CLEAR ERRORS

    function clearMessages() {

        document
            .querySelectorAll(".error")
            .forEach(function (error) {

                error.textContent = "";

            });


        document
            .querySelectorAll(".invalid")
            .forEach(function (field) {

                field.classList.remove("invalid");

            });


        if (successMessage) {

            successMessage.textContent = "";

            successMessage.classList.remove("show");

        }

    }


    // BOOKING SUBMIT

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearMessages();


            // Get values
            const name =
                document
                    .getElementById("fullname")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();

            const checkIn =
                document
                    .getElementById("checkin")
                    .value;

            const checkOut =
                document
                    .getElementById("checkout")
                    .value;

            const guests =
                document
                    .getElementById("guests")
                    .value;

            const roomType =
                document
                    .getElementById("roomtype")
                    .value;


            let isValid = true;


           
            // NAME

            if (name === "") {

                showError(
                    "fullname",
                    "Please enter your full name."
                );

                isValid = false;

            }


            // EMAIL

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showError(
                    "email",
                    "Please enter a valid email address."
                );

                isValid = false;

            }


            // PHONE

            const phonePattern =
                /^[0-9+\s-]{8,15}$/;

            if (!phonePattern.test(phone)) {

                showError(
                    "phone",
                    "Please enter a valid phone number."
                );

                isValid = false;

            }


            // CHECK-IN

            if (checkIn === "") {

                showError(
                    "checkin",
                    "Please choose a check-in date."
                );

                isValid = false;

            } else if (checkIn < getToday()) {

                showError(
                    "checkin",
                    "Check-in date cannot be in the past."
                );

                isValid = false;

            }


            // CHECK-OUT

            if (checkOut === "") {

                showError(
                    "checkout",
                    "Please choose a check-out date."
                );

                isValid = false;

            } else if (
                checkIn !== "" &&
                checkOut <= checkIn
            ) {

                showError(
                    "checkout",
                    "Check-out must be after check-in."
                );

                isValid = false;

            }


            // GUESTS

            if (guests === "") {

                showError(
                    "guests",
                    "Please select the number of guests."
                );

                isValid = false;

            }


            // ROOM TYPE

            if (roomType === "") {

                showError(
                    "roomtype",
                    "Please select a room type."
                );

                isValid = false;

            }


            // SUCCESS

            if (isValid) {

                // Save the name before resetting
                const customerName = name;


                // Reset the form
                bookingForm.reset();


                // Show success message
                if (successMessage) {

                    successMessage.textContent =
                        "Booking Successful! Thank you, " +
                        customerName +
                        ". Your stay request has been received.";

                    successMessage.classList.add("show");

                }

            } else {

                // Focus on first invalid field
                const firstInvalid =
                    document.querySelector(".invalid");

                if (firstInvalid) {

                    firstInvalid.focus();

                }

            }

        }
    );


    // RESET BUTTON

    if (isValid) {

    // Save the name
    const customerName = name;

    // Show success message
    if (successMessage) {

        successMessage.textContent =
            "Booking Successful! Thank you, " +
            customerName +
            ". Your stay request has been received.";

        successMessage.classList.add("show");
    }

}

}

