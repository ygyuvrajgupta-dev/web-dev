
(function() {
  const questions = [
    { q: "What comes after 5", a: "6" },
    { q: "What full form of KRMU # initials should capital", a: "Kr Mangalam University"},
    { q: "What is the colour of sky", a: "blue" },
    { q: "What is full form of CPU", a: "central processing unit" },
    { q: "What is full form of CSS", a: "casscading style sheets" }
  ];

  let score = 0;

  
  function normalize(input) {
    if (input === null) return ""; 
    return String(input).toLowerCase().trim();
  }


  function askQuestion(item, index, total) {
    const raw = prompt(`Question ${index + 1} of ${total}:\n${item.q}`);
    const answer = normalize(raw);
    const correct = answer === normalize(item.a);

    if (correct) {
      score++;
      alert("Correct! ✅");
      console.log(`Q${index+1}: Correct (your answer: "${raw}")`);
    } else {
      alert(`Incorrect. ❌ The correct answer is: ${item.a}`);
      console.log(`Q${index+1}: Incorrect (your answer: "${raw}", correct: "${item.a}")`);
    }

    return correct;
  }

 
  for (let i = 0; i < questions.length; i++) {
    askQuestion(questions[i], i, questions.length);
  }


  alert(`Quiz finished! Your score: ${score} / ${questions.length}`);
  console.log(`Final score: ${score} / ${questions.length}`);
})();
