import React, { useState, useContext } from 'react';


interface TakeBreakProps {
    handleTakeBreak: () => void;
    breakCount: Number;
    isCheckedIn: boolean;
    isOnBreak: boolean;
    
  }
const TakeBreak: React.FC<TakeBreakProps> = ({handleTakeBreak, breakCount, isCheckedIn, isOnBreak})=>{ 
    if(isCheckedIn && !isOnBreak){
        return(
            <>
            <h3 className="text-xl font-bold mb-2 text-center">Actions</h3>
                        <button
                            onClick={handleTakeBreak}
                            className="px-4 py-2 bg-blue-500 text-white rounded block mx-auto"
                        >
                            {breakCount === 0 ? 'Take a Break' : 'Take Another Break'}
                        </button>
            </>
        )
        
    }

    return null

}

export default TakeBreak;