import {appReducer, RequestStatusType, setAppErrorAC, setAppStatusAC} from './app-reducer';

type startType = {
    status: RequestStatusType
    error: string | null,
    isInitialized: boolean
}

let startState:startType;

beforeEach(()=>{
    startState = {
        error: null,
        status: 'idle'as RequestStatusType,
        isInitialized: false
    }
})

test("correct error message should be set", () => {
    const endState = appReducer(startState, setAppErrorAC({error: "some error"}))

    expect(endState.error).toBe("some error")
})

test("correct status should be set", () => {
    const endState = appReducer(startState, setAppStatusAC({status: "loading"}))

    expect(endState.status).toBe("loading")
})