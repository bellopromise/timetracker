import { createContext} from 'react';
import { User, Validation, WorkDay, WorkDuration } from './UserContext';



interface State {
  user: User | null;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  isOnBreak: boolean;
  selectedCheckInTime: string;
  selectedCheckOutTime: string;
  selectedBreakCheckInTime: string;
  selectedBreakCheckOutTime: string;
  breakStarted: boolean;
  workDayId: string;
  breakCount: number;
  breakId: string;
  checkOutTimeValidationState: Validation;
  breakCheckInTimeValidationState: Validation;
  breakCheckOutTimeValidationState: Validation;
  workDay: WorkDay | undefined;
  error: string | undefined;
  workDuration: WorkDuration | undefined; 
}


type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_IS_CHECKED_IN'; payload: boolean }
  | { type: 'SET_IS_CHECKED_OUT'; payload: boolean }
  | { type: 'SET_IS_ON_BREAK'; payload: boolean }
  | { type: 'SET_SELECTED_CHECK_IN_TIME'; payload: string }
  | { type: 'SET_SELECTED_CHECK_OUT_TIME'; payload: string }
  | { type: 'SET_SELECTED_BREAK_CHECK_IN_TIME'; payload: string }
  | { type: 'SET_SELECTED_BREAK_CHECK_OUT_TIME'; payload: string }
  | { type: 'SET_BREAK_STARTED'; payload: boolean }
  | { type: 'SET_WORK_DAY_ID'; payload: string }
  | { type: 'SET_BREAK_COUNT'; payload: number }
  | { type: 'SET_BREAK_ID'; payload: string }
  | { type: 'SET_CHECK_OUT_TIME_VALIDATION_STATE'; payload: Validation }
  | { type: 'SET_BREAK_CHECK_IN_TIME_VALIDATION_STATE'; payload: Validation }
  | { type: 'SET_BREAK_CHECK_OUT_TIME_VALIDATION_STATE'; payload: Validation }
  | { type: 'INCREMENT_BREAK_COUNT'; payload: number }
  | { type: 'SET_WORK_DAY'; payload: WorkDay | undefined }
  | { type: 'SET_ERROR'; payload: string | undefined }
  | { type: 'SET_WORK_DURATION'; payload: WorkDuration | undefined }

  interface AppContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
  }



export const initialState: State = {
  user: null,
  isCheckedIn: false,
  isCheckedOut: false,
  isOnBreak: false,
  selectedCheckInTime: '',
  selectedCheckOutTime: '',
  selectedBreakCheckInTime: '',
  selectedBreakCheckOutTime: '',
  breakStarted: false,
  workDayId: '',
  breakCount: 0,
  breakId: '',
  checkOutTimeValidationState: {
      errorMessage: '',
      status: true
  },
  breakCheckInTimeValidationState: {
    errorMessage: '',
    status: true
  },
  breakCheckOutTimeValidationState: {
    errorMessage: '',
    status: true
  },
  workDay: undefined,
  error: undefined,
  workDuration: undefined
};

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_IS_CHECKED_IN':
      return { ...state, isCheckedIn: action.payload };
    case 'SET_IS_CHECKED_OUT':
      return { ...state, isCheckedOut: action.payload };
    case 'SET_IS_ON_BREAK':
      return { ...state, isOnBreak: action.payload };
    case 'SET_SELECTED_CHECK_IN_TIME':
      return { ...state, selectedCheckInTime: action.payload };
    case 'SET_SELECTED_CHECK_OUT_TIME':
      return { ...state, selectedCheckOutTime: action.payload };
    case 'SET_SELECTED_BREAK_CHECK_IN_TIME':
      return { ...state, selectedBreakCheckInTime: action.payload };
    case 'SET_SELECTED_BREAK_CHECK_OUT_TIME':
      return { ...state, selectedBreakCheckOutTime: action.payload };
    case 'SET_BREAK_STARTED':
      return { ...state, breakStarted: action.payload };
    case 'SET_WORK_DAY_ID':
        return { ...state, workDayId: action.payload };
    case 'SET_BREAK_COUNT':
      return { ...state, breakCount: action.payload };
    case 'SET_BREAK_ID':
      return { ...state, breakId: action.payload };
    case 'SET_CHECK_OUT_TIME_VALIDATION_STATE':
      return { ...state, checkOutTimeValidationState: action.payload };
    case 'SET_BREAK_CHECK_IN_TIME_VALIDATION_STATE':
      return { ...state, breakCheckInTimeValidationState: action.payload };
    case 'SET_BREAK_CHECK_OUT_TIME_VALIDATION_STATE':
      return { ...state, breakCheckOutTimeValidationState: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'INCREMENT_BREAK_COUNT':
        return { ...state, breakCount: state.breakCount + 1 };
    case 'SET_WORK_DAY':
        return { ...state, workDay: action.payload };
    case 'SET_WORK_DURATION':
        return { ...state, workDuration: action.payload };
    default:
      return state;
  }
};

export const AppContext = createContext<AppContextProps>({
  state: initialState,
  dispatch: () => {},
});


  

  