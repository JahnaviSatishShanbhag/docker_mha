function checkName() {
    var name = document.getElementById("name");
    var naRegx = /^([a-z A-Z]+)$/;
    if (name.value.trim() == "") {
        alert('Please fill your name');
        name.style.border = "2px solid red";
        // document.getElementById("lb1").style.visibility = "visible";
        return false;
    }
    else if (naRegx.test(name.value.trim())) {
        name.style.border = "2px solid rgb(23, 181, 192)";
        document.getElementById("lb1").style.visibility = "hidden";
        return true;
    }
    else {
        name.style.border = "2px solid red";
        document.getElementById("lb1").style.visibility = "visible";
        return false;
    }
}

function checkEmail() {
    var email = document.getElementById("email");
    var emRegx = /^([a-z 0-9/.-]+)@([a-z 0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (email.value.trim() == "") {
        alert('Please fill your email id');
        email.style.border = "2px solid red";
        // document.getElementById("lb2").style.visibility = "visible";
        return false;
    }
    else if (emRegx.test(email.value.trim())) {
        email.style.border = "2px solid rgb(23, 181, 192)";
        document.getElementById("lb2").style.visibility = "hidden";
        return true;
    }
    else {
        email.style.border = "2px solid red";
        document.getElementById("lb2").style.visibility = "visible";
        return false;
    }
}

function checkPhone() {
    var phone = document.getElementById("phone");
    var phRegx = /^[6-9]\d{9}$/;
    if (phone.value.trim() == "") {
        alert('Please fill your contact number');
        phone.style.border = "2px solid red";
        // document.getElementById("lb3").style.visibility = "visible";
        return false;
    }
    else if (phRegx.test(phone.value.trim())) {
        phone.style.border = "2px solid rgb(23, 181, 192)";
        document.getElementById("lb3").style.visibility = "hidden";
        return true;
    }
    else {
        if (phone.value.length > 10) {
            phone.value = phone.value.trim().replace(phone.value, phone.value.slice(0, 10));
            if (phRegx.test(phone.value.trim())) {
                phone.style.border = "2px solid rgb(23, 181, 192)";
                document.getElementById("lb3").style.visibility = "hidden";
                return true;
            }
            else
            {
                phone.style.border = "2px solid red";
                document.getElementById("lb3").style.visibility = "visible";
                return false;
            }
        }
        else {

            phone.style.border = "2px solid red";
            document.getElementById("lb3").style.visibility = "visible";
            return false;
        }
    }
}

function checkAmount() {
    var amount = document.getElementById("amount");
    var amRegx = /^(0+)?[1-9]([0-9]*)$/;
    if (amount.value.trim() == "") {
        alert('Please fill the amount');
        amount.style.border = "2px solid red";
        // document.getElementById("lb4").style.visibility = "visible";
        return false;
    }
    else if (amRegx.test(amount.value.trim())) {
        amount.value = amount.value.trim().replace(/^(0+)/, "");
        amount.style.border = "2px solid rgb(23, 181, 192)";
        document.getElementById("lb4").style.visibility = "hidden";
        return true;
    }
    else {
        amount.style.border = "2px solid red";
        document.getElementById("lb4").style.visibility = "visible";
        return false;
    }
}

function pay() {
    var payment = document.getElementById("payment");
    var name = checkName();
    var email = checkEmail();
    var phone = checkPhone();
    var amount = checkAmount();
    if (name == true && email == true && phone == true && amount == true) {
        sessionStorage.setItem('name',document.getElementById("name").value);
        sessionStorage.setItem('email',document.getElementById("email").value);
        sessionStorage.setItem('phone',document.getElementById("phone").value);
        sessionStorage.setItem('amount',document.getElementById("amount").value);
        if (payment.value == "DC") {
            sessionStorage.setItem('mode_of_payment','Debit card');
            location.href = "/donate/debit";
        }
        else if (payment.value == "CC") {
            sessionStorage.setItem('mode_of_payment','Credit card');
            location.href = "/donate/credit";
        }
        else {
            sessionStorage.setItem('mode_of_payment','UPI');
            location.href = "/donate/upi";
        }
    }
}