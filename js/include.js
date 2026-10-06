window.headerReady = fetch('./header.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('헤더를 불러오지 못했습니다.');
        }

        return response.text();
    })
    .then(data => {
        const headerWrap = document.querySelector('#header-wrap');

        if (headerWrap) {
            headerWrap.innerHTML = data;
        }
    })
    .catch(error => {
        console.error(error);
    });
