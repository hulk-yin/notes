#! /bin/bash


cd ./notes;
git pull;
cd ../;
gitbook build ./notes ;
mv ./notes/_book /data;
echo "move _book completed";