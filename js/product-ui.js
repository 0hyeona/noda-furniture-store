const btnRvtxt = document.querySelectorAll('.btn-rvtxt');

const getCollapsedHeight = (reviewParagraph) => {
    const paragraphStyle = getComputedStyle(reviewParagraph);
    const fontSize = parseFloat(paragraphStyle.fontSize);
    const lineHeight = parseFloat(paragraphStyle.lineHeight) || fontSize * 1.5;

    return lineHeight * 3;
};

const setReviewHeight = (reviewTxt) => {
    const reviewParagraph = reviewTxt.querySelector('p');

    if (!reviewParagraph) return;

    const targetHeight = reviewTxt.classList.contains('fold')
        ? getCollapsedHeight(reviewParagraph)
        : reviewParagraph.scrollHeight;

    reviewParagraph.style.maxHeight = `${targetHeight}px`;
};

btnRvtxt.forEach((btn) => {
    const reviewTxt = btn.closest('.review-txt');

    if (!reviewTxt) return;

    setReviewHeight(reviewTxt);

    btn.addEventListener('click', () => {
        reviewTxt.classList.toggle('fold');
        setReviewHeight(reviewTxt);

        if (reviewTxt.classList.contains('fold')) {
            btn.innerHTML = `더보기<img src="./img/icon-down.svg" alt="더보기 아이콘">`;
        } else {
            btn.innerHTML = `접기<img src="./img/icon-up.svg" alt="접기 아이콘">`;
        }
    });
});

window.addEventListener('resize', () => {
    btnRvtxt.forEach((btn) => {
        const reviewTxt = btn.closest('.review-txt');

        if (reviewTxt) setReviewHeight(reviewTxt);
    });
});
