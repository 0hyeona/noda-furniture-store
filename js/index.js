const btnMenu = document.querySelector('.btn-menu');
const smartOverlayMenu = document.querySelector('.smart-overlay-menu');
const btnClose = document.querySelector('.btn-close');

// 오버레이 열고 닫는 기능 
if (btnMenu) { // btnMenu에 .btn-menu 클래스가 저장됐을 때 
    // 열기
    // 버튼을 눌렀을 때 오버레이가 나와야함 
    btnMenu.addEventListener('click', function() {
        smartOverlayMenu.classList.add('on');
    });   
}    
else { 
    alert('btn-menu 클래스가 없어요.')
}


if (btnClose) {
    // 닫기 
    // 버튼을 닫았을 때 오버레이가 닫혀야 함
    btnClose.addEventListener('click', function() {
        smartOverlayMenu.classList.remove('on');
    });
}
else { 
    alert('btn-close 클래스가 없어요.')
}

// 뎁스 영역
const gnbSmartList = document.querySelectorAll('.gnb-smart>li');
const gnb2DepthsList = document.querySelectorAll('.gnb2depths-smart');
gnbSmartList.forEach((li, idx) => {
    li.addEventListener('click', function(e) {
        e.preventDefault();

        // 색상 변경
        gnbSmartList.forEach(litag=>litag.classList.remove('on'));
        li.classList.add('on');
    
        gnb2DepthsList.forEach(div=>div.classList.remove('on'));
        gnb2DepthsList[idx].classList.add('on');
    })
});

// 실제 상품 목록이 준비된 NEW / SHOP 메뉴만 목록 페이지로 연결
document.querySelectorAll('.gnb>li:nth-child(2) a, .gnb>li:nth-child(3) a').forEach((link) => {
    link.setAttribute('href', './list.html');
});

[gnb2DepthsList[0], gnb2DepthsList[1]].forEach((menuPanel) => {
    menuPanel?.querySelectorAll('a').forEach((link) => {
        link.setAttribute('href', './list.html');
    });
});

// 아직 연결되지 않은 링크 안내 모달
const readyModal = document.createElement('div');
readyModal.className = 'ready-modal';
readyModal.setAttribute('aria-hidden', 'true');
readyModal.innerHTML = `
    <div class="ready-modal__backdrop" data-ready-modal-close></div>
    <section class="ready-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="ready-modal-title" tabindex="-1">
        <button class="ready-modal__close" type="button" data-ready-modal-close aria-label="모달 닫기">&times;</button>
        <span class="ready-modal__eyebrow">NODA</span>
        <h2 id="ready-modal-title">준비중입니다</h2>
        <p>더 좋은 모습으로 곧 찾아올게요.</p>
        <button class="ready-modal__confirm" type="button" data-ready-modal-close>확인</button>
    </section>
`;
document.body.appendChild(readyModal);

let readyModalTrigger = null;

function openReadyModal(trigger) {
    readyModalTrigger = trigger;
    readyModal.classList.add('on');
    readyModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ready-modal-open');
    readyModal.querySelector('.ready-modal__confirm').focus();
}

function closeReadyModal() {
    readyModal.classList.remove('on');
    readyModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ready-modal-open');
    readyModalTrigger?.focus();
    readyModalTrigger = null;
}

document.addEventListener('click', function(e) {
    const closeButton = e.target.closest('[data-ready-modal-close]');
    if (closeButton) {
        closeReadyModal();
        return;
    }

    const pendingLink = e.target.closest('a[href="#"]');
    if (!pendingLink) return;

    // 메뉴 제어와 리뷰 기능처럼 이미 동작이 있는 링크는 제외
    const isFunctionalControl = pendingLink.closest('.btn-menu, .btn-close, .gnb-smart')
        || pendingLink.matches('[data-review-action]');

    if (isFunctionalControl) return;

    e.preventDefault();
    openReadyModal(pendingLink);
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && readyModal.classList.contains('on')) {
        closeReadyModal();
    }
});


// 슬라이드 영역 
if (typeof Swiper !== 'undefined') {
const station = new Swiper('.hero-slider', {
    // 반복
    loop: true,

    pagination: {
        el: '.swiper-pagination',
    },

    autoplay: {
        delay: 5000,
    },

    speed: 1000
});


// 카드리스트
const cardList = new Swiper('.cardlist-wrap', {
    grabCursor: true,
    autoplay: {
        delay:3000,
    },
     breakpoints: {
        0: {
            slidesPerView: 2.2,  
            spaceBetween: 12,
        }, 
        340: { 
            slidesPerView: 1.2, 
            spaceBetween: 12,
        },
        768: {
            slidesPerView: 3.2, 
            spaceBetween: 14,
        }, 
        1024: {
            slidesPerView: 4, 
            spaceBetween: 16,
        }
    }
});

// 리뷰 카드리스트
const reviewStoryWrap = new Swiper('.review-story-wrap', {
    grabCursor: true,
    slidesPerView: 1.1,
    spaceBetween: 12,
    breakpoints: {
        0: {
            slidesPerView: 1.5,
            spaceBetween: 12,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 16,
        }
    }
});
}
