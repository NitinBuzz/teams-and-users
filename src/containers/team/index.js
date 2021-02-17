import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Filter from '../filter'
import { Badge, Button, Container, Col, ListGroup, Row, Spinner } from 'react-bootstrap'
import {
    getUser,
    resetFilter
} from '../../modules/teams'

const Team = props => {
    const { loadiing, changePage, filterStr, usersTeamMap, resetFilter, teams, match } = props;
    const teamDetails = teams.find(i => i.id === match.params.id)
    // props.match.params.id

    useEffect(() => {
        if (!match.params.id || !usersTeamMap || !usersTeamMap[match.params.id]) {
            changePage();
            return;
        }
        resetFilter();
        // usersTeamMap[match.params.id].map(user => user.id).forEach(id => props.getUser(id));
    }, []);

    const renderTeamMembers = () => {
        return usersTeamMap[match.params.id] ? <><Filter /> {usersTeamMap[match.params.id].map((user, index) => {
            return (!filterStr || (filterStr && user.name.toLowerCase().indexOf(filterStr.toLowerCase()) !== -1)) && <ListGroup.Item key={user.id}>
                {user.name + "  "}{index === 0 && <Badge variant="info">LEAD</Badge>}
            </ListGroup.Item>
        })}</> : null;
    }

    return (
        <Container>
            <Row className="justify-content-md-center d-flex align-items-center mt-4">
                <Col lg="6">
                    {loadiing}
                    <h4>{teamDetails && <span>Team #{teamDetails.name}</span>}</h4>
                    {loadiing ? <span><Spinner animation="border" variant="primary" />
                        <Spinner animation="border" variant="success" />
                        <Spinner animation="border" variant="danger" />
                        <Spinner animation="border" variant="warning" />
                        <Spinner animation="border" variant="info" /></span> : <ListGroup variant="flush">{renderTeamMembers()}</ListGroup>}
                </Col>
            </Row>
        </Container>)
}

const mapStateToProps = ({ teams }) => ({
    teams: teams.teams,
    usersTeamMap: teams.usersTeamMap,
    loadiing: teams.loadiing,
    filterStr: teams.filterStr
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getUser,
            resetFilter,
            changePage: () => push(`/teams`)
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Team)
