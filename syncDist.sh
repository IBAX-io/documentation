#!/bin/bash

WORKDIR=ibax-io.github.io
distDir=docs/.vuepress/dist/
fixLinkPy=markdown_fix_link_anchor.py
if [ ! -d $WORKDIR ]; then
	echo "dist github dir does not exit,please clone"
	exit
else 
	if [ -d $distDir ];then
		cd $WORKDIR
		find ./ | grep -v .git | xargs rm -rf {}
		echo "docs.ibax.io" > CNAME
		cp -rf ../$distDir* .
		cd -
		if [ -f $fixLinkPy ];then
			python $fixLinkPy
		else
			echo "fix link python file does not exit!"
		fi
	else
		echo "dist dir does not exit,please yarn build"
		exit
	fi
fi
