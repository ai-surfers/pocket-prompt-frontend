// Keys
export enum LOCALSTORAGE_KEYS {
    ACCESS_TOKEN = "access_token",
}

/**
 * 로컬 스토리지에 값 저장하는 함수
 * @param key
 * @param value
 */
export function setLocalStorage(key: LOCALSTORAGE_KEYS, value: string) {
    try {
        console.log("*️⃣ 저장하였습니다. ", key, value);
        window.localStorage.setItem(key, value);
    } catch (e) {
        console.error("*️⃣ 저장에 실패하였습니다.", e);
    }
}

/**
 * 로컬 스토리지에서 값을 불러오는 함수
 * @param key
 */
export function getLocalStorage(key: LOCALSTORAGE_KEYS) {
    try {
        if (typeof window === "undefined") return null;
        return window.localStorage.getItem(key);
    } catch (e) {
        console.error("*️⃣ 값을 불러오는 데 실패하였습니다.", e);
    }
}

/**
 * 로컬 스토리지에서 값을 제거하는 함수
 * @param key
 */
export function removeLocalStorage(key: LOCALSTORAGE_KEYS) {
    try {
        window.localStorage.removeItem(key);
    } catch (e) {
        console.error("*️⃣ 값을 삭제하는 데 실패하였습니다.", e);
    }
}
