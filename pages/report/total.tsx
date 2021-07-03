import React from 'react';
import Subnavbar from '../../components/common/Subnavbar';
import Container from '../../components/ui/Container';

const Total = () => {
  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'report',
          sub: { first: 'total', second: 'company', third: 'my' },
        }}
      />
      <h2>CHART REPORT</h2>
    </Container>
  );
};

export default Total;
