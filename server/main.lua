for _, playerId in ipairs(GetPlayers()) do
    local name = GetPlayerName(playerId)
    print(('Player %s with id %i is in the server'):format(name, playerId))
    -- ('%s'):format('text') is same as string.format('%s', 'text)
end


RegisterNetEvent('scoreboard:server:openScoreboard', function()
    local thisPlayerId = source
    local players = {}

    for _, playerId in ipairs(GetPlayers()) do
        table.insert(players, {
            id = playerId,
            name = GetPlayerName(playerId),
            ping = GetPlayerPing(playerId)
        })
    end

    TriggerClientEvent('scoreboard:client:openScoreboard', thisPlayerId, players)
end)
