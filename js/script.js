const Name = document.getElementById('name');
const Number = document.getElementById('number');
const Month = document.getElementById('month');
const Year = document.getElementById('year');
const CVC = document.getElementById('cvc');
const Confirm = document.getElementById('confirm');

const general = {
    cardnum: "0000 0000 0000 0000",
    cardname: "Jane Appleseed",
    monthyear: "00/00",
    cvc: "000"
};

const Forrun = {
    Fnum : false,
    Fname : false,
    Fmon : false,
    Fyear : false,
    Fcvc : false
};

// set default
const Setgeneral ={

    Snum :()=> document.getElementById('cardNumber').innerHTML = general.cardnum,
    Sname :() => document.getElementById('cardName').innerHTML = general.cardname,
    Smy :() =>document.getElementById('my').innerHTML = general.monthyear,
    Scvc :() => document.getElementById('cardCvc').innerHTML = general.cvc

};

//Warning check

Number.addEventListener('focusout', () => {
    let unspace_num= Number.value.replace(/ /g,'');
    if (Number.value === '') {
        space_fail('numWarning',Number.id);
        Forrun.Fnum = false;
        Setgeneral.Snum();
    }
     else if(unspace_num*1 != unspace_num){
        language_fail('numWarning',Number.id);
        Forrun.Fnum = false;
    } else {
        successstate('numWarning',Number.id);
        Forrun.Fnum = true;
    }
});

Name.addEventListener('focusout', () => {
    if (Name.value === '') {
        space_fail('nameWarning',Name.id);
        Forrun.Fname = false;
        Setgeneral.Sname();
    } else {
        successstate('nameWarning',Name.id);
        Forrun.Fname = true;
    }
});

Month.addEventListener('focusout', () => {

    if (Month.value === '') {
        space_fail('dateWarning',Month.id)
        Forrun.Fmon = false;
        Forsetmy();
    }else if(Month.value*1 != Month.value){
        language_fail('dateWarning',Month.id)
        Forrun.Fmon = false;
    }else {
        successstate('dateWarning',Month.id);
        Forrun.Fmon = true;
    }
});

Year.addEventListener('focusout', () => {
    if (Year.value === '') {
        space_fail('dateWarning',Year.id);
        Forrun.Fyear = false;
        Forsetmy();
    }else if(Year.value*1 != Year.value){
        language_fail('dateWarning',Year.id);
        Forrun.Fmon = false;
    }else {
        successstate('dateWarning',Year.id);
        Forrun.Fyear = true;
    }
});


CVC.addEventListener('focusout', () => {
    if (CVC.value === '') {
        space_fail('cvcWarning',CVC.id);
        Forrun.Fcvc = false;
        Setgeneral.Scvc();
    }else if(CVC.value*1 != CVC.value){
        language_fail('cvcWarning',CVC.id);
        Forrun.Fcvc = false;
    }else {
        successstate('cvcWarning',CVC.id);
        Forrun.Fcvc = true;
    }
});

Forsetmy = () =>{
    if (!Forrun.Fmon&&!Forrun.Fyear) {
        Setgeneral.Smy();
    }
}

// real time show & fix format

Name.addEventListener('input',() => {
    document.getElementById('cardName').innerHTML = Name.value;
})

Number.addEventListener('input',()=> {

    let num = Number.value;
    let arnum = [];
    arnum = num.match(/[\w]{1,4}/g);
    if (arnum !== null){
        Number.value = arnum.join(' ');
    }

    let realnum = Number.value.substring(0,19);
    document.getElementById('cardNumber').innerHTML = realnum;
        if (Number.value !== realnum){
            document.getElementById('number').value = realnum;
        }
})
Month.addEventListener ('input',()=>{
    let realmon = Month.value.substring(0,2);
    document.getElementById('my').innerHTML = realmon+"/"+Year.value;
        if (Month.value !== realmon){
            document.getElementById('month').value = realmon;
        }
})
Year.addEventListener ('input',()=>{
    let realyear = Year.value.substring(0,2);
    document.getElementById('my').innerHTML = Month.value+"/"+realyear;
        if (Year.value !== realyear){
            document.getElementById('year').value = realyear;
        }
})
CVC.addEventListener('input',()=>{
    let realcvc = CVC.value.substring(0,3);
    document.getElementById('cardCvc').innerHTML = realcvc;
        if (CVC.value !== realcvc){
            document.getElementById('cvc').value = realcvc
        }
})


// Warning scene

language_fail = (warn, id) => {
    document.getElementById(warn).innerHTML = 'Wrong format,numbers only';
    document.getElementById(id).style.outline = "1px solid var(--Red)";
}

space_fail = (warn, id) => {
    document.getElementById(warn).innerHTML = 'Can\'t be blank';
    document.getElementById(id).style.outline = "1px solid var(--Red)";
}

successstate = (warn, id) => {
    document.getElementById(warn).innerHTML = "";
    document.getElementById(id).style.outline = "none";
}

// next
Confirm.addEventListener('click',()=>{
    console.log(Forrun.Fname)
    console.log(Forrun.Fnum)
    console.log(Forrun.Fmon)
    console.log(Forrun.Fyear)
    console.log(Forrun.Fcvc)


    if (Forrun.Fcvc&&
        Forrun.Fmon&&
        Forrun.Fname&&
        Forrun.Fnum&&
        Forrun.Fyear){
            thankYou();
    }else {
        if(Name.value === ''){space_fail('nameWarning',Name.id)}
        if(Number.value === ''){space_fail('numWarning',Number.id)}
        if(Month.value === ''){space_fail('dateWarning',Month.id)}
        if(Year.value === ''){space_fail('dateWarning',Year.id)}
        if(CVC.value === ''){space_fail('cvcWarning',CVC.id)}
    }
})



thankYou = () => {
    document.getElementById("infomation").style.display = "none";
    document.getElementById("thank").style.display = "flex";
}