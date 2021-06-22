import React from 'react';

import SubNavbar from '../../components/common/Subnavbar';

export default function Corrlation() {
  return (
    <div>
      <SubNavbar
        pages={{
          main: 'chart',
          sub: { first: 'line', second: 'correlation', third: 'nothing' },
        }}
      />
    </div>
  );
}
