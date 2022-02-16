export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export type SetAppStatusAT = {
    type: 'APP/SET-STATUS'
    status: RequestStatusType
}
export const setAppStatusAC = (status: RequestStatusType):SetAppStatusAT => {
    return {
        type: 'APP/SET-STATUS',
        status
    }
}
type ActionsType = SetAppStatusAT
