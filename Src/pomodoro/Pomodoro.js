import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusSection from "./FocusSection";
import BreakSection from "./BreakSection";
import TimerControl from "./TimerControl";
import Display from "./Display";


function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}


function nextSession(focusDuration, breakDuration) {
  
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [session, setSession] = useState(null);
  
  const focusMinus = () => {
    setFocusDuration(Math.max(5, focusDuration - 5));
  };
  const focusPlus = () => {
    setFocusDuration(Math.min(60, focusDuration + 5));
  };

  const breakMinus = () => {
    setBreakDuration(Math.max(1, breakDuration - 1));
  };
  const breakPlus = () => {
    setBreakDuration(Math.min(15, breakDuration + 1));
  };

  const stop = () => {
    setIsTimerRunning(false);
    setSession(null);
  }

  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );


  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusSection focusMinus={focusMinus}
        focusDuration={focusDuration}
        focusPlus={focusPlus} 
        session={session}
        />
        <BreakSection breakMinus={breakMinus}
        breakDuration={breakDuration}
        breakPlus={breakPlus}
        session={session}
        />  
      </div>
        <TimerControl isTimerRunning={isTimerRunning}
          playPause={playPause} 
          session={session}
          stop={stop}
        />
        <Display session={session}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
        />
    </div>
  );
}

export default Pomodoro;
