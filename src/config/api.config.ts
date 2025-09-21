import { BUILTIN_VIDEO_SOURCES } from './builtin-sources'

// API 配置
export const API_CONFIG = {
  search: {
    path: '/api.php/provide/vod/?ac=videolist&wd=',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Accept: 'application/json',
    },
  },
  detail: {
    path: '/api.php/provide/vod/?ac=videolist&ids=',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      Accept: 'application/json',
    },
  },
}

// 其他配置
// 优先使用环境变量中的代理URL，如果没有则使用默认值
export const PROXY_URL =
  import.meta.env.VITE_PROXY_URL || 'https://api.codetabs.com/v1/proxy?quest='
export const M3U8_PATTERN = /\$https?:\/\/[^"'\s]+?\.m3u8/g

// 从环境变量获取初始视频源
export const getInitialVideoSources = async () => {
  let envSources = import.meta.env.VITE_INITIAL_VIDEO_SOURCES

  // 如果没有环境变量配置，使用内置默认源
  if (!envSources || typeof envSources !== 'string') {
    console.log('使用内置默认视频源')
    return BUILTIN_VIDEO_SOURCES
  }

  // 验证url
  try {
    new URL(envSources.trim())
    const response = await fetch(PROXY_URL + envSources.trim())
    if (!response.ok) {
      console.error(`无法获取视频源，HTTP状态: ${response.status}`)
      console.log('回退到内置默认视频源')
      return BUILTIN_VIDEO_SOURCES
    }
    envSources = await response.text()
  } catch {
    // 不是URL，继续处理
  }

  try {
    // 清理多行JSON：移除不必要的换行符和空白字符，但保留JSON结构内的空格
    const cleanedSources = envSources
      .replace(/^\s*['"`]/, '') // 移除开头的引号
      .replace(/['"`]\s*$/, '') // 移除结尾的引号
      .trim()

    // 解析 JSON 格式
    const jsonSources = JSON.parse(cleanedSources)
    const sources = Array.isArray(jsonSources) ? jsonSources : [jsonSources]

    const parsedSources = sources
      .map((source, index) => {
        if (!source.name || !source.url) {
          console.warn(`跳过无效的视频源配置: ${JSON.stringify(source)}`)
          return null
        }

        return {
          id: source.id || `env_source_${index}`,
          name: source.name,
          url: source.url,
          detailUrl: source.detailUrl || source.url,
          isEnabled: source.isEnabled !== undefined ? source.isEnabled : true,
        }
      })
      .filter(Boolean)
    
    // 合并环境变量源和内置默认源
    console.log(`加载了 ${parsedSources.length} 个环境变量源和 ${BUILTIN_VIDEO_SOURCES.length} 个内置默认源`)
    return [...parsedSources, ...BUILTIN_VIDEO_SOURCES]
  } catch (error) {
    console.error('解析环境变量中的视频源失败:', error)
    console.error('环境变量内容:', envSources)
    console.log('回退到内置默认视频源')
    return BUILTIN_VIDEO_SOURCES
  }
}
