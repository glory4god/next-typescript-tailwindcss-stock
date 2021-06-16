import React, { FC } from 'react';
import Container from '../../components/ui/Container';
import SubNavbar from '../../components/common/Subnavbar';

interface Props {}

const Line: FC<Props> = () => {
  return (
    <Container>
      <SubNavbar
        pages={{
          main: 'chart',
          sub: { first: 'line', second: 'correlation', third: 'nothing' },
        }}
      />
      dkdkkddkk
    </Container>
  );
};

export default Line;
