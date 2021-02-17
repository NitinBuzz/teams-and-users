export const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS'
export const FETCH_TEAMS_FAILURE = 'FETCH_TEAMS_FAILURE'
export const FETCH_TEAM_SUCCESS = 'FETCH_TEAM_SUCCESS'
export const FETCH_TEAM_FAILURE = 'FETCH_TEAM_FAILURE'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FILTER_UPDATE = 'FILTER_UPDATE'
export const LOADING = 'LOADING'

const initialState = {
    teams: [],
    users: [],
    usersTeamMap: [],
    loadiing: true,
    filterStr: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TEAMS_SUCCESS:
            console.log(action)
            return {
                ...state,
                teams: action.data.teams,
                users: action.data.users,
                usersTeamMap: action.data.usersTeamMap,
                loadiing: false
            }
        case FETCH_TEAM_SUCCESS:
            return {
                ...state,
                teamByID: action.teamByID,
                loadiing: false
            }
        case LOADING:
            return {
                ...state,
                loadiing: true
            }
        case FILTER_UPDATE:
            return {
                ...state,
                filterStr: action.filterStr
            }
        default:
            return state
    }
}

export const onFilterChange = (e) => {
    return dispatch => {
        dispatch({
            type: FILTER_UPDATE,
            filterStr: e.target.value
        })
    }
}


export const resetFilter = () => {
    return dispatch => {
        dispatch({
            type: FILTER_UPDATE,
            filterStr: ''
        })
    }
}

export const getTeamsAndUsers = () => {
    return dispatch => {
        dispatch({
            type: LOADING
        })
        fetch('https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/')
            .then(data => data.json())
            .then(teams => {
                getUsers()
                .then(users => {
                    const usersTeamMap = {};
                    teams.map(i => i.id)
                    .forEach(teamId => { usersTeamMap[teamId] = users.filter(user => user.teamId && user.teamId.indexOf(teamId) > -1)})
                    window.ss = {users, usersTeamMap, teams}
                    return {users, usersTeamMap, teams}
                })
                .then(data => {
                    dispatch({
                        type: FETCH_TEAMS_SUCCESS,
                        data
                    })
                })
            })
            .catch(() => {
                dispatch({
                    type: FETCH_TEAMS_FAILURE
                })
            });
    }
}

export const getUsers = () => {
    return new Promise(resolve => {

        fetch('https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/')
            .then(data => data.json())
            .then(users => resolve(users))
            .catch(() => {
                resolve(null)
            });
    })
}

export const getUser = (id) => {
    return dispatch => {
        fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/${id}`)
            .then(data => data.json())
            .then(userById => {
                dispatch({
                    type: FETCH_USER_SUCCESS,
                    userById
                })
            })
            .catch(() => {

            });
    }
}


export const getTeam = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING
        })

        fetch(`https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/${id}`)
            .then(data => data.json())
            .then(teamByID => {
                dispatch({
                    type: FETCH_TEAM_SUCCESS,
                    teamByID
                })
            })
            .catch(() => {

            });
    }
}

