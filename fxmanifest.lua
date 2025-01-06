fx_version 'cerulean'
game 'gta5'

version '1.2.0'

lua54 'yes'

shared_scripts {
    'config/sh_config.lua'
}

client_scripts {
    'client/main.lua',
}

server_scripts {
    'config/sv_config.lua',
    'server/main.lua',
}

files {
    'app/dist/index.html',
    'app/dist/assets/*.js',
    'app/dist/assets/*.css',
}

-- ui_page 'http://localhost:5173/'
ui_page 'app/dist/index.html'
