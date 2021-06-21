#!/bin/bash

npm install

rm -rf _site
rm -rf cloudcannon
cp -R node_modules/eleventy-plugin-cloudcannon/cloudcannon .
