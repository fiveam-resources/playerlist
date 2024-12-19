local function getPlayers()
    local players = {}

    for _, playerId in ipairs(GetPlayers()) do
        table.insert(players, {
            id = playerId,
            name = GetPlayerName(playerId),
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
