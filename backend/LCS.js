module.exports = { lcs };

function lcs(pattern, text) {
    const m = pattern.length;
    const n = text.length;
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (pattern[i - 1] === text[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }

    const lcsLength = dp[m][n];
    const ratio = lcsLength / n;
    console.log("LCS :", ratio);

    return ratio;
}
