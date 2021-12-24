import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [stepKey, setStepKey] = useState(null);
  const [sectionKey, setSectionKey] = useState(null);
  const [previousSection, setPreviousSection] = useState(null);
  const [previousPathname, setPreviousPathname] = useState(null);
  const { onboardingState, setStepAsComplete } = useContext(OnboardingContext);
  const { pathname } = useLocation();

  useEffect(() => {
    // Get current section
    const currentSectionKey = Object.keys(onboardingState.sections).find(currentSectionKey =>
      pathname.match(onboardingState.sections[currentSectionKey].pageMatcher)
    );

    const section = onboardingState.sections[currentSectionKey];

    // Skip the modal if we don't have an onboarding section matchin the current page
    // && if the previous page section is the same as the current one
    const shouldSkipModal =
      !section ||
      (previousSection && previousSection.name === section.name && previousPathname !== pathname) ||
      section.done;

    // const shouldSkipModal =
    // !section
    // || (previousSection && previousSection.name === section.name && previousPathname !== pathname)
    // || section.done

    // We need to keep the previous page after testing if we are still on the same section
    // We need to keep the previous page before rendering or skipping the modal
    setPreviousSection(section);
    setPreviousPathname(pathname);

    if (shouldSkipModal) {
      setIsVisible(false);

      return;
    }

    const { steps } = section;
    // Get the curent step
    const currentStepKey = Object.keys(steps).find(key => steps[key].done === false);
    const step = steps[currentStepKey];
    setCurrentStep(step);
    setStepKey(currentStepKey);

    setSectionKey(currentSectionKey);
    setIsVisible(true);
  }, [pathname, onboardingState, previousSection, previousPathname]);

  // useEffect(() => {console.log('yooooooolooooooooo')}, [onboardingState])

  const handleEndActionClick = () => {
    if (currentStep && currentStep.selfValidate) {
      setStepAsComplete(sectionKey, stepKey);
    } else {
      setIsVisible(prev => !prev);
    }
  };

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
          <ModalFooter endActions={<Button onClick={handleEndActionClick}>click me</Button>} />
        </ModalLayout>
      )}
    </>
  );
};

export default OnboardingModal;
