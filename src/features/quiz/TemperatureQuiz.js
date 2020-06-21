/* eslint-disable */

import React, { useState } from "react";
import Progress from "./Progress";
import Questions from "./questions/Questions";
import Answers from "./answers/Answers";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
    Container: {
        width: "100%",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default function TemperatureQuiz() {
    const classes = useStyles();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState([]);

    const questions = [
        {
            id: 1,
            question: 'What was the average level of CO2 in the atmosphere from 0-1815 AD?',
            answer_a: "Between 275 and 285",
            answer_b: "Between 200 and 215",
            answer_c: "Between 100 and 185  ",
            answer_d: "Between 300 and 320 ",
            correct_answer: "a",
        },
        {
            id: 2,
            question: 'What was the level of CO2 in the atmosphere in 2013?',
            answer_a: "Between 380 and 385",
            answer_b: "Between 373 and 380",
            answer_c: "Between 398 and 401  ",
            answer_d: "Between 389 and 391 ",
            correct_answer: "c",
        },
    ];

    const question = questions[currentQuestion];

    const handleClick = (e) => {
        console.log("you clicked me", e.target.value);
        setCurrentAnswer(e.target.value);
        setError("");
    };

    const renderError = () => {
        if (!error) {
            return;
        }
        return <div className="error">{error}</div>;
    };

    const renderResultsMark = (questions, answer) => {
        if (questions.correct_answer === answer.answer) {
            return <span className="correct">Correct</span>;
        }

        return <span className="Failed">Failed</span>;
    };

    const renderResultsData = () => {
        return answers.map((answer) => {
            const question = questions.find(
                (question) => question.id === answer.questionId
            );

            return (
                <div key={question.id}>
                    {question.question} - {renderResultsMark(question, answer)}
                </div>
            );
        });
    };

    const restart = () => {
        setAnswers([]);
        setCurrentAnswer("");
        setCurrentQuestion(0);
        setShowResults(false);
    };

    const next = () => {
        const answer = { questionId: question.id, answer: currentAnswer };

        if (!currentAnswer) {
            setError("Please select an option");
            return;
        }

        answers.push(answer);
        setAnswers(answers);
        setCurrentAnswer("");

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            return;
        }

        setShowResults(true);
    };

    if (showResults) {
        return (
            <Box className="container-results">
                <h1>Results</h1>
                <ul>{renderResultsData()}</ul>
                <Button className="btn btn-primary" onClick={restart}>
                    Restart
        </Button>
            </Box>
        );
    } else {
        return (
            <Box className={classes.Container}>
                <Progress total={questions.length} current={currentQuestion + 1} />
                <Questions questions={question.question} />
                {renderError()}
                <Answers
                    question={question}
                    currentAnswer={currentAnswer}
                    handleClick={handleClick}
                />
                <Button
                    className="btn btn-primary"
                    onClick={next}
                    variant="contained"
                    color="primary"
                >
                    Confirm
        </Button>
            </Box>
        );
    }
}
