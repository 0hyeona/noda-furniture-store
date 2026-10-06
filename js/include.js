fetch('./../header.html')
    .then(resopnse=>resopnse.text())
    .then(data=> {
        document.querySelector('#header-wrap').innerHTML = data;
    })