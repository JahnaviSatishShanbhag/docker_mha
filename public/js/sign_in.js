function redirectYourPage() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let userExist = false;
    fetch('http://localhost:5500/signin',
        {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email: email, password: password })
        }
    )
        .then((response) => {
            if (response.status == 200) {
                userExist = true;
                location.href = "/home";
            }
            else {
                userExist = false;
                document.getElementById('lb3').style.display = 'inline';
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
}