import React, { useState, useCallback, useEffect } from 'react';
import Button from '../../../components/button';
import globalDesigns from '../../../components/globalDesigns';
import { BiPlus, BiMinus } from 'react-icons/bi';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import usePopup from '../../../components/hooks/usePopup';
import Popup from '../../../components/popup';
import devIcons from '../../../components/devIcons';
import SkillSets from '../../../components/skills';
const Skills = () => {
  const animatedComponents = makeAnimated();
  const [formShow, setFormShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [skillSet, setSkillSet] = useState(null);
  const [isShowing, showPopup, hidePopup, popupState, setError, setSuccess] =
    usePopup({ message: '' });
  const buttonStyles = `my-0 mx-auto text-center flex justify-center ${globalDesigns.responsiveFontStyles} ${globalDesigns.buttonStyles}`;
  const options = [
    { value: 'Html5', label: 'Html5' },
    { value: 'Css3', label: 'Css3' },
    { value: 'Sass', label: 'Sass' },
    { value: 'Bootstrap', label: 'Bootstrap' },
    { value: 'Tailwindcss', label: 'Tailwindcss' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'Typescript', label: 'Typescript' },
    { value: 'Php', label: 'Php' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'Node', label: 'Node' },
    { value: 'Express', label: 'Express' },
    { value: 'Koa', label: 'Koa' },
    { value: 'React', label: 'React' },
    { value: 'Redux', label: 'Redux' },
    { value: 'GraphQL', label: 'GraphQL' },
    { value: 'Apollo', label: 'Apollo' },
    { value: 'Socket', label: 'Socket' },
    { value: 'Axios', label: 'Axios' },
    { value: 'Eslint', label: 'Eslint' },
    { value: 'Prettier', label: 'Prettier' },
    { value: 'Webpack', label: 'Webpack' },
    { value: 'Next', label: 'Next' },
    { value: 'Alpine', label: 'Alpine' },
    { value: 'Mysql', label: 'Mysql' },
    { value: 'Mongodb', label: 'Mongodb' },
    { value: 'Firebase', label: 'Firebase' },
    { value: 'Redis', label: 'Redis' },
    { value: 'Vercel', label: 'Vercel' },
    { value: 'Heroku', label: 'Heroku' },
    { value: 'Docker', label: 'Docker' },
    { value: 'Git', label: 'Git' },
    { value: 'Github', label: 'Github' },
    { value: 'GoogleCloud', label: 'GoogleCloud' },
    { value: 'GoogleAnalytics', label: 'GoogleAnalytics' },
    { value: 'Auth0', label: 'Auth0' },
    { value: 'Pwa', label: 'Pwa' },
  ];
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
      <div className="flex flex-col gap-4 relative w-full pl-8 pr-8 pt-28">
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
              className="w-full text-black "
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options}
            />
            <Button
              styles={`px-3.5 py-2 ${buttonStyles}`}
              handleClick={handleSkillsSubmit}
            >
              Submit
            </Button>
          </div>
        )}
        <SkillSets skillSetsArr={skillSet} skillSetsObj={devIcons} />
      </div>
    </>
  );
};

export default Skills;
