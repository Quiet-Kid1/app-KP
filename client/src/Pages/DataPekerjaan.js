import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import CanvasJSReact from '../assets/canvasjs.react';
import Sidebar from '../components/Sidebar';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DataPekerjaan = () => {
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: 'Grafik Data',
    },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}%',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}%',
        dataPoints: [
          { y: 18, label: 'Direct' },
          { y: 49, label: 'Organic Search' },
          { y: 9, label: 'Paid Search' },
          { y: 5, label: 'Referral' },
          { y: 19, label: 'Social' },
          { y: 19, label: 'Social' },
          { y: 19, label: 'Social' },
        ],
      },
    ],
  };

  return (
    <>
      <Container className="py-3">
        <Row>
          <Col md={9}>
            <Card>
              <Card.Header>Demografi Berdasar Pekerjaan</Card.Header>
              <Card.Body>
                <Card.Text>
                  <CanvasJSChart options={options} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </>
  );
};

export default DataPekerjaan;
