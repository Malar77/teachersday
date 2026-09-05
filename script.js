// =================================
// CELEBRATE BUTTON
// =================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyD-_lwlMuHtG77Syz5lc33-_Z0RFq-tviPVhkds1ImkrPUG_8RG2daPTYqVY5wUaM/exec";
const celebrateBtn = document.getElementById("celebrateBtn");

celebrateBtn.addEventListener("click", function () {

    document.getElementById("teachers").scrollIntoView({
        behavior: "smooth"
    });

});


// =================================
// GIFT BOX SURPRISE
// =================================

const giftBox = document.getElementById("giftBox");
const surprise = document.getElementById("surprise");
const closeSurprise = document.getElementById("closeSurprise");
const continueBtn = document.getElementById("continueBtn");
const tapMessage = document.getElementById("tapMessage");


// Different messages

const messages = [

    "Thank you for believing in us, even when we doubted ourselves. ❤️",

    "A teacher's influence lasts a lifetime. Thank you for being part of our journey. 🌸",

    "You didn't just teach a subject, you taught us how to face life. 💜",

    "Behind every confident student is a teacher who encouraged them. Thank you! ✨",

    "Your words, lessons and kindness will always stay in our hearts. 💐",

    "Some heroes don't wear capes. They teach. 👩‍🏫👨‍🏫❤️",

    "To every teacher who made learning special — Happy Teachers' Day! 🎓"

];


// Keep track of which message comes next

let messageIndex = 0;


// Open gift

giftBox.addEventListener("click", function () {

    // If all messages are completed
    if (messageIndex >= messages.length) {

        messageIndex = 0;

    }

    // Open animation
    giftBox.classList.add("open");

    tapMessage.textContent = "✨ Your surprise is opening...";


    // Wait for gift animation

    setTimeout(function () {

        // Change message
        document.querySelector(".surprise-text").textContent =
            messages[messageIndex];


        // Show message number
        document.querySelector(".small-title").textContent =
            `SURPRISE ${messageIndex + 1} / ${messages.length}`;


        // Show popup
        surprise.classList.add("show");

        tapMessage.textContent = "🎁 Surprise opened!";


        // Move to next message
        messageIndex++;

    }, 700);

});


// =================================
// CLOSE SURPRISE
// =================================

closeSurprise.addEventListener("click", function () {

    surprise.classList.remove("show");

    // Close gift
    giftBox.classList.remove("open");

});


// =================================
// CONTINUE BUTTON
// =================================

continueBtn.addEventListener("click", function () {

    surprise.classList.remove("show");

    giftBox.classList.remove("open");

    // Go to teachers section
    document.getElementById("teachers").scrollIntoView({
        behavior: "smooth"
    });

});
// =================================
// TEACHER APPRECIATION POPUP
// =================================

const appreciationModal =
    document.getElementById("appreciationModal");

const modalClose =
    document.getElementById("modalClose");

const selectedTeacher =
    document.getElementById("selectedTeacher");

const appreciationForm =
    document.getElementById("appreciationForm");

const appreciationName =
    document.getElementById("appreciationName");

const appreciationMessage =
    document.getElementById("appreciationMessage");

const modalCount =
    document.getElementById("modalCount");

const appreciationSuccess =
    document.getElementById("appreciationSuccess");

const successName =
    document.getElementById("successName");

const successTeacher =
    document.getElementById("successTeacher");

const successMessage =
    document.getElementById("successMessage");

const modalDone =
    document.getElementById("modalDone");


// =================================
// OPEN POPUP
// =================================

document.querySelectorAll(".appreciate-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const teacher =
            button.getAttribute("data-teacher");

        selectedTeacher.textContent = teacher;

        appreciationModal.classList.add("show");

        appreciationForm.classList.remove("hide");

        appreciationSuccess.classList.remove("show");

        appreciationForm.reset();

        modalCount.textContent = "0";

    });

});


// =================================
// CHARACTER COUNT
// =================================

appreciationMessage.addEventListener("input", function() {

    modalCount.textContent =
        appreciationMessage.value.length;

});


// =================================
// SUBMIT APPRECIATION
// =================================

appreciationForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const studentName = appreciationName.value.trim();
  const teacher = selectedTeacher.textContent;
  const message = appreciationMessage.value.trim();

  if (!studentName || !message) {
    alert("Please enter your name and message.");
    return;
  }

  const sendButton = document.querySelector(".modal-send");

  sendButton.disabled = true;
  sendButton.textContent = "Sending... 💌";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        studentName: studentName,
        teacher: teacher,
        message: message
      })
    });

    // Show success message
    successName.textContent = studentName;
    successTeacher.textContent = teacher;
    successMessage.textContent = `"${message}"`;

    appreciationForm.classList.add("hide");
    appreciationSuccess.classList.add("show");

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }

  sendButton.disabled = false;
  sendButton.textContent = "💐 Send Thank You";
});

// =================================
// CLOSE POPUP
// =================================

modalClose.addEventListener("click", function() {

    appreciationModal.classList.remove("show");

});


// =================================
// DONE BUTTON
// =================================

modalDone.addEventListener("click", function() {

    appreciationModal.classList.remove("show");

});


// =================================
// CLICK OUTSIDE POPUP
// =================================

appreciationModal.addEventListener("click", function(event) {

    if (event.target === appreciationModal) {

        appreciationModal.classList.remove("show");

    }

});