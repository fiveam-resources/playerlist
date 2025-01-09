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
    local url = ('https://discord.com/api/v8/guilds/%s/members/%s'):format(Discord.GuildId, userId)

    PerformHttpRequest(url, function(_, body)
        if body then
            local resultData = json.decode(body)
            p:resolve(resultData.roles or {})
        else
            p:resolve(nil)
        end
    end, 'GET', '', {
        ['Content-Type'] = 'application/json',
        ['Authorization'] = ('Bot %s'):format(Discord.Token)
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
                if roleId == Discord.Roles['owner'] then
                    badgeType = 'owner'
                    break
                elseif roleId == Discord.Roles['admin'] then
                    badgeType = 'admin'
                    break
                elseif roleId == Discord.Roles['moderator'] then
                    badgeType = 'moderator'
                    break
                end
            end
        end
    end

    return badgeType
end

local function addPlayer(playerId)
    table.insert(players, {
        id = tonumber(playerId),
        name = getPlayerName(playerId),
        ping = GetPlayerPing(playerId),
        memberType = getPlayerMemberBadgeType(playerId),
    })
end

local function removePlayer(playerId)
    for i, player in ipairs(players) do
        if player.id == playerId then
            table.remove(players, i)
            break
        end
    end
end

------------------------------------------------------------------------------

AddEventHandler("onServerResourceStart", function()
    for _, playerId in ipairs(GetPlayers()) do
        addPlayer(playerId)
    end
end)

if GetResourceState('es_extended') == 'started' then
    AddEventHandler("esx:playerLoaded", function(playerId)
        addPlayer(playerId)
    end)
else
    AddEventHandler("playerJoining", function()
        local playerId = source
        addPlayer(playerId)
    end)
end

AddEventHandler("playerDropped", function()
    local playerId = source
    removePlayer(playerId)
end)

------------------------------------------------------------------------------

RegisterNetEvent('playerlist:server:open', function()
    local playerId = source
    TriggerClientEvent('playerlist:client:open', playerId, players)
end)
