import React, { useEffect, useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Loader from './Loader';

import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Sidebar = () => {
  const [grafikL, setGrafikL] = useState([]);

  useEffect(() => {
    const fetchGrafikL = async () => {
      const response = await axios.get('/api/grafikkelamin');

      setGrafikL(response.data);
    };
    fetchGrafikL();
  }, []);

  const kelamin = grafikL.map(grafik => {
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
        type: 'column',
        startAngle: 75,
        toolTipContent: '<b>{label}</b>: {y}',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 16,

        dataPoints: kelamin,
      },
    ],
  };

  return (
    <>
      <Col md={3}>
        <br />
        <Card style={{ width: '18rem' }}>
          {grafikL.length === 0 ? (
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
        <br />
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Peta Kantor Kelurahan</Card.Title>
            <Card.Text>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.201869584062!2d124.80098366608459!3d1.4444649682624109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3287746024d0e507%3A0x7e4930ce14d680fa!2sKANTOR%20LURAH%20MALALAYANG%20SATU!5e0!3m2!1sid!2sid!4v1605512442484!5m2!1sid!2sid"
                width="250"
                height="250"
              ></iframe>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default Sidebar;
