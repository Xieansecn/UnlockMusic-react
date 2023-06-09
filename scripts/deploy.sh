#!/bin/bash -ex

BRANCH_NAME="$(git branch --show-current)"

__netlify_upload() {
    curl -sL \
        -H "Content-Type: application/zip" \
        -H "Authorization: Bearer ${NETLIFY_API_KEY}" \
        --data-binary "@${1}" \
        "https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/deploys?branch=${BRANCH_NAME}"
}

__netlify_get_deploy() {
    local deploy_id="$1"
    curl -sL \
        -H "Authorization: Bearer ${NETLIFY_API_KEY}" \
        "https://api.netlify.com/api/v1/deploys/${deploy_id}"
}

deploy_netlify() {
    local upload_resp
    upload_resp="$(__netlify_upload "$1")"

    local error_message="$(echo "$upload_resp" | jq -r ".message // .error_message")"
    if [[ "$error_message" != "null" ]]; then
        echo "Deploy to netlify failed:"
        echo "  * ${error_message}"
        return 1
    fi

    local deploy_id="$(echo "$upload_resp" | jq -r ".id")"
    local deploy_resp=""
    local deploy_state=""
    local retry_count=10
    while [[ "$retry_count" -gt 0 ]]; do
        deploy_resp="$(__netlify_get_deploy "$deploy_id")"
        deploy_state="$(echo "$deploy_resp" | jq -r '.state')"
        case "$deploy_state" in
        ready)
            echo 'Deploy to netlify OK!'
            echo "  * main url:  $(echo "$deploy_resp" | jq -r '.ssl_url')"
            echo "  * branch:    $(echo "$deploy_resp" | jq -r '.deploy_ssl_url')"
            echo "  * permalink: $(echo "$deploy_resp" | jq -r '.links.permalink')"
            return 0
            ;;
        error)
            echo "Deploy to netlify failed:"
            echo "  * $(echo "$deploy_resp" | jq -r '.error_message')"
            return 1
            ;;
        *)
            retry_count="$((retry_count - 1))"
            sleep 3
            ;;
        esac
    done
}

# For deployment, we care a bit less
if [[ -n "${NETLIFY_API_KEY}" && -n "${NETLIFY_SITE_ID}" ]]; then
    echo "Deploy to netlify..."
    deploy_netlify um-react.zip
fi
