NextJs + IonicFramework + Capactor + S3 + PrismaORM(PostgreSQL), Native IOS ANDROID barcode reader, file storage yandex S3
.env will be remove after 5 days

1. "npm i"
2. "docker compose up" in root for DB initialization (Postgres - Prisma ORM using)
3. "npx cap add ios"
4. "npx cap add android"
5. "npm run build"
6. "npx cap sync"
7. TO ENABLE CAMERA ON ANDROID ADD TO AndroidManifest.xml:
   <uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
   <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
   <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
8. TO ENABLE CAMERA ON IOS ADD TO Info.plist:
   <key>NSCameraUsageDescription</key>
   <string>$(PRODUCT_NAME) uses the camera to scan barcodes</string>
  <key>NSPhotoLibraryUsageDescription</key>
  <string>$(PRODUCT_NAME) uses the photo library to scan barcodes</string>
   <key>NSPhotoLibraryUsageDescription</key>
   <string>$(PRODUCT_NAME) uses the photo library to scan barcodes</string>
9. "npx cap open ios"
10. run appliaction and have fun
