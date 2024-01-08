#!/bin/bash

PLIST_PATH="ios/App/App/Info.plist"

sed -i'.bak'  '/<\/dict>/i \
<key>NSCameraUsageDescription</key>\
  <string>$(PRODUCT_NAME) uses the camera to scan barcodes</string>\
<key>NSPhotoLibraryAddUsageDescription</key>\
  <string>$(PRODUCT_NAME) uses the photo library to save photos</string>\
<key>NSPhotoLibraryUsageDescription</key>\
  <string>$(PRODUCT_NAME) uses the photo library to choose photos for your profile</string>' "$PLIST_PATH"
