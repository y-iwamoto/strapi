import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import values from 'lodash/values';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import OnboardingContext from './OnboardingContext';

const OnboardingModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const { onboardingState, setStepAsComplete } = useContext(OnboardingContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const currentSectionKey = Object.keys(onboardingState.sections)
      .find(section => pathname.includes(section));

    const section = onboardingState.sections[currentSectionKey];

    if(!section) {
      return
    }

    setCurrentSection(section);

    const step = values(section.steps).find(step => step.done === false);
    
    setCurrentStep(step);


    if(currentSectionKey) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [pathname, onboardingState]);

  return (
    <>
      {isVisible && 
        <ModalLayout onClose={() => setIsVisible(prev => !prev)} labelledBy="title">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
              {currentStep?.title}
            </Typography>
          </ModalHeader>
          <ModalBody>
            hello world
          </ModalBody>
          <ModalFooter endActions={<Button onClick={() => setStepAsComplete('/content-manager', '1')}>click me</Button>} />
        </ModalLayout>}
    </>
  )
}

export default OnboardingModal;
