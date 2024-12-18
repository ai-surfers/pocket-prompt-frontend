/**
 * 날짜를 'YYYY년 M월 D일' 형식으로 변환
 * @param isoString ISO 8601 날짜 문자열
 * @returns 포맷된 날짜 문자열
 */
export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
};

/**
 * 숫자에 세 자리마다 콤마 추가
 * @param number 숫자 또는 숫자 형태의 문자열
 * @returns 포맷된 숫자 문자열
 */
export const formatNumber = (number: number | string): string => {
    return Number(number).toLocaleString("ko-KR");
};

/**
 * 닉네임 규정 위반 검사
 * @param string 검사하고자 하는 닉네임
 * @returns 검사 결과
 */

export const isValidNickname = (
    nickname: string
): { res: boolean; detail: string } => {
    // // 금칙어 리스트
    // const forbiddenWords = ["병", "시", "조"];

    // 1. 길이 검사: 최소 2자 ~ 최대 14자
    if (nickname.length < 2 || nickname.length > 14) {
        return {
            res: false,
            detail: "닉네임은 최소 2자, 최대 14자까지 가능해요.",
        };
    }

    // 2. 연속된 공백 검사
    if (/\s{2,}/.test(nickname)) {
        return {
            res: false,
            detail: "닉네임에는 연속된 공백이 포함될 수 없어요.",
        };
    }

    // 3. 이모티콘 및 특수문자 검사: 한글, 영문(대소문자), 숫자, 단일 공백만 허용
    if (/[^a-zA-Z0-9가-힣\s]/.test(nickname)) {
        return {
            res: false,
            detail: "닉네임에는 한글, 영문 대소문자, 숫자, 단일 공백만 포함 가능해요.",
        };
    }

    // 4. 앞뒤 공백 검사
    if (nickname.trim() !== nickname) {
        return {
            res: false,
            detail: "닉네임에는 앞뒤 공백이 포함될 수 없어요.",
        };
    }

    // // 5. 금칙어 검사
    // for (const word of forbiddenWords) {
    //     if (nickname.includes(word)) return false;
    // }

    return { res: true, detail: "" };
};
