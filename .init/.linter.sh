#!/bin/bash
cd /home/kavia/workspace/code-generation/event-management-web-application-173678-173845/WebUI
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

