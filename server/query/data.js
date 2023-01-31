import dotenv from 'dotenv';
import { logger } from '../logger';

dotenv.config();

export const getUserSkills = async (ctx, username) => {
  try {
    const result = await ctx.db.collection('skills').findOne({ username });
    return result;
  } catch (err) {
    logger.error(err.message);
    return { status: 'error', message: 'Failed to get skills' };
  }
};

export const userSkills = async (ctx, skills) => {
  try {
    let parsedCookieData;
    const cookie = ctx.cookies.get('jwt');
    const filteredSkills = skills.selectedOption.map((skill) => skill.value);
    const returnMessage = {
      status: 'success',
      message: 'Skills saved successfully',
    };
    if (cookie) {
      parsedCookieData = JSON.parse(atob(cookie.split('.')[1]));
    }
    const username = parsedCookieData.username;
    const skillSets = await getUserSkills(ctx, username);
    if (skillSets) {
      await updateSkills(
        ctx,
        username,
        skillSets.skillSet.concat(filteredSkills)
      );
      return returnMessage;
    } else {
      await ctx.db
        .collection('skills')
        .insert({ username: username, skillSet: filteredSkills });
      return returnMessage;
    }
  } catch (err) {
    logger.error(err.message);
    return { status: 'error', message: err.message };
  }
};

export const updateSkills = async (ctx, username, skills) => {
  try {
    await ctx.db
      .collection('skills')
      .update({ username }, { $set: { skillSet: skills } });
    return { status: 'success', message: 'Skills updated successfully' };
  } catch (err) {
    logger.error(err.message);
    return { status: 'error', message: 'Failed to update, try again.' };
  }
};
