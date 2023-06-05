import React from 'react';
import { WorkDuration } from './UserContext';

interface FeedbackProps {
  isCheckedOut: boolean;
  workDuration: WorkDuration | undefined;
}

const Feedback: React.FC<FeedbackProps> = ({ isCheckedOut, workDuration }) => {
  if (isCheckedOut) {
    return (
      <div>
        <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
        {workDuration && (workDuration.hours > 0 || workDuration.minutes > 0) && (
          <p className="text-lg">
             You have worked for {workDuration.hours > 0 && `${workDuration.hours} hours`} {workDuration.minutes > 0 && `${workDuration.minutes} minutes`} today.
          </p>
        )}
        {workDuration && workDuration.hours === 0 && workDuration.minutes === 0 && (
          <p className="text-lg font-semibold">You have not worked today.</p>
        )}
        <p className="text-lg text-gray-500 font-light">You are done for the day.</p>
      </div>
    );
  }

  return null; // Return null if not checked out
};

export default Feedback;
