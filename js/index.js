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


// 슬라이드 영역 
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
const reviewCardstory = new Swiper('.review-stroy-wrap', {
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