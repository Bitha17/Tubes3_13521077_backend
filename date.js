// Input output 
/*
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function inputDate() {
    rl.question('Tanggal : ', (dateString) => {
        try {
            const result = getDay(dateString);
            console.log(`Maka, tanggal ${dateString} merupakan hari ${result}`);
            //console.log('Bandingkan dengan ini', getDayName(dateString));
        } catch (error) {
            console.log('Terjadi kesalahan: ' + error);
        }
    });
}
*/

module.exports = { getDay }

function getDay(dateString) {
    arrayDate = dateString.split(/\D+/);
    for (let i = 0; i < 3; i++) {
        arrayDate[i] = Number(arrayDate[i]);
    }
    // console.log("Number", arrayDate);
    if ((arrayDate[0] < 0 || arrayDate[0] > 31 || arrayDate[1] < 0 || arrayDate[1] > 12 || arrayDate[2] < 0)) {
        return "Waduh! Masukkan tanggal tidak valid.";
    }
    if ((arrayDate[1] == 4 || arrayDate[1] == 6 || arrayDate[1] == 8 || arrayDate[1] == 9 || arrayDate[1] == 11) && (arrayDate[0] > 30)) {
        return "Waduh! Masukkan tanggal tidak valid.";
    }
    if (arrayDate[1] == 2) {
        if (isKabisat(arrayDate[2]) && arrayDate[1] > 29) return "Waduh! Masukkan tanggal tidak valid.";
        else if (!isKabisat(arrayDate[2] && arrayDate[1] > 28)) return "Waduh! Masukkan tanggal tidak valid.";
    }
    diff = getDifference(arrayDate);
    return calculateDay(diff);
}

function getDifference(array) {
    year = 0;
    for (let i = 0; i < array[2]; i++) {
        year += 365;
        //console.log("tahun", array[2]);
        if (isKabisat(i)) {
            //console.log(array[2], "kabisat");
            year++;
        }
    }

    month = 0;
    switch (array[1]) {
        case 12: month += 30; //console.log("12", month);
        case 11: month += 31; //console.log("11", month);
        case 10: month += 30; //console.log("10", month);
        case 9: month += 31; //console.log("9", month);
        case 8: month += 31; //console.log("8", month);
        case 7: month += 30; //console.log("7", month);
        case 6: month += 31; //console.log("6", month);
        case 5: month += 30; //console.log("5", month);
        case 4: month += 31; //console.log("4", month);
        case 3: month += 28; //console.log("3", month);
        case 2: month += 31; break; //console.log("2", month); break;
    }
    if (isKabisat(array[2]) && array[1] > 2) month++;

    day = array[0] - 1
    //console.log('Tahun', array[2], year);
    //console.log('Bulan', array[1], month);
    //console.log('Hari', array[0], day);
    //console.log('Hasil', year + month + day);
    return year + month + day;
}

function isKabisat(year) {
    // console.log("Here", year, year % 4 == 0, year % 100 != 0, year % 400 == 0, ":", (year % 100 != 0 || year % 400 == 0), (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0));
    return ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) && (year > 0);
}

function calculateDay(differenceDay) {
    const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    //console.log('Hari', day[differenceDay % 7]);
    return day[differenceDay % 7];
}

//inputDate();



/* Pembanding
function getDayName(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayIndex = date.getUTCDay();
    return days[dayIndex]
}
*/