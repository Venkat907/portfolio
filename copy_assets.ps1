# PowerShell script to copy all project files and certificates into the portfolio directory for Vercel deployment

$portfolioDir = "C:\Users\jayak\.gemini\antigravity\scratch\kona-venkat-portfolio"

# 1. Create subfolders
New-Item -ItemType Directory -Force -Path "$portfolioDir\certs"
New-Item -ItemType Directory -Force -Path "$portfolioDir\projects"

Write-Host "Creating folders..." -ForegroundColor Green

# 2. Copy the Quiz project
$quizSrc = "C:\Users\jayak\OneDrive\Desktop\Quiz-main"
$quizDst = "$portfolioDir\projects\quiz"
if (Test-Path $quizSrc) {
    Copy-Item -Recurse -Force -Path $quizSrc -Destination $quizDst
    Write-Host "Successfully copied Quiz project." -ForegroundColor Green
} else {
    Write-Host "Warning: Quiz project not found at $quizSrc" -ForegroundColor Yellow
}

# 3. Copy Hour of Code Image
$hocSrc = "C:\Users\jayak\.gemini\antigravity\brain\05463751-56fe-461a-9fdc-6b00d471171a\media__1779773873441.jpg"
$hocDst = "$portfolioDir\certs\hour_of_code.jpg"
if (Test-Path $hocSrc) {
    Copy-Item -Force -Path $hocSrc -Destination $hocDst
    Write-Host "Successfully copied Hour of Code certificate." -ForegroundColor Green
} else {
    Write-Host "Warning: Hour of Code certificate not found at $hocSrc" -ForegroundColor Yellow
}

# 4. Copy Python Essentials 1
$pySrc = "C:\Users\jayak\OneDrive\Desktop\new one\Python_Essentials_1_certificate_venkatkona306-gmail-com_fd599cd0-ae9d-4843-87c7-63ac610fcca4.pdf"
$pyDst = "$portfolioDir\certs\Python_Essentials_1.pdf"
if (Test-Path $pySrc) {
    Copy-Item -Force -Path $pySrc -Destination $pyDst
    Write-Host "Successfully copied Python Essentials 1." -ForegroundColor Green
} else {
    Write-Host "Warning: Python Essentials 1 not found at $pySrc" -ForegroundColor Yellow
}

# 5. Copy Infosys Springboard
$infoSrc = "C:\Users\jayak\Downloads\infosys.pdf"
$infoDst = "$portfolioDir\certs\infosys.pdf"
if (Test-Path $infoSrc) {
    Copy-Item -Force -Path $infoSrc -Destination $infoDst
    Write-Host "Successfully copied Infosys Springboard." -ForegroundColor Green
} else {
    Write-Host "Warning: Infosys Springboard not found at $infoSrc" -ForegroundColor Yellow
}

# 6. Copy C Essentials 1
$cSrc = "C:\Users\jayak\Downloads\_certificate_venkatkona306-gmail-com_b36b9c13-b999-4256-8a95-15ff283ceaed.pdf"
$cDst = "$portfolioDir\certs\C_Essentials_1.pdf"
if (Test-Path $cSrc) {
    Copy-Item -Force -Path $cSrc -Destination $cDst
    Write-Host "Successfully copied C Essentials 1." -ForegroundColor Green
} else {
    Write-Host "Warning: C Essentials 1 not found at $cSrc" -ForegroundColor Yellow
}

# 7. Copy HTML Essentials
$htmlSrc = "C:\Users\jayak\Downloads\HTML_Essentials_certificate_venkatkona306-gmail-com_744a34f0-abcd-4075-8993-286a78b77113.pdf"
$htmlDst = "$portfolioDir\certs\HTML_Essentials.pdf"
if (Test-Path $htmlSrc) {
    Copy-Item -Force -Path $htmlSrc -Destination $htmlDst
    Write-Host "Successfully copied HTML Essentials." -ForegroundColor Green
} else {
    Write-Host "Warning: HTML Essentials not found at $htmlSrc" -ForegroundColor Yellow
}

# 8. Copy JavaScript Essentials 1
$js1Src = "C:\Users\jayak\Downloads\JavaScript_Essentials_1_certificate_venkatkona306-gmail-com_d37232f9-5d11-43fb-9cbf-818292dd7a2d.pdf"
$js1Dst = "$portfolioDir\certs\JavaScript_Essentials_1.pdf"
if (Test-Path $js1Src) {
    Copy-Item -Force -Path $js1Src -Destination $js1Dst
    Write-Host "Successfully copied JavaScript Essentials 1." -ForegroundColor Green
} else {
    Write-Host "Warning: JavaScript Essentials 1 not found at $js1Src" -ForegroundColor Yellow
}

# 9. Copy JavaScript Essentials 2
$js2Src = "C:\Users\jayak\Downloads\JavaScript_Essentials_2_certificate_venkatkona306-gmail-com_daea9365-4d95-446e-862f-2522a4ffbeea.pdf"
$js2Dst = "$portfolioDir\certs\JavaScript_Essentials_2.pdf"
if (Test-Path $js2Src) {
    Copy-Item -Force -Path $js2Src -Destination $js2Dst
    Write-Host "Successfully copied JavaScript Essentials 2." -ForegroundColor Green
} else {
    Write-Host "Warning: JavaScript Essentials 2 not found at $js2Src" -ForegroundColor Yellow
}

Write-Host "All copies complete! Please redeploy to Vercel." -ForegroundColor Green
