function checkUPI() {
    var upiid=document.getElementById("upiid");
    var upiRegx = /^[\w/.]+@[\w/.]+$/;
    if (upiid.value.trim() == "") {
        upiid.style.border = "2px solid red";
        alert('Please fill the upi id');
        return false;
    }
    else if (upiRegx.test(upiid.value.trim())) {
        upiid.style.border = "1px solid black";
        return true;
    }
    else {
        upiid.style.border = "2px solid red";
        alert("Invalid upi id");
        return false;
    }
}

function navigate()
{
    var upi=checkUPI();
    if (upi==true)
    {
        name = sessionStorage.getItem('name');
        let email = sessionStorage.getItem('email');
        let phone = sessionStorage.getItem('phone');
        let amount = sessionStorage.getItem('amount');
        let mode_of_payment = sessionStorage.getItem('mode_of_payment');
        fetch('/donate', {
            headers:
            {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name, email, phone, amount, mode_of_payment })
        })
            .then((response) => {
                if (response.status == 200) {
                    location.href = "/thanks";
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }
}
