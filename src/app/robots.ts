import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://www.pocket-prompt.com'

export default function robots(): MetadataRoute.Robots {
    if (process.env.APP_ENV !== 'production') {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        }
    }

    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${WEB_URL}/sitemap.xml`,
    }
}
