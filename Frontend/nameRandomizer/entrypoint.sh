#!/usr/bin/env sh
set -e

TEMPLATE="/usr/share/nginx/html/config.template.json"
TARGET="/usr/share/nginx/html/config.json"

if [ -f "$TEMPLATE" ]; then
  if [ -z "${BACKEND_URL}" ]; then
    echo "WARN: BACKEND_URL nincs beállítva, a template kerül változtatás nélkül config.json-ként felhasználásra."
    cp "$TEMPLATE" "$TARGET"
  else
    echo "INFO: Generating $TARGET from template using BACKEND_URL=${BACKEND_URL}"
    envsubst < "$TEMPLATE" > "$TARGET"
  fi
else
  echo "WARN: $TEMPLATE nem található kihagyom a runtime config generálást."
fi

exec "$@"