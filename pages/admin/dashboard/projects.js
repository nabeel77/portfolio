import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import ImageUpload from '../../../components/imageUpload';
import useImageUpload from '../../../components/hooks/useImageUpload';
import Popup from '../../../components/popup';
import usePopup from '../../../components/hooks/usePopup';
import globalDesigns from '../../../constants/globalDesigns';
import Button from '../../../components/button';
import { BiPlus, BiMinus } from 'react-icons/bi';
import Input from '../../../components/input';
import useForm from '../../../components/hooks/useForm';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { technologies } from '../../../constants/devSkills';
import AllProjects from '../../../components/allProjects';
import Loader from '../../../components/loader';

const Projects = () => {
  const animatedComponents = makeAnimated();
  const [imageUrl, onImageChange, error, changeErrorState, imageUrlsState] =
    useImageUpload([]);
  const [isShowing, showPopup, hidePopup, popupState, setError] = usePopup({
    message: '',
  });
  const [formState, inputHandler] = useForm({
    name: { value: '' },
    description: { value: '' },
    url: { value: '' },
  });
  const [formShow, setFormShow] = useState(false);
  const [allProjects, setAllProjects] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const buttonStyles = `btn btn-active my-0 mx-auto text-center flex justify-center ${globalDesigns.responsiveFontStyles} ${globalDesigns.buttonStyles}`;

  const handleFormState = useCallback(() => {
    setFormShow((formShow) => !formShow);
  }, []);

  const filterTechnologies = useCallback((technologies) => {
    return technologies && technologies.map((item) => item.value);
  }, []);

  const createFormData = useCallback(() => {
    let formData = new FormData();
    for (let i = 0; i < imageUrlsState.length; i++) {
      formData.append('image', imageUrlsState[i]);
    }
    const cleanedTechnologyOptions = filterTechnologies(selectedOptions);
    const projectDetails = {
      projectName: formState.inputs.name.value,
      projectId: formState.inputs.name.value.toLowerCase().split(' ').join('-'),
      projectDescription: formState.inputs.description.value,
      projectUrl: formState.inputs.url.value,
      technologies: cleanedTechnologyOptions,
    };
    formData.append('projectDetails', JSON.stringify(projectDetails));
    return formData;
  }, [formState, selectedOptions, imageUrlsState]);

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = createFormData();
      const res = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });
    },
    [formState, selectedOptions, imageUrlsState]
  );

  const getProjects = useCallback(async () => {
    const result = await fetch('/api/projects', {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch((err) => {
        setError(err.message);
        showPopup();
      });
    console.log(result, ' i am the result');
    if (result.status === 'success' && Array.isArray(result.result)) {
      setAllProjects(<AllProjects projectsArr={result.result} />);
    } else if (
      result.status === 'success' &&
      result.result === 'no data found'
    ) {
      setAllProjects(
        <p className={`my-0 mx-auto ${globalDesigns.responsiveFontStyles}`}>
          No projects found
        </p>
      );
    }
  }, []);

  // Run when the component renders initially to get user's skillsets
  useEffect(() => {
    const skills = async () => {
      await getProjects();
    };
    skills();
  }, []);

  useEffect(() => {
    if (error) {
      setError('Image size should not exceed 3 MB');
      showPopup();
    }
  }, [error]);
  console.log(allProjects, ' ala');
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
      <div className="w-full px-8 py-28 flex flex-col gap-5">
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
          <div className="z-50 my-0 mx-auto p-5 flex m-4 rounded shadow bg-base-200 w-full lg:w-9/12">
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
                imageUrls={imageUrlsState}
                error={error}
                changeErrorState={changeErrorState}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        )}
        {allProjects || <Loader />}
      </div>
    </div>
  );
};

export default Projects;
