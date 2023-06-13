# Microblink Authentication Action Plugin

[![Quality](https://img.shields.io/badge/quality-demo-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

A custom authentication action plugin for the Curity Identity Server leveraging the [Microblink BlinkID in-browser SDK](https://github.com/BlinkID/blinkid-in-browser) for identity document scanning. The action can be added after an authenticator and will invoke the use of the camera on the users device to scan and parse information on a supported ID document such as an ID card, Password or driver's license for example. The information captured by the ID scan can be used to further proof the identity of the authenticating user.

## Configuration

Configuring the action requires only two settings, a bucket and a Microblink BlinkID in-browser SDK license. The bucket is used to store information temporary during the session and the data is cleared after authentication is completed.

## Building the Plugin

You can build the plugin by issuing the command ``./gradlew buildPlugin``. This will create a `build/microblinkscanid` folder with:
- the plugin JAR bundled with all the required frontend dependencies,
- all the required dependency JARs

## Installing the Plugin

To install the plugin, copy the `build/microblinkscanid` dir into `${IDSVR_HOME}/usr/share/plugins/microblinkscanid`
on each node, including the admin node.

If you're deploying using Docker, make sure that the `build/microblinkscanid` is copied or mounted to `/opt/idsvr/usr/share/plugins/microblinkscanid`.

For more information about installing plugins, refer to the [curity.io/plugins](https://support.curity.io/docs/latest/developer-guide/plugins/index.html#plugin-installation).

## Installation Script

If you're running a local instance of the Curity Identity Server, you can use the `install-local.sh` script to build and install the plugin. Open the script to configure the installation location of the Curity Identity Server before executing. 

## License

This plugin and its associated documentation is listed under the [Apache 2 license](https://github.com/curityio/microblink-scan-id/blob/main/LICENSE).

## More Information

Please visit [curity.io](https://curity.io/) for more information about the Curity Identity Server.

Copyright (C) 2023 Curity AB.
