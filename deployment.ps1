
# first, set app settings with environment variables

# next, commit

git commit
git push origin master
az webapp deployment source sync --name IPHelp --slot IPhelp-staging --resource-group rescityofpitt
