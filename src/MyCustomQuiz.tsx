import { Quiz } from "react-quiz-maker";
import type { QuizConfig, QuizStateProps, QuizData, QuizAnswer } from "react-quiz-maker";

const btnClasses = {
	unset: "unset",
	default: "default",
	selected: "selected",
	correct: "correct",
	incorrect: "incorrect",
};

const quizComponents = {
	IntroPage,
	QuestionPage,
	QuestionHeader,
	QuestionInnerWrapper,
	QuestionBody,
	Explainer,
	ResultPage,
};

export default function MyCustomQuiz({ config, data }: { config: QuizConfig; data: QuizData }) {
	return (
		<div className={`quiz-wrapper`}>
			<Quiz config={config} data={data} components={quizComponents} />
		</div>
	);
}

function IntroPage(state: QuizStateProps) {
	const { quizData } = state;
	const quizTitle = quizData.quizTitle;
	const quizDescription = quizData.quizSynopsis;
	return (
		<div className="quiz-intro-page">
			<h2>{quizTitle}</h2>
			<p>{quizDescription}</p>
			<Quiz.StartButton state={state}> Start quiz</Quiz.StartButton>
		</div>
	);
}

function QuestionPage({ children }: { children: React.ReactNode }) {
	return <div className="quiz-question-page">{children}</div>;
}

function QuestionInnerWrapper({ children }: { children: React.ReactNode }) {
	return <div className="quiz-question-inner-wrapper">{children}</div>;
}

function QuestionHeader(state: QuizStateProps) {
	const { currentQuestion, maxQuestions, progress } = state;
	return (
		<div className="quiz-question-header">
			<h3>
				{currentQuestion.index} <span>/</span> {maxQuestions}
			</h3>
			<progress className="quiz-main-progress" max="100" value={progress}></progress>
			<h3>{`${progress}%`}</h3>
		</div>
	);
}

function QuestionBody(state: QuizStateProps) {
	const { currentQuestion, answerButtonState } = state;

	return (
		<div className="quiz-question-body ">
			<h2>
				<span className="quiz-question-index">{currentQuestion.index}</span>
				{currentQuestion.question}
			</h2>

			<div className="answer-wrap">
				{currentQuestion.answers.map((item: QuizAnswer, index: number) => (
					<Quiz.AnswerButton className={btnClasses[answerButtonState[index]]} key={index} index={index} state={state}>
						{item.answer}
						{answerButtonState[index] === "correct" && <span> ✓</span>}
						{answerButtonState[index] === "incorrect" && <span> ×</span>}
					</Quiz.AnswerButton>
				))}
			</div>

			<Quiz.QuestionNextButton state={state}> Next</Quiz.QuestionNextButton>

			<Quiz.AutoResumeProgress state={state} />
		</div>
	);
}

function Explainer(state: QuizStateProps) {
	const { currentQuestion, currentAnswer } = state;
	const answerIsCorrect = currentAnswer?.result === "1";

	return (
		<div className="quiz-explainer">
			<h2>{answerIsCorrect ? currentQuestion.messageForCorrectAnswer : currentQuestion.messageForIncorrectAnswer}</h2>
			<p>{currentQuestion.explanation}</p>
			<Quiz.ExplainerNextButton state={state}>Next</Quiz.ExplainerNextButton>
		</div>
	);
}

function ResultPage(state: QuizStateProps) {
	const { result, quizData } = state;
	const resultsCopy = quizData.results;

	return (
		<div className="quiz-result-page">
			<h2>Your result is: {result}</h2>
			{resultsCopy && <p>{resultsCopy[result!].description}</p>}
			<Quiz.StartButton state={state}> Play again</Quiz.StartButton>
		</div>
	);
}
