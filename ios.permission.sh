#!/bin/bash

PLIST_PATH="ios/App/App/Info.plist"

sed -i '/<\/dict>/i \
<key>NSCameraUsageDescription</key>\n\
  <string>$(PRODUCT_NAME) uses the camera to scan barcodes</string>\n\
<key>NSPhotoLibraryAddUsageDescription</key>\n\
  <string>$(PRODUCT_NAME) uses the photo library to save photos</string>\n\
<key>NSPhotoLibraryUsageDescription</key>\n\
  <string>$(PRODUCT_NAME) uses the photo library to choose photos for your profile</string>' "$PLIST_PATH"
