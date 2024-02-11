#!/bin/bash

BRANCH_NAME="$1"

if [ -z "$BRANCH_NAME" ]; then
    echo "Please specify branch name."
    exit 1
fi

cd $BRANCH_NAME
git config --global init.defaultBranch main
git config pull.ff only
git init
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git remote add origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
git fetch

if git ls-remote --exit-code origin $BRANCH_NAME >/dev/null 2>&1; then
    echo "Branch $BRANCH_NAME already exist."
    git pull -s ours origin $BRANCH_NAME
    git add *
    git commit -m "🍱 Updating tokens"
    git push -f origin HEAD:$BRANCH_NAME
else
    echo "Branch $BRANCH_NAME do not exist, creating..."
    git checkout --orphan $BRANCH_NAME
    git add *
    git commit -m "🎉 Creating tokens"
    git push -u origin $BRANCH_NAME
    echo "New branch $BRANCH_NAME has been pushed to repo."
fi