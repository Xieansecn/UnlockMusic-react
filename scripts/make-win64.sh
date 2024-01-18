#!/bin/bash

# sudo apt install -y jq zip

pushd "$(dirname "${BASH_SOURCE[0]}")/../"

WRY_VER="0.1.1"

mkdir -p win64/{deps,dist}
dl_file() {
    local FILE="$1"
    if [[ ! -f "win64/deps/$FILE" ]]; then
        curl -fsL "https://um-react.app/files/${FILE}.gz" | gzip -d >"win64/deps/${FILE}"
    fi
}

dl_file "um-react-wry-builder-${WRY_VER}-linux-amd64"
dl_file "um-react-wry-stub-${WRY_VER}-win64.exe"
chmod a+x win64/deps/um-react-wry-builder-${WRY_VER}-linux-amd64

APP_VERSION="$(jq -r '.version' <package.json)"
EXE_NAME="um-react-win64-${APP_VERSION}.exe"
ZIP_NAME="um-react-win64-${APP_VERSION}.zip"
"./win64/deps/um-react-wry-builder-${WRY_VER}-linux-amd64" \
    -t "win64/deps/um-react-wry-stub-${WRY_VER}-win64.exe" \
    -r um-react.zip \
    -o "win64/dist/${EXE_NAME}"

touch -d 1970-01-01T00:00:00Z "win64/dist/${EXE_NAME}"
zip -9oX "win64/dist/${ZIP_NAME}" -- "win64/dist/${EXE_NAME}"
echo "[Build OK] 'win64/dist/${ZIP_NAME}'."

popd
