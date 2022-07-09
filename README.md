# tags-dappcmd-cfw
discord application command in cf workers

# Steps to test run (not production)

1. Create a discord application in https://canary.discord.com/developers/applications. If you already have an application that you can use to test, no need to create new

2. Add this application to a test server using this link: [https://canary.discord.com/api/oauth2/authorize?client_id=<application_id>&scope=applications.commands](https://canary.discord.com/api/oauth2/authorize?client_id=<application_id>&scope=applications.commands). Replace <application_id> with your application's app id, which you can find in the General Information tab of your application. (Remove the angle brackets as well while replacing <application_id>)

3. Copy the contents of [example_config.js](/example_config.js) in a new file in the same directory called `config.js`

4. Go to the OAuth2 page of the app

![image](https://user-images.githubusercontent.com/73212588/178113832-8502f6dd-e31b-4902-a684-477bab8c6741.png)

5. Put `CLIENT_ID` and `CLIENT_SECRET` from the OAuth2 page in the `config.js` file as shown in the example. (These are used to exchange for a token (see [this](https://github.com/ig1711/tags-dappcmd-cfw/blob/main/init/commandmanager.js#L3-L29)), which is used only to register commands, for example, see [this](https://github.com/ig1711/tags-dappcmd-cfw/blob/main/init/commandmanager.js#L63-L70))

6. Put the discord guild id as `SERVER_ID` as well, in the `config.js` file

7. Now run `npm run init`. This will register the two test commands (`tag` and `create` in [init/createGuildCommand.js](/init/createGuildCommand.js)). The commands will be created for the server only.

8. In a terminal, `cd` into the project, and run `npm ci` to install dependencies.

9. From your discord application's General Informations tab, grab the `PUBLIC KEY`, run `npm run put_public_key`, and when it asks to enter secret value, paste the public key there and enter

10. Run `npm start`

11. Open another terminal, change directory to the project, and run `npm run ngrok`

12. Copy the ngrok url (https one)

13. Go to your applicataion in the discord applications page, paste the ngrok url in the `Interactions Endpoint URL` field and hit Save. Cross your fingers and wait for it to get the url accepted

14. Test the `/tag` command in your test server

