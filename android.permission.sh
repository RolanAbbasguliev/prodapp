#!/bin/bash

ANDROD_MANIFEST_PATH="android/app/src/main/AndroidManifest.xml"

sed -i '/<\/manifest>/i \
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>\n\
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>\n\
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>' "$ANDROD_MANIFEST_PATH"
