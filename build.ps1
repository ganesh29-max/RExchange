$ErrorActionPreference = "Stop"
$nodePath = "$env:LOCALAPPDATA\Programs\nodejs"
$env:PATH = "$nodePath;$env:PATH"

Write-Host "Node version: $(node -v)"
Write-Host "NPM version: $(npm -v)"
Write-Host "Starting next build..."
& "$nodePath\npm.cmd" run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}
Write-Host "Build finished successfully!"
