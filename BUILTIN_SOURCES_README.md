# 内置视频源配置指南

这个文件展示了如何在项目中配置内置视频源，您可以根据实际需要修改 `src/config/builtin-sources.ts` 文件。

## 🎯 配置位置

所有内置视频源配置都在：
```
src/config/builtin-sources.ts
```

## 📝 配置格式

每个视频源需要包含以下字段：

```typescript
{
  id: string,           // 唯一标识符
  name: string,         // 显示名称
  url: string,          // API 搜索地址
  detailUrl?: string,   // API 详情地址（可选，默认使用 url）
  isEnabled: boolean,   // 是否启用
}
```

## 🔧 常见视频源API格式

大多数视频源API遵循以下格式：

### 搜索API
```
GET {url}?ac=videolist&wd={关键词}
```

### 详情API
```
GET {url}?ac=videolist&ids={视频ID}
```

## 🌟 配置示例

### 完整配置示例：
```typescript
export const BUILTIN_VIDEO_SOURCES: VideoApi[] = [
  {
    id: 'source_1',
    name: '优质视频源1',
    url: 'https://api.example1.com/api.php/provide/vod/',
    detailUrl: 'https://api.example1.com/api.php/provide/vod/',
    isEnabled: true,
  },
  {
    id: 'source_2', 
    name: '备用视频源2',
    url: 'https://api.example2.com/api.php/provide/vod/',
    isEnabled: false, // 默认禁用
  },
]
```

## ⚠️ 重要提示

1. **替换示例URL**: 请将示例中的URL替换为实际可用的视频源API
2. **合法合规**: 确保使用的视频源符合当地法律法规
3. **API兼容性**: 确认API返回格式与项目兼容
4. **性能考虑**: 内置过多源可能影响启动速度

## 🚀 使用流程

1. 编辑 `src/config/builtin-sources.ts`
2. 添加或修改视频源配置
3. 重新构建应用：`pnpm run build`
4. 启动应用，内置源会自动加载

## 🔄 混合使用

项目支持同时使用：
- 内置视频源（代码中配置）
- 环境变量视频源（部署时配置）
- 用户导入视频源（运行时导入）

优先级：用户导入 > 环境变量 > 内置源