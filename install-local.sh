#!/bin/bash

#Example IDSVR_ROOT=/opt/idsvr
IDSVR_ROOT=
echo "IDSVR_ROOT is set to ${IDSVR_ROOT}"

PLUGIN_DIR=microblinkscanid #The name of the folder to deploy the plugin to
echo "Using ${PLUGIN_DIR} as plugin directory"

./gradlew clean buildPlugin

echo "Copying plugin and dependencies to ${IDSVR_ROOT}/usr/share/plugins/${PLUGIN_DIR}"
cp -r build/${PLUGIN_DIR} ${IDSVR_ROOT}/usr/share/plugins/
