#!/bin/bash

# cd to files
# ../tstomp4.sh /dir/to/bunch/of/ts_files 100

BATCH_SIZE=$2

if [ "$1" = "" ]
then
    echo "specify dir"
    exit
fi
if [ "$BATCH_SIZE" = "" ]
then
    echo "specify batch_size"
    exit
fi

function convertBatch() {
    files=("$@")

    echo "concat and ffmpeg:" 
    for ff in ${files[@]}; 
    do
        echo "$(basename -- $ff)"
    done 
    cat ${PREFILES[@]} > concatUpTo$i.ts
    ffmpeg -hide_banner -loglevel error -i concatUpTo$i.ts -acodec copy -vcodec copy concatUpTo$i.mp4
}

PREFFILES=()
i=1
for FILE in $(ls $1/*.ts | sort -V); 
do 
    PREFILES+=( $FILE )
    if (( i % $BATCH_SIZE == 0 ))
    then
        convertBatch "${PREFILES[@]}"
        PREFILES=()
    fi
    i=`expr $i + 1`
done

if [ ${#PREFILES} -eq 0 ]; 
then 
    exit
else 
    echo "LAST concat and ffmpeg:" 
    convertBatch "${PREFILES[@]}"
    PREFILES=()
fi
