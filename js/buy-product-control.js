// 세 자리씩 끊어서 돈 계산하는 코드
function formatMoney(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return '0';
  }

  return number.toLocaleString('ko-KR');
}

const productList = document.querySelector('.con2 .common-frame ul');

if (productList && Array.isArray(buyProductArray)) {
  const result = buyProductArray.map(list => {
    const hasOriginalPrice = Number.isFinite(Number(list.pprice)) && Number(list.pprice) > 0;
    const hasDiscount = Number.isFinite(Number(list.pdiscount)) && Number(list.pdiscount) > 0;
    const hasSalePrice = Number.isFinite(Number(list.saleprice)) && Number(list.saleprice) > 0;
    const regularPrice = hasOriginalPrice ? list.pprice : list.saleprice;
    const hasRegularPrice = Number.isFinite(Number(regularPrice)) && Number(regularPrice) > 0;

    return `
    <li class="card-list">
                <a href="#">
                  <figure>
                    <img src="./img/${list.pimg}" alt="상품 리스트 이미지 ${list.pid}번">
                  </figure>
                  <div class="section-1">
                    <div class="catagory">
                      <p>${list.pmenu}</p>
                    </div>
                    <div class="product-name">
                      <h4>${list.pname}</h4>
                    </div>
                    <div class="product-sub-text">
                      <p>${list.pdesc}</p>
                    </div>
                    <div class="price">
                      ${hasOriginalPrice && hasDiscount ? `
                        <div class="pay-original">
                          <span>${formatMoney(list.pprice)}</span>원
                        </div>
                      ` : ''}
                      ${hasDiscount && hasSalePrice ? `
                        <div class="pay-discount">
                          <div class="discount">${(Number(list.pdiscount) * 100).toFixed(0)}%</div>
                          <div class="pay">${formatMoney(list.saleprice)}원</div>
                        </div>
                      ` : hasRegularPrice ? `
                        <div class="pay-regular">${formatMoney(regularPrice)}원</div>
                      ` : ''}
                    </div>
                  </div>
                  <div class="section-2">
                    <figure>
                      <img src="./img/heart-r.svg" alt="좋아요 하트">
                    </figure>
                    <div class="like-txt">
                      <p>${list.heart}</p>
                    </div>
                  </div>
                </a>
              </li>
            `;
      }).join('');

  productList.innerHTML = result;
}
