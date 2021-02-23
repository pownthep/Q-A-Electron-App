/* eslint-disable spaced-comment */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { Question } from '../types/common/index';

const app: Application = express();
app.use(cors());
const PORT: number = 8000;
const QUESTIONS: Question[] = [
  {
    category: 'Entertainment: Cartoon & Animations',
    type: 'multiple',
    difficulty: 'easy',
    question: 'In South Park, what is Stan surname?',
    correct_answer: 'Marsh',
    incorrect_answers: [
      'Stotch',
      'Broflovski',
      'Tweak'
    ]
  },
  {
    category: 'History',
    type: 'multiple',
    difficulty: 'medium',
    question: 'All of the following are names of the Seven Warring States EXCEPT:',
    correct_answer: 'Zhai (翟)',
    incorrect_answers: [
      'Zhao (趙)',
      'Qin (秦)',
      'Qi (齊)'
    ]
  },
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'medium',
    question: 'Which company made the Japanese RPG "Dragon Quest"?',
    correct_answer: 'Square Enix',
    incorrect_answers: [
      'Capcom',
      'Konami',
      'Blizzard'
    ]
  },
  {
    category: 'Entertainment: Japanese Anime & Manga',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What is the name of the final villain in the manga series "Bleach"?',
    correct_answer: 'Yhwach',
    incorrect_answers: [
      'Juha Bach',
      'Yuhabah',
      'Juhabach'
    ]
  },
  {
    category: 'Entertainment: Video Games',
    type: 'boolean',
    difficulty: 'medium',
    question: 'In "Super Mario World", the rhino mini-boss, Reznor, is named after the lead singer of the band "Nine Inch Nails".',
    correct_answer: 'True',
    incorrect_answers: [
      'False'
    ]
  },
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Who created the indie adventure game "Night in the Woods"?',
    correct_answer: 'Alec Holowka',
    incorrect_answers: [
      'Ron Gilbert',
      'Tim Schafer',
      ' Tommy Refenes'
    ]
  },
  {
    category: 'Entertainment: Cartoon & Animations',
    type: 'multiple',
    difficulty: 'medium',
    question: 'Which Sanrio character was introduced in 1996?',
    correct_answer: 'Pompompurin',
    incorrect_answers: [
      'My Melody',
      'Badtz-Maru',
      'Kerropi'
    ]
  },
  {
    category: 'Science & Nature',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What is the scientific term for "taste"?',
    correct_answer: 'Gustatory Perception',
    incorrect_answers: [
      'Olfaction',
      'Somatosensation',
      'Auditory Perception'
    ]
  },
  {
    category: 'Entertainment: Television',
    type: 'multiple',
    difficulty: 'hard',
    question: 'Which former Coronation Street actress was once a hostess on the British Game Show "Double Your Money"?',
    correct_answer: 'Amanda Barrie',
    incorrect_answers: [
      'Sue Nicholls',
      'Violet Carson',
      'Jean Alexander'
    ]
  },
  {
    category: 'Science & Nature',
    type: 'multiple',
    difficulty: 'hard',
    question: 'In quantum physics, which of these theorised sub-atomic particles has yet to be observed?',
    correct_answer: 'Graviton',
    incorrect_answers: [
      'Z boson',
      'Tau neutrino',
      'Gluon'
    ]
  }
];

app.get('/questions', (req: Request, res: Response) => {
  res.json(QUESTIONS);
});

app.get('/answer/:index', (req: Request, res: Response) => {
  const index: number = Number(req.params.index);
  if (isNaN(index)) {
    res.status(400).send('Parameter "index" should an integer');
  } else {
    const answer: string = QUESTIONS[index].correct_answer;
    res.json(answer);
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
