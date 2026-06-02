# Regenerate compressed JPEGs for homepage performance (run after changing source PNGs).
Add-Type -AssemblyName System.Drawing
$opt = Join-Path $PSScriptRoot "..\assets\images\optimized"
New-Item -ItemType Directory -Force -Path $opt | Out-Null

function Save-ResizedImage($src, $dst, $maxW, $quality) {
  $img = [System.Drawing.Image]::FromFile((Resolve-Path $src))
  $ratio = if ($img.Width -gt $maxW) { $maxW / $img.Width } else { 1 }
  $w = [int]($img.Width * $ratio)
  $h = [int]($img.Height * $ratio)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $w, $h)
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), $quality
  $bmp.Save($dst, $enc, $ep)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}

$base = Join-Path $PSScriptRoot "..\assets\images"
Save-ResizedImage "$base\header-logo.png" "$base\header-logo-144.jpg" 144 82
Save-ResizedImage "$base\hero-banner.png" "$base\hero-banner-1200.jpg" 1200 78
Save-ResizedImage "$base\hero-banner.png" "$base\hero-banner-800.jpg" 800 75
Save-ResizedImage "$base\airport-transfer.png" "$opt\airport-transfer-800.jpg" 800 80
Save-ResizedImage "$base\daily-charter.png" "$opt\daily-charter-800.jpg" 800 80
Save-ResizedImage "$base\vip-service.png" "$opt\vip-service-800.jpg" 800 80
Save-ResizedImage "$base\group-charter.png" "$opt\group-charter-800.jpg" 800 80
Write-Host "Done."
