function checkCardName() {
    var cname = document.getElementById("cname");
    var cnaRegx = /^([A-Z]+)$/;
    if (cname.value.trim() == "") {
        cname.style.border = "2px solid red";
        alert("Please fill the name of the debit card holder");
        return false;
    }
    else if (cnaRegx.test(cname.value.trim())) {
        cname.style.border = "1px solid black";
        return true;
    }
    else {
        cname.style.border = "2px solid red";
        alert("Invalid debit card holder name");
        return false;
    }
}

function checkCardNumber() {
    var dcRegx = /^(\d{4}-){3}\d{4}$/;
    var cnumber = document.getElementById("cnumber");
    if (cnumber.value.trim() == "") {
        cnumber.style.border = "2px solid red";
        alert("Please fill the debit card number");
        return false;
    }
    else if (dcRegx.test(cnumber.value.trim())) {
        cnumber.style.border = "1px solid black";
        return true;
    }
    else {
        cnumber.style.border = "2px solid red";
        alert("Invalid debit card number");
        return false;
    }
}

function checkMonth() {
    var cmonth = document.getElementById("cmonth");
    var dcemRegx = /^(0+)?[1-9]([0-2])?$/;
    if (cmonth.value.trim() == "") {
        cmonth.style.border = "2px solid red";
        alert("Please fill the month of expiration");
        return false;
    }
    else if (dcemRegx.test(cmonth.value.trim())) {
        cmonth.value = cmonth.value.trim().replace(/^(0+)/, "");
        cmonth.style.border = "1px solid black";
        return true;
    }
    else {
        cmonth.style.border = "2px solid red";
        alert("Invalid month of expiration");
        return false;
    }
}

function checkYear() {
    var cyear = document.getElementById("cyear");
    var dceyRegx = /^(0+)?20[2-3][1-9]$|^2040$/;
    if (cyear.value.trim() == "") {
        cyear.style.border = "2px solid red";
        alert("Please fill the year of expiration");
        return false;
    }
    else if (dceyRegx.test(cyear.value.trim())) {
        cyear.value = cyear.value.trim().replace(/^(0+)/, "");
        cyear.style.border = "1px solid black";
        return true;
    }
    else {
        cyear.style.border = "2px solid red";
        alert("Invalid year of expiration");
        return false;
    }
}

function checkCVV() {
    var ccvv = document.getElementById("ccvv");
    var cvvRegx = /^[0-9]{3}$/;
    if (ccvv.value.trim() == "") {
        ccvv.style.border = "2px solid red";
        alert("Please fill the card cvv number");
        return false;
    }
    else if (cvvRegx.test(ccvv.value.trim())) {
        ccvv.style.border = "1px solid black";
        return true;
    }
    else {
        ccvv.style.border = "2px solid red";
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
    document.getElementById("cname").addEventListener('keyup', function (e) {
        var x = document.getElementById(e.target.id);
        x.value = x.value.toUpperCase();
    });

    document.getElementById("cnumber").addEventListener('keyup', function (element) {
        var x = document.getElementById(element.target.id);
        x = x.value.split('-').join('');
        var y = x.match(/\d{1,4}/g).join('-');
        document.getElementById(element.target.id).value = y;
    });
}