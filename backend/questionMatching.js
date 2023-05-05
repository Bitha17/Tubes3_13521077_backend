module.exports = { searchQuestionKMP, searchQuestionBM };

const kmp = require('./kmp');
const bm = require('./bm');
const lc = require('./LCS');

const FastPriorityQueue = require('fastpriorityqueue');
const prioRatio = new FastPriorityQueue((a, b) => a[0] > b[0]);

function searchQuestionKMP(arrtext, pattern) {
    found = false;
    for (let i = 0; i < arrtext.length && !found; i++) {
        result = kmp.kmpSearch(pattern, arrtext[i]);
        if (result != -1) {
            // Exact match
            found = true;
            return [found, arrtext[i]];
        }
    }
    if (!found) {
        // Question not found, find similarity
        for (let i = 0; i < arrtext.length && !found; i++) {
            ratio = lc.lcs(pattern, arrtext[i]);
            if (ratio >= 0.9) {
                found = true;
                return [found, arrtext[i]];
            } else {
                prioRatio.add([ratio, arrtext[i]]);
            }
        }
    }
    if (!found) {
        top3 = ['', '', ''];
        for (let i = 0; i < 3; i++) {
            [priority, value] = prioRatio.poll();
            top3[i] = value;
        }
        return [found, top3];
    }
}

function searchQuestionBM(arrtext, pattern) {
    found = false;
    for (let i = 0; i < arrtext.length && !found; i++) {
        result = bm.bmSearch(pattern, arrtext[i]);
        if (result == 0) {
            // Exact match
            found = true;
            return [found, arrtext[i]];
        }
    }
    if (!found) {
        // Question not found, find similarity
        for (let i = 0; i < arrtext.length && !found; i++) {
            ratio = lc.lcs(pattern, arrtext[i]);
            if (ratio >= 0.9) {
                found = true;
                return [found, arrtext[i]];
            } else {
                prioRatio.add([ratio, arrtext[i]]);
            }
        }
    }
    if (!found) {
        top3 = ['', '', ''];
        for (let i = 0; i < 3; i++) {
            [priority, value] = prioRatio.poll();
            top3[i] = value;
        }
        return [found, top3];
    }
}

/*
arrQuest = ["Apa kabar", "Aku mau makan dulu", "Belom beli makan"];
[a, b] = searchQuestionKMP(arrQuest, "hai");
console.log(a); console.log(b);
*/

/*
const FastPriorityQueue = require('fastpriorityqueue');

// Inisialisasi priority queue
const pq = new FastPriorityQueue((a, b) => a[0] > b[0]);

// Tambahkan elemen ke dalam priority queue
pq.add([2.5, 'apple']);
pq.add([4.2, 'banana']);
pq.add([3.1, 'orange']);

// Tampilkan elemen-elemen pada priority queue
while (!pq.isEmpty()) {
  const [priority, value] = pq.poll();
  console.log(`${value} (${priority})`);
}
*/