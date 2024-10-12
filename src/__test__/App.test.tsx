import { act } from '@testing-library/react';
import App from '../App';
import {
    componentRenderByMemoryRouter,
    toBeExpectByTestId,
    toBeExpectByText,
} from '../utils/testUtils';

describe('Test App Router', () => {
    const finaldata = [
        {
            correctAnswer: 'All of the above',
            question: 'Which of the following is the correct name of React.js?',
            score: 0,
            userAnswer: 'React.js',
        },
    ];

    test('should render app componet', () => {
        componentRenderByMemoryRouter('/', <App />);
        toBeExpectByTestId('app-component');
    });

    test('should Render Home component with path "/"', () => {
        componentRenderByMemoryRouter('/', <App />);
        toBeExpectByText('Enter your details');
    });

    test('should render QuestionCard component with path "/questions/react/"', () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            componentRenderByMemoryRouter('/questions/react', <App />);
        });
        toBeExpectByText('MCQ Qustions');
    });


    test('should render 404 page', () => {
        componentRenderByMemoryRouter('/result/hjgsdfjghsdjfg', <App />);
        toBeExpectByText('404 Page Not Found');
    });
});
