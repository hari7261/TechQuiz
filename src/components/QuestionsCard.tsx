import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, Button, Container } from '@mui/material';
import Loader from '../img/loader.svg';
import quizData from '../data/quiz.json';

export type AnswerObject = {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    score: number;
};

export const QuestionsCard: React.FC = () => {
    const { prelang } = useParams();
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState('');
    const [questions, setQuestions] = useState(quizData.react);
    const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [result, setResult] = useState(false);
    let navigate = useNavigate();

    const nextQuestion = () => {
        setCurrentQuestionNo(currentQuestionNo + 1);
    };

    const showResult = () => {
        setResult(true);
        navigate(`/result`, { state: userAnswers });
    };

    const getAnswer = (answer: string) => {
        const question = questions[0].mcqData[currentQuestionNo].question;
        const correctAnswer = questions[0].mcqData[currentQuestionNo].answer;
        const newScore = correctAnswer === answer ? 10 : 0;

        const answerObject: AnswerObject = {
            question,
            userAnswer: answer,
            correctAnswer,
            score: newScore,
        };

        setUserAnswers((prevAnswers) => {
            const filteredAnswers = prevAnswers.filter(
                (ans) => ans.question !== question
            );
            return [...filteredAnswers, answerObject];
        });

        if (correctAnswer === answer) {
            setScore((prevScore) => prevScore + 10);
        }

        setSelected(answer);
    };

    const resetQuiz = () => {
        setCurrentQuestionNo(0);
        setSelected('');
        setUserAnswers([]);
        setScore(0);
        setResult(false);
    };

    return (
        <div>
            {loading ? (
                <div>
                    <img src={Loader} alt="Loading..." />
                </div>
            ) : result ? (
                <div>
                    <h2>Quiz Results</h2>
                    {userAnswers.map((answer, index) => (
                        <div key={index}>
                            <p>Question: {answer.question}</p>
                            <p>Your Answer: {answer.userAnswer}</p>
                            <p>Correct Answer: {answer.correctAnswer}</p>
                            <p>Score: {answer.score}</p>
                        </div>
                    ))}
                    <p>Total Score: {score}</p>
                </div>
            ) : (
                <Container maxWidth="sm" sx={{ mt: 10 }} data-testid="home-component">
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardHeader
                            title="MCQ Questions"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#03a9f4',
                                color: 'white',
                            }}
                        />
                        <CardContent>
                            <div>
                                <h1 style={{ fontSize: '22px' }}>
                                    {questions[0].mcqData[currentQuestionNo].question}
                                </h1>
                                {questions[0].mcqData[currentQuestionNo].choices.map(
                                    (option: string, index: number) => (
                                        <div
                                            style={{
                                                fontSize: '18px',
                                                padding: '10px',
                                                margin: '16px',
                                                backgroundColor: '#edf7f7',
                                            }}
                                            className={
                                                selected === option
                                                    ? 'selected answer'
                                                    : 'answer'
                                            }
                                            key={index}
                                            onClick={() => getAnswer(option)}>
                                            <p>{index + 1}. {option}</p>
                                        </div>
                                    )
                                )}
                            </div>

                            <div>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    style={{ float: 'right' }}
                                    onClick={
                                        questions[0].mcqData.length === currentQuestionNo + 1
                                            ? showResult
                                            : nextQuestion
                                    }>
                                    {questions[0].mcqData.length === currentQuestionNo + 1
                                        ? 'Show Result'
                                        : 'Next Question'}
                                </Button>
                                <Button variant="outlined" onClick={resetQuiz}>Reset</Button>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            )}
        </div>
    );
};
