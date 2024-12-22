local function openUI(players)
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'open',
        data = { players = players, key = Config.Key, serverName = Config.ServerName }
    })

    if Config.EnableScreenblur then
        TriggerScreenblurFadeIn(0)
    end

    if Config.EnableSound then
        PlaySoundFrontend(-1, 'NAV', 'HUD_AMMO_SHOP_SOUNDSET', false)
    end
end

local function closeUI()
    SetNuiFocus(false, false)
    SendNUIMessage({ action = 'close' })

    if Config.EnableScreenblur then
        TriggerScreenblurFadeOut(0)
    end

    if Config.EnableSound then
        PlaySoundFrontend(-1, 'NAV', 'HUD_AMMO_SHOP_SOUNDSET', false)
    end
end

-- Commands

local cmdName = 'playerlist-' .. Config.Key:lower()

RegisterCommand(cmdName, function()
    TriggerServerEvent('playerlist:server:open')
end, false)

RegisterKeyMapping(cmdName, 'Open Playerlist', 'keyboard', Config.Key)

-- Events

RegisterNetEvent('playerlist:client:open', openUI)

-- NUI Callbacks

RegisterNUICallback('close', function(_, cb)
    cb('ok')
    closeUI()
end)
