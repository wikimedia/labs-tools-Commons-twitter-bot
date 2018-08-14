#!/bin/bash
# coding: utf8

#example script to run with grid engine for the bot on toolforge
#Note this file may only have use if your bot will be deployed on toolforge using gridengine

cd /data/project/tool_name/bot_dir/
. bot_env/bin/activate
npm start
echo 'Done now...'