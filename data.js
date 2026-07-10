// Автоматический поиск по твоей базе данных terminalDataBase
function runIndexer() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const errorElement = document.getElementById("search-error");
    const contentElement = document.getElementById("dynamic-content");

    if (errorElement) errorElement.style.display = "none";

    if (!query) {
        if (errorElement) {
            errorElement.innerText = "ОШИБКА: ПУСТОЙ ЗАПРОС";
            errorElement.style.display = "block";
        }
        return;
    }

    let foundContent = null;
    let foundKeyName = null;

    // Подключаемся напрямую к твоей базе данных Starr Corp
    const sourceData = typeof terminalDataBase !== 'undefined' ? terminalDataBase : 
                       (typeof terminal_data_base !== 'undefined' ? terminal_data_base : 
                       (typeof terminaldata !== 'undefined' ? terminaldata : null));

    if (sourceData) {
        for (let key in sourceData) {
            const keyLower = key.toLowerCase();
            const textLower = String(sourceData[key]).toLowerCase();

            // Ищем совпадение в названии вкладки или внутри её текста
            if (keyLower.includes(query) || textLower.includes(query)) {
                foundContent = sourceData[key];
                foundKeyName = key;
                break;
            }
        }
    }

    if (foundContent) {
        if (contentElement) {
            // Выводим данные на экран терминала
            contentElement.innerHTML = foundContent;
        }
    } else {
        if (errorElement) {
            errorElement.innerText = `ОШИБКА: СОВПАДЕНИЙ ДЛЯ "${query.toUpperCase()}" НЕ ОБНАРУЖЕНО // ДОСТУП ОГРАНИЧЕН`;
            errorElement.style.display = "block";
        }
    }
}
