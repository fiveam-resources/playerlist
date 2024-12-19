local function openUI(players)
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'open',
        data = { players = players }
    })
end

local function closeUI()
    SetNuiFocus(false, false)
    SendNUIMessage({ action = 'close' })
end

-- Commands

RegisterCommand('playerlist', function()
    TriggerServerEvent('playerlist:server:open')
end, false)

RegisterKeyMapping('playerlist', 'Open Playerlist', 'keyboard', Config.OpenKey)

-- Events

RegisterNetEvent('playerlist:client:open', openUI)

-- NUI Callbacks

RegisterNUICallback('close', function(_, cb)
    cb('ok')
    closeUI()
end)
