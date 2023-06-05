import { Break, WorkDay } from "./UserContext";

    // Utility function to get current time
    export const getCurrentTime = () => {
        const currentTime = new Date();
        return `${currentTime.getHours()}:${currentTime.getMinutes()}`;
      };
      
      function convertToUTC(time: string) {
          const [hours, minutes] = time.split(':');
          const today = new Date();
          const utcTimestamp = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), Number(hours), Number(minutes), 0));
        
          const formattedTimestamp = `${utcTimestamp.getUTCFullYear()}-${padZero(utcTimestamp.getUTCMonth() + 1)}-${padZero(utcTimestamp.getUTCDate())} ${padZero(utcTimestamp.getUTCHours())}:${padZero(utcTimestamp.getUTCMinutes())}:${padZero(utcTimestamp.getUTCSeconds())} UTC`;
          return formattedTimestamp;
        }
  
        const padZero=(value: number): string =>{
          return value.toString().padStart(2, '0');
        }
  
        const checkOverlap =(time: string, breaks: Break[]): boolean  =>{
          if(breaks.length == 0) return false;
          for (const breakTime of breaks) {
            if (breakTime.checkOutTimestamp && time >= breakTime.checkInTimestamp && time < breakTime.checkOutTimestamp) {
              return true; // Overlap found
            }
          }
        
          // Check if the time falls between the whole time range of breaks
          const sortedBreaks = [...breaks].sort((a, b) => new Date(a.checkInTimestamp).getTime() - new Date(b.checkInTimestamp).getTime());

  
          if(breaks.length == 1 && breaks[0].checkOutTimestamp && time < breaks[0].checkOutTimestamp)
              return true
          
          for (let i = 0; i < sortedBreaks.length - 1; i++) {
            const currentBreakEndTime = sortedBreaks[i].checkOutTimestamp;
            const nextBreakStartTime = sortedBreaks[i + 1].checkInTimestamp;
            if (currentBreakEndTime && time >= currentBreakEndTime && time < nextBreakStartTime) 
              return true; // Overlap found
          }
        
          return false; // No overlap
        }
  
        
    export  const calculateWorkingDuration=(workDay: WorkDay | null): { hours: number; minutes: number } | undefined => {
          if (!workDay)
              return undefined;
          const sortedBreaks = [...workDay.breaks].sort((a, b) => new Date(a.checkInTimestamp).getTime() - new Date(b.checkInTimestamp).getTime());
          let totalDuration = 0;
          let previousEndTime = new Date(workDay.checkInTimestamp).getTime();
  
      
          sortedBreaks.forEach((breakTime) => {
          if(!breakTime.checkOutTimestamp)
              return undefined
          const breakStart = new Date(breakTime.checkInTimestamp).getTime();
          const breakEnd = new Date(breakTime.checkOutTimestamp).getTime();
      
          const duration = breakStart - previousEndTime;
          totalDuration += duration;
      
          previousEndTime = breakEnd;
          });
  
          const lastSortedBreak = sortedBreaks[sortedBreaks.length - 1];
  
          if(!lastSortedBreak.checkOutTimestamp || !workDay?.checkOutTimestamp)
              return undefined
      
          const lastBreakEnd = sortedBreaks.length > 0 ? new Date(lastSortedBreak.checkOutTimestamp).getTime() : new Date(workDay.checkInTimestamp).getTime();
          const finalDuration = new Date(workDay.checkOutTimestamp).getTime() - lastBreakEnd;
          totalDuration += finalDuration;
      
          // Convert the total duration to hours and minutes
          const totalHours = Math.floor(totalDuration / (1000 * 60 * 60));
          const remainingMinutes = Math.floor((totalDuration % (1000 * 60 * 60)) / (1000 * 60));
      
          return { hours: totalHours, minutes: remainingMinutes };
      }
        
      // Validation function for check-out time
    export  const checkOutValidation = (selectedCheckInTime: string, selectedCheckOutTime: string, workDay: WorkDay | undefined) => {
          let convertedSelectedCheckOutTime: string = '';
          let errorMessage = '';
          if(selectedCheckOutTime && workDay)
              convertedSelectedCheckOutTime = convertToUTC(selectedCheckOutTime);
          if (convertedSelectedCheckOutTime && convertedSelectedCheckOutTime < selectedCheckInTime) 
              errorMessage = "Check out time is earlier than when you checked in";
          else if (workDay && checkOverlap(convertedSelectedCheckOutTime, workDay.breaks)) {
              errorMessage = "Check out time is earlier than when you checked out for break";
          }
          return { errorMessage, status: convertedSelectedCheckOutTime && !errorMessage };
      };
    
      // Validation function for break check-in time
    export   const breakCheckInValidation = (selectedCheckInTime: string,selectedBreakCheckInTime: string, workDay: WorkDay | undefined) => {
          let convertedSelectedBreakCheckInTime: string = '';
          let errorMessage = ''; 
          if(selectedBreakCheckInTime && workDay)
              convertedSelectedBreakCheckInTime = convertToUTC(selectedBreakCheckInTime);
          if (selectedBreakCheckInTime && convertedSelectedBreakCheckInTime <= selectedCheckInTime || (workDay && checkOverlap(convertedSelectedBreakCheckInTime, workDay.breaks)) ) 
              errorMessage = "Break check in time must be greater than when you checked in and must not overlap with existing breaks.";
          return { errorMessage, status: convertedSelectedBreakCheckInTime && !errorMessage };
      };
    
      // Validation function for break check-out time
    export  const breakCheckOutValidation = (selectedBreakCheckInTime: string, selectedBreakCheckOutTime: string) => {
          let convertedSelectedBreakCheckOutTime: string = '';
          let errorMessage = '';
          if(selectedBreakCheckOutTime)
              convertedSelectedBreakCheckOutTime = convertToUTC(selectedBreakCheckOutTime);
          if (selectedBreakCheckOutTime && convertedSelectedBreakCheckOutTime <= selectedBreakCheckInTime) 
              errorMessage = "Break check out time must be greater than when you checked in for break";
          return { errorMessage, status: convertedSelectedBreakCheckOutTime && !errorMessage };
      };