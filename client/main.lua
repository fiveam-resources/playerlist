local function openUI(players)
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'open',
        data = {
            display = true,
            players = players
        }
    })
end

local function closeUI()
    SetNuiFocus(false, false)
    SendNUIMessage({ action = 'close' })
end

RegisterCommand('scoreboard', function()
    TriggerServerEvent('scoreboard:server:openScoreboard')
end, false)

RegisterKeyMapping('scoreboard', 'Open Scoreboard', 'keyboard', 'F10')

RegisterNetEvent('scoreboard:client:openScoreboard', function(players)
    openUI(players)
end)

RegisterNUICallback('close', function(_, cb)
    cb('ok')
    closeUI()
end)
