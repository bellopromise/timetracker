import React, { useState, useContext } from 'react';
import BreakCheckInForm from './BreakCheckInForm';
import BreakCheckOutForm from './BreakCheckOutForm';
import CheckInForm from './CheckInForm';
import CheckOutForm from './CheckOutForm';
import Feedback from './Feedback';
import LogoutButton from './LogoutButton';
import TakeBreak from './TakeBreak';
import { User, Validation, WorkDuration } from './UserContext';


interface WelcomeContainerProps {
    handleCheckIn: (workDayId: string)=> void;
    handleCheckOut: ()=> void;
    handleTakeBreak: ()=> void;
    handleCheckOutFromBreak: ()=> void;
    handleCheckInForBreak: (newBreakId: string) => void;
    selectedCheckInTime: string;
    selectedBreakCheckInTime: string;
    selectedCheckOutTime: string;
    selectedBreakCheckOutTime: string;
    workDayId: string;
    breakId: string;
    breakCount: number;
    checkOutTimeValidation: Validation | undefined;
    breakCheckOutTimeValidation: Validation | undefined;
    breakCheckInTimeValidation: Validation | undefined;
    breakStarted: boolean;
    isCheckedIn: boolean;
    isCheckedOut: boolean
    isOnBreak: boolean;
    user: User | null; 
    error: string | undefined;
    workDuration: WorkDuration | undefined;
  }

  const WelcomeContainer: React.FC<WelcomeContainerProps> = ({
    handleCheckIn, handleCheckOut, handleTakeBreak, handleCheckInForBreak, handleCheckOutFromBreak,
    selectedCheckInTime, selectedBreakCheckInTime, selectedCheckOutTime, selectedBreakCheckOutTime,
    workDayId, breakId, breakCount, checkOutTimeValidation, breakCheckOutTimeValidation,
    breakCheckInTimeValidation, breakStarted, isCheckedIn, isCheckedOut, isOnBreak, error, user, workDuration
  }) => {

return( 
    <div className="relative h-screen bg-gray-400">
    <div className="flex items-center justify-center h-full">
      <div className="max-w-md mx-auto bg-white rounded shadow-lg">
        <div className="p-6 flex flex-col items-center">

          
          {!isCheckedOut && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-center">Hi {user?.name}! Welcome to T_Tracker</h2>
              <p className="text-lg mb-6 text-center">How can I help you today?</p>
              
              <div>
                  <CheckInForm
                    handleCheckIn={handleCheckIn}
                    selectedCheckInTime={selectedCheckInTime}
                    isCheckedIn={isCheckedIn}
                    isOnBreak = {isOnBreak}
                  />
                
                  <div className="mb-8">
                    <TakeBreak breakCount={breakCount} handleTakeBreak={handleTakeBreak}
                    isOnBreak={isOnBreak}  isCheckedIn={isCheckedIn}/>
                    <br />
                      <CheckOutForm
                        handleCheckOut={handleCheckOut}
                        selectedCheckOutTime={selectedCheckOutTime}
                        checkOutTimeValidation = {checkOutTimeValidation}
                        isCheckedIn = {isCheckedIn}
                        isOnBreak= {isOnBreak}
                      />
                  </div>
                  
                  <BreakCheckInForm
                  handleCheckInForBreak={handleCheckInForBreak}
                  selectedCheckInTime={selectedCheckInTime}
                  selectedBreakCheckInTime={selectedBreakCheckInTime}
                  workDayId={workDayId}
                  breakCheckInTimeValidation = {breakCheckInTimeValidation}
                  isCheckedIn={isCheckedIn}
                  isOnBreak= {isOnBreak}
                  breakStarted= {breakStarted}
                  />
                  <BreakCheckOutForm
                  handleCheckOutFromBreak={handleCheckOutFromBreak}
                  selectedBreakCheckOutTime={selectedBreakCheckOutTime}
                  workDayId={workDayId}
                  breakId={breakId}
                  breakCheckOutTimeValidation = {breakCheckOutTimeValidation}
                  isCheckedIn={isCheckedIn}
                  isOnBreak= {isOnBreak}
                  breakStarted= {breakStarted}
                  />
                    
                
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-500 mb-4">
              Error: {error}
            </div>
          )}

          <Feedback isCheckedOut={isCheckedOut} workDuration = {workDuration}/>

          <div className="mt-auto">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default WelcomeContainer;