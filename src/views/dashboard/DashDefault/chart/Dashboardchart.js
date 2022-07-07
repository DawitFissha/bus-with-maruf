import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import LineChart from '../../../charts/nvd3-chart/chart/LineChart';
import BarDiscreteChart from '../../../charts/nvd3-chart/chart/BarDiscreteChart';
import PieDonutChart from '../../../charts/nvd3-chart/chart/PieDonutChart';
import PieBasicChart from '../../../charts/nvd3-chart/chart/PieBasicChart';
import MultiBarChart from '../../../charts/nvd3-chart/chart/MultiBarChart';

const Charts = () => {
    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Line Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <LineChart />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Discrete Bar Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <BarDiscreteChart />
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Stacked/Grouped Multi-Bar Chart</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <MultiBarChart />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Pie Basic Chart</Card.Title>
                        </Card.Header>
                        <Card.Body className="text-center">
                            <PieBasicChart />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Donut Chart</Card.Title>
                        </Card.Header>
                        <Card.Body className="text-center">
                            <PieDonutChart />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Charts;
