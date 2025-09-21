import type { VideoApi } from '@/types'
import builtinSourcesJson from '@/assets/builtin-sources.json'

/**
 * 内置视频源配置
 * 这些视频源会在应用启动时自动加载
 * 
 * 配置来源：
 * 1. 代码中的静态配置（下面的 STATIC_VIDEO_SOURCES）
 * 2. JSON 文件配置（src/assets/builtin-sources.json）
 * 
 * 注意：请将下面的示例URL替换为实际可用的视频源API
 */
const STATIC_VIDEO_SOURCES: VideoApi[] = [
{"id":"source1","name":"电影天堂资源","url":"http://caiji.dyttzyapi.com/api.php/provide/vod","isEnabled":true},
{"id":"source7","name":"360资源","url":"https://360zy.com/api.php/provide/vod","isEnabled":true},
{"id":"source11","name":"豆瓣资源","url":"https://dbzy.tv/api.php/provide/vod","isEnabled":true},
{"id":"source12","name":"魔爪资源","url":"https://mozhuazy.com/api.php/provide/vod","isEnabled":true},
{"id":"source13","name":"魔都资源","url":"https://www.mdzyapi.com/api.php/provide/vod","isEnabled":true},
{"id":"source14","name":"最大资源","url":"https://api.zuidapi.com/api.php/provide/vod","isEnabled":true},
{"id":"source15","name":"樱花资源","url":"https://m3u8.apiyhzy.com/api.php/provide/vod","isEnabled":true},
{"id":"source16","name":"无尽资源","url":"https://api.wujinapi.me/api.php/provide/vod","isEnabled":true},
{"id":"source17","name":"旺旺短剧","url":"https://wwzy.tv/api.php/provide/vod","isEnabled":true},
{"id":"source18","name":"iKun资源","url":"https://ikunzyapi.com/api.php/provide/vod","isEnabled":true},
{"id":"source19","name":"量子资源站","url":"https://cj.lziapi.com/api.php/provide/vod","isEnabled":true},
{"id":"source20","name":"小猫咪资源","url":"https://zy.xmm.hk/api.php/provide/vod","isEnabled":true}
  // 在这里添加更多静态视频源...
]

/**
 * 合并静态配置和JSON文件配置
 */
export const BUILTIN_VIDEO_SOURCES: VideoApi[] = [
  ...STATIC_VIDEO_SOURCES,
  ...(builtinSourcesJson as VideoApi[]),
]

/**
 * 获取启用的内置视频源
 */
export const getEnabledBuiltinSources = (): VideoApi[] => {
  return BUILTIN_VIDEO_SOURCES.filter(source => source.isEnabled)
}

/**
 * 获取所有内置视频源（包括禁用的）
 */
export const getAllBuiltinSources = (): VideoApi[] => {
  return BUILTIN_VIDEO_SOURCES
}