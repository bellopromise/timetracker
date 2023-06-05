import { useMutation } from '@apollo/client';
import React, { useState, useContext } from 'react';
import { getCurrentTime } from './helper';
import {  UPDATE_BREAK_MUTATION } from './mutations';
import { AppContext } from './reducer';
import { Validation } from './UserContext';

interface BreakCheckOutFormProps {
  handleCheckOutFromBreak: () => void;
    selectedBreakCheckOutTime: string;
    workDayId: string;
    breakId: string;
    breakCheckOutTimeValidation: Validation | undefined;
    breakStarted: boolean;
    isCheckedIn: boolean;
    isOnBreak: boolean;
    
  }

  
  
  const BreakCheckOutForm: React.FC<BreakCheckOutFormProps> = ({
    handleCheckOutFromBreak,
    selectedBreakCheckOutTime,
    workDayId, 
    breakId,
    breakCheckOutTimeValidation,
    breakStarted,
    isCheckedIn,
    isOnBreak

  }) => {

    const { dispatch } = useContext(AppContext);

    const [updateBreak] = useMutation(UPDATE_BREAK_MUTATION, {
        onCompleted: (data) => {
            handleCheckOutFromBreak();
          },
    });
  
      const handleCheckOutFromBreakClick = async () => {
        const currentDate = new Date().toISOString().split('T')[0];
      const breakCheckOutDateTime = `${currentDate}T${selectedBreakCheckOutTime}:00.000Z`;
  
      try {
        const { data } = await updateBreak({
          variables: {
            id: breakId,
            workDayId,
            inputDate: currentDate,
            input: {
              checkOutTimestamp: breakCheckOutDateTime,
            },
          },
        });


  
      } catch (error) {
        console.error('Error performing updateBreak mutation:', error);
      }
    
         // handleCheckOutForBreak();
      };
  
  if(!(isCheckedIn && isOnBreak && breakStarted))
      return null;
  return (
    <div className="mb-8">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">Break:</h3>
        <button
            onClick={handleCheckOutFromBreakClick}
            disabled={!breakCheckOutTimeValidation?.status}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
            Check-out for Break
        </button>
        <input
            type="time"
            value={selectedBreakCheckOutTime}
            min={getCurrentTime()}
                onChange={(e) => {
                  dispatch({type: 'SET_SELECTED_BREAK_CHECK_OUT_TIME', payload: e.target.value})
            }}
            className="ml-2 p-2 border rounded"
        />
    </div>
    </div>
  );
};

export default BreakCheckOutForm;
