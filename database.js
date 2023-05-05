const mysql = require('mysql');

// Membuat koneksi ke database
const connection = mysql.createConnection({
    host: 'mysql-124824-0.cloudclusters.net',
    user: 'admin',
    password: 'nW6vF0D3',
    database: 'gptkw'
});

// Function to add a new question and answer to the database
function addQuestion(question, answer) {
    return new Promise((resolve, reject) => {
        // Check if the question already exists in the database
        connection.query(
            'SELECT * FROM questions WHERE question = ?',
            [question],
            (error, results) => {
                if (error) reject(error);

                // If the question exists, update its answer
                if (results.length > 0) {
                    connection.query(
                          'UPDATE questions SET answer = ? WHERE question = ?',
                          [answer, question],
                          (error, results) => {
                              if (error) reject(error);
                            //   console.log('Answer updated for question:', question);
                              resolve('Pertanyaan '+ question + ' sudah ada! Jawaban di-update ke ' + answer);
                          }
                      );
                  } // If the question doesn't exist, add a new question and answer
                  else {
                      connection.query(
                          'INSERT INTO questions (question, answer) VALUES (?, ?)',
                          [question, answer],
                          (error, results) => {
                              if (error) reject(error);
                            //   console.log('Question added to database:', question);
                              resolve('Pertanyaan '+ question +' telah ditambah');
                          }
                      );
                  }
              }
          );
    });
}

// Function to delete a question from the database
function deleteQuestion(question) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM questions WHERE question LIKE ?", [question], (err, result) => {
            if (err) reject(err);
            // console.log(`${result.affectedRows} question(s) deleted from database!`);
            if (result.affectedRows == 0) {
                resolve('Tidak ada pertanyaan '+ question + ' pada database!');
            }
            resolve('Pertanyaan '+ question + ' telah dihapus');
        });
    });
}

// Function to get the answer for a given question
function getAnswer(question) {
    return new Promise((resolve, reject) => {
        // Query to search for the answer based on the question
        const sql = "SELECT answer FROM questions WHERE question = ?";

        // Execute the query with the question parameter
        connection.query(sql, [question], function (error, results) {
            if (error) reject(error);

            // If an answer is found, return it
            if (results.length > 0) {
                const answer = results[0].answer;
                resolve(answer);
            } else {
                // If no answer is found, return an error message
                resolve("Maaf, saya tidak tahu jawabannya.");
            }
        });
    });
}

// Function to get all questions from the database
function getAllQuestions() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT question FROM questions', (error, results, fields) => {
            if (error) reject(error);
            const questions = results.map(row => row.question);
            resolve(questions);
        });
    });
}

// Function to add new history
function addHistory() {
    return new Promise((resolve, reject) => {
        const insertQuery = `INSERT INTO history (created_at) VALUES (NOW())`;
        
        connection.query(insertQuery, (error, insertResult) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

// Function to add question and answer to existing history
function addQAndARow(historyId, questionText, answerText) {
    return new Promise((resolve, reject) => {
        const insertQAndAQuery = `INSERT INTO q_and_a (history_id, question_text, answer_text) VALUES (?, ?, ?)`;
        
        connection.query(insertQAndAQuery, [historyId, questionText, answerText], (error, insertResult) => {
            if (error) {
                reject(error);
            } else {
                resolve(insertResult.insertId);
            }
        });
    });
}


// Function to retrive history from database
function getHistoryById(id) {
    return new Promise((resolve, reject) => {
        // Query to get all questions and answers from a certain history
        const query = `SELECT * FROM q_and_a WHERE history_id = ?`;

        // Run the query with parameter id
        connection.query(query, [id], (error, results) => {
          if (error) {
            reject(error);
          } else {
              const history = {
                id,
                questions: []
              };
              
              // Loop through the results of the query
              for (let i = 0; i < results.length; i++) {
                  const row = results[i];
                  
                  history.questions.push({
                      id: row.id,
                      text: row.question_text,
                      answer: row.answer_text
                  });
              }
              resolve(history);
          }
        });
    });
}

async function getRecentHistory() {
    try {
      const query = `
        SELECT history.id, q_and_a.question_text, q_and_a.answer_text
        FROM history
        JOIN q_and_a ON history.id = q_and_a.history_id
        WHERE history.id IN (
          SELECT id
          FROM history
          ORDER BY created_at DESC
          LIMIT 10
        )
        ORDER BY history.id, q_and_a.created_at
      `;
  
      const historyResults = await connection.query(query);
  
      const historyChat = [];
      let currentHistoryId;
      let currentChat;
  
      for (const row of historyResults) {
        if (row.id !== currentHistoryId) {
          if (currentChat) {
            historyChat.push({ id: currentHistoryId, chat: currentChat });
          }
          currentHistoryId = row.id;
          currentChat = [];
        }
  
        currentChat.push({ q: row.question_text, a: row.answer_text });
      }
  
      if (currentChat) {
        historyChat.push({ id: currentHistoryId, chat: currentChat });
      }
  
      return historyChat;
    } catch (error) {
      throw error;
    }
  }
    
  


// Example of use
// async function main() {
//   const question = "What is the capital of France?";
//   await deleteQuestion("When is the capital of France?");
//   questions = await getAllQuestions();
//   console.log(questions);
//   await addQuestion("What is the capital of France?", "Paris")
//   answer = await getAnswer(question);
//   console.log("here:" + answer);
//   questions = await getAllQuestions();
//   console.log(questions);
//     try {
//       // Add a new history
//       const { id, questionId } = await addHistory("What's your name?", "My name is ChatGPT.");
//       console.log(`New history added with id ${id} and question id ${questionId}`);
      
//       // Add a question and answer to the same history
//       const newQuestionId = await addQAndARow(id, "Where are you from?", "I was created by OpenAI.");
//       console.log(`New question added with id ${newQuestionId} to history ${id}`);
      
//       // Retrieve the history
//       const history = await getHistoryById(id);
//       console.log(`History ${id} retrieved:`);
//       console.log(history);
      
//     } catch (error) {
//       console.error(error);
//     }
//   connection.end();
// }

// Call main to test
// main();

// async function main() {
//     try {
//     //   // Add some test data to the database
//     //   await addHistory("What is your name?", "My name is ChatGPT");
//     //   await addQAndARow(1, "What is your age?", "I don't have an age, I'm a computer program");
//     //   await addQAndARow(1, "What can you do?", "I can answer your questions and have conversations with you");
  
//       // Retrieve the 10 most recent history items and their q_and_a rows
//       const recentHistory = await getRecentHistory();
  
//       // Log the results to the console
//       console.log(recentHistory);
//       console.log(recentHistory[0].chat);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       // Close the database connection
//       connection.end();
//     }
// }
  
// main();  

module.exports = {
  addQuestion,
  deleteQuestion,
  getAnswer,
  getAllQuestions,
  addHistory,
  addQAndARow,
  getHistoryById,
  getRecentHistory
};