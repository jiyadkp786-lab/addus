Add-Type -AssemblyName System.Drawing
$srcPath = Join-Path (Get-Location) "footer-clean.png"
$outPath = Join-Path (Get-Location) "footer-clean-min.jpg"

if (Test-Path $srcPath) {
    $img = [System.Drawing.Image]::FromFile($srcPath)
    $bmp = New-Object System.Drawing.Bitmap 1920, 600
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, 1920, 600)
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $img.Dispose()
    $bmp.Dispose()
    $g.Dispose()
    Write-Host "Compression Complete!"
}
