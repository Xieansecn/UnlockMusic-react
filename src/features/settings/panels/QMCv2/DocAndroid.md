### 安卓端获取密钥数据库

你可能需要 root 或类似的访问权限。绝大多数情况下，这会导致你的安卓设备失去保修资格。

#### 提取文件（文件浏览器）

1. 提升到 `root` 权限，访问 `/data/data/com.tencent.qqmusic/databases/` 目录，将文件 `player_process_db`
   复制到正常模式下用户可访问的目录（如下载目录）。
2. 如果你需要在电脑上进行解密操作，请将该文件复制到电脑。
3. 选择该文件。

#### 提取文件（ADB）

※ 目前该指令只支持 Linux & Mac

1. 打开终端并安装好依赖，并复制下述指令：

   ```sh
   adb shell su -c "cat '/data/data/com.tencent.qqmusic/databases/player_process_db' | gzip | base64" \
       | base64 -d | gzip -d player_process_db
   ```

2. 选择提取的这个文件即可。
