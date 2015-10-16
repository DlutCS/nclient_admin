#!/bin/bash

echo "enter deploy_wrap"

DEPLOYPROJECTNAME="nclientAdmin"
NEWVERSION=$(git rev-parse --short HEAD)
DEPLOYCOPY="~/DEPLOY/"
DEPLOYDEST="/home/wwwroot/assets.senyu.me/public_html/knewsAdmin/prelease/deploy/"
DEPLOYFILENAME=deploy_${DEPLOYPROJECTNAME}_${NEWVERSION}.tar.gz
DEPLOYSERVER="deploy@senyu.me"
DEPLOYMODE="PRELEASE"

echo $DEPLOYPROJECTNAME
echo $NEWVERSION
echo $DEPLOYCOPY
echo $DEPLOYDEST
echo $DEPLOYFILENAME
echo $DEPLOYSERVER

//build
npm install
npm run build

ls -l ${GITBASE}
cd ${GITBASE}/build
tar -zcf ../$DEPLOYFILENAME *

scp -i ~/.ssh/id_rsa  -o StrictHostKeyChecking=no -p 22 ../${DEPLOYFILENAME} ${DEPLOYSERVER}:${DEPLOYCOPY}
#ssh -i ~/.ssh/id_rsa  -o StrictHostKeyChecking=no -p 22 $DEPLOYSERVER "ls -l $DEPLOYCOPY;"
ssh -i ~/.ssh/id_rsa  -o StrictHostKeyChecking=no -p 22 ${DEPLOYSERVER} "${DEPLOYCOPY}/remote_execute_asset.sh ${NEWVERSION} ${DEPLOYCOPY} ${DEPLOYDEST} ${DEPLOYPROJECTNAME} ${DEPLOYFILENAME} ${DEPLOYMODE}"
cd ${GITBASE}
make clean