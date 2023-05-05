// calculator regex
const calculator_mode_regex = /^(\s*[\d()+\/*^+-]+\s*)*\??$/;
// const calculator_validation_regex = 

// date regex
const date_regex = /\d{2}\/\d{2}\/\d{4}/;

// add and delete question regex
const add_question_regex = /^Tambah pertanyaan\s.+ dengan jawaban\s.+$/i;
const delete_question_regex = /^Hapus pertanyaan/i;

function get_algo(question) {
    if (date_regex.test(question)) {
        return "Date";
    } else if (calculator_mode_regex.test(question)) {
        return "Calculator";
    } else if (date_regex.test(question)) {
        return "Date";
    } else if (add_question_regex.test(question)) {
        return "Add Question";
    } else if (delete_question_regex.test(question)) {
        return "Delete Question";
    } else {
        return "Search";
    }
}

module.exports = { get_algo };