#!/bin/sh
# Lance front + backend sans icones dans les logs
export NO_COLOR=1
export FORCE_COLOR=0
exec docker compose up --build
