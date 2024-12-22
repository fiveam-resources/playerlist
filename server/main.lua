local function getFramework()
    if GetResourceState('es_extended') == 'started' then
        return 'esx'
    elseif GetResourceState('qb-core') == 'started' then
        return 'qb'
    end

    return nil
end

local function getPlayerName(playerId)
    if Config.UseCharacterName then
        local framework = getFramework()

        if framework == 'esx' then
            local esx = exports['es_extended']:getSharedObject()
            return esx.GetPlayerFromId(playerId).getName()
        elseif framework == 'qb' then
            return GetPlayerName(source)
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
            ping = GetPlayerPing(playerId)
        })
    end

    return players
end

RegisterNetEvent('playerlist:server:open', function()
    local playerId = source
    local players = getPlayers()

    TriggerClientEvent('playerlist:client:open', playerId, players)
end)
