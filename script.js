
function myf() {

    document.getElementById('bin').addEventListener("keydown", (e) => {
        let content = document.getElementById('pele').textContent;
        if (Number(e.key) || e.key == 0) {

            if (e.key > 1) {
                document.getElementById('pele').textContent = content;

                document.getElementById('bin').blur();
                document.getElementById('bin').setAttribute('data-toggle', 'tooltip');
                document.getElementById('bin').setAttribute('data-placement', 'right');
                document.getElementById('bin').setAttribute('data-original-title', '>1 input');

            }

            else {
                document.getElementById('bin').removeAttribute('title');
                document.getElementById('bin').setAttribute('data-original-title', '');
            }
        }


        else if (e.key == "Backspace") {

            content = content.slice(0, content.length - 1);
            document.getElementById('pele').textContent = content;

            if (content[content.length - 1] < 2) {
                document.getElementById('convt').disabled = false;
                document.getElementById('bin').removeAttribute('title');
                document.getElementById('bin').setAttribute('data-original-title', '');
            }

        }
        else if (e.key == "."){ content+=e.key }
        else {
            document.getElementById('bin').blur();
            document.getElementById('bin').removeAttribute('title');
            document.getElementById('bin').setAttribute('data-original-title', 'Bad Data');
        }
    });

    document.getElementById('bin').addEventListener('keypress', (e) => {
        if (Number(e.key) > 1 && e.key != 0 && e.key!=".") {
            document.getElementById('bin').blur();
        }
    })
}

function convert1() {
    let n = $("input[type='radio']:checked").val()

    switch (Number(n)) {
        case 2:
            s = document.getElementById('bin').value;
            s = s.toString() ; cvtToDec(s, 2); binToHex(s); binToOct(s);
            break;
        case 8:
            s = document.getElementById('oct').value; x = cvtToDec(s.toString(), 8);
            y = decToBin(x.toString()); y = y.toString(); binToHex(y);
            break;
        case 10:
            s = document.getElementById('dec').value;
            y = decToBin(s); y = y.toString() ; binToOct(y); binToHex(y);
            break;
        case 16:
            s = document.getElementById('hex').value;
            x = cvtToDec(s.toString(), 16); y = decToBin(x.toString()); y = y.toString(); binToOct(y);
            break;
    }
}
function clearInput() {
    document.getElementById('bin').value = ""; document.getElementById('dec').value = ""; 
    document.getElementById('oct').value = ""; document.getElementById('hex').value = ""; 
}

var focused = "";
function chec() {
    let s = $("input[type='radio']:checked").val();

    $('input:text').focus(function () { //last focused element
        focused = this.id;
    });

    switch (Number(s)) {
        case 10:

            document.getElementById(`${focused}`).setAttribute('readonly', true);
            document.getElementById('dec').removeAttribute('readonly');
            document.getElementById('dec').focus();

            break;
        case 8:

            document.getElementById(focused).setAttribute('readonly', true);
            document.getElementById('oct').removeAttribute('readonly');
            document.getElementById('oct').focus();

            break;
        case 16:

            document.getElementById(focused).setAttribute('readonly', true);
            document.getElementById('hex').removeAttribute('readonly');
            document.getElementById('hex').focus();

            break;
        default:

            document.getElementById('bin').removeAttribute('readonly');
            document.getElementById('bin').focus();
            document.getElementById('dec').setAttribute('readonly', true);
            document.getElementById('oct').setAttribute('readonly', true);
            document.getElementById('hex').setAttribute('readonly', true);
    }
    clearInput();
}

function cvtToDec(s, base) {
    i = 0
    while (s[i] == 0) { i++; }
    s = s.slice(i)

    if (s.indexOf(".") == -1)
        s = s + "."

    bef_dec = s.slice(0, s.indexOf("."))

    sumBefDec = 0 , sumAftDec = 0

    for (var i = bef_dec.length - 1; i >= bef_dec.length - (s.length - 1); i--) {
        if (i < 0){ x = s[bef_dec.length - i] }
        else{ x = bef_dec[bef_dec.length - 1 - i]; }

        switch (x) {
            case "A": x = 10; break;; case "B": x = 11; break;; case "C": x = 12; break;;
            case "D": x = 13; break;; case "E": x = 14; break;; case "F": x = 15; break;;
        }
        if (i < 0) { sumAftDec += x * (base ** i) }
        else { sumBefDec += x * (base ** i) }
    }
    sum = sumBefDec + sumAftDec
    document.getElementById("dec").value = sum;
    return sum;
}

function binToOct(s) {
    i = 0
    while (s[i] == 0) {
        i++;
    }
    s = s.slice(i)

    if (s.indexOf(".") == -1)
        s = s + "."

    bef_dec = s.slice(0, s.indexOf("."))
    aft_dec = s.slice(s.indexOf(".") + 1);

    sum = 0; digits = [];
    switch (bef_dec.length % 3) { case 0: break; case 1: s = "0" + s; case 2: s = "0" + s; }
    switch (aft_dec.length % 3) { case 0: break; case 1: s = s + "0"; case 2: s = s + "0"; }

    for (var i = 0; i < s.length; i += 3) {
        if (s[i] == ".") {
            digits.push(".")
            i++;
        }
    
        n = i;

        pow = 0;
        while (n < i + 3 && n < s.length) {
            sum += s[n] * (2 ** (2 - pow))
            n++;
            pow++;
        }
        digits.push(sum);
        sum = 0;
    }
    document.getElementById("oct").value = "";
    document.getElementById("oct").value = digits.join("");
}

function binToHex(s) {
    i = 0
    while (s[i] == 0) { i++; }
    s = s.slice(i)

    if (s.indexOf(".") == -1) {s = s + "."}

    bef_dec = s.slice(0, s.indexOf("."))
    aft_dec = s.slice(s.indexOf(".") + 1);


    sum = 0; digits = [];
    switch (bef_dec.length % 4) {
        case 0: break;
        case 1: s = "0" + s
        case 2: s = "0" + s
        case 3: s = "0" + s        
    }
    switch (aft_dec.length % 3) {
        case 0: break;
        case 1: s = s + "0"
        case 2: s = s + "0"
        case 3: s = s + "0"
    }

    for (var i = 0; i < s.length; i += 4) {

        if (s[i] == ".") {
            digits.push(".")
            i++;
        }

        n = i;
        pow = 0;
        while (n < i + 4 && n < s.length) {
            sum += s[n] * (2 ** (3 - pow))
            n++;
            pow++;
        }

        switch (sum) {
            case 10: sum = "A"; break;
            case 11: sum = "B"; break;
            case 12: sum = "C"; break;
            case 13: sum = "D"; break;
            case 14: sum = "E"; break;
            case 15: sum = "F"; break;
        }

        digits.push(sum);
        sum = 0;
    }
    document.getElementById("hex").value = "";
    document.getElementById("hex").value = digits.join("");
}
function decToBin(s)
{
    bin = ""; aft_dec = ""
    b = s;
    if(s.indexOf(".")==-1) { b = s+"." }

    bef_dec = b.slice(0,b.indexOf("."))

    while(bef_dec > 0)
    {
        x = bef_dec%2;
        bin = x.toString() + bin ;
        bef_dec = parseInt(bef_dec/2) ;
    }
    
    dec_val = "0." + b.slice(b.indexOf(".")+1)

    while(dec_val>0)
    {
        dec_val*=2 ;
        st = parseInt(dec_val).toString();
        aft_dec += st;
        st = parseFloat(dec_val).toString();

        if(st.indexOf(".")==-1 || aft_dec.length>5) { break; }
        else {st = "."+st.slice(st.indexOf(".")+1)}
        
        dec_val = st;
    }
    result = bin+"."+ aft_dec ;
    document.getElementById("bin").value = ""
    
    if(!s.includes("."))
    {
        document.getElementById("bin").value = result.slice(0,result.indexOf("."));
        return result.slice(0,result.indexOf(".")) ;   
    }
    document.getElementById("bin").value = result;
    return result;
}