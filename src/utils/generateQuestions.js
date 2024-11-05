// Function to generate a sample set of questions based on the selected category
const generateQuestions = (category) => {
  const questionsArray = [];
  for (let i = 0; i < 10; i++) {
    let question, answer, type;

    if (category === 'counting') {
      const numButterflies = Math.floor(Math.random() * 5) + 1; // 1 to 5 butterflies
      question = `${'🦋'.repeat(numButterflies)} How many butterflies are there in the group?`;
      answer = numButterflies;
      type = 'counting';
    } else {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      switch (category) {
        case 'addition':
          question = `${num1} + ${num2}`;
          answer = num1 + num2;
          break;
        case 'subtraction':
          question = `${num1} - ${num2}`;
          answer = num1 - num2;
          break;
        case 'multiplication':
          question = `${num1} * ${num2}`;
          answer = num1 * num2;
          break;
        case 'division':
          question = `${num1} / ${num2}`;
          answer = parseFloat((num1 / num2).toFixed(3));
          break;
        default:
          question = `${num1} + ${num2}`;
          answer = num1 + num2;
      }
    }

    questionsArray.push({ question, answer, type });
  }
  return questionsArray;
};


export default generateQuestions;