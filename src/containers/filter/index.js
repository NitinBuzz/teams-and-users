import React from 'react'
import { Badge, Button, Container, Col, Form, ListGroup, Row, Spinner } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    onFilterChange,
} from '../../modules/teams'

const Filter = (props) => {
    return (
        <div>
            <Form.Group>
                <Form.Control onChange={props.onFilterChange} size="lg" type="text" id="filter" placeholder="Type to filter" />
                <br />
            </Form.Group>
        </div>
    )
}

const mapStateToProps = ({ teams }) => ({
    filterStr: teams.filterStr,
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            onFilterChange,
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)
