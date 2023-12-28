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
EXE_NAME="um-react-win64-${APP_VERSION}.exe"
ZIP_NAME="um-react-win64-${APP_VERSION}.zip"
./um-react-wry-builder-0.1.0-linux-amd64 \
    -t um-react-wry-stub-0.1.0-win64.exe \
    -r um-react.zip \
    -o "${EXE_NAME}"

touch -d 1970-01-01T00:00:00Z "${EXE_NAME}"
zip -9oX "${ZIP_NAME}" -- "${EXE_NAME}"
echo "[Build OK] '${ZIP_NAME}'."

popd
