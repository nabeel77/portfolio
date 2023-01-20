import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Button from '../../../components/button';
import responsiveGlobalDesigns from '../../../components/globalDesigns';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { MultiSelect } from 'primereact/multiselect';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

const Skills = (props) => {
  const animatedComponents = makeAnimated();
  const [formShow, setFormShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [skillsAdded, setSkillsAdded] = useState(true);
  const buttonStyles = `my-0 mx-auto text-center flex justify-center ${responsiveGlobalDesigns.responsiveFontStyles} ${responsiveGlobalDesigns.buttonStyles}`;
  const options = [
    { value: 'React', label: 'React' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'Typescript', label: 'Typescript' },
    { value: 'Next.js', label: 'Next.js' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'alpine.js', label: 'alpine.js' },
    { value: 'Php', label: 'Php' },
    { value: 'Java', label: 'Java' },
    { value: 'Python', label: 'Python' },
    { value: 'Tailwindcss', label: 'Tailwindcss' },
    { value: 'Mysql', label: 'Mysql' },
    { value: 'Mongodb', label: 'Mongodb' },
    { value: 'Firebase', label: 'Firebase' },
    { value: 'Redis', label: 'Redis' },
  ];
  const handleFormState = useCallback(() => {
    setFormShow((formShow) => !formShow);
  }, [formShow]);
  const handleSkillsSubmit = useCallback(async () => {
    const result = await fetch('/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedOption,
      }),
    }).catch((err) => {});
    console.log(result);
  });

  const getSkills = useCallback(async () => {
    const result = await fetch('/api/skills', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((err) => {});

    console.log(result);
  }, []);

  useEffect(() => {
    const skills = async () => {
      const result = await getSkills();
    };
    skills();
  }, []);

  return (
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
    </div>
  );
};

export default Skills;
