document.addEventListener("DOMContentLoaded", () => {
    const countdownDate = new Date("July 23, 2024 17:22:00").getTime();
    const timerElement = document.getElementById("timer");
    const messagesDiv = document.getElementById("messages");
    const birthdaySong = document.getElementById("birthday-song");
    const playSongButton = document.getElementById("play-song-button");
    const displayMessagesButton = document.getElementById("display-messages-button");
    const cakeImage = document.getElementById("cake-image");

    // Update countdown

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance <= 0 || now >= countdownDate) {
            clearInterval(timerInterval);
            timerElement.innerHTML = "It's time!";
            cakeImage.style.display = "block";
            //displayMessages();
            displayMessagesButton.style.display = "block"; // Show the button
            playSongButton.style.display = "block";
            playSongButton.addEventListener("click", () => {
                birthdaySong.style.display = "block";
                birthdaySong.play();
            });
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    // Timer interval to update the countdown every second
    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Guestbook form submission
    const guestBookForm = document.getElementById("guest-book-form");
    guestBookForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;

        const messages = JSON.parse(localStorage.getItem("guestBookMessages")) || [];
        messages.push({ name, message });
        localStorage.setItem("guestBookMessages", JSON.stringify(messages));

        guestBookForm.reset();
        alert("Your message has been saved and will be displayed when the countdown reaches zero.");
    });

    // Function to display messages
    const displayMessages = () => {
        const messages = JSON.parse(localStorage.getItem("guestBookMessages")) || [];
        messagesDiv.innerHTML = "";
        messages.forEach(({ name, message }) => {
            const messageElement = document.createElement("div");
            messageElement.innerHTML = `<strong>${name}:</strong> ${message}`;
            messagesDiv.appendChild(messageElement);
        });
    };
    // Add click event to display messages button
    displayMessagesButton.addEventListener("click", displayMessages);

    // Display messages on page load if countdown is over
    const now = new Date().getTime();
    const distance1 = countdownDate - now;
    if ( (distance1<0)) {
        clearInterval(timerInterval);
        timerElement.innerHTML = "It's time!";
        cakeImage.style.display = "block";
        displayMessages();
        //displayMessagesButton.style.display = "block";
        playSongButton.style.display = "block";
        playSongButton.addEventListener("click", () => {
            birthdaySong.style.display = "block";
            birthdaySong.play();
        });
    } else {
        displayMessagesButton.style.display = "none";
    }
});
