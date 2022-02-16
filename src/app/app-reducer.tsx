export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export type SetAppStatusAT = {
    type: 'APP/SET-STATUS'
    status: RequestStatusType
}
export type SetAppErrorAT = {
    type: 'APP/SET-ERROR'
    error: string | null
}
export const setAppStatusAC = (status: RequestStatusType):SetAppStatusAT => {
    return {
        type: 'APP/SET-STATUS',
        status
    }
}
export const setAppErrorAC = (error: string | null):SetAppErrorAT => {
    return {
        type: 'APP/SET-ERROR',
        error
    }
}

type AppActionsType = SetAppStatusAT | SetAppErrorAT
