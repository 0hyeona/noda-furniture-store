function formatMoney(value) {
    const number = Number(value);

    if (Number.isNaN(number)) {
        return '0';
    }

    return number.toLocaleString('ko-KR');
}

// 제품 정보
const saleUlTag = document.querySelector('.sale');

if (saleUlTag && Array.isArray(productArray)) {
    let result = productArray.map(product => {
        return `
                <li>
                    <a href="#">
                        <figure>
                            <img src="./img/${product.pImg}" alt="특가상품 ${product.pname}">
                        </figure>
                        <div class="sale-txt">
                            <p class="desc-0">${product.menu}</p>
                            <h4 class="title-1">${product.pname}</h4>
                            <p class="desc-1">${product.pdesc}</p>
                            <div class="pay-frame">
                                <div class="pay-original">
                                    <span>${formatMoney(product.price)}</span>원
                                </div>
                                <div class="pay-discount">
                                    <div class="discount">${(product.discount * 100).toFixed(0)}%</div>
                                    <div class="pay"><b>${formatMoney(product.salePrice)}</b>원</div>
                                </div>
                            </div>
                        </div>
                        <span class="product-heart"><img src="./img/heart-r.svg" alt="하트 이미지">${product.pHeart}</span>
                    </a>
                </li>
                `
    }).join('');

    console.log(result);
    saleUlTag.innerHTML = result;
}