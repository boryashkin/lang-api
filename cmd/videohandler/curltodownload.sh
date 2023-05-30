#!/bin/bash

prefix="https://polonium.stream.voidboost.cc/1/6/8/5/1/2/556679f2bb700dee99faab7e44d389d9:2023052922:NjJVbngzRlVMZUllMWREN3g5MU5wWXlGaWh0R0lxUG5TcVdqT1hIMUtoOTd6OU1OeW4wRVU4UVhHemxZQU5qVlBwUFpUa2FMM2JxMTJBL01qa3Y0OTlHL2NQZkpNZ3RFalRmbTIwMzdNMGs9/z7qpp.mp4:hls:"
#prefix="//demo/"

for i in {401..500}; 
do 
    curl "${prefix}seg-$i-v1-a1.ts" --output "segment$i.ts"; 
done
