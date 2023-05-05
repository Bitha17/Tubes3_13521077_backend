module.exports = { kmpSearch };

function kmpSearch(pattern, text) {
    // Convert pattern dan text ke lowercase
    pattern = pattern.toLowerCase();
    text = text.toLowerCase();

    // Pre-processing : compute border function
    const pj = setBorderFunction(pattern);

    let i = 0; // Text index
    let j = 0; // Pattern index

    // Loop to match pattern with text
    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
            if (j === pattern.length) {
                // Pattern match with text
                return i - j;
            }
        } else if (j > 0) {
            // Pattern not match, return to previous character
            j = pj[j - 1];
        } else {
            // Pattern not match, go to next character in text
            i++;
        }
    }
    // Pattern not found in text
    return -1;
}

function setBorderFunction(pattern) {
    // Border function for index 0 always 0
    const b = [0];
    let j = 0;

    for (let i = 1; i < pattern.length; i++) {
        while (j > 0 && pattern[j] !== pattern[i]) {
            // j follows matching prefix
            j = b[j - 1];
        }
        // j <= 0 or pattern[j] == pattern[i]

        if (pattern[j] === pattern[i]) {
            // j+1 chars match
            j++;
        }
        b[i] = j;
    }
    return b;
}

/*
const pattern = "ab";
const text = "aaakdakabab";

console.log(kmpSearch(pattern, text));
*/