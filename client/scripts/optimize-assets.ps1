Add-Type -AssemblyName System.Drawing

$assetsDir = "d:\Client-Projects\svasc\client\src\assets"
$files = Get-ChildItem -Path $assetsDir -File | Where-Object { 
    ($_.Extension -match '^\.(jpg|jpeg|png)$') -and ($_.Length -gt 800KB)
}

$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)

$totalOld = 0
$totalNew = 0

foreach ($file in $files) {
    $oldSize = $file.Length
    $totalOld += $oldSize
    $filePath = $file.FullName
    $tempPath = "$filePath.tmp"

    try {
        # Read file bytes into MemoryStream to avoid file locking
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ms = New-Object System.IO.MemoryStream(,$bytes)
        $img = [System.Drawing.Image]::FromStream($ms)

        $origW = $img.Width
        $origH = $img.Height
        $maxDim = 1920

        $scale = 1.0
        if ($origW -gt $maxDim -or $origH -gt $maxDim) {
            $scale = [Math]::Min($maxDim / $origW, $maxDim / $origH)
        }

        $newW = [int][Math]::Round($origW * $scale)
        $newH = [int][Math]::Round($origH * $scale)

        $bmp = New-Object System.Drawing.Bitmap($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $rect = New-Object System.Drawing.Rectangle(0, 0, $newW, $newH)
        $g.DrawImage($img, $rect, 0, 0, $origW, $origH, [System.Drawing.GraphicsUnit]::Pixel)

        $bmp.Save($tempPath, $jpegEncoder, $encoderParams)

        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()
        $ms.Dispose()

        $newFile = Get-Item $tempPath
        $newSize = $newFile.Length
        if ($newSize -lt $oldSize) {
            Move-Item -Path $tempPath -Destination $filePath -Force
            $totalNew += $newSize
            $savedPct = [Math]::Round((1 - ($newSize / $oldSize)) * 100, 1)
            $oldMB = [Math]::Round($oldSize / 1MB, 2)
            $newKB = [Math]::Round($newSize / 1KB, 0)
            Write-Output "Optimized: $($file.Name) [$($oldMB)MB -> $($newKB)KB, -$($savedPct)%]"
        } else {
            Remove-Item $tempPath -Force
            $totalNew += $oldSize
            Write-Output "Kept original: $($file.Name)"
        }
    } catch {
        Write-Warning "Failed to optimize $($file.Name): $_"
        if (Test-Path $tempPath) { Remove-Item $tempPath -Force }
        $totalNew += $oldSize
    }
}

$oldTotalMB = [Math]::Round($totalOld / 1MB, 2)
$newTotalMB = [Math]::Round($totalNew / 1MB, 2)
$totalSavedPct = [Math]::Round((1 - ($totalNew / $totalOld)) * 100, 1)
Write-Output "=========================================="
Write-Output "Total Assets Optimized: $oldTotalMB MB -> $newTotalMB MB (-$totalSavedPct% reduction!)"
Write-Output "=========================================="
