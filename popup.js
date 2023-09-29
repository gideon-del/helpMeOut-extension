console.log("working");
const camera = document.getElementById("camera");
const microphoneEl = document.getElementById("microphone");
let cameraIsAllowed;
let microphoneIsAllowed;
camera.onclick = (e) => {
  if (e.target.dataset.allow === "false") {
    cameraIsAllowed = "true";
    e.target.dataset.allow = "true";
  } else {
    cameraIsAllowed = "false";
    e.target.dataset.allow = "false";
  }
};
microphoneEl.onclick = (e) => {
  if (e.target.dataset.allow === "false") {
    microphoneIsAllowed = "true";
    e.target.dataset.allow = "true";
  } else {
    microphoneIsAllowed = "false";
    e.target.dataset.allow = "false";
  }
};
