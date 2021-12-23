import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import values from 'lodash/values';
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import OnboardingContext from './OnboardingContext';

const OnboardingModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const { onboardingState, setStepAsComplete } = useContext(OnboardingContext);
  const { pathname } = useLocation();

  useEffect(() => {
    // Get current section
    const sections = values(onboardingState.sections);
    const section = sections.find(section => pathname.match(section.pageMatchers));

    // GUARD: onboarding exists on this page
    if (!section) {
      return;
    }

    // Get the curent step
    const step = values(section.steps).find(step => step.done === false);
    setCurrentStep(step);

    setIsVisible(true);
  }, [pathname, onboardingState]);

  return (
    <>
      {isVisible && (
        <ModalLayout onClose={() => setIsVisible(prev => !prev)} labelledBy="title">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              {currentStep?.title}
            </Typography>
          </ModalHeader>
          <ModalBody>hello world</ModalBody>
          <ModalFooter
            endActions={<Button onClick={() => setIsVisible(prev => !prev)}>click me</Button>}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default OnboardingModal;
