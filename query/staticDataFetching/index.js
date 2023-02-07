import getDb from '../dbInstace';

export const getProjectNames = async () => {
  try {
    const db = await getDb();
    const result = await db.collection('projects').find().toArray();
    return result.map((project) => project.projectDetails.projectId);
  } catch (err) {
    console.error(err);
  }
};

export const getProject = async (id) => {
  try {
    const db = await getDb();
    const result = await db
      .collection('projects')
      .find({ 'projectDetails.projectId': id })
      .toArray();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getProjects = async () => {
  try {
    const db = await getDb();
    const result = await db.collection('projects').find().toArray();
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getSkills = async () => {
  try {
    const db = await getDb();
    const result = await db.collection('skills').find().toArray();
    return result[0].skillSet;
  } catch (err) {
    console.error(err);
  }
};
