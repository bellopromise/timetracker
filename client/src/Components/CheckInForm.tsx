import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import { CREATE_WORK_DAY_MUTATION } from './mutations';
import { AppContext } from './reducer';
import { UserContext } from './UserContext';

interface CheckInFormProps {
    handleCheckIn: (workDayId: string) => void;
    selectedCheckInTime: string;
    isCheckedIn: boolean;
    isOnBreak: boolean;
    
  }

  
  
  const CheckInForm: React.FC<CheckInFormProps> = ({
    handleCheckIn,
    selectedCheckInTime,
    isCheckedIn,
    isOnBreak
  }) => {
    
    const { user } = useContext(UserContext);
    const [createWorkDay] = useMutation(CREATE_WORK_DAY_MUTATION, {
        onCompleted: (data) => {
          handleCheckIn(data.createWorkDay.id);
        },
    });

    const { dispatch } = useContext(AppContext);
  
    const getCurrentTime = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
  
      return `${hours}:${minutes}`;
    };
  
    const isCheckInTimeValid = () => {
      return selectedCheckInTime !== ''; // No time selected yet, so it's considered valid
    };
  
    const handleCheckInClick = async () => {
      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
      const checkInDateTime = `${currentDate}T${selectedCheckInTime}:00.000Z`; // Combine the current date and selected time
  
      try {
        const { data } = await createWorkDay({
          variables: {
            userId: user?.id,
            input: {
              checkInTimestamp: checkInDateTime
            },
          },
        });
  

      } catch (error) {
        console.error('Error performing createWorkDay mutation:', error);
      }
    };
  
    if(!isCheckedIn && !isOnBreak)
    {
      return (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Check-in</h3>
            <input
            type="time"
            value={selectedCheckInTime}
            min={getCurrentTime()}
            onChange={(e) => 
                dispatch({type: 'SET_SELECTED_CHECK_IN_TIME', payload: e.target.value})
                //setSelectedCheckInTime(e.target.value)
            }
            className="mb-2 p-2 border rounded"
            />
            <button
            onClick={handleCheckInClick}
            disabled={!isCheckInTimeValid() || isCheckedIn}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
            Check-in
            </button>
        </div>
      );
    }
    return null;
  
};

export default CheckInForm;
