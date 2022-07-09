import { createGuildCommand } from './commandmanager.js';
import { SERVER_ID, CLIENT_ID, CLIENT_SECRET } from '../config';
(function () {
  if (!SERVER_ID || !CLIENT_ID || !CLIENT_SECRET)
    return console.log(
      'You gotta create a config.js file and export proper variables from there'
    );

  const commandData1 = {
    name: 'tag',
    type: 1,
    description: 'Use tags',
    options: [
      {
        name: 'tag',
        description: 'Tag',
        type: 4,
        required: true,
        autocomplete: true,
      },
    ],
  };

  const commandData2 = {
    name: 'create',
    type: 1,
    description: 'Create tags',
    options: [
      {
        name: 'name',
        description: 'Name of the tag',
        type: 3,
        required: true,
      },
      {
        name: 'data',
        description: 'Data for the tag',
        type: 3,
        required: true,
      },
      {
        name: 'alias',
        description: 'Add one optional alias',
        type: 3,
      },
    ],
  };

  (async () => {
    const data1 = await createGuildCommand(CLIENT_ID, SERVER_ID, commandData1);
    console.log(data1);
    const data2 = await createGuildCommand(CLIENT_ID, SERVER_ID, commandData2);
    console.log(data2);
  })();
})();
