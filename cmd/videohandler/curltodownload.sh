#!/bin/bash

prefix=""
#prefix="//demo/"

# just sequential
# for i in {7..175}; 
# do 
#     curl "${prefix}$i-f1-v1-sa4-a1.ts" --output "segment$i.ts"; 
# done


# from an index
cleanedIndexFile="../index.m3u8"
k=1
for tsName in $(cat $cleanedIndexFile); 
do 
    curl --fail "${prefix}${tsName}" --output "segment$k.ts";
    k=`expr $k + 1`
done