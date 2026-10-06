const mainPopup = document.querySelector('.main-popup');

if (mainPopup) {
    const popupStorageKey = 'nodaMainPopupHiddenUntil';
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    function closeMainPopup() {
        mainPopup.classList.remove('on');
        mainPopup.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('main-popup-open');
    }

    function openMainPopup() {
        mainPopup.classList.add('on');
        mainPopup.setAttribute('aria-hidden', 'false');
        document.body.classList.add('main-popup-open');
    }

    function getPopupHiddenUntil() {
        try {
            return Number(localStorage.getItem(popupStorageKey)) || 0;
        } catch (error) {
            return 0;
        }
    }

    function hidePopupForOneDay() {
        const hiddenUntil = Date.now() + oneDayInMilliseconds;

        try {
            localStorage.setItem(popupStorageKey, String(hiddenUntil));
        } catch (error) {
            // 저장소 사용이 제한된 환경에서도 현재 팝업은 정상적으로 닫습니다.
        }

        closeMainPopup();
    }

    const hiddenUntil = getPopupHiddenUntil();

    if (hiddenUntil > Date.now()) {
        closeMainPopup();
    } else {
        try {
            localStorage.removeItem(popupStorageKey);
        } catch (error) {
            // 만료된 값을 삭제할 수 없어도 팝업 표시에는 영향이 없습니다.
        }

        openMainPopup();
    }

    mainPopup.querySelector('[data-popup-close]').addEventListener('click', closeMainPopup);
    mainPopup.querySelector('[data-popup-hide-today]').addEventListener('click', hidePopupForOneDay);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mainPopup.classList.contains('on')) {
            closeMainPopup();
        }
    });
}
