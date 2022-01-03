const saveSearchItem = async (event) => {
    event.preventDefault();
    const target = event.target;
    const name = target.getAttribute('data-name');
    const product_image = target.getAttribute('data-productImage');
    const product_id = target.getAttribute('data-productId');
    
    const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({ name, product_id, product_image }),
        headers: { 'Content-Type': 'application/json' },
    });

};

const savBtns = document.querySelectorAll('.sav-btn');
savBtns.forEach(btnEl => btnEl.addEventListener('click', saveSearchItem));