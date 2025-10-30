import { render, screen, fireEvent } from '@testing-library/react';
import FaqItem from '../FaqItem';

describe('FaqItem', () => {
  const defaultProps = {
    question: 'What is the capital of France?',
    answer: 'Paris',
    delay: 0,
  };

  it('renders question', () => {
    render(<FaqItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.question)).toBeInTheDocument();
  });

  it('does not show answer initially', () => {
    render(<FaqItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.answer)).not.toBeVisible();
  });

  it('shows answer when clicked', () => {
    render(<FaqItem {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(defaultProps.answer)).toBeVisible();
  });

  it('toggles answer visibility', () => {
    render(<FaqItem {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(defaultProps.answer)).toBeVisible();
    fireEvent.click(button);
    expect(screen.getByText(defaultProps.answer)).not.toBeVisible();
  });
});