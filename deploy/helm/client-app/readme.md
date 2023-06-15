# prepare
> Change Chart.yaml "appVersion" to corresponding image tag and increment "version"

# deploy to a corresponding namespace (langapi-main)

helm upgrade client-app . -f values.yaml -n langapi-main