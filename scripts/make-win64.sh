#!/bin/bash

pushd "$(dirname "${BASH_SOURCE[0]}")/../"

dl_file() {
    local FILE="$1"
    if [[ ! -f "$FILE" ]]; then
        curl -fsL "https://um-react.app/files/${FILE}.gz" | gzip -d >"${FILE}"
    fi
}

dl_file "um-react-wry-builder-0.1.0-linux-amd64"
dl_file "um-react-wry-stub-0.1.0-win64.exe"
chmod a+x um-react-wry-builder-0.1.0-linux-amd64

APP_VERSION="$(jq -r '.version' <package.json)"
./um-react-wry-builder-0.1.0-linux-amd64 \
    -t um-react-wry-stub-0.1.0-win64.exe \
    -r um-react.zip \
    -o "um-react-win64-${APP_VERSION}.exe"

echo "Built 'um-react-win64-${APP_VERSION}.exe'."

popd
