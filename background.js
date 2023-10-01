async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
let desktopStreamId;
let currentTab;
chrome.action.onClicked.addListener(async (tab) => {
  console.log("cliked");
  currentTab = tab;
});
const startRecording = async (tab) => {
  // const existingContexts = await chrome.runtime.getContexts({});
  // let recording = false;
  // const offscreenDocument = existingContexts.find(
  //   (c) => c.contextType === "OFFSCREEN_DOCUMENT"
  // );
  // if (!offscreenDocument) {
  //   await chrome.offscreen.createDocument({
  //     url: "offScreen.html",
  //     reasons: ["USER_MEDIA"],
  //     justification: "Recording from chrome.tabCapture API",
  //   });
  // }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["inject.js"],
  });
};
chrome.runtime.onMessage.addListener(async (mesaage, sender, sendRespons) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (mesaage.type === "start") {
    if (tab && !tab.url.includes("chrome:")) {
      const res = await startRecording(tab);
    }
  } else if (mesaage.type === "remove") {
    if (tab && !tab.url.includes("chrome:")) {
      await chrome.runtime.sendMessage({ type: "stop-recording" });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["remove.js"],
      });
    }
  }
});
// chrome.runtime.onInstalled.addListener(async () => {
//   const tab = await getCurrentTab();
//   if (tab && !tab.url.includes("chrome:")) {
//     await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ["inject.js"],
//     });
//   }
// });
