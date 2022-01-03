const removeSavedItem = async (event) => {
    event.preventDefault();
    const target = event.target.id;
    
    const response = await fetch(`api/products/${target}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/');
    }
};

const delBtns = document.querySelectorAll('.del-btn');
delBtns.forEach(btnEl => btnEl.addEventListener('click', removeSavedItem));