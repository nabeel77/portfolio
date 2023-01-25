import MongoClientConnection from '../db';

const getDb = async () => {
  return await MongoClientConnection.Get();
};
export const getProjectNames = async () => {
  const db = await getDb();
  const result = await db.collection('projects').find().toArray();
  return result.map((project) => project.projectDetails.projectId);
};

export const getProject = async (id) => {
  const db = await getDb();
  const result = await db
    .collection('projects')
    .find({ 'projectDetails.projectId': id })
    .toArray();
  return result;
};
