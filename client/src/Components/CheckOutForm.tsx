import { useMutation } from '@apollo/client';
import React, { useState, useContext } from 'react';
import { getCurrentTime } from './helper';
import { UPDATE_WORK_DAY_MUTATION } from './mutations';
import { AppContext } from './reducer';
import { UserContext, Validation } from './UserContext';

interface CheckOutFormProps {
  handleCheckOut: () => void;
    selectedCheckOutTime: string;
    checkOutTimeValidation: Validation | undefined;
    isCheckedIn: boolean;
    isOnBreak: boolean;
    
  }

  
  

  const CheckOutForm: React.FC<CheckOutFormProps> = ({
    handleCheckOut,
    selectedCheckOutTime,
    checkOutTimeValidation,
    isCheckedIn,
    isOnBreak
  }) => {

    const { dispatch } = useContext(AppContext);

    const { user } = useContext(UserContext);
    const [updateWorkDay] = useMutation(UPDATE_WORK_DAY_MUTATION, {
        onCompleted: (data) => {
            handleCheckOut();
          },
    });
  
  
      
      const handleCheckOutClick = async () => {
        const currentDate = new Date().toISOString().split('T')[0];
      const checkOutDateTime = `${currentDate}T${selectedCheckOutTime}:00.000Z`;
  
      try {
        const { data } = await updateWorkDay({
          variables: {
            userId: user?.id,
            inputDate: currentDate,
            workDay: {
              checkOutTimestamp: checkOutDateTime,
            },
          },
        });
  
      } catch (error) {
        console.error('Error performing updateWorkDay mutation:', error);
      }
    
      };
  
  if(!(isCheckedIn && !isOnBreak))
      return null;
  return (
    <div className="mb-8">
        <div className="flex items-center mb-7">
        <button
            onClick={handleCheckOutClick}
            disabled={!checkOutTimeValidation?.status}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
            Check-out
        </button>
        <input
            type="time"
            value={selectedCheckOutTime}
            min={getCurrentTime()}
                onChange={(e) => {
            dispatch({type: 'SET_SELECTED_CHECK_OUT_TIME', payload: e.target.value})
            }}
            className="ml-2 p-2 border rounded"
        />
        </div>
    </div>
  );
};

export default CheckOutForm;
