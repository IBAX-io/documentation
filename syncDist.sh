#!/bin/bash

WORKDIR=ibax-io.github.io
distDir=docs/.vuepress/dist/
if [ ! -d $WORKDIR ]; then
	echo "dist github dir does not exit,please clone"
	exit
else 
	if [ -d $distDir ];then
		cd $WORKDIR
		find ./ | grep -v .git | xargs rm -rf {}
		echo "docs.ibax.io" > CNAME
		cp -rf ../$distDir* .
	else
		echo "dist dir does not exit,please yarn build"
		exit
	fi
fi
