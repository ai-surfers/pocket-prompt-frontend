/**
 * text에서 []로 묶어진 옵션들을 추출하는 함수
 * @param text
 * @returns []로 작성한 옵션들 (중복 X, \[\]는 무시)
 */
export function extractOptions(text: string): string[] {
    const regex = /(?<!\\)\[(.*?)]/g;
    let matches;

    const options = new Set<string>();
    while ((matches = regex.exec(text)) !== null) {
        options.add(matches[1]);
    }
    return Array.from(options);
}

/**
 * 입력받은 value들을 {{}} 영역에 replace한 텍스트를 리턴하는 함수
 * @param template
 * @param values
 * @returns replace한 텍스트
 */
export function populateTemplate(
    template: string,
    values: Record<string, string>
): string {
    return template.replace(/\[(.*?)\]/g, (_, key) => values[key]);
}

/**
 * 클립보드에 텍스트 복사하는 함수
 * @param text
 * @return Promise 함수
 */
export function copyClipboard(text: string) {
    return navigator.clipboard.writeText(text);
}

/**
 * 현재 주소에서 쿼리 문자열과 해시를 제거한 주소를 반환하는 함수
 * @param href 현재 url
 * @returns 쿼리가 제거된 url
 */
export function getShareUrl(href: string): string {
    try {
        const url = new URL(href);
        return `${url.origin}${url.pathname}`;
    } catch {
        return href;
    }
}
