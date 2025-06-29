import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://www.pocket-prompt.com'
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ''

interface Prompt {
    id: string
    created_at: string
}

async function fetchPrompts(promptType: 'text' | 'image'): Promise<Prompt[]> {
    const params = new URLSearchParams({
        view_type: 'open',
        prompt_type: promptType,
        sort_by: 'created_at',
        sort_order: 'desc',
        limit: '1000',
        page: '1',
    })

    const res = await fetch(`${API_BASE_URL}/prompts-list?${params.toString()}`)
    if (!res.ok) {
        console.error(`[sitemap] Failed to fetch prompts: ${res.status}`)
        return []
    }
    const json = await res.json()
    const list = json?.data?.prompt_info_list ?? json?.prompt_info_list
    return Array.isArray(list) ? list : []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    if (process.env.APP_ENV !== 'production') {
        return []
    }

    try {
        const [textPrompts, imagePrompts] = await Promise.all([
            fetchPrompts('text'),
            fetchPrompts('image'),
        ])

        const routes: MetadataRoute.Sitemap = [
            {
                url: `${WEB_URL}/prompt/text`,
                lastModified: textPrompts[0] ? new Date(textPrompts[0].created_at) : undefined,
            },
            {
                url: `${WEB_URL}/prompt/image`,
                lastModified: imagePrompts[0] ? new Date(imagePrompts[0].created_at) : undefined,
            },
            {
                url: `${WEB_URL}/extension`,
                lastModified: new Date('2025-06-29'),
            },
            {
                url: `${WEB_URL}/price`,
                lastModified: new Date('2025-06-29'),
            },
            ...textPrompts.map((p) => ({
                url: `${WEB_URL}/prompt/text/${p.id}`,
                lastModified: new Date(p.created_at),
            })),
            ...imagePrompts.map((p) => ({
                url: `${WEB_URL}/prompt/image/${p.id}`,
                lastModified: new Date(p.created_at),
            })),
        ]

        return routes
    } catch (e) {
        console.error('[sitemap] Unexpected error generating sitemap', e)
        return []
    }
}
