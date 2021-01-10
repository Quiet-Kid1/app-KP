import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import axios from 'axios';
import CanvasJSReact from '../assets/canvasjs.react';
import Sidebar from '../components/Sidebar';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DataKelompokUmur = () => {
  const [grafikU, setGrafikU] = useState([]);

  useEffect(() => {
    const fetchGrafikU = async () => {
      const response = await axios.get('/api/grafikumur');

      setGrafikU(response.data);
    };
    fetchGrafikU();
  }, []);

  const umur = grafikU.map(grafik => {
    return {
      label: grafik.umur,
      y: grafik.penduduk,
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
        indexLabel: '{label} : {y}',
        dataPoints: umur,
      },
    ],
  };

  return (
    <>
      <Container className="py-3">
        <Row>
          <Col md={9}>
            <Card>
              <Card.Header>Demografi Berdasar Kelompok Umur</Card.Header>
              {grafikU.length === 0 ? (
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

export default DataKelompokUmur;
