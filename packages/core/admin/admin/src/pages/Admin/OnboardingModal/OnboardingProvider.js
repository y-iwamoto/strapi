import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import OnboardingContext from './OnboardingContext';

const OnboardingProvider = ({ children }) => {
  const initialState = {
    sections: {
      '/content-manager': {
        done: false,
        steps: {
          1 : {
            done: false,
            title: 'init onboarding'
          },
          2: {
            done: false,
            title: 'success onboarding'
          },
        }
      },
    }
  };

  const [onboardingState, setOnboardingState] = useState(initialState);

  const setStepAsComplete = (sectionId, stepId) => {
    setOnboardingState(prev => {
      const newState = cloneDeep(prev);
      newState.sections[sectionId].steps[stepId].done = true;

      return newState;
    });
  };

  return (
    <OnboardingContext.Provider value={{ onboardingState, setStepAsComplete }}>
      {children}
    </OnboardingContext.Provider>
  );
};

OnboardingProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default OnboardingProvider;