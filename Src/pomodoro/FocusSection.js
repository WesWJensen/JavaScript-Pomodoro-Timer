import React from 'react';
import { minutesToDuration } from '../utils/duration';

//All aspects of the focus duration 
function FocusSection({ focusDuration, focusMinus, focusPlus, session }) {

  return (
    <div className="col">
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
        Focus Duration: {minutesToDuration(focusDuration)}
      </span>
      <div className="input-group-append">
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-focus"
          onClick={focusMinus}
          disabled={focusDuration === 5 || !!session}
        >
          <span className="oi oi-minus" />
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-focus"
          onClick={focusPlus}
          disabled={focusDuration === 60 || !!session}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  </div>
  );
}

export default FocusSection;