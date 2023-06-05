import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext,WorkDay } from './UserContext';
import { AppContext } from './reducer';
import { fetchUserData } from './PrivateRoute';
import WelcomeContainer from './WelcomeContainer';
import { breakCheckInValidation, breakCheckOutValidation, calculateWorkingDuration, checkOutValidation } from './helper';

const WelcomePage: React.FC = () => {
    const { user, updateUser } = useContext(UserContext);

    const { state, dispatch } = useContext(AppContext);
    const {
        isCheckedIn, isCheckedOut, isOnBreak, selectedCheckInTime, selectedCheckOutTime, 
        selectedBreakCheckInTime, selectedBreakCheckOutTime, breakStarted, workDayId,
        breakCount, breakId, checkOutTimeValidationState, breakCheckInTimeValidationState,
        breakCheckOutTimeValidationState, workDay, workDuration, error,
    } = state;

    const handleValidationState = useCallback(() => {
        const checkOutTimeValidation = checkOutValidation(selectedCheckInTime, selectedCheckOutTime, workDay);
        dispatch({type: 'SET_CHECK_OUT_TIME_VALIDATION_STATE', payload: checkOutTimeValidation});
        const breakCheckInTimeValidation = breakCheckInValidation(selectedCheckInTime, selectedBreakCheckInTime, workDay);
        dispatch({type: 'SET_BREAK_CHECK_IN_TIME_VALIDATION_STATE', payload: breakCheckInTimeValidation});
        const breakCheckOutTimeValidation = breakCheckOutValidation(selectedBreakCheckInTime, selectedBreakCheckOutTime);
        dispatch({type: 'SET_BREAK_CHECK_OUT_TIME_VALIDATION_STATE', payload: breakCheckOutTimeValidation});
        
        let errorMessage: string | undefined = '';
      
        if (!checkOutTimeValidation?.status && !isOnBreak && selectedCheckOutTime) {
          errorMessage = checkOutTimeValidation?.errorMessage;
        } else if (!breakCheckInTimeValidation.status) {
          errorMessage = breakCheckInTimeValidation.errorMessage;
        } else if (isOnBreak && breakStarted && !breakCheckOutTimeValidation.status && selectedBreakCheckOutTime) {
          errorMessage = breakCheckOutTimeValidation.errorMessage;
        }

        dispatch({type: 'SET_ERROR', payload: errorMessage});
      }, [isOnBreak, breakStarted, selectedCheckOutTime, selectedBreakCheckInTime, selectedBreakCheckOutTime]);
    
    
      const performStateUpdates = () => {
        if (user && user.workDays) {
          handleValidationState();
          const currentDate = new Date().getDate();
          const currentWorkDay: WorkDay | undefined= user.workDays.find(
            (workDay) => currentDate === new Date(workDay.checkInTimestamp).getDate()
          );
          dispatch({type: 'SET_WORK_DAY', payload: currentWorkDay});
      
          if (workDay) {
           
            //const extractedHourMinute = extractHourAndMinute(workDay.checkInTimestamp);
            dispatch({type: 'SET_WORK_DAY_ID', payload: workDay.id});
            dispatch({type: 'SET_IS_CHECKED_IN', payload: true});

            dispatch({type: 'SET_SELECTED_CHECK_IN_TIME', payload: workDay.checkInTimestamp});
      
            const startedBreak = workDay.breaks.find(
              (breakItem) => breakItem.checkInTimestamp !== null && breakItem.checkOutTimestamp === null
            );

            dispatch({type: 'SET_BREAK_COUNT', payload: workDay.breaks.length});
      
            if (startedBreak && isOnBreak) {
               // const extractedHourMinute = extractHourAndMinute(startedBreak.checkInTimestamp);
                dispatch({type: 'SET_IS_ON_BREAK', payload: true});
                dispatch({type: 'SET_BREAK_STARTED', payload: true});
                dispatch({type: 'SET_SELECTED_BREAK_CHECK_IN_TIME', payload: startedBreak.checkInTimestamp});
                dispatch({type: 'SET_BREAK_ID', payload: startedBreak.id});
                
            }
      
            const unfinishedBreak = workDay.breaks.find(
              (breakItem) => breakItem.checkOutTimestamp === null && breakItem.id === breakId && breakItem.checkInTimestamp !== null
            );
            const lastBreak = workDay.breaks[workDay.breaks.length - 1];
      
            if (breakStarted && !unfinishedBreak && breakCount > 1) {
                dispatch({type: 'SET_BREAK_STARTED', payload: false});
                dispatch({type: 'SET_SELECTED_BREAK_CHECK_OUT_TIME', payload: lastBreak.checkOutTimestamp ?? ''});
            }
      
            const unfinishedWorkDay =  workDay.checkOutTimestamp === null;
      
            if (!unfinishedWorkDay) {
                dispatch({type: 'SET_IS_CHECKED_OUT', payload: true});
                const duration = calculateWorkingDuration(workDay);
                dispatch({type: 'SET_WORK_DURATION', payload: duration});
            }

            
          } else {
            dispatch({type: 'SET_IS_CHECKED_IN', payload: false});
            dispatch({type: 'SET_IS_CHECKED_OUT', payload: false});
          }
        } else {
            dispatch({type: 'SET_BREAK_STARTED', payload: false});
            dispatch({type: 'SET_IS_CHECKED_IN', payload: false});
          //setUserWorkDays([]);
        }
      };
      

    const performUserUpdate= async(userId: string | undefined) =>{
        const userDataQuery = await fetchUserData(user?.id);
        if (userDataQuery )
            updateUser(userDataQuery)
        return null;
    };

    // Check-in handler
    const handleCheckIn = async(newWorkDayId: string) => {
        performUserUpdate(user?.id);       
        dispatch({ type: 'SET_IS_CHECKED_IN', payload: true });
        dispatch({ type: 'SET_IS_ON_BREAK', payload: false });
        dispatch({ type: 'SET_ERROR', payload: '' });
        dispatch({ type: 'SET_WORK_DAY_ID', payload: newWorkDayId });
    };
  
    // Take a break handler
    const handleTakeBreak = () => {
        dispatch({type: 'SET_IS_ON_BREAK', payload: true});
        dispatch({type: 'SET_ERROR', payload: ''});
        //dispatch({type: 'INCREMENT_BREAK_COUNT', payload: null});
    };

    //Check in for break
    const handleCheckInForBreak = async (newBreakId: string) => {
        performUserUpdate(user?.id);
        dispatch({type: 'SET_IS_ON_BREAK', payload: true});
        dispatch({type: 'SET_BREAK_STARTED', payload: true});
        dispatch({type: 'SET_BREAK_ID', payload: newBreakId});
        dispatch({type: 'SET_ERROR', payload: ''});
    };

    //check out from break
    const handleCheckOutFromBreak =  () => {
        performUserUpdate(user?.id);
        dispatch({type: 'SET_IS_ON_BREAK', payload: false});
        dispatch({type: 'SET_BREAK_STARTED', payload: false});
        dispatch({type: 'SET_ERROR', payload: ''});
    }
  
    // Check-out from break handler
    const handleCheckOut =  () => {
        dispatch({type: 'SET_IS_ON_BREAK', payload: false});
        dispatch({type: 'SET_IS_CHECKED_IN', payload: false});
        dispatch({type: 'SET_IS_CHECKED_OUT', payload: true});
    }
  
  
    useEffect(() => {
        performStateUpdates();
      }, [user, breakId, selectedCheckInTime, selectedCheckOutTime, selectedBreakCheckInTime, 
        selectedBreakCheckOutTime, handleValidationState, workDay,  error]);

 
    return (

                <WelcomeContainer 
                    isCheckedOut = {isCheckedOut}
                    user = {user}
                    handleCheckIn = {handleCheckIn}
                    handleTakeBreak = {handleTakeBreak}
                    handleCheckInForBreak = {handleCheckInForBreak}
                    handleCheckOutFromBreak = {handleCheckOutFromBreak}
                    handleCheckOut = {handleCheckOut}
                    selectedCheckInTime = {selectedCheckInTime}
                    selectedCheckOutTime = {selectedCheckOutTime}
                    selectedBreakCheckInTime= {selectedBreakCheckInTime}
                    selectedBreakCheckOutTime={selectedBreakCheckOutTime}
                    isCheckedIn = {isCheckedIn}
                    isOnBreak = {isOnBreak}
                    breakStarted = {breakStarted}
                    breakCount = {breakCount}
                    checkOutTimeValidation = {checkOutTimeValidationState}
                    breakCheckInTimeValidation = {breakCheckInTimeValidationState}
                    breakCheckOutTimeValidation = {breakCheckOutTimeValidationState}
                    workDayId = {workDayId}
                    breakId={breakId}
                    error = {error}
                    workDuration = {workDuration}
                
                />
      );
      
  };
  
  export default WelcomePage;
  