#!/bin/bash

#Example IDSVR_ROOT=/opt/idsvr
IDSVR_ROOT=/Users/iggbom/curity/idsvr-8.2.0-micro/idsvr
echo "IDSVR_ROOT is set to ${IDSVR_ROOT}"

PLUGIN_DIR=microblink #The name of the folder to deploy the plugin to
echo "Using ${PLUGIN_DIR} as plugin directory"

./gradlew clean
./gradlew build
./gradlew copyDeps

echo "Creating ${PLUGIN_DIR} directory in ${IDSVR_ROOT}/usr/share/plugins/"
mkdir ${IDSVR_ROOT}/usr/share/plugins/${PLUGIN_DIR}

echo "Copying plugin jar to ${IDSVR_ROOT}/usr/share/plugins/${PLUGIN_DIR}"
cp build/libs/*.jar ${IDSVR_ROOT}/usr/share/plugins/${PLUGIN_DIR}

echo "Copying plugin dependencies to ${IDSVR_ROOT}/usr/share/plugins/${PLUGIN_DIR}"
cp build/dependencies/*.jar ${IDSVR_ROOT}/usr/share/plugins/${PLUGIN_DIR}

echo "Copying plugin frontend dependencies to ${IDSVR_ROOT}/usr/share/webroot/assets"
cp -R build/blinkId-resources/* ${IDSVR_ROOT}/usr/share/webroot/assets
