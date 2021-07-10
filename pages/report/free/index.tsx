import React from 'react';
import Subnavbar from '../../../components/common/Subnavbar';
import { Container } from '../../../components/ui';

const index = () => {
  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'report',
          sub: { first: 'free', second: 'chart', third: 'my' },
        }}
      />
      <h2>free board</h2>
    </Container>
  );
};

export default index;
