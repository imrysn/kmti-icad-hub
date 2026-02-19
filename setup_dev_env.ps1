
Write-Host "Checking for Python..."

function Get-Python-Path {
    $commands = @("py", "python", "python3")
    foreach ($cmd in $commands) {
        if (Get-Command $cmd -ErrorAction SilentlyContinue) {
            return $cmd
        }
    }
    return $null
}

$PYTHON_CMD = Get-Python-Path

if ($null -eq $PYTHON_CMD) {
    Write-Host "Python command not found in PATH. Checking common installation paths..." -ForegroundColor Yellow
    $commonPaths = @(
        "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe",
        "$env:LOCALAPPDATA\Programs\Python\Python310\python.exe",
        "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe",
        "C:\Python311\python.exe",
        "C:\Python310\python.exe",
        "C:\Python312\python.exe"
    )
    
    foreach ($path in $commonPaths) {
        if (Test-Path $path) {
            $PYTHON_CMD = $path
            break
        }
    }
}

if ($null -eq $PYTHON_CMD) {
    Write-Error "Python not found. Please install Python and add it to your PATH."
    exit 1
}

Write-Host "Using Python: $PYTHON_CMD" -ForegroundColor Green
& $PYTHON_CMD --version

$backendDir = Join-Path $PSScriptRoot "backend"
$venvDir = Join-Path $backendDir "venv"

Write-Host "`nSetting up virtual environment in $venvDir..."

if (-not (Test-Path $venvDir)) {
    Set-Location $backendDir
    & $PYTHON_CMD -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to create virtual environment."
        exit 1
    }
    Write-Host "Virtual environment created." -ForegroundColor Green
    Set-Location $PSScriptRoot
} else {
    Write-Host "Virtual environment already exists." -ForegroundColor Yellow
}

Write-Host "`nInstalling dependencies..."
$pipCmd = Join-Path $venvDir "Scripts\pip.exe"

if (Test-Path $pipCmd) {
    & $pipCmd install -r (Join-Path $backendDir "requirements.txt")
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to install dependencies."
        exit 1
    }
} else {
     Write-Error "pip not found in virtual environment."
     exit 1
}

Write-Host "`nSetup complete!" -ForegroundColor Green
Write-Host "To start the backend, run: .\run_backend.bat"
