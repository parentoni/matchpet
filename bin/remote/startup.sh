#!/bin/bash

#source scripts
sudo chmod +x  ~/remote/start_nginx.sh
sudo chmod +x  ~/remote/start_express.sh
sudo chmod +x  ~/remote/config.sh

~/remote/start_nginx.sh
~/remote/start_express.sh
~/remote/config.sh
