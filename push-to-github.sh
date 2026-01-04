#!/bin/bash
# Script to push avakio-ui-components to GitHub

# Add the GitHub remote
git remote add origin https://github.com/avakio/avakio-ui-components.git

# Push all commits and set upstream
git push -u origin master

echo "✅ Repository pushed to GitHub!"
echo "🔗 View at: https://github.com/avakio/avakio-ui-components"
