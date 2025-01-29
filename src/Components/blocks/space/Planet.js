import React, { forwardRef } from 'react';

const Planet = forwardRef(({ id }, ref) => {
  return (
    <div className="planet__quote">
      <img
        src={`src/img/space-content/planet-${id}.svg`}
        alt="Мысль"
        id={`planet__quote-${id}`}
        ref={ref}
      />
    </div>
  );
});

export default Planet;
