$brewLabRoot = "C:\Users\Sam\Documents\GitHub\brew-lab"
$brewLabServicesRoot = "C:\Users\Sam\Documents\GitHub\brew-lab-services\db"

function Start-BrewLab() 
{
    Start-Job -Name 'brewServer' -ScriptBlock { Set-Location $args[0]; node server.js } -ArgumentList $brewLabRoot
    Start-Job -Name 'gulp' -ScriptBlock { Set-Location $args[0]; gulp } -ArgumentList $brewLabRoot
    Start-Job -Name 'servicesServer' -ScriptBlock { Set-Location $args[0]; npm start www } -ArgumentList $brewLabServicesRoot
}

function Stop-BrewLab()
{
    Get-Job | % { 
        Write-Host "Stopping " $_.Name
        Stop-Job $_
        Remove-Job $_
    }
}