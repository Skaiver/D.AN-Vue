call npm run build
git add .
git commit -m "automatic deployment build"
git push
git subtree push --prefix dist origin gh-pages