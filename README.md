# WM-Commons-Emoji-Bot

The source code for the [WM-Commons-Emoji-Bot](https://gerrit.wikimedia.org/r/#/admin/projects/labs/tools/Commons-twitter-bot)

## Configuration

1. Install dependencies:

  ```shell
  npm install
  ```

2. Copy the example `.env` file:

  ```shell
  cp .env.example .env
  ```

3. [Get credentials for your bot](https://dev.twitter.com/) and complete the `.env`. Note that `TWITTER_SCREEN_NAME` is case-sensitive.

## Usage

### To post a status

```shell
npm run status
```

### To reply to replies

```shell
npm run reply
```

### Testing

```shell
npm test
```

## Contributing

Emoji additions, bug reports, fixes, and new features are welcomed. If you'd like to contribute code, please:

1. Clone the project

	```
	git clone https://gerrit.wikimedia.org/r/labs/tools/Commons-twitter-bot
	```

2. Start a branch named for your new feature or bug

	1.  Contibution by adding emoji-images mapping in the data/images.json file
		==The structure of the json==
		```
		"emoji":[
					["Image_url X", "Image_author X under License X"] 
				]
		```
3. Submit a patch to the gerrit repo

## Deployement on toolforge

1. login to your tool on toolforge (See: https://wikitech.wikimedia.org/wiki/Help:Toolforge )
2. Create a Virtual environment
3. install node version v8.11.1 and npm version v6.1.0 inside the virtual environment the deactivate the env.
4. Start the Kubernetes node shell (See: https://wikitech.wikimedia.org/wiki/Help:Toolforge/Web#node.js_web_services )
5. Inside the shell, activate the virtual environment
6. Clone the bot and run ```npm install``` in the bot directory
7. Run the bot as a webservice using kubernetes backend (See: https://wikitech.wikimedia.org/wiki/Help:Toolforge/Web#node.js_web_services ) 
8. Enjoy! :D.