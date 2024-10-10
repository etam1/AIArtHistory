// MyComponent.tsx
import React from 'react';

const MyComponent: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default MyComponent;
