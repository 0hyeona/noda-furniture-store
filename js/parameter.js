function getParameter(key) {
  const params = new URLSearchParams(location.search);
  return params.get(key);
}

function formatProductMoney(value) {
  return Number(value).toLocaleString('ko-KR');
}

const requestedProductId = Number(getParameter('pid'));
const requestedSource = getParameter('source');
const saleProduct = requestedSource === 'sale' && typeof productArray !== 'undefined' && Array.isArray(productArray)
  ? productArray.find((item) => item.detailPid === requestedProductId)
  : null;

// 메인 특가 상품에서 이동한 경우 메인 상품 데이터를 상세 페이지 형식으로 변환합니다.
const productInfo = saleProduct
  ? {
      pid: saleProduct.detailPid,
      pmenu: saleProduct.menu,
      pname: saleProduct.pname,
      pdesc: saleProduct.pdesc,
      pprice: saleProduct.price,
      pdiscount: saleProduct.discount,
      saleprice: saleProduct.salePrice,
      heart: saleProduct.pHeart,
      pimg: saleProduct.pImg
    }
  : Array.isArray(buyProductArray)
    ? buyProductArray.find((item) => item.pid === requestedProductId) || buyProductArray[0]
    : null;

if (productInfo) {
  const hasDiscount = Number(productInfo.pdiscount) > 0 && Number(productInfo.saleprice) > 0;
  const finalPrice = hasDiscount ? Number(productInfo.saleprice) : Number(productInfo.pprice);
  const discountRate = hasDiscount ? Math.round(Number(productInfo.pdiscount) * 100) : 0;
  const imagePath = `./img/${productInfo.pimg}`;

  document.title = `${productInfo.pname} | NODA`;

  const mainImage = document.querySelector('.thumbnail-img img');
  if (mainImage) {
    mainImage.src = imagePath;
    mainImage.alt = productInfo.pname;
  }

  const gallery = document.querySelector('.train-horizontal');
  if (gallery) {
    gallery.innerHTML = `
      <figure>
        <img src="${imagePath}" alt="${productInfo.pname} 썸네일">
      </figure>
    `;
  }

  const category = document.querySelector('.category-badge');
  const title = document.querySelector('.product-title');
  const description = document.querySelector('.product-description');

  if (category) category.textContent = productInfo.pmenu;
  if (title) title.textContent = productInfo.pname;
  if (description) description.textContent = productInfo.pdesc;

  const priceFrame = document.querySelector('.product-txt > .pay-frame');
  if (priceFrame) {
    priceFrame.innerHTML = hasDiscount
      ? `
        <div class="pay-original">
          <span>${formatProductMoney(productInfo.pprice)}</span>원
        </div>
        <div class="pay-discount">
          <div class="discount">${discountRate}%</div>
          <div class="pay">${formatProductMoney(finalPrice)}원</div>
        </div>
      `
      : `<div class="pay-regular">${formatProductMoney(finalPrice)}원</div>`;
  }

  const memberPrice = document.querySelector('.member-price');
  const memberDiscount = document.querySelector('.member-discount');
  const cardBenefitPrice = document.querySelector('.card-benefit-price');
  const pointBenefit = document.querySelector('.point-benefit');
  const totalPrice = document.querySelector('.total-price-value');

  if (memberPrice) memberPrice.textContent = `${formatProductMoney(finalPrice)}원`;
  if (memberDiscount) memberDiscount.textContent = hasDiscount ? `${discountRate}%` : '정상가';
  if (cardBenefitPrice) {
    const cardPrice = Math.max(finalPrice - 10000, 0);
    cardBenefitPrice.textContent = `삼성카드 ${formatProductMoney(cardPrice)}원 (10,000원 즉시할인)`;
  }
  if (pointBenefit) {
    pointBenefit.textContent = `${formatProductMoney(Math.floor(finalPrice * 0.01))}P (1%) 적립 예정`;
  }
  if (totalPrice) totalPrice.textContent = formatProductMoney(finalPrice);
}
