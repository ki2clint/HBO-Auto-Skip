document.addEventListener('DOMContentLoaded', () => {
    // Load the stored state from chrome.storage.local when the popup is opened
    chrome.storage.local.get({isSkipIntroEnabled: true, isNextEpisodeEnabled: true}, (result) => {
        document.getElementById('skipIntroSwitch').checked = result.isSkipIntroEnabled;
        document.getElementById('nextEpisodeSwitch').checked = result.isNextEpisodeEnabled;
    });

    document.getElementById('skipIntroSwitch').addEventListener('change', (event) => {
        const isSkipIntroEnabled = event.target.checked;
        chrome.storage.local.set({isSkipIntroEnabled: isSkipIntroEnabled});  // Store the state
        chrome.runtime.sendMessage({action: 'toggleSkipIntro', value: isSkipIntroEnabled});
    });

    document.getElementById('nextEpisodeSwitch').addEventListener('change', (event) => {
        const isNextEpisodeEnabled = event.target.checked;
        chrome.storage.local.set({isNextEpisodeEnabled: isNextEpisodeEnabled});  // Store the state
        chrome.runtime.sendMessage({action: 'toggleNextEpisode', value: isNextEpisodeEnabled});
    });
});
