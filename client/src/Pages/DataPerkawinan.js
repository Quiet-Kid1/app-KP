import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import axios from 'axios';

import CanvasJSReact from '../assets/canvasjs.react';
import Sidebar from '../components/Sidebar';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DataPerkawinan = () => {
  const [grafikS, setGrafikS] = useState([]);

  useEffect(() => {
    const fetchGrafikS = async () => {
      const response = await axios.get('/api/grafiknikah');

      setGrafikS(response.data);
    };
    fetchGrafikS();
  }, []);

  const nikah = grafikS.map(grafik => {
    return {
      label: grafik._id,
      y: grafik.count,
    };
  });

  const options = {
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: 'Grafik Data',
    },
    data: [
      {
        type: 'pie',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,
        indexLabel: '{label} - {y}',
        dataPoints: nikah,
      },
    ],
  };

  return (
    <>
      <Container className="py-3">
        <Row>
          <Col md={9}>
            <Card>
              <Card.Header>Demografi Berdasar Perkawinan</Card.Header>
              {grafikS.length === 0 ? (
                <Loader />
              ) : (
                <Card.Body>
                  <Card.Title>Statistik Kelurahan Malalayang</Card.Title>
                  <Card.Text>
                    <CanvasJSChart options={options} />
                  </Card.Text>
                </Card.Body>
              )}
            </Card>
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </>
  );
};

export default DataPerkawinan;
