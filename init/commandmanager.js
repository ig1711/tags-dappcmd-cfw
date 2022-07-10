// import { CLIENT_ID, CLIENT_SECRET } from '../config';

const getCC = async () => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  if (!clientId) return console.log('Client ID is required');
  if (!clientSecret) return console.log('Client secret is required');
  const string = `${clientId}:${clientSecret}`;
  const buff = Buffer.from(string);
  const auth = buff.toString('base64');
  try {
    const res = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'applications.commands.update',
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllGuildCommands = async (applicationId, guildId) => {
  if (!applicationId) return console.log('Application ID is required');
  if (!guildId) return console.log('Guild ID is required');
  try {
    const cc = await getCC();
    if (!cc || !cc.access_token) return console.log('CC not found');
    const result = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cc.access_token}`,
        },
      }
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createGuildCommand = async (
  applicationId,
  guildId,
  commandData
) => {
  if (!applicationId) return console.log('Application ID is required');
  if (!guildId) return console.log('Guild ID is required');
  if (!commandData) return console.log('Command data is required');
  try {
    const cc = await getCC();
    if (!cc || !cc.access_token) return console.log('CC not found');
    const result = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cc.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commandData),
      }
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGuildCommand = async (applicationId, guildId, commandId) => {
  if (!applicationId) return console.log('Application ID is required');
  if (!guildId) return console.log('Guild ID is required');
  if (!commandId) return console.log('Command ID is required');
  try {
    const cc = await getCC();
    if (!cc || !cc.access_token) return console.log('CC not found');
    const result = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cc.access_token}`,
        },
      }
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editGuildCommand = async (
  applicationId,
  guildId,
  commandId,
  commandData
) => {
  if (!applicationId) return console.log('Application ID is required');
  if (!guildId) return console.log('Guild ID is required');
  if (!commandId) return console.log('Command ID is required');
  if (!commandData) return console.log('Command data is required');
  try {
    const cc = await getCC();
    if (!cc || !cc.access_token) return console.log('CC not found');
    const result = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${cc.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commandData),
      }
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteGuildCommand = async (applicationId, guildId, commandId) => {
  if (!applicationId) return console.log('Application ID is required');
  if (!guildId) return console.log('Guild ID is required');
  if (!commandId) return console.log('Command ID is required');
  try {
    const cc = await getCC();
    if (!cc || !cc.access_token) return console.log('CC not found');
    const result = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${cc.access_token}`,
        },
      }
    );
    const data = result.ok
      ? { ok: 'deleted' }
      : { error: 'Something went wrong' };
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllGlobalCommands = async applicationId => {
  if (!applicationId) return console.log('Application ID is required');
  try {
    const cc = await getCC();
    if (!cc || !cc.access_token) return console.log('CC not found');
    const result = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/commands`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cc.access_token}`,
        },
      }
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createGlobalCommand = async (applicationId, commandData) => {
  if (!applicationId) return console.log('Application ID is required');
  if (!commandData) return console.log('Command data is required');
  try {
    const cc = await getCC();
    if (!cc || !cc.access_token) return console.log('CC not found');
    const result = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/commands`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cc.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commandData),
      }
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGlobalCommand = async (applicationId, commandId) => {
  if (!applicationId) return console.log('Application ID is required');
  if (!commandId) return console.log('Command ID is required');
  try {
    const cc = await getCC();
    if (!cc || !cc.access_token) return console.log('CC not found');
    const result = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/commands/${commandId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cc.access_token}`,
        },
      }
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editGlobalCommand = async (
  applicationId,
  commandId,
  commandData
) => {
  if (!applicationId) return console.log('Application ID is required');
  if (!commandId) return console.log('Command ID is required');
  if (!commandData) return console.log('Command data is required');
  try {
    const cc = await getCC();
    if (!cc || !cc.access_token) return console.log('CC not found');
    const result = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/commands/${commandId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${cc.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commandData),
      }
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteGlobalCommand = async (applicationId, commandId) => {
  if (!applicationId) return console.log('Application ID is required');
  if (!commandId) return console.log('Command ID is required');
  try {
    const cc = await getCC();
    if (!cc || !cc.access_token) return console.log('CC not found');
    const result = await fetch(
      `https://discord.com/api/v10/applications/${applicationId}/commands/${commandId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${cc.access_token}`,
        },
      }
    );
    const data = result.ok
      ? { ok: 'deleted' }
      : { error: 'Something went wrong' };
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
