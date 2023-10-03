console.log('Content script is running.');

let isSkipIntroEnabled = false;
let isNextEpisodeEnabled = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleSkipIntro') {
        isSkipIntroEnabled = message.value;
        console.log('Skip Intro toggled:', isSkipIntroEnabled);
        sendResponse({isSkipIntroEnabled: isSkipIntroEnabled});
    } else if (message.action === 'toggleNextEpisode') {
        isNextEpisodeEnabled = message.value;
        console.log('Next Episode toggled:', isNextEpisodeEnabled);
        sendResponse({isNextEpisodeEnabled: isNextEpisodeEnabled});
    } else if (message.action === 'getIsSkipIntroEnabled') {
        sendResponse({isSkipIntroEnabled: isSkipIntroEnabled});
    } else if (message.action === 'getIsNextEpisodeEnabled') {
        sendResponse({isNextEpisodeEnabled: isNextEpisodeEnabled});
    }
});

function isIntroPlaying() {
    const skipButton = document.querySelector('[data-testid="player-ux-skip-button"]');
    return skipButton !== null;
}

function skipIntro() {
    const skipButton = document.querySelector('[data-testid="player-ux-skip-button"]'); 
    if (skipButton) {
        skipButton.click();
    } else {
        console.log('Skip button not found.');
    }
}

function isNextEpisodeButtonPresent() {
    const nextEpisodeButton = document.querySelector('[data-testid="player-ux-up-next-button"]');
    return nextEpisodeButton !== null;
}

function goToNextEpisode() {
    const nextEpisodeButton = document.querySelector('[data-testid="player-ux-up-next-button"]');
    if (nextEpisodeButton) {
        console.log('Going to next episode');  // Log when going to the next episode
        nextEpisodeButton.click();
    } else {
        console.log('Next episode button not found.');
    }
}

setInterval(() => {
    chrome.runtime.sendMessage({action: 'getIsSkipIntroEnabled'}, (response) => {
        if (response.isSkipIntroEnabled && isIntroPlaying()) {
            console.log('Skipping intro');
            skipIntro();
        }
    });

    chrome.runtime.sendMessage({action: 'getIsNextEpisodeEnabled'}, (response) => {
        if (response.isNextEpisodeEnabled && isNextEpisodeButtonPresent()) {
            console.log('Going to next episode');
            goToNextEpisode();
        }
    });
}, 1000);  // Check every 1000 milliseconds (1 second)
