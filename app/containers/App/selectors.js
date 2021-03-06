import { createSelector } from 'reselect'

const selectGlobal = () => (state) => state.get('global')

const selectHasTouch = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('hasTouch')
)

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const loaded = globalState.get('loaded').toJS()
    return !Object
      .values(loaded)
      .reduce((acc, val) => acc && val, true)
  }
)

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
)

const selectMapDefaults = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'defaults', 'map']).toJS()
)

const selectCSSVariables = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'cssVariables']).toJS()
)

const selectCollections = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'collections']).toJS()
    .filter((collection) => collection.include)
)

const selectAnimals = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'animals']).toJS()
)

const selectStepData = (step) => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('steps')
      .toJS()
      .filter((s) => s && s.step === step)[0]
)

const selectSteps = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['config', 'steps']).toJS()
)

const selectItem = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('item').toJS()
)

const selectOAuth = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('oauth').toJS()
)

const selectLoggedIn = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const oauth = globalState.get('oauth').toJS()
    return oauth && oauth.oauth
  }
)

const selectSubmissions = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('submissions').toJS()
)

const selectPaneMode = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['panes', 'mode'])
)

const selectPaneIndex = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['panes', 'index'])
)

const selectShowMetadata = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('showMetadata')
)

const getCurrentStepIndex = (state) => {
  // return index of current step:
  //   state.steps holds all submitted steps,
  //   current step is not yet submitted,
  //   so return state.steps.length - 1 + 1
  return state.get('steps').size
}

const selectSavedStepData = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const currentStepIndex = getCurrentStepIndex(globalState)
    const savedStepData = globalState
      .getIn(['savedSteps', currentStepIndex])

    if (savedStepData) {
      return savedStepData.toJS()
    }
  }
)

const selectLastSavedStepData = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const savedSteps = globalState.get('savedSteps')
    if (savedSteps.size) {
      return savedSteps.get(savedSteps.size - 1).toJS()
    }
  }
)

const selectCurrentStep = () => createSelector(
  selectGlobal(),
  (globalState) => {
    // get name of current step
    const currentStepIndex = getCurrentStepIndex(globalState)
    return globalState
      .getIn(['config', 'steps', currentStepIndex])
  }
)

const selectCurrentStepIndex = (step) => createSelector(
  selectGlobal(),
  (globalState) => getCurrentStepIndex(globalState)
)

const selectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return (state) => {
    const routingState = state.get('route') // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }

    return prevRoutingStateJS
  }
}

export {
  selectHasTouch,
  selectGlobal,
  selectCurrentStep,
  selectItem,
  selectOAuth,
  selectLoggedIn,
  selectSubmissions,
  selectCurrentStepIndex,
  selectAnimals,
  selectCollections,
  selectCSSVariables,
  selectStepData,
  selectSavedStepData,
  selectLastSavedStepData,
  selectSteps,
  selectMapDefaults,
  selectLoading,
  selectError,
  selectPaneMode,
  selectPaneIndex,
  selectLocationState,
  selectShowMetadata
}
