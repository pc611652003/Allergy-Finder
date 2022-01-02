const saveSearchItem = async (event) => {
    event.preventDefault();
    const target = event.target;
    const name = target.getAttribute('data-name');
    const product_image = target.getAttribute('data-productImage');
    
    const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({ name, product_image }),
        headers: { 'Content-Type': 'application/json' },
    });

};

const savBtns = document.querySelectorAll('.sav-btn');
savBtns.forEach(btnEl => btnEl.addEventListener('click', saveSearchItem));