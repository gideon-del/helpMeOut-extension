const camera = document.getElementById("camera");
const microphoneEl = document.getElementById("microphone");
const startBtn = document.getElementById("start");
let isRecording = false;
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

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
startBtn.onclick = async (e) => {
  isRecording = true;
  chrome.runtime.sendMessage({ type: "start" });

  //   const response = await chrome.runtime.sendMessage({});

  //   if (response) window.close();
};
// document.addEventListener("DOMContentLoaded", async function () {
//   // Popup is opened

//   await chrome.runtime.sendMessage({ type: "start" });
// });
window.addEventListener("unload", async () => {
  if (!isRecording) {
    await chrome.runtime.sendMessage({ type: "remove" });
  }
});
