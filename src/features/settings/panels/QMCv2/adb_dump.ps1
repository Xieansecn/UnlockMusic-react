try {
	$gz_b64 = adb shell su -c "cat '/data/data/com.tencent.qqmusic/databases/player_process_db' | gzip | base64" | Out-String
	$bStream = New-Object System.IO.MemoryStream(,[System.Convert]::FromBase64String($gz_b64))
	$decoded = New-Object System.IO.Compression.GzipStream($bStream, [System.IO.Compression.CompressionMode]::Decompress)
	$outFile = New-Object System.IO.FileStream("player_process_db", [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
	$decoded.CopyTo($outFile)
} finally {
	if ($outFile -ne $null) { $outFile.Dispose() }
	if ($decoded -ne $null) { $decoded.Dispose() }
	if ($bStream -ne $null) { $bStream.Dispose() }
}
