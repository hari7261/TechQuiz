import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnswerObject } from './QuestionsCard';
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    Container,
} from '@mui/material';

export const ShowResult = () => {
    const { state } = useLocation();
    const results = state as AnswerObject;
    const [finalResult, setFinalResult] = useState<any>(results);
    const [score, setScore] = useState(0);
    let navigate = useNavigate();
    console.log(finalResult);
    

    const findScore = () => {
        // eslint-disable-next-line array-callback-return
        finalResult.map((s: any) => {
            setScore((score) => score + s.score);
        });
    };
    const reset = () => {
        navigate(`/`);
    };

    useEffect(() => {
        findScore();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ my: 10 }} data-testid="result-component">
            <Card>
                <CardHeader
                    title="Final Result"
                    style={{
                        textAlign: 'center',
                        backgroundColor: '#03a9f4',
                        color: 'white',
                    }}
                />
                <CardContent>
                    <p
                        style={{
                            fontSize: '1.59rem',
                            fontWeight: 'bold',
                        }}>
                        Total Question : {finalResult.length}
                    </p>
                    <p
                        style={{
                            fontSize: '1.59rem',
                            fontWeight: 'bold',
                        }}>
                        Total Score: {finalResult.length * 10}
                    </p>

                    <p
                        style={{
                            fontSize: '1.59rem',
                            fontWeight: 'bold',
                        }}>
                        Your Score: {score}
                    </p>
                </CardContent>
            </Card>

            {finalResult.map(
                (
                    q: {
                        question: string;
                        userAnswer: string;
                        correctAnswer: string;
                        score: number;
                    },
                    i: any
                ) => {
                    return (
                        <Card key={i} style={{ marginTop: '15px' }}>
                            <div className="question">
                                <p className="questionText"></p>
                            </div>
                            <CardContent>
                                <div className="answerq">
                                    <p>
                                        <b>Your Answer : </b>{' '}
                                        <span
                                            className={
                                                q.userAnswer === q.correctAnswer
                                                    ? 'correct'
                                                    : 'wrong'
                                            }>
                                            {q.userAnswer}
                                        </span>{' '}
                                    </p>

                                    <p>
                                        <b>Correct Answer : </b>{' '}
                                        <span className="correct">
                                            {q.correctAnswer}
                                        </span>
                                    </p>
                                </div>
                                <p style={{ float: 'right', color: 'blue' }}>
                                    <b>
                                        Mark :{' '}
                                        {q.userAnswer === q.correctAnswer
                                            ? '10'
                                            : '00'}
                                    </b>
                                </p>
                            </CardContent>
                        </Card>
                    );
                }
            )}

            <div style={{ textAlign: 'center' }}>
                <Button
                    sx={{ my: 2 }}
                    variant="outlined"
                    color="secondary"
                    onClick={reset}>
                    Reset
                </Button>
            </div>
        </Container>
    );
};
