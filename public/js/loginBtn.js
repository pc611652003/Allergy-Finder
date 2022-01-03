const loginRedirect = (event) => {
    event.preventDefault();
    document.location.replace('/login');
}

document.querySelector('#login').addEventListener('click', loginRedirect);