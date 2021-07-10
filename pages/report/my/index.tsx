import React from 'react';
import Subnavbar from '../../../components/common/Subnavbar';
import Container from '../../../components/ui/Container';

const My = () => {
  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'report',
          sub: { first: 'free', second: 'chart', third: 'my' },
        }}
      />
      <h2>my page</h2>
    </Container>
  );
};

export default My;
