fx_version 'cerulean'
game 'gta5'

lua54 'yes'

shared_scripts {
    'config.lua'
}

client_scripts {
    'client/main.lua',
}

server_scripts {
    'server/main.lua',
}

files {
    'app/dist/index.html',
    'app/dist/assets/*.js',
    'app/dist/assets/*.css',
}

-- ui_page 'http://localhost:5173/'
ui_page 'app/dist/index.html'
