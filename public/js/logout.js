const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const alertMessage = document.querySelector('#errorMessage-logout');
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alertMessage.innerHTML = "Fail to logout!";
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  