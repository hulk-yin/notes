#! /bin/bash


cd ./notes;
git pull;
cd ../;
gitbook build ./notes ;
rm -rf /data/_book;
mv ./notes/_book /data;
echo "move _book completed";