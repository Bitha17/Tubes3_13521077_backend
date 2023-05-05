module.exports = { bmSearch };

function bmSearch(pattern, text) {
    // Convert pattern and text to lowercase
    pattern = pattern.toLowerCase();
    text = text.toLowerCase();

    // Pre-processing: Compute Last Occurence Function Table
    const loFunc = lastOccurrence(pattern);

    let i = pattern.length - 1; // Pattern index
    if (i > text.pattern - 1) {
        // Pattern longer than text, pattern not found
        return -1;
    }

    let j = pattern.length - 1; // Text index

    // Loop to match pattern with text
    do {
        if (pattern[i] === text[j]) {
            if (i === 0) {
                // Pattern found
                return j;
            } else {
                // looking-glass technique
                i--;
                j--;
            }
        } else {
            // character jump technique
            const lastOc = loFunc[text.charCodeAt(j)];
            const shift = i - lastOc;
            i = pattern.length - 1;
            j += shift > 0 ? shift : pattern.length;
        }
    } while (i <= text.length - 1);

    // Pattern not found in text
    return -1;
}

function lastOccurrence(pattern) {
    const last = new Array(128).fill(-1);

    for (let i = 0; i < pattern.length; i++) {
        const charCode = pattern.charCodeAt(i);
        last[charCode] = i;
    }

    return last;
}

/*
const pattern = "ab";
const text = "aaakdakabab";

console.log(bmSearch(pattern, text)); // Output: 5
*/