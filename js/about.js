window.headerReady?.then(() => {
    const desktopAboutItem = [...document.querySelectorAll('.gnb>li')]
        .find(item => item.querySelector(':scope>a')?.textContent.trim() === 'ABOUT');
    const smartMenuItems = [...document.querySelectorAll('.gnb-smart>li')];
    const smartMenuPanels = [...document.querySelectorAll('.gnb2depths-smart')];

    desktopAboutItem?.classList.add('on');
    smartMenuItems.forEach(item => item.classList.remove('on'));
    smartMenuPanels.forEach(panel => panel.classList.remove('on'));
    smartMenuItems.at(-1)?.classList.add('on');
    smartMenuPanels.at(-1)?.classList.add('on');

    const sharedHeaderScript = document.createElement('script');
    sharedHeaderScript.src = './js/index.js?v=20261006';
    document.body.appendChild(sharedHeaderScript);
});
