export default [
  {
    question: `
What's 1 + 1??

\`\`\` js
console.log(1);
console.log(2);
\`\`\`

\`single line\`

*important!*`,
    answers: [1, 2, 3, 4],
    answerIndex: 1,
    explanation: 'It is what it is',
    answered: false,
  },
  {
    question: `
What's 2 + 2??

\`\`\` python
def coolFunction():
    print 'very cool'
\`\`\`

\`single line\`

*important!*
    `,
    answers: [2, 4, 6, 8],
    answerIndex: 1,
    explanation: 'It ain\'t what it ain\'t',
    answered: false,
  },
];
