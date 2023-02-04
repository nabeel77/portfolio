import React, { useState, useCallback, useEffect } from 'react';
import Button from '../../../components/Button';
import globalDesigns from '../../../staticData/globalDesigns';
import { BiPlus, BiMinus } from 'react-icons/bi';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import usePopup from '../../../components/hooks/usePopup';
import Popup from '../../../components/Popup';
import { devIcons } from '../../../staticData/devIcons';
import Technologies from '../../../components/Technologies';
import { technologies } from '../../../staticData/devSkills';

const Skills = () => {
  const animatedComponents = makeAnimated();
  const [formShow, setFormShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [skillSet, setSkillSet] = useState(null);
  const [isShowing, showPopup, hidePopup, popupState, setError, setSuccess] =
    usePopup({ message: '' });
  const buttonStyles = `my-0 mx-auto text-center flex justify-center ${globalDesigns.responsiveFontStyles} ${globalDesigns.buttonStyles}`;

  const handleFormState = useCallback(() => {
    setFormShow((formShow) => !formShow);
  }, []);

  // Save skills to db
  const handleSkillsSubmit = useCallback(async () => {
    const result = await fetch('/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedOption,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        setError(err.message);
        showPopup();
      });
    if (result.status === 'success') {
      setSuccess('Skills saved successfully');
      showPopup();
      await getSkills();
    } else {
      setError('An error occured while saving data.');
      showPopup();
    }
  }, [selectedOption, setError, setSuccess, showPopup]);

  const getSkills = useCallback(async () => {
    const result = await fetch('/api/skills', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((err) => {
        setError(err.message);
        showPopup();
      });
    if (result && result.status === 'success' && result.result) {
      setSkillSet(result.result);
    }
  }, []);

  // Run when the component renders initially to get user's skillset
  useEffect(() => {
    const skills = async () => {
      await getSkills();
    };
    skills();
  }, [getSkills]);

  return (
    <>
      <Popup
        isShowing={isShowing}
        state={globalDesigns[popupState.state]}
        message={popupState.message}
        hide={hidePopup}
      />
      <div className="flex flex-col gap-4 w-full pl-8 pr-8 pt-28">
        <Button
          styles={`w-10 h-10 ${buttonStyles}`}
          handleClick={handleFormState}
        >
          {formShow ? (
            <BiMinus className="w-5 h-5" />
          ) : (
            <BiPlus className="w-5 h-5" />
          )}
        </Button>
        {formShow && (
          <div className="h-max w-full md:w-6/12 my-0 mx-auto flex flex-col gap-4">
            <Select
              className="select-bordered w-full text-black "
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={technologies}
            />
            <Button
              styles={`px-3.5 py-2 ${buttonStyles}`}
              handleClick={handleSkillsSubmit}
            >
              Submit
            </Button>
          </div>
        )}
        <Technologies
          skillSetsArr={skillSet}
          skillSetsObj={devIcons}
          showIcons={true}
        />
      </div>
    </>
  );
};

export default Skills;
