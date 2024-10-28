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
