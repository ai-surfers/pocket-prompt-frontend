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
