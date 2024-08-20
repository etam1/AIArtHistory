import { useState } from 'react';
import './styles.css';

export const Workflow = () => {
  const [steps, setSteps] = useState(new Array(5).fill('step'));

  return (
    <div>
      {steps.map((step, index) => {
        return (
          <div className="stepWrapper">
            <div>
              {step}-{index + 1}
            </div>
            <div />
          </div>
        );
      })}
      <div className="stepAdd">
        <button
          onClick={() => {
            setSteps((state) => state.concat('step'));
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
