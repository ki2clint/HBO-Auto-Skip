let isSkipIntroEnabled = true;
let isNextEpisodeEnabled = true;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleSkipIntro') {
        isSkipIntroEnabled = message.value;
        sendResponse({isSkipIntroEnabled: isSkipIntroEnabled});
    } else if (message.action === 'toggleNextEpisode') {
        isNextEpisodeEnabled = message.value;
        sendResponse({isNextEpisodeEnabled: isNextEpisodeEnabled});
    } else if (message.action === 'getIsSkipIntroEnabled') {
        sendResponse({isSkipIntroEnabled: isSkipIntroEnabled});
    } else if (message.action === 'getIsNextEpisodeEnabled') {
        sendResponse({isNextEpisodeEnabled: isNextEpisodeEnabled});
    }
});
