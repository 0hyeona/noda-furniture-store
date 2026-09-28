const reviewProfiles = [
    { userName: '김서연', date: '2026.09.18' },
    { userName: '박지훈', date: '2026.09.12' },
    { userName: '이민지', date: '2026.09.05' },
    { userName: '최하은', date: '2026.08.29' },
    { userName: '정도윤', date: '2026.08.21' },
    { userName: '윤지아', date: '2026.08.14' }
];

const reviewImageSets = [
    ['review-img1.jpg', 'review-img2.jpg', 'review-img3.jpg'],
    ['review-img4.jpg', 'review-img5.jpg'],
    ['review-img6.jpg'],
    ['review-img2.jpg', 'review-img5.jpg'],
    ['review-img1.jpg', 'review-img4.jpg'],
    ['review-img3.jpg', 'review-img6.jpg']
];

const reviewMessages = [
    (product) => `${product.pname}을 받아보니 사진보다 소재와 색감이 더 자연스러워요.
공간에 놓았을 때 크기가 부담스럽지 않고 주변 가구와도 잘 어울립니다.
마감이 깔끔하고 사용하기 편해서 가족들도 모두 만족하고 있어요.
배송과 설치도 안내받은 일정에 맞춰 진행되어 전반적으로 만족스러운 구매였습니다.`,
    (product) => `${product.pmenu} 제품을 오래 비교하다가 디자인이 마음에 들어 선택했어요.
실제로 사용해 보니 기본기가 탄탄하고 디테일도 세심하게 마감되어 있습니다.
특히 ${product.pname} 특유의 차분한 분위기가 집 안에 자연스럽게 스며들어요.
유행을 많이 타지 않을 것 같아 오래 사용할 수 있을 것 같습니다.`,
    (product) => `화면에서 본 모습과 실제 제품의 차이가 거의 없어서 좋았습니다.
${product.pname}은 크기와 비율이 안정적이라 기존 인테리어를 해치지 않아요.
며칠 사용해 보니 관리도 어렵지 않고 일상에서 손이 자주 갑니다.
비슷한 분위기의 ${product.pmenu} 제품을 찾는 분께 추천하고 싶어요.`
];

const reviewProducts = typeof buyProductArray !== 'undefined' && Array.isArray(buyProductArray)
    ? buyProductArray
    : [];

// 리뷰가 아직 없는 상품도 확인할 수 있도록 일부 pid는 데이터 생성에서 제외합니다.
const reviewedProductIds = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11];

// 상품마다 동일한 구조의 가상 리뷰 3개를 만들어 pid로 연결합니다.
const reviewArray = reviewProducts
    .filter((product) => reviewedProductIds.includes(product.pid))
    .flatMap((product, productIndex) => (
    reviewMessages.map((createMessage, reviewIndex) => {
        const sourceIndex = (productIndex + reviewIndex) % reviewProfiles.length;

        return {
            rid: product.pid * 100 + reviewIndex + 1,
            pid: product.pid,
            userName: reviewProfiles[sourceIndex].userName,
            date: reviewProfiles[sourceIndex].date,
            rating: reviewIndex === 2 && productIndex % 3 === 1 ? 4 : 5,
            reviewImgs: reviewImageSets[sourceIndex],
            reviewTxt: createMessage(product),
            helpful: 4 + ((productIndex * 7 + reviewIndex * 3) % 25)
        };
    })
    ));

function escapeReviewHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    })[character]);
}

function maskReviewerName(name) {
    if (name.length < 2) return name;
    return `${name[0]}*${name.slice(2)}`;
}

function createReviewStars(rating) {
    return Array.from({ length: 5 }, (_, index) => `
        <img class="${index >= rating ? 'is-empty' : ''}" src="./img/star.svg" alt="${index < rating ? '채워진 별' : '빈 별'}">
    `).join('');
}

function createReviewImages(review) {
    if (!review.reviewImgs.length) return '';

    return `
        <div class="review-img">
            <ul class="review-gallery">
                ${review.reviewImgs.map((image, index) => `
                    <li><img src="./img/${escapeReviewHtml(image)}" alt="${escapeReviewHtml(maskReviewerName(review.userName))}님의 리뷰 이미지 ${index + 1}"></li>
                `).join('')}
            </ul>
        </div>
    `;
}

function createReviewItem(review) {
    const reviewText = escapeReviewHtml(review.reviewTxt.trim()).replace(/\n/g, '<br>');

    return `
        <li data-review-id="${review.rid}">
            <div class="review-user">
                <span class="rev-name">${escapeReviewHtml(maskReviewerName(review.userName))}</span>
                <span class="rev-date">${escapeReviewHtml(review.date)}</span>
            </div>
            <div class="review-content">
                <div class="star" aria-label="평점 ${review.rating}점">
                    ${createReviewStars(review.rating)}
                </div>
                <div class="review-txt fold">
                    <p>${reviewText}</p>
                    <button class="btn-rvtxt" type="button">더보기<img src="./img/icon-down.svg" alt="더보기 아이콘"></button>
                </div>
                ${createReviewImages(review)}
                <div class="review-etc">
                    <a href="#" data-review-action="helpful">
                        <img src="./img/icon-review-good.svg" alt="좋아요">
                        유용해요 <span class="helpful-count">${review.helpful}</span>
                    </a>
                    <a href="#" data-review-action="report">
                        <img src="./img/icon-review-bad.svg" alt="신고하기">
                        <span>신고 차단</span>
                    </a>
                </div>
            </div>
        </li>
    `;
}

const reviewList = document.querySelector('.review');
const requestedReviewProductId = Number(new URLSearchParams(location.search).get('pid')) || reviewProducts[0]?.pid;
const visibleReviews = reviewArray.filter((review) => review.pid === requestedReviewProductId);

if (reviewList) {
    reviewList.innerHTML = visibleReviews.length
        ? visibleReviews.map(createReviewItem).join('')
        : `
            <li class="review-empty">
                <strong>아직 등록된 상품 리뷰가 없습니다.</strong>
                <p>이 상품의 첫 번째 리뷰를 기다리고 있어요.</p>
            </li>
        `;

    const reviewTitle = document.querySelector('#product-detail-2 h2');
    if (reviewTitle) reviewTitle.textContent = `상품 리뷰 (${visibleReviews.length})`;

    reviewList.addEventListener('click', (event) => {
        const actionLink = event.target.closest('[data-review-action]');
        if (!actionLink) return;

        event.preventDefault();

        if (actionLink.dataset.reviewAction === 'helpful' && !actionLink.classList.contains('on')) {
            actionLink.classList.add('on');
            const count = actionLink.querySelector('.helpful-count');
            if (count) count.textContent = Number(count.textContent) + 1;
        }

        if (actionLink.dataset.reviewAction === 'report') {
            actionLink.classList.add('on');
            const label = actionLink.querySelector('span');
            if (label) label.textContent = '신고됨';
        }
    });
}
