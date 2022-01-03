const savedAlert = document.querySelector('#saved-Alert');
savedAlert.innerHTML = "";

const saveSearchItem = async (event) => {
    event.preventDefault();
    const target = event.target;
    const nameAttitute = target.getAttribute('data-name');
    const product_image = target.getAttribute('data-productImage');
    
    const name = nameAttitute.replace(/%20/g, " ");

    const response = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({ name, product_image }),
        headers: { 'Content-Type': 'application/json' },
    });

    savedAlert.innerHTML = `${name} is saved !`;
};

const savBtns = document.querySelectorAll('.sav-btn');
savBtns.forEach(btnEl => btnEl.addEventListener('click', saveSearchItem));