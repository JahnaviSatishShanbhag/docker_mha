function checkCardName() {
    var ccname = document.getElementById("ccname");
    var cnaRegx = /^([A-Z]+)$/;
    if (ccname.value.trim() == "") {
        ccname.style.border = "2px solid red";
        alert("Please fill the name of the debit card holder");
        return false;
    }
    else if (cnaRegx.test(ccname.value.trim())) {
        ccname.style.border = "1px solid black";
        return true;
    }
    else {
        ccname.style.border = "2px solid red";
        alert("Invalid debit card holder name");
        return false;
    }
}

function checkCardNumber() {
    var dcRegx = /^(\d{4}-){3}\d{4}$/;
    var ccnumber = document.getElementById("ccnumber");
    if (ccnumber.value.trim() == "") {
        ccnumber.style.border = "2px solid red";
        alert("Please fill the debit card number");
        return false;
    }
    else if (dcRegx.test(ccnumber.value.trim())) {
        ccnumber.style.border = "1px solid black";
        return true;
    }
    else {
        if (ccnumber.value.length > 19) {
            ccnumber.value = ccnumber.value.trim().replace(ccnumber.value, ccnumber.value.slice(0, 19));
            if (dcRegx.test(ccnumber.value.trim())) {
                return true;
            }
            else {
                ccnumber.style.border = "2px solid red";
                alert("Invalid debit card number");
                return false;
            }
        }
        else {

            ccnumber.style.border = "2px solid red";
            alert("Invalid debit card number");
            return false;
        }
    }
}

function checkMonth() {
    var ccmonth = document.getElementById("ccmonth");
    var dcemRegx = /^(0+)?[1-9]([0-2])?$/;
    if (ccmonth.value.trim() == "") {
        ccmonth.style.border = "2px solid red";
        alert("Please fill the month of expiration");
        return false;
    }
    else if (dcemRegx.test(ccmonth.value.trim())) {
        ccmonth.value = ccmonth.value.trim().replace(/^(0+)/, "");
        ccmonth.style.border = "1px solid black";
        return true;
    }
    else {
        ccmonth.style.border = "2px solid red";
        alert("Invalid month of expiration");
        return false;
    }
}

function checkYear() {
    var ccyear = document.getElementById("ccyear");
    var dceyRegx = /^(0+)?20[2-3][1-9]$|^2040$/;
    if (ccyear.value.trim() == "") {
        ccyear.style.border = "2px solid red";
        alert("Please fill the year of expiration");
        return false;
    }
    else if (dceyRegx.test(ccyear.value.trim())) {
        ccyear.value = ccyear.value.trim().replace(/^(0+)/, "");
        ccyear.style.border = "1px solid black";
        return true;
    }
    else {
        ccyear.style.border = "2px solid red";
        alert("Invalid year of expiration");
        return false;
    }
}

function checkCVV() {
    var ccvvc = document.getElementById("ccvvc");
    var cvvRegx = /^[0-9]{3}$/;
    if (ccvvc.value.trim() == "") {
        ccvvc.style.border = "2px solid red";
        alert("Please fill the card cvv number");
        return false;
    }
    else if (cvvRegx.test(ccvvc.value.trim())) {
        ccvvc.style.border = "1px solid black";
        return true;
    }
    else {
        ccvvc.style.border = "2px solid red";
        alert("Invalid debit card cvv number");
        return false;
    }
}

function navigate() {
    var name = checkCardName();
    var number = checkCardNumber();
    var month = checkMonth();
    var year = checkYear();
    var cvv = checkCVV();
    if (name == true && number == true && month == true && year == true && cvv == true) {
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
window.onload = function () {
    document.getElementById("ccname").addEventListener('keyup', function (e) {
        var x = document.getElementById(e.target.id);
        x.value = x.value.toUpperCase();
    });

    document.getElementById("ccnumber").addEventListener('keyup', function (element) {
        var x = document.getElementById(element.target.id);
        x = x.value.split('-').join('');
        var y = x.match(/\d{1,4}/g).join('-');
        document.getElementById(element.target.id).value = y;
    });
}
