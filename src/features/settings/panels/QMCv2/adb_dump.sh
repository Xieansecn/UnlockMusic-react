sh adb shell su -c "cat '/data/data/com.tencent.qqmusic/databases/player_process_db' | gzip | base64" \
    | base64 -d | gzip -d player_process_db
