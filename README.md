# Microblink Authentication Action Plugin

[![Quality](https://img.shields.io/badge/quality-demo-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

A custom authentication action plugin for the Curity Identity Server leveraging the [Microblink BlinkID in-browser SDK](https://github.com/BlinkID/blinkid-in-browser) for identity document scanning. The action can be added after an authenticator and will invoke the use of the camera on the users device to scan and parse information on a supported ID document such as an ID card, Password or driver's license for example. The information captured by the ID scan can be used to further proof the identity of the authenticating user.

## Configuration

Configuring the action requires only two settings, a bucket and a Microblink BlinkID in-browser SDK license. The bucket is used to store information temporary during the session and the data is cleared after authentication is completed. 

---

## Building the Plugin

---
You can build the plugin by issuing the command ``./gradlew build``. This will produce a JAR file in the ``build/libs`` directory,
which can be installed.

## Dependencies

---
The dependencies can be obtained by running ``./gradlew copyDeps``. This will copy the Java dependencies into ``build/dependencies`` and install and copy the needed Microblink BlinkID front-end dependencies from `npm` into ``build/blinkId-resources``. 

## Installing the Plugin

---

To install the plugin, copy the compiled JAR and all of its dependencies into the `${IDSVR_HOME}/usr/share/plugins/${pluginGroup}`
on each node, including the admin node. 

Also copy the front-end dependencies into `${IDSVR_HOME}/usr/share/webroot/assets/`
For more information about installing plugins, refer to the [curity.io/plugins](https://support.curity.io/docs/latest/developer-guide/plugins/index.html#plugin-installation).

## Build and deploy script
A script (`build.sh`) is included in the project to help build and deploy. Open the script to configure the installation location of the Curity Identity Server and name of the plugin folder appropriately before executing. 
## License

---

This plugin and its associated documentation is listed under the [Apache 2 license](https://github.com/curityio/microblink-scan-id/blob/main/LICENSE).

## More Information

---

Please visit [curity.io](https://curity.io/) for more information about the Curity Identity Server.

Copyright (C) 2023 Curity AB.
