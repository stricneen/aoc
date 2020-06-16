
$Url = "http://dl.google.com/chrome/install/375.126/chrome_installer.exe"

$Guid = New-Guid
$LocalTempDir = [io.path]::GetTempPath()

$ChromeInstaller = "ChromeInstaller-" + $guid + ".exe"
$Installer = Join-Path -Path $LocalTempDir -ChildPath $ChromeInstaller

Write-Output $PSVersionTable
Write-Output $Installers

(new-object System.Net.WebClient).DownloadFile($Url, $Installer)
& $Installer /silent /install
$Process2Monitor = "ChromeInstaller-" + $guid

Do { 
    $ProcessesFound = Get-Process | Where-Object { $Process2Monitor -contains $_.Name } | Select-Object -ExpandProperty Name

    If ($ProcessesFound) {
        "Still running: " + $ProcessesFound | Write-Host
        Start-Sleep -Seconds 2
    } else { 
        Remove-Item $Installer -ErrorAction SilentlyContinue -Verbose
    } 

} Until (!$ProcessesFound)