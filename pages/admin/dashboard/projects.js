import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import ImageUpload from '../../../components/imageUpload';
import useImageUpload from '../../../components/hooks/useImageUpload';
import Popup from '../../../components/popup';
import usePopup from '../../../components/hooks/usePopup';
import globalDesigns from '../../../components/globalDesigns';
import Button from '../../../components/button';
import { BiPlus, BiMinus } from 'react-icons/bi';
import Input from '../../../components/input';
import useForm from '../../../components/hooks/useForm';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { technologies } from '../../../components/devSkills';

const Projects = () => {
  const animatedComponents = makeAnimated();
  const [imageUrl, onImageChange, error, changeErrorState] = useImageUpload();
  const [isShowing, showPopup, hidePopup, popupState, setError] = usePopup({
    message: '',
  });
  const [formState, inputHandler] = useForm({
    name: { value: '' },
    description: { value: '' },
    url: { value: '' },
  });
  const [formShow, setFormShow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const buttonStyles = `btn btn-active my-0 mx-auto text-center flex justify-center ${globalDesigns.responsiveFontStyles} ${globalDesigns.buttonStyles}`;

  const handleFormState = useCallback(() => {
    setFormShow((formShow) => !formShow);
  }, []);

  const filterTechnologies = useCallback((technologies) => {
    return technologies.map((item) => item.value);
  }, []);

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const cleanedTechnologyOptions = filterTechnologies(selectedOptions);
      const formData = {
        projectName: formState.inputs.name.value,
        projectDescription: formState.inputs.description.value,
        projectUrl: formState.inputs.url.value,
        technologies: cleanedTechnologyOptions,
      };
      console.log(formData);
    },
    [formState, selectedOptions, imageUrl]
  );

  useEffect(() => {
    if (error) {
      setError('Image size should not exceed 3 MB');
      showPopup();
    }
  }, [error]);

  return (
    <div>
      <Head>
        <title>Projects</title>
      </Head>
      <Popup
        isShowing={isShowing}
        state={globalDesigns[popupState.state]}
        message={popupState.message}
        hide={hidePopup}
      />
      <div className="w-full pl-8 pt-28 pb-28 flex flex-col gap-5">
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
          <div className="z-50 my-0 mx-auto p-5 flex m-4 rounded shadow bg-base-200 w-9/12">
            <form
              onSubmit={submitHandler}
              className="p-5 w-full flex flex-col justify-center items-center gap-4"
            >
              <Input
                id="name"
                element="input"
                type="text"
                placeholder="Project name"
                onInput={inputHandler}
                classNames="input input-bordered w-full max-w-xs"
              />

              <Input
                id="url"
                element="input"
                type="url"
                placeholder="Project URL"
                onInput={inputHandler}
                classNames="input input-bordered w-full max-w-xs"
              />

              <Input
                id="description"
                element="text-area"
                type="text"
                onInput={inputHandler}
                classNames="textarea input-bordered w-full max-w-xs"
                placeholder="Project description"
              />
              <label htmlFor="technologies">Select technologies</label>
              <Select
                id="technologies"
                className="select-bordered w-full max-w-xs text-black "
                defaultValue={selectedOptions}
                onChange={setSelectedOptions}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={technologies}
              />

              <ImageUpload
                onImageChange={onImageChange}
                imageUrl={imageUrl}
                error={error}
                changeErrorState={changeErrorState}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
