// 网易云歌曲解灰(适配SPlayer的UNM-Server)
// 支持qq音乐、酷狗音乐、酷我音乐、咪咕音乐、第三方网易云API等等(来自GD音乐台)

const createOption = require('../util/option.js')


module.exports = async (query, request) => {
    try {
        const match = require("@unblockneteasemusic/server")
        const source = query.source
            ? query.source.split(',') : ['pyncmd', 'kuwo', 'qq', 'migu', 'kugou']
        const server = query.server ? query.server.split(',') : query.server
        const result = await match(query.id, !server? source : server)
        const proxy = process.env.PROXY_URL;
        console.log("[OK] 开始解灰", query.id, result)
        const useProxy = process.env.ENABLE_PROXY || "false"
        if (result.url.includes('kuwo')) { result.proxyUrl = useProxy === 'true' ? proxy + result.url : result.url }
        return {
            status: 200,
            body: {
                code: 200,
                data: result,
            },
        }
    } catch (e) {
        return {
            status: 500,
            body: {
                code: 500,
                msg: e.message || 'unblock error',
                data: [],
            },
        }
    }
}