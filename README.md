# WM-Commons-Emoji-Bot

The source code for the [WM-Commons-Emoji-Bot](https://gerrit.wikimedia.org/r/#/admin/projects/labs/tools/Commons-twitter-bot)

## Configuration

1. Install dependencies:

  ```shell
  npm install

  npm install --save request-promise
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

### To reply to posts

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
					"Image_url"
				]
		```
3. Submit a patch to the gerrit repo

###More info

See the docs/devManual file for more information.