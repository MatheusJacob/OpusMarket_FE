import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Stepper,
    Step,
    StepButton,
    Button,
    Typography,
    Container
} from '@material-ui/core';

import BaseProductConfiguration from "./Forms/BaseProductConfiguration";
import ProductImagesConfiguration from "./Forms/ProductImagesConfiguration";
import ProductMetaConfiguration from "./Forms/ProductMetaConfiguration";
import ProductModifierConfiguration from "./Forms/ProductModifierConfiguration";
import ProductPromotionConfiguration from "./Forms/ProductPromotionConfiguration";
import ProductCouponConfiguration from "./Forms/ProductCouponConfiguration";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
  return ['Define Product Basics', 'Add Images', 'Add Meta Tags', 'Add Modifiers', 'Add Promotion', 'Add Coupon'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
        return BaseProductConfiguration;
    case 1:
        return ProductImagesConfiguration;
    case 2:
        return ProductMetaConfiguration;
    case 3:
        return ProductModifierConfiguration;
    case 4:
        return ProductPromotionConfiguration;
    case 5:
        return ProductCouponConfiguration;
    default:
        return 'Unknown step';
  }
}

function getStepText(step) {
    switch (step) {
      case 0:
          return 'Step 1: Add your products name, description, and off promotion price...';
      case 1:
          return 'Step 2 (optional): Add images to your product listing...';
      case 2:
          return 'Step 3 (optional): Add meta data for your product...';
      case 3:
          return 'Step 4 (optional): Add any variants your product may have...';
      case 4:
          return 'Step 5 (optional): Add a current promotion to your product...';
      case 5:
          return 'Step 6 (optional): Add a coupon which can be applied to your product...';
      default:
          return 'Unknown step';
    }
  }


function ProductConfigurationWizard() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(new Set());
    const [skipped, setSkipped] = useState(new Set());
    const steps = getSteps();

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        base_price: '',
        images: [],
        metas: [],
        modifiers: [],
        promotions: [],
        coupons: []
    });

    const totalSteps = () => {
        return getSteps().length;
    };

    const isStepOptional = (step) => {
        return step >= 1;
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
        });
    };

    const skippedSteps = () => {
        return skipped.size;
    };

    const completedSteps = () => {
        return completed.size;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps() - skippedSteps();
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        const newActiveStep =
        isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed
            // find the first step that has been completed
            steps.findIndex((step, i) => !completed.has(i))
            : activeStep + 1;

        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);

        if (completed.size !== totalSteps() - skippedSteps()) {
        handleNext();
        }
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted(new Set());
        setSkipped(new Set());
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    function isStepComplete(step) {
        return completed.has(step);
    }

    return (
        <div className={classes.root}>
            <Container>
                {getStepContent(activeStep)(productData, setProductData)}
            </Container>

            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const buttonProps = {};
                    if (isStepOptional(index)) {
                        buttonProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepButton
                                onClick={handleStep(index)}
                                completed={isStepComplete(index)}
                                {...buttonProps}
                            >
                                {label}
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                <div>
                    <Typography className={classes.instructions}>
                        Product Creation Complete
                    </Typography>
                    <Button onClick={handleReset}>Create Another</Button>
                </div>
                ) : (
                <div>
                    <Typography className={classes.instructions}>{getStepText(activeStep)}</Typography>
                    <div>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            Next
                        </Button>
                        {isStepOptional(activeStep) && !completed.has(activeStep) && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSkip}
                                className={classes.button}
                            >
                                Skip
                            </Button>
                        )}

                    {activeStep !== steps.length &&
                        (completed.has(activeStep) ? (
                            <Typography variant="caption" className={classes.completed}>
                                Step {activeStep + 1} already completed
                            </Typography>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleComplete}>
                                {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                            </Button>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default ProductConfigurationWizard;