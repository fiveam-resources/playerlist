local function getPlayerName(playerId)
    if Config.UseCharacterName then
        if GetResourceState('es_extended') == 'started' then
            local esx = exports['es_extended']:getSharedObject()
            local playerData = esx.GetPlayerFromId(playerId)
            return playerData.getName()
        end

        if GetResourceState('qb-core') == 'started' then
            local qb = exports['qb-core']:GetCoreObject()
            -- TODO: QB-Core support
        end
    end

    return GetPlayerName(playerId)
end

local function getPlayers()
    local players = {}

    for _, playerId in ipairs(GetPlayers()) do
        table.insert(players, {
            id = playerId,
            name = getPlayerName(playerId),
            ping = GetPlayerPing(playerId),
        })
    end

    return players
end

RegisterNetEvent('playerlist:server:open', function()
    local playerId = source
    local players = getPlayers()

    TriggerClientEvent('playerlist:client:open', playerId, players)
end)
