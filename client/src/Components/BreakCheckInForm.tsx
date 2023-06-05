import { useMutation } from '@apollo/client';
import React, { useState, useContext } from 'react';
import { getCurrentTime } from './helper';
import { CREATE_BREAK_MUTATION } from './mutations';
import { AppContext } from './reducer';
import { Validation } from './UserContext';

interface BreakCheckInFormProps {
    handleCheckInForBreak: (newBreakId: string) => void;
    selectedBreakCheckInTime: string;
    selectedCheckInTime: string;
    workDayId: string;
    breakCheckInTimeValidation: Validation | undefined;
    breakStarted: boolean;
    isCheckedIn: boolean;
    isOnBreak: boolean;
  }

  
  
  
  const BreakCheckInForm: React.FC<BreakCheckInFormProps> = ({
    handleCheckInForBreak,
    selectedBreakCheckInTime,
    workDayId,
    breakCheckInTimeValidation,
    breakStarted,
    isCheckedIn,
    isOnBreak
  }) => {

    const { dispatch } = useContext(AppContext);

    const [createBreak] = useMutation(CREATE_BREAK_MUTATION, {
        onCompleted: (data) => {
            handleCheckInForBreak(data.createBreak.id);
          },
    });
  
  
      
      const handleCheckInForBreakClick = async () => {
        const currentDate = new Date().toISOString().split('T')[0];
        const breakCheckInDateTime = `${currentDate}T${selectedBreakCheckInTime}:00.000Z`;
    
        try {
          const { data } = await createBreak({
            variables: {
              workDayId,
              input: {
                checkInTimestamp: breakCheckInDateTime,
              },
            },
          });

    
         // handleCheckInForBreak();
        } catch (error) {
          console.error('Error performing createBreak mutation:', error);
        }
      };
  
  if(!(isCheckedIn && isOnBreak && !breakStarted))
      return null;
  return (
    <div className="mb-8">
    <h3 className="text-xl font-bold mb-2">Break:</h3>
    <div className="mb-8">
        
        <button
            onClick={handleCheckInForBreakClick}
            disabled={!breakCheckInTimeValidation?.status}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
            Check-in for Break
        </button>
        <input
            type="time"
            value={selectedBreakCheckInTime}
            min={getCurrentTime()}
                onChange={(e) => {
                dispatch({type: 'SET_SELECTED_BREAK_CHECK_IN_TIME', payload: e.target.value})
            }}
            className="ml-2 p-2 border rounded"
        />
    </div>
    </div>
  );
};

export default BreakCheckInForm;
