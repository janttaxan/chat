import React from 'react';

import { Header } from 'components/layout/header';
import { Col, Container, Row } from 'react-bootstrap';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <Container as='section' fluid>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <main>{props.children}</main>
        </Col>
      </Row>
    </Container>
  );
}
