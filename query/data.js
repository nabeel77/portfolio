import dotenv from 'dotenv';
import createLoggerInstance from '../logger';
import getDb from './dbInstace';

dotenv.config();
const logger = createLoggerInstance();
export const getUserSkills = async (username) => {
  try {
    const db = await getDb();
    const result = await db.collection('skills').findOne({ username });
    return result;
  } catch (err) {
    logger.error(err.message);
    return {
      status: 400,
      data: { status: 'error', message: 'Failed to get skills' },
    };
  }
};

export const userSkills = async (cookie, skills) => {
  try {
    const db = await getDb();
    let parsedCookieData;
    const filteredSkills = skills.selectedOption.map((skill) => skill.value);
    const returnMessage = {
      status: 200,
      data: {
        status: 'success',
        message: 'Skills saved successfully',
      },
    };
    if (cookie) {
      parsedCookieData = JSON.parse(atob(cookie.split('.')[1]));
    }
    const username = parsedCookieData.username;
    const skillSets = await getUserSkills(username);
    if (skillSets) {
      await updateSkills(username, skillSets.skillSet.concat(filteredSkills));
      return returnMessage;
    } else {
      await db
        .collection('skills')
        .insert({ username: username, skillSet: filteredSkills });
      return returnMessage;
    }
  } catch (err) {
    logger.error(err.message);
    return { status: 400, data: { status: 'error', message: err.message } };
  }
};

export const updateSkills = async (username, skills) => {
  try {
    const db = await getDb();
    await db
      .collection('skills')
      .update({ username }, { $set: { skillSet: skills } });
    return {
      staus: 200,
      data: { status: 'success', message: 'Skills updated successfully' },
    };
  } catch (err) {
    logger.error(err.message);
    return {
      statue: 400,
      data: { status: 'error', message: 'Failed to update, try again.' },
    };
  }
};

export const addProjects = async (projectDetails) => {
  try {
    const db = await getDb();
    db.collection('projects').insert({ projectDetails });
    return {
      status: 200,
      data: { status: 'success', message: 'Project added successfully' },
    };
  } catch (err) {
    logger.error(err.message);
    return {
      status: 400,
      data: { status: 'error', message: 'Failed to add project, try again.' },
    };
  }
};

export const getProjects = async () => {
  try {
    const db = await getDb();
    const result = await db.collection('projects').find().toArray();
    const projectData = result.length ? result : 'no data found';
    return { status: 200, data: { status: 'success', result: projectData } };
  } catch (err) {
    logger.error(err.message);
    return {
      status: 400,
      data: { status: 'error', message: 'Failed to get projects, try again.' },
    };
  }
};
