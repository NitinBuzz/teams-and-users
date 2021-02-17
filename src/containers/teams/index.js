import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Badge, Button, Container, Col, ListGroup, Row, Spinner } from 'react-bootstrap'
import Filter from '../filter'
import {
    getTeamsAndUsers,
    resetFilter
} from '../../modules/teams'

const Teams = props => {
    // const [teams, setData] = useState({ teams: [] });
    const { loadiing, filterStr, resetFilter, teams, usersTeamMap, changePage } = props

    useEffect(() => {
        if (!teams.length) {
            props.getTeamsAndUsers()
        }
        resetFilter();
    }, []);

    const renderTeam = (team) => {
        return (!filterStr || (filterStr && team.name.toLowerCase().indexOf(filterStr.toLowerCase()) !== -1)) &&
            <ListGroup.Item className="team-details" key={team.id}>
                Team Name: <Button variant="link" onClick={(() => changePage(team.id))}>
                    <b>{team.name}</b></Button>
                 | Team Count: <Badge variant="info">{usersTeamMap[team.id].length}</Badge>
            </ListGroup.Item>
    }

    const renderTeams = () => {
        if (!teams || teams.length === 0) {
            return null;
        }
        return <><Filter /><ListGroup className="teams-container">{teams.map(team => renderTeam(team))}</ListGroup></>
    }

    return (
        <Container>
            <Row className="justify-content-md-center d-flex align-items-center mt-4">
                <Col lg="6">
                    <h1>Teams</h1>
                    {loadiing ? <span><Spinner animation="border" variant="primary" />
                        <Spinner animation="border" variant="success" />
                        <Spinner animation="border" variant="danger" />
                        <Spinner animation="border" variant="warning" />
                        <Spinner animation="border" variant="info" /></span> : renderTeams()}
                </Col>
            </Row>
        </Container>)
}

const mapStateToProps = ({ teams }) => ({
    teams: teams.teams,
    users: teams.users,
    usersTeamMap: teams.usersTeamMap,
    loadiing: teams.loadiing,
    filterStr: teams.filterStr
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getTeamsAndUsers,
            resetFilter,
            changePage: (id) => push(`/team/${id}`)
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teams)
