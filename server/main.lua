local players = {}

------------------------------------------------------------------------------

local function getPlayerName(playerId)
    if Config.UseCharacterName then
        if GetResourceState('es_extended') == 'started' then
            local esx = exports['es_extended']:getSharedObject()
            local playerData = esx.GetPlayerFromId(playerId)
            return playerData.getName()
        end
    end

    return GetPlayerName(playerId)
end

local function getPlayerDiscordRoles(userId)
    local p = promise.new()

    -- https://discord.com/developers/docs/resources/guild#get-guild-member
    local url = ('https://discord.com/api/v8/guilds/%s/members/%s'):format(Config.Discord.GuildId, userId)

    PerformHttpRequest(url, function(_, body)
        if body then
            local resultData = json.decode(body)
            p:resolve(resultData.roles or {})
        else
            p:resolve(nil)
        end
    end, 'GET', '', {
        ['Content-Type'] = 'application/json',
        ['Authorization'] = ('Bot %s'):format(Config.Discord.Token)
    })

    return Citizen.Await(p)
end

local function getPlayerMemberBadgeType(playerId)
    local badgeType = nil

    if Config.UseDiscordRoles then
        local playerDiscordIdRaw = GetPlayerIdentifierByType(playerId, 'discord')
        local _, playerDiscordId = string.strsplit(':', playerDiscordIdRaw)

        if playerDiscordId then
            local playerRoles = getPlayerDiscordRoles(playerDiscordId)

            for _, roleId in ipairs(playerRoles) do
                if roleId == Config.Discord.Roles['owner'] then
                    badgeType = 'owner'
                    break
                elseif roleId == Config.Discord.Roles['moderator'] then
                    badgeType = 'moderator'
                    break
                end
            end
        end
    end

    return badgeType
end

------------------------------------------------------------------------------

local function OnResourceStart()
    for _, playerId in ipairs(GetPlayers()) do
        table.insert(players, {
            id = playerId,
            name = getPlayerName(playerId),
            ping = GetPlayerPing(playerId),
            memberType = getPlayerMemberBadgeType(playerId),
        })

        print(('Player %s has joined the server'):format(getPlayerName(playerId)))
    end
end

-- local function OnPlayerJoining()
--     local playerId = source

--     table.insert(players, {
--         id = playerId,
--         name = getPlayerName(playerId),
--         ping = GetPlayerPing(playerId),
--         memberType = getPlayerMemberBadgeType(playerId),
--     })
-- end

AddEventHandler("onServerResourceStart", OnResourceStart)
-- AddEventHandler("playerJoining", OnPlayerJoining)

------------------------------------------------------------------------------

RegisterNetEvent('playerlist:server:open', function()
    local playerId = source
    TriggerClientEvent('playerlist:client:open', playerId, players)
end)
