#!/bin/bash -e

BRANCH_NAME="$(git branch --show-current)"
SCRIPTS_DIR="$(dirname "${BASH_SOURCE[0]}")"

__netlify_upload() {
    local branch="$BRANCH_NAME"
    local production="$DEPLOY_PRODUCTION"
    [[ -z "$production" ]] && production="false"
    if [[ "$BRANCH_NAME" = "main" ]]; then
        production="true"
        branch=""
    fi

    curl -sL \
        -H "Content-Type: application/zip" \
        -H "Authorization: Bearer ${NETLIFY_API_KEY}" \
        --data-binary "@${1}" \
        "https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/deploys?branch=${branch}&production=${production}"
}

__netlify_get_deploy() {
    local deploy_id="$1"
    curl -sL \
        -H "Authorization: Bearer ${NETLIFY_API_KEY}" \
        "https://api.netlify.com/api/v1/deploys/${deploy_id}"
}

json_get() {
    local json_body="$1"
    shift

    echo -n "$json_body" | "${SCRIPTS_DIR}/read_json.mjs" "$@"
}

deploy_netlify() {
    local upload_resp
    upload_resp="$(__netlify_upload "$1")"

    local error_message
    error_message="$(json_get "$upload_resp" message)"
    [[ "$error_message" = "null" ]] && error_message="$(json_get "$upload_resp" error_message)"

    if [[ "$error_message" != "null" ]]; then
        echo "Deploy to netlify failed:"
        echo "  * ${error_message}"
        return 1
    fi

    local deploy_id="$(json_get "$upload_resp" id)"
    local deploy_resp=""
    local deploy_state=""
    local retry_count=10
    while [[ "$retry_count" -gt 0 ]]; do
        deploy_resp="$(__netlify_get_deploy "$deploy_id")"
        deploy_state="$(json_get "$deploy_resp" 'state')"
        case "$deploy_state" in
        ready)
            echo 'Deploy to netlify OK!'
            echo "  * main url:  $(json_get "$deploy_resp" 'ssl_url')"
            echo "  * branch:    $(json_get "$deploy_resp" 'deploy_ssl_url')"
            echo "  * permalink: $(json_get "$deploy_resp" 'links' 'permalink')"
            return 0
            ;;
        error)
            echo "Deploy to netlify failed:"
            echo "  * $(json_get "$deploy_resp" 'error_message')"
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
